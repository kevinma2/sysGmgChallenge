import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RoundEntity } from "../entity/round.entity";
import { Model } from "mongoose";
import { IRoundService } from "../types/IRoundService";
import { BetResponseDto } from "../dto/response/bet-response.dto";
import { RoundsListDto } from "../dto/response/rounds-list.dto";

@Injectable()
export class RoundService implements IRoundService{

    @InjectModel(RoundEntity.name)
    private roundModel: Model<RoundEntity>;

    bet(createBetDto: any): Promise<BetResponseDto> {
        throw new Error("Method not implemented.");
    }

    findRounds(filter: string, idUser: string): Promise<RoundsListDto> {
        throw new Error("Method not implemented.");
    }
}