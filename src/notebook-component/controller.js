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
        this.saveNotebook();
    }

    setExamWeight(event) {
        this.notebook.exam.weight = event.target.value * 1;
        this.renderTotalScore();
        this.saveNotebook();
    }

    addCalification() {
        this.notebook.califications.push(new Calification());
        this.renderCalifications();
        this.saveNotebook();
    }

    changeCalificationWeight(key, value) {
        this.notebook.califications[key].weight = value * 1;
        this.renderTotals();
        this.saveNotebook();
    }

    changeCalificationScore(key, value) {
        this.notebook.califications[key].score = value * 1;
        this.renderTotals();
        this.saveNotebook();
    }

    deleteCalification(key) {
        this.notebook.califications.splice(key, 1);
        this.renderCalifications();
        this.renderTotals();
        this.saveNotebook();
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

    saveNotebook() {
        localStorage.setItem('notebook', JSON.stringify(this.notebook));
    }

    init() {
        const styleRef = document.createElement('link');
        styleRef.setAttribute('href', 'notebook-component/notebook.css');
        styleRef.setAttribute('rel', 'stylesheet');

        this.parentContainer = document.createElement('div');
        this.parentContainer.id = 'califications-container';

        document.head.appendChild(styleRef);

        document.body.appendChild(this.parentContainer);
        render(markup(), this.parentContainer);
        this.renderCalifications();
    }

    removeFromMarkup() {
        document.head.querySelector('[href="califications.css"]').remove();
        this.parentContainer.remove();
    }
}

export const controller = new NotebookController();

// ----------
// Markup and html elements
// TODO: extract to file
const gridHeader = html`
<div class="grid-item grid-header">Peso</div>
<div class="grid-item grid-header">Nota</div>
<div class="grid-item grid-header">Opciones</div>
`

const markup = () => html`
<button @click="${controller.addCalification.bind(controller)}">
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
    max="100"
    value="${controller.notebook.exam.weight}" 
    @input="${controller.setExamWeight.bind(controller)}"> 

<label for="exam-score">Nota examen</label>
<input 
    type="number" 
    min="0"
    max="7" 
    name="exam-score" 
    value="${controller.notebook.exam.score}"
    step="0.1" 
    @input="${controller.setExamScore.bind(controller)}">

<p>Nota presentación: 
    <small id='presentation-score'>
        ${controller.notebook.presentation.score.toFixed(3)}
    </small>
</p>

<p>Nota final: 
    <small id='total-score'>
        ${controller.notebook.totalScore.toFixed(3)}
    </small>
</p>
`

const calificationRow = key => {
    const calification = controller.notebook.califications[key];
    
    const weightInputEl = document.createElement('input');
    weightInputEl.classList.add('grid-item');
    weightInputEl.setAttribute('type', 'number');
    weightInputEl.setAttribute('min', '0');
    weightInputEl.setAttribute('max', '100');
    weightInputEl.setAttribute('value', calification.weight);
    weightInputEl.addEventListener('input', _ => {
        controller.changeCalificationWeight(key, weightInputEl.value);
    });
    
    const scoreInputEl = document.createElement('input');
    scoreInputEl.classList.add('grid-item');
    scoreInputEl.setAttribute('type', 'number');
    scoreInputEl.setAttribute('min', '0');
    scoreInputEl.setAttribute('max', '7');
    scoreInputEl.setAttribute('step', '0.1');
    scoreInputEl.setAttribute('value', calification.score);
    scoreInputEl.addEventListener('input', _ => {
        controller.changeCalificationScore(key, scoreInputEl.value);
    });
    
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.classList.add('grid-item');
    deleteButtonEl.textContent = 'Eliminar';
    deleteButtonEl.onclick = controller.deleteCalification.bind(controller)
    
    return [
        weightInputEl,
        scoreInputEl,
        deleteButtonEl,
    ];
}