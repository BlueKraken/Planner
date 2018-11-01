import { Calification } from './calification.js'
import { html, render } from '../../node_modules/lit-html/lit-html.js';

const notebook = {
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

window.setExamScore = value => {
  notebook.exam.score = value * 1;
  renderTotalScore();
}

window.setExamWeight = value => {
  notebook.exam.weight = value * 1;
  renderTotalScore();
}

window.onAddCalificationClick = () => {
  notebook.califications.push(new Calification());
  renderCalifications();
}

const init = () => {
  render(
    markup(notebook), 
    document.getElementById('califications-container'));
  renderCalifications();
  renderTotals();
}

const calificationsGridContainer = () => 
  document.querySelector('#califications-container .grid-container');

const renderTotalScore = () => {
  document.getElementById('total-score').innerText =
  notebook.totalScore.toFixed(3);
}

const renderCalifications = () => {  
  calificationsGridContainer()
  .querySelectorAll(':not(.grid-header)')
  .forEach(e => e.remove());
  
  notebook.califications.forEach((_c, i) => {
    calificationRow(notebook, i).forEach(col => {
      calificationsGridContainer().appendChild(col);
    });
  });
}

function renderTotals() {
  renderPresentationScore();
  renderTotalScore();
}

const renderPresentationScore = () => {
  document.getElementById('presentation-score').innerText = 
  notebook.presentation.score.toFixed(3);
}

const gridHeader = html`
<div class="grid-item grid-header">Peso</div>
<div class="grid-item grid-header">Nota</div>
<div class="grid-item grid-header">Opciones</div>
`

const markup = state => html`
<button onclick="onAddCalificationClick()">
Agregar nota
</button>

<div class="grid-container">
${gridHeader}
</div>

<label for="exam-weight">Peso examen</label>
<input 
type="number"
min="0" 
name="exam-weigth" 
value="${state.exam.weight}" 
oninput="setExamWeight(this.value)"> 

<label for="exam-score">Nota examen</label>
<input 
type="number" 
min="0" 
name="exam-score" 
value="${state.exam.score}"
step="0.1" 
oninput="setExamScore(this.value)">

<p>Nota presentación: 
<small id='presentation-score'>${state.presentation.score}</small>
</p>

<p>Nota final: 
<small id='total-score'>${state.totalScore}</small>
</p>
`

const calificationRow = (state, key) => {
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
  
  return [
    weightInputEl,
    scoreInputEl,
    deleteButtonEl,
  ];
}
  
window.printState = () => console.log(notebook);
document.addEventListener('DOMContentLoaded', init)