import { html } from '../../node_modules/lit-html/lit-html.js';

const gridHeader = html`
<div class="grid-item grid-header">Peso</div>
<div class="grid-item grid-header">Nota</div>
<div class="grid-item grid-header">Opciones</div>
`

export const markup = html`
<button onclick="notebookViewModel.addCalification()}">
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
value="${notebookViewModel.exam.weight}" 
oninput="notebookViewModel.examWeight(this.value)"> 

<label for="exam-score">Nota examen</label>
<input 
type="number" 
min="0" 
name="exam-score" 
value="${notebookViewModel.exam.score}"
step="0.1" 
oninput="notebookViewModel.examScore(this.value)">

<p>Nota presentación: 
<small id='presentation-score'>${notebookViewModel.presentation.score}</small>
</p>

<p>Nota final: 
<small id='total-score'>${notebookViewModel.totalScore}</small>
</p>
`

export const calificationRow = key => {
    const calification = notebookViewModel.califications[key];
    
    const weightInputEl = document.createElement('input');
    weightInputEl.classList.add('grid-item');
    weightInputEl.setAttribute('type', 'number');
    weightInputEl.setAttribute('min', '0');  
    weightInputEl.setAttribute('value', calification.weight);
    weightInputEl.addEventListener('input', _ => {
        notebookViewModel.changeCalificationWeight(key, weightInputEl.value);
    });
    
    const scoreInputEl = document.createElement('input');
    scoreInputEl.classList.add('grid-item');
    scoreInputEl.setAttribute('type', 'number');
    scoreInputEl.setAttribute('min', '0');
    scoreInputEl.setAttribute('step', '0.1');
    scoreInputEl.setAttribute('value', calification.score);
    scoreInputEl.addEventListener('input', _ => {
        notebookViewModel.changeCalificationWeight(key, weightInputEl.value);
    });
    
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.classList.add('grid-item');
    deleteButtonEl.textContent = 'Eliminar';
    deleteButtonEl.onclick = _ => {
        notebookViewModel.deleteCalification(key)
    }
    
    return [
        weightInputEl,
        scoreInputEl,
        deleteButtonEl,
    ];
}