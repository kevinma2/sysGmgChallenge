import { BetResponseDto } from './dto/response/bet-response.dto';
import { Body, Controller, Post } from "@nestjs/common";
import { CreateBetDto } from "./dto/create-bet.dto";
import { RoundService } from './service/round.service';

@Controller('round')
export class RoundController{

    constructor(private readonly roundService: RoundService){}
    
    @Post()
    async bet(@Body() createBetDto: CreateBetDto): Promise<BetResponseDto>{
        return this.roundService.bet(createBetDto);
    }
}