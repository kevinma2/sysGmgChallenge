import { RoundsListDto } from '../dto/response/rounds-list.dto';
import { BetResponseDto } from '../dto/response/bet-response.dto';
import { CreateBetDto } from '../dto/create-bet.dto';

export interface IGenerateNumbersService{
  generateRandomNumbers(min: number, max: number, quantity: number): number[];
  generateRandomNumber(min: number, max: number): number;
}