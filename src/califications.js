class Calification {
  constructor( weight = 0, score = 0) {
    // TODO: revertir el uso de key interno, corresponde a su índice dentro de
    // la colección de calificaciones del estado y cambia por factores externos
    this.weight = weight;
    this.score = score;
    /** Calculates and return the weightedScore */
  }
  get weightedScore() { return this.weight * this.score / 100; }
}

const state = {
  califications: [
    new Calification(),
    new Calification()
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

export const initCalificationsGrid = () => {
  render(gridHeader, getCalificationGridContainerRef());
  renderCalifications();
  renderTotals();
}

export const setExamScore = value => {
  state.exam.score = value * 1;
  onExamChange();
}

export const setExamWeight = value => {
  state.exam.weight = value * 1;
  onExamChange();
}

export const onAddCalificationClick = () => {
  state.califications.push(new Calification());

  renderCalifications();
}

const onExamChange = () => {  
  renderTotalScore();
}

const renderTotalScore = () => {
  document.getElementById('total-score').innerText =
  state.totalScore.toFixed(3);
}

const getCalificationGridContainerRef = () => 
  document.querySelector('#califications-container .grid-container');

import { render, html } from '../node_modules/lit-html/lit-html.js';

const renderCalificationRow = key => {
  const calification = state.califications[key];

  const weightInputEl = document.createElement('input');
  weightInputEl.classList.add('grid-item');
  weightInputEl.setAttribute('type', 'number');
  weightInputEl.setAttribute('min', '0');  
  weightInputEl.setAttribute('value', calification.weight);
  weightInputEl.addEventListener('input', _ => {
    state.califications[key].weight = weightInputEl.value * 1;
    renderTotals();
  });
  
  const scoreInputEl = document.createElement('input');
  scoreInputEl.classList.add('grid-item');
  scoreInputEl.setAttribute('type', 'number');
  scoreInputEl.setAttribute('min', '0');
  scoreInputEl.setAttribute('step', '0.1');
  scoreInputEl.setAttribute('value', calification.score);
  scoreInputEl.addEventListener('input', _ => {
    state.califications[key].score = scoreInputEl.value * 1;
    renderTotals();
  });
  
  const deleteButtonEl = document.createElement('button');
  deleteButtonEl.classList.add('grid-item');
  deleteButtonEl.textContent = 'Eliminar';
  deleteButtonEl.onclick = _ => {
    state.califications.splice(key, 1);
    renderCalifications();
    renderTotals();
  }
  
  const containerRef = getCalificationGridContainerRef();
  containerRef.appendChild(weightInputEl);
  containerRef.appendChild(scoreInputEl);
  containerRef.appendChild(deleteButtonEl);
}

const renderCalifications = () => {  
  getCalificationGridContainerRef()
  .querySelectorAll(':not(.grid-header)')
  .forEach(e => e.remove());

  state.califications.forEach((_c, i) => {
    renderCalificationRow(i);
  });
}

function renderTotals() {
  renderPresentationScore();
  renderTotalScore();
}

const renderPresentationScore = () => {
  document.getElementById('presentation-score').innerText = 
  state.presentation.score.toFixed(3);
}

const gridHeader = html`
  <div class="grid-item grid-header">Peso</div>
  <div class="grid-item grid-header">Nota</div>
  <div class="grid-item grid-header">Opciones</div>
`

window.printState = () => console.log(state);