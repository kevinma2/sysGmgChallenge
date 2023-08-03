export interface IRoundEntity{
  idUser: string;
  betValue: number;
  winner: boolean;
  winValue: number;
  numberSequence: number[];
  drawnSequence: number[];
  createdAt: Date;
}