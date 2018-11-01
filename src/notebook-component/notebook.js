import { Calification } from './calification.js'


export const notebook = {
  califications: [
    new Calification(50, 6),
    new Calification(50, 4)
  ],
  exam: new Calification(),
  get presentation() {
    const weight = 100 - this.exam.weight;
    const score = this.califications
    .map(c => c.weightedScore)
    .reduce((total, current) => total += current);
    
    return new Calification(weight, score);
  },
  get totalScore() { 
    return this.presentation.weightedScore + this.exam.weightedScore
  }
}

window.printState = () => console.log(notebook);