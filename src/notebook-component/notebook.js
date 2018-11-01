import { Calification } from './calification.js'
import { markup, calificationRow } from './view.js';
import { render } from '../../node_modules/lit-html/lit-html.js';

const notebook = {
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

export const notebookViewModel = {
  parentContainer: document.getElementById(
    'califications-container'),

  set examScore(value) {
    notebook.exam.score = value * 1;
    renderTotalScore();
  },
  
  set examWeight(value) {
    notebook.exam.weight = value * 1;
    renderTotalScore();
  },
  
  get califications() { return notebook.califications; },
  
  get exam() { return notebook.exam; },
  
  get presentation() { return notebook.presentation; },
  
  get totalScore() { return notebook.totalScore; },
  
  addCalification() {
    notebook.califications.push(new Calification());
    this.renderCalifications();
  },
  
  changeCalificationWeight(key, value) {
    notebook.califications[key].weight = value * 1;
    this.renderTotals();
  },
  
  changeCalificationScore(key, value) {
    notebook.califications[key].score = value * 1;
    this.renderTotals();
  },
  
  deleteCalification(key) {
    state.califications.splice(key, 1);
    this.renderCalifications();
    this.renderTotals();
  },

  renderCalifications() {  
    const calificationsGridContainer = this.parentContainer
    .querySelector('.grid-container');

    calificationsGridContainer
    .querySelectorAll(':not(.grid-header)')
    .forEach(e => e.remove());
    
    this.califications.forEach((_c, i) => {
        calificationRow(i).forEach(col => {
            calificationsGridContainer.appendChild(col);
        });
    });
  },

  renderTotals() {
    this.renderPresentationScore();
    this.renderTotalScore();
  },
  
  renderTotalScore () {
    parentContainer.querySelector('#total-score').innerText =
    notebookViewModel.totalScore.toFixed(3);
  },
  
  renderPresentationScore() {
    parentContainer.querySelector('#presentation-score').innerText = 
    notebookViewModel.presentation.score.toFixed(3);
  },

  init() {
    render(markup, this.parentContainer);
    this.renderCalifications();
  }
}

window.notebookViewModel = notebookViewModel;

window.printState = () => console.log(notebook);