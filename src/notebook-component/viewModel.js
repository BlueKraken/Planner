import { Calification } from './calification.js';
import { notebook } from './notebook.js';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

const parentContainer = document.querySelector(
    '#califications-container');

function setExamScore(event) {
    notebook.exam.score = event.target.value * 1;
    renderTotalScore();
}

function setExamWeight(event) {
    notebook.exam.weight = event.target.value * 1;
    renderTotalScore();
}

function addCalification() {
    notebook.califications.push(new Calification());
    renderCalifications();
}

function changeCalificationWeight(key, value) {
    notebook.califications[key].weight = value * 1;
    renderTotals();
}

function changeCalificationScore(key, value) {
    notebook.califications[key].score = value * 1;
    renderTotals();
}

function deleteCalification(key) {
    notebook.califications.splice(key, 1);
    renderCalifications();
    renderTotals();
}

function renderCalifications() {  
    const calificationsGridContainer = parentContainer
    .querySelector('.grid-container');

    calificationsGridContainer
    .querySelectorAll(':not(.grid-header)')
    .forEach(e => e.remove());
    
    notebook.califications.forEach((_c, i) => {
        calificationRow(i).forEach(col => {
            calificationsGridContainer.appendChild(col);
        });
    });
}

function renderTotals() {
    renderPresentationScore();
    renderTotalScore();
}

function renderTotalScore () {
    parentContainer.querySelector('#total-score').innerText =
    notebook.totalScore.toFixed(3);
}

function renderPresentationScore() {
    parentContainer.querySelector('#presentation-score').innerText = 
    notebook.presentation.score.toFixed(3);
}

export function init() {
    render(markup, parentContainer);
    renderCalifications();
}

const gridHeader = html`
<div class="grid-item grid-header">Peso</div>
<div class="grid-item grid-header">Nota</div>
<div class="grid-item grid-header">Opciones</div>
`

const markup = html`
<button @click="${addCalification}">
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
value="${notebook.exam.weight}" 
@input="${setExamWeight}"> 

<label for="exam-score">Nota examen</label>
<input 
type="number" 
min="0" 
name="exam-score" 
value="${notebook.exam.score}"
step="0.1" 
@input="${setExamScore}">

<p>Nota presentación: 
<small id='presentation-score'>${notebook.presentation.score}</small>
</p>

<p>Nota final: 
<small id='total-score'>${notebook.totalScore}</small>
</p>
`

const calificationRow = key => {
    const calification = notebook.califications[key];
    
    const weightInputEl = document.createElement('input');
    weightInputEl.classList.add('grid-item');
    weightInputEl.setAttribute('type', 'number');
    weightInputEl.setAttribute('min', '0');  
    weightInputEl.setAttribute('value', calification.weight);
    weightInputEl.addEventListener('input', _ => {
        changeCalificationWeight(key, weightInputEl.value);
    });
    
    const scoreInputEl = document.createElement('input');
    scoreInputEl.classList.add('grid-item');
    scoreInputEl.setAttribute('type', 'number');
    scoreInputEl.setAttribute('min', '0');
    scoreInputEl.setAttribute('step', '0.1');
    scoreInputEl.setAttribute('value', calification.score);
    scoreInputEl.addEventListener('input', _ => {
        changeCalificationScore(key, scoreInputEl.value);
    });
    
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.classList.add('grid-item');
    deleteButtonEl.textContent = 'Eliminar';
    deleteButtonEl.onclick = _ => {
        deleteCalification(key)
    }
    
    return [
        weightInputEl,
        scoreInputEl,
        deleteButtonEl,
    ];
}