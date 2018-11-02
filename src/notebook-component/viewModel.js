import { Calification } from './calification.js';
import { Notebook } from './notebook.js';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

class NotebookController {
    constructor() {
        this.notebook = new Notebook();
        this.parentContainer = document.querySelector(
            '#califications-container');
    }
        
    setExamScore(event) {
        this.notebook.exam.score = event.target.value * 1;
        this.renderTotalScore();
    }

    setExamWeight(event) {
        this.notebook.exam.weight = event.target.value * 1;
        renderTotalScore();
    }

    addCalification() {
        this.notebook.califications.push(new Calification());
        this.renderCalifications();
    }

    changeCalificationWeight(key, value) {
        this.notebook.califications[key].weight = value * 1;
        this.renderTotals();
    }

    changeCalificationScore(key, value) {
        this.notebook.califications[key].score = value * 1;
        this.renderTotals();
    }

    deleteCalification(key) {
        this.notebook.califications.splice(key, 1);
        this.renderCalifications();
        this.renderTotals();
    }

    renderCalifications() {  
        const calificationsGridContainer = this.parentContainer
        .querySelector('.grid-container');
        
        calificationsGridContainer
        .querySelectorAll(':not(.grid-header)')
        .forEach(e => e.remove());
        
        this.notebook.califications.forEach((_c, i) => {
            calificationRow(i).forEach(col => {
                calificationsGridContainer.appendChild(col);
            });
        });
    }

    renderTotals() {
        this.renderPresentationScore();
        this.renderTotalScore();
    }

    renderTotalScore () {
        this.parentContainer.querySelector('#total-score').innerText =
        this.notebook.totalScore.toFixed(3);
    }

    renderPresentationScore() {
        this.parentContainer.querySelector('#presentation-score').innerText = 
        this.notebook.presentation.score.toFixed(3);
    }

    init() {
        render(markup, this.parentContainer);
        this.renderCalifications();
    }
}

export const initNotebook = new NotebookController().init;

// ----------
// Markup and html elements
const gridHeader = html`
<div class="grid-item grid-header">Peso</div>
<div class="grid-item grid-header">Nota</div>
<div class="grid-item grid-header">Opciones</div>
`

const markup = html`
<button @click="${() => controller.addCalification()}">
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
    value="${controller.notebook.exam.weight}" 
    @input="${e => controller.setExamWeight(e)}"> 

<label for="exam-score">Nota examen</label>
<input 
    type="number" 
    min="0" 
    name="exam-score" 
    value="${controller.notebook.exam.score}"
    step="0.1" 
    @input="${e => controller.setExamScore(e)}">

<p>Nota presentación: 
    <small id='presentation-score'>
        ${controller.notebook.presentation.score}
    </small>
</p>

<p>Nota final: 
    <small id='total-score'>
        ${controller.notebook.totalScore}
    </small>
</p>
`

const calificationRow = key => {
    const calification = controller.notebook.califications[key];
    
    const weightInputEl = document.createElement('input');
    weightInputEl.classList.add('grid-item');
    weightInputEl.setAttribute('type', 'number');
    weightInputEl.setAttribute('min', '0');  
    weightInputEl.setAttribute('value', calification.weight);
    weightInputEl.addEventListener('input', _ => {
        controller.changeCalificationWeight(key, weightInputEl.value);
    });
    
    const scoreInputEl = document.createElement('input');
    scoreInputEl.classList.add('grid-item');
    scoreInputEl.setAttribute('type', 'number');
    scoreInputEl.setAttribute('min', '0');
    scoreInputEl.setAttribute('step', '0.1');
    scoreInputEl.setAttribute('value', calification.score);
    scoreInputEl.addEventListener('input', _ => {
        controller.changeCalificationScore(key, scoreInputEl.value);
    });
    
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.classList.add('grid-item');
    deleteButtonEl.textContent = 'Eliminar';
    deleteButtonEl.onclick = _ => {
        controller.deleteCalification(key)
    }
    
    return [
        weightInputEl,
        scoreInputEl,
        deleteButtonEl,
    ];
}