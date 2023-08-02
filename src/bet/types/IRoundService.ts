import { RoundsListDto } from '../dto/response/rounds-list.dto';
import { BetResponseDto } from '../dto/response/bet-response.dto';
import { CreateBetDto } from '../dto/create-bet.dto';

export interface IRoundService{
  bet(createBetDto: CreateBetDto): Promise<BetResponseDto>;
  findRounds(filter: string, idUser: string): Promise<RoundsListDto>;
}