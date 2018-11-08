import { Calification } from './calification.js';
import { Notebook } from './notebook.js';
import { html, render } from '../../node_modules/lit-html/lit-html.js';

class NotebookController {
    constructor() {
        this.notebook = new Notebook();
        this.parentContainer = document.querySelector(
            '#califications-container');
    }

    setExamScore(value) {
        this.notebook.exam.score = value * 1;
        this.renderTotalScore();
        this.saveNotebook();
    }

    setExamWeight(value) {
        this.notebook.exam.weight = value * 1;
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
        .querySelector('#califications-grid');
        
        calificationsGridContainer
        .querySelectorAll(':not(.grid-header)')
        .forEach(e => e.remove());
        
        const calificationRows = this.notebook.califications
            .flatMap(generateCalificationRow);

        calificationsGridContainer.append(...calificationRows);
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
        this.subscribeToEvents();
        
        this.parentContainer = document.createElement('div');
        this.parentContainer.id = 'califications-container';


        document.body.appendChild(this.parentContainer);
        render(markup(this.notebook), this.parentContainer);
        this.renderCalifications();
    }

    removeFromMarkup() {
        document.head.querySelector('[href="califications.css"]').remove();
        this.parentContainer.remove();

        removeEventListener(calificationEventTypes.deleteCalification);
        removeEventListener(calificationEventTypes.calificationScoreChanged);
        removeEventListener(calificationEventTypes.calificationWeightChanged);
        removeEventListener(calificationEventTypes.examScoreChanged);
        removeEventListener(calificationEventTypes.examWeightChanged);
        removeEventListener(calificationEventTypes.calificationAdded);
    }

    subscribeToEvents() {
        addEventListener(calificationEventTypes.calificationDeleted, e => {
            const key = handleCustomEvent(e).key;
            this.deleteCalification(key)
        });

        addEventListener(calificationEventTypes.calificationScoreChanged, e => {
            const { key, value } = handleCustomEvent(e);
            this.changeCalificationScore(key, value);
        });

        addEventListener(calificationEventTypes.calificationWeightChanged, e => {
            const { key, value } = handleCustomEvent(e);
            this.changeCalificationWeight(key, value);
        });

        addEventListener(calificationEventTypes.examScoreChanged, e => {
            const { value } = handleCustomEvent(e);
            this.setExamScore(value);
        });

        addEventListener(calificationEventTypes.examWeightChanged, e => {
            const { value } = handleCustomEvent(e);
            this.setExamWeight(value);
        });

        addEventListener(calificationEventTypes.calificationAdded, e => {
            this.addCalification();
        });
    }
}

export const controller = new NotebookController();

// ----------
// Markup and html elements
// TODO: extract to file
const gridHeader = html`
<div class="grid-header">Peso</div>
<div class="grid-header">Nota</div>
<div class="grid-header">Opciones</div>
`

const markup = (notebookState) => html`
<link href="notebook-component/notebook.css" rel="stylesheet">
<button @click="${dispatchCalificationAdded}">
    Agregar nota
</button>

<div id="califications-grid">
    ${gridHeader}
</div>

<p>Nota presentación: 
    <small id='presentation-score'>
        ${notebookState.presentation.score.toFixed(3)}
    </small>
</p>

<div id="exam-grid">
    <label for="exam-weight">Peso examen:</label>
    <input 
        type="number"
        min="0" 
        name="exam-weigth" 
        max="100"
        value="${notebookState.exam.weight}" 
        @input="${dispatchExamWeightChanged}"> 

    <label for="exam-score">Nota examen:</label>
    <input 
        type="number" 
        min="0"
        max="7" 
        name="exam-score" 
        value="${notebookState.exam.score}"
        step="0.1" 
        @input="${dispatchExamScoreChanged}">
</div>

<p>Nota final: 
    <small id='total-score'>
        ${notebookState.totalScore.toFixed(3)}
    </small>
</p>
`

const generateCalificationRow = (calification, key) => {    
    const weightInputEl = document.createElement('input');
    weightInputEl.setAttribute('type', 'number');
    weightInputEl.setAttribute('min', '0');
    weightInputEl.setAttribute('max', '100');
    weightInputEl.setAttribute('value', calification.weight);
    weightInputEl.addEventListener('input', e => 
        dispatchEvent(new CustomEvent(
            calificationEventTypes.calificationWeightChanged, {
                detail: {
                    key, 
                    value: e.target.value
            }
        })));
    
    const scoreInputEl = document.createElement('input');
    scoreInputEl.setAttribute('type', 'number');
    scoreInputEl.setAttribute('min', '0');
    scoreInputEl.setAttribute('max', '7');
    scoreInputEl.setAttribute('step', '0.1');
    scoreInputEl.setAttribute('value', calification.score);
    scoreInputEl.addEventListener('input', e =>
        dispatchEvent(new CustomEvent(
            calificationEventTypes.calificationScoreChanged, {
                detail: {
                    key, 
                    value: e.target.value
            }
        })));
    
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Eliminar';
    deleteButtonEl.onclick = () => dispatchEvent(new CustomEvent(
        calificationEventTypes.calificationDeleted, 
        { detail: { key } } ));
    
    return [
        weightInputEl,
        scoreInputEl,
        deleteButtonEl,
    ];
}

const calificationEventTypes = {
    calificationWeightChanged: 'calificationWeightChanged',
    calificationScoreChanged: 'calificationScoreChanged',
    calificationDeleted: 'calificationDeleted',
    examWeightChanged: 'examWeightChanged',
    examScoreChanged: 'examScoreChanged',
    calificationAdded: 'calificationAdded'
}

function dispatchExamWeightChanged(event) {
    dispatchEvent(new CustomEvent(
        calificationEventTypes.examWeightChanged,
        { detail: { value: event.target.value } }
    ));
}

function dispatchExamScoreChanged(event) {
    dispatchEvent(new CustomEvent(
        calificationEventTypes.examScoreChanged,
        { detail: { value: event.target.value }}
    ));
}

function dispatchCalificationAdded(event) {
    dispatchEvent(new CustomEvent(calificationEventTypes.calificationAdded));
}

//TODO: move to utils.js or something
/** Returns the detail of a custom event */
function handleCustomEvent(customEvent) {
    // new CustomEvent(type, { details: { ... }})
    return customEvent.detail;
}