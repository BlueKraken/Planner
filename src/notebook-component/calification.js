export class Calification {
  constructor( weight = 0, score = 0) {
    this.weight = weight;
    this.score = score;
  }
  /** Calculates and return the weightedScore */
  get weightedScore() { return this.weight * this.score / 100; }
}