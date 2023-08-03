import { Injectable } from '@nestjs/common';

import { BetResultModel } from '../model/bet-result.model';
import { GenerateNumbersService } from './generate-numbers.service';

@Injectable()
export class BetCheckerService{

    readonly MAX_NUMBER: number = 60;
    readonly MIN_NUMBER: number = 1;
    readonly QUANTITY_NUMBERS: number = 5;
    readonly THREE_NUMBERS_IN_SEQUENCE: number = 3;
    readonly MAX_SEQUENCE_MULTIPLICATOR: number = 10;
    readonly SEQUENCE_MULTIPLICATOR: number = 4;
    readonly SAME_POSITION_MULTIPLICATOR: number = 2;
    readonly LOSE_MULTIPLICATOR: number = 0;
    readonly SEQUENCE_NUMBER: number = 3; 
    readonly MAX_SEQUENCE_NUMBER: number = 5;

    constructor(readonly generateNumbersService: GenerateNumbersService){}

    checkBetResult(numberSequence: number[], betValue: number): BetResultModel {
        const drawnNumbers = this.generateNumbersService.generateRandomNumbers(
            this.MIN_NUMBER, 
            this.MAX_NUMBER, 
            this.QUANTITY_NUMBERS
        );
        
        const haveNumberAtSamePosition: boolean = this.haveNumbersAtSamePosition(numberSequence, drawnNumbers);
        const qntNumbersInSequence: number = this.checkQuantityNumbersInSequence(numberSequence, drawnNumbers);
        const multiplicator: number = this.getMultiplicator(haveNumberAtSamePosition, qntNumbersInSequence);
        const winValue = this.calculateWinValue(multiplicator, betValue);
        
        return {
            winner: this.checkIsWinner(multiplicator),
            winValue: winValue,
            drawnSequence: drawnNumbers,
        }
    }

    private calculateWinValue(multiplicator: number, betValue: number): number {
        return betValue * multiplicator;
    }
        
    private checkIsWinner = (multiplicator: number): boolean => {
        console.log(multiplicator)
        console.log(this.LOSE_MULTIPLICATOR)
        return multiplicator != this.LOSE_MULTIPLICATOR;
    }

    private getMultiplicator(haveNumberAtSamePosition: boolean, qntNumberInSequence: number): number{
        if(this.haveMaxSequence(qntNumberInSequence)) return this.MAX_SEQUENCE_MULTIPLICATOR;
        if(this.haveSequence(qntNumberInSequence)) return this.SEQUENCE_MULTIPLICATOR;
        if(haveNumberAtSamePosition) return this.SAME_POSITION_MULTIPLICATOR;
        return this.LOSE_MULTIPLICATOR;
    }

    private checkHaveNumberInSequence(qntNumberInSequence: number): boolean {
        return this.haveMaxSequence(qntNumberInSequence) || this.haveSequence(qntNumberInSequence);
    }

    private checkQuantityNumbersInSequence(numberSequence: number[], drawnSequence: number[] ): number{
        let qntNumbersInSequence = 0;

        for (let i = 0; i < this.QUANTITY_NUMBERS; i++) {
            if (numberSequence.includes(drawnSequence[i])) {
                qntNumbersInSequence++;
            }
        }
        return qntNumbersInSequence;
    }

    haveNumbersAtSamePosition(numberSequence: number[], drawnSequence: number[]): boolean{
        for (let i = 0; i < this.QUANTITY_NUMBERS; i++) {
            if (numberSequence[i] === drawnSequence[i]) {
              return true;
            }
          }
        return false;
    }

    haveSequence(qntNumbersInSequence): boolean{
        return qntNumbersInSequence === this.SEQUENCE_NUMBER;
    }

    haveMaxSequence(qntNumbersInSequence): boolean{
        return qntNumbersInSequence === this.QUANTITY_NUMBERS;
    }
}