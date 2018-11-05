import { Calification } from './calification.js'


export class Notebook {
  constructor() {
    this.califications = [];
    this.exam = new Calification();
  }

  get presentation() {
    const weight = 100 - this.exam.weight;
    const score = this.califications
    .map(c => c.weightedScore)
    .reduce((total, current) => total += current, 0);
    
    return new Calification(weight, score);
  }

  get totalScore() { 
    return this.presentation.weightedScore + this.exam.weightedScore
  }
}