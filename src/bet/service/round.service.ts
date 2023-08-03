import { BetCheckerService } from './bet-checker.service';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RoundEntity } from "../entity/round.entity";
import { Model } from "mongoose";
import { IRoundService } from "../types/IRoundService";
import { BetResponseDto } from "../dto/response/bet-response.dto";
import { RoundsListDto } from "../dto/response/rounds-list.dto";
import { GenerateNumbersService } from "./generate-numbers.service";
import { CreateBetDto } from "../dto/create-bet.dto";
import { FindFilterType } from "../enum/find-filter-type.enum";
import { BetResultModel } from '../model/bet-result.model';

@Injectable()
export class RoundService implements IRoundService{

    @InjectModel(RoundEntity.name)
    private roundModel: Model<RoundEntity>;

    constructor(readonly betCheckerService: BetCheckerService){}
    async bet(createBetDto: CreateBetDto): Promise<BetResponseDto> {
        
        const betResult: BetResultModel = this.betCheckerService.checkBetResult(createBetDto.numberSequence, createBetDto.betValue);

        const roundEntity: RoundEntity = {
            winner: betResult.winner,
            winValue: betResult.winValue,
            betValue: createBetDto.betValue,
            drawnSequence: betResult.drawnSequence,
            numberSequence: createBetDto.numberSequence,
            idUser: createBetDto.idUser,
            createdAt: new Date(),
        }

        await this.roundModel.create(roundEntity);
        
        return {
            winner: roundEntity.winner,
            winValue: roundEntity.winValue,
            drawnSequence: roundEntity.drawnSequence,
        }
    }

    async findRounds(idUser: string, filter: FindFilterType): Promise<RoundsListDto[]> {
        const rounds = await this.roundModel.find({
            idUser: idUser,
            winner: filter === FindFilterType.WIN ? true : false,
        });
        const roundsListDto: RoundsListDto[] = [];
        
        rounds.forEach(round => {
            roundsListDto.push({
                idRound: round._id.toString(),
                idUser: round.idUser,
                betValue: round.betValue,
                winValue: round.winValue,
                numberSequence: round.numberSequence,
                drawnSequence: round.drawnSequence,
                winner: round.winner,          
            })
        });	
        return roundsListDto;
    }
}