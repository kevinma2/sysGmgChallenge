import { Injectable } from '@nestjs/common';

import { IGenerateNumbersService } from '../types/IGenerateNumbersService';

@Injectable()
export class GenerateNumbersService implements IGenerateNumbersService{
    generateRandomNumbers(min: number, max: number, quantity: number): number[] {
       const drawnNumbers: number[] = []; 
       for(let i = 0; i < quantity; i++){
              drawnNumbers.push(this.generateRandomNumber(min, max));
         }
         return drawnNumbers;
    }
    
    generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}