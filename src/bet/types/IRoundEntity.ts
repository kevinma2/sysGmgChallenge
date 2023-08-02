export interface IRoundEntity{
  idUser: string;
  betValue: number;
  winner: boolean;
  winValue: number;
  betSequence: number[];
  drawnSequence: number[];
  createdAt: Date;
}