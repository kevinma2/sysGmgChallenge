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

@Injectable()
export class RoundService implements IRoundService{

    @InjectModel(RoundEntity.name)
    private roundModel: Model<RoundEntity>;

    readonly MAX_NUMBER = 60;
    readonly MIN_NUMBER = 1;
    readonly QUANTITY_NUMBERS = 5;

    constructor(readonly generateNumbersService: GenerateNumbersService){}
    async bet(createBetDto: CreateBetDto): Promise<BetResponseDto> {
        const drawnNumbers = this.generateNumbersService.generateRandomNumbers(
            this.MIN_NUMBER, 
            this.MAX_NUMBER, 
            this.QUANTITY_NUMBERS
        );
        
        const roundEntity: RoundEntity = {
            winner: true,
            winValue: createBetDto.betValue * 2,
            betValue: createBetDto.betValue,
            drawnSequence: drawnNumbers,
            numberSequence: createBetDto.numberSequence,
            idUser: createBetDto.idUser,
            createdAt: new Date(),
        }

        await this.roundModel.create(roundEntity);
        
        return {
            winner: true,
            winValue: createBetDto.betValue * 2,
            drawnSequence: drawnNumbers,
        }
    }

    async findRounds(idUser: string, filter: FindFilterType): Promise<RoundsListDto[]> {
        console.log(filter)
        console.log(idUser)
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