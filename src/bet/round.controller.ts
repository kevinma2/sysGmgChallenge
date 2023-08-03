import { BetResponseDto } from './dto/response/bet-response.dto';
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateBetDto } from "./dto/create-bet.dto";
import { RoundService } from './service/round.service';
import { RoundsListDto } from './dto/response/rounds-list.dto';
import { FindFilterType } from './enum/find-filter-type.enum';

@Controller('round')
export class RoundController{

    constructor(private readonly roundService: RoundService){}
    
    @Post()
    async bet(@Body() createBetDto: CreateBetDto): Promise<BetResponseDto>{
        return await this.roundService.bet(createBetDto);
    }

    @Get() 
    async listRounds(@Query('idUser') idUser: string, @Query('filter') filter: FindFilterType): Promise<RoundsListDto[]>{
        return await this.roundService.findRounds(idUser, filter);
    }
}