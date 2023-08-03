import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBetDto } from '../dto/create-bet.dto';
import { BetResponseDto } from '../dto/response/bet-response.dto';
import { RoundsListDto } from '../dto/response/rounds-list.dto';
import { RoundEntity } from '../entity/round.entity';
import { FindFilterType } from '../enum/find-filter-type.enum';
import { BetResultModel } from '../model/bet-result.model';
import { IRoundService } from '../types/IRoundService';
import { BetCheckerService } from './bet-checker.service';

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
        const rounds = await this.roundModel.find(this.getFindFilters(idUser, filter));

        const roundsListDto: RoundsListDto[] = [];
        rounds.forEach(round => {
            roundsListDto.push(this.buildRoundResultDto(round))
        });

        return roundsListDto;
    }

    private getFindFilters(idUser: string, filter: FindFilterType): import("mongoose").FilterQuery<RoundEntity> {
        if(filter === FindFilterType.ALL)
            return { idUser: idUser };
        
        return {
            idUser: idUser,
            winner: filter === FindFilterType.WIN,
        };
    }

    private buildRoundResultDto(round): RoundsListDto {
        return {
            idRound: round._id.toString(),
            idUser: round.idUser,
            betValue: round.betValue,
            winValue: round.winValue,
            numberSequence: round.numberSequence,
            drawnSequence: round.drawnSequence,
            winner: round.winner,
        };
    }
}