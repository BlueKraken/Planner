class Calification {
  constructor(weight = 0, score = 0) {
    this.weight = weight;
    this.score = score;
    /** Calculates and return the weightedScore */
  }
  get weightedScore() { return this.weight * this.score / 100; }
}

const state = {
  califications: [
    new Calification()
  ],
  presentation: new Calification(),
  exam: new Calification(),
  totalScore: 0
}

export const initCalificationsGrid = () => {
  updatePresentationScore();
  renderCalifications();
}

export const onAddCalificationClick = () => {
  const lenght = state.califications.push(new Calification());
  renderCalificationRow(newCalification, lenght - 1);
}

export const setExamScore = value => {
  state.exam.score = value * 1;
  onExamChange();
}

export const setExamWeight = value => {
  state.exam.weight = value * 1;
  state.presentation.weight = 100 - (value * 1);
  onExamChange();
}

const onExamChange = () => {  
  updateTotalScore();
}

const updateTotalScore = () => {
  state.totalScore = state.presentation.weightedScore
    + state.exam.weightedScore;
  
  renderTotalScore();
}

const renderTotalScore = () => {
  document.getElementById('total-score').innerText =
  state.totalScore.toFixed(3);
}

const onCalificationsChange = () => {
  updatePresentationScore();
  updateTotalScore();
}

const updatePresentationScore = () => {
  state.presentation.score = state.califications
  .map(calification => calification.weightedScore)
  .reduce((totalPoints, currentPoints) => totalPoints += currentPoints, 0);
  
  renderPresentationScore();
}

const renderPresentationScore = () => {
  document.getElementById('presentation-score').innerText = 
  state.presentation.score.toFixed(3);
}

const getCalificationGridContainerRef = () => 
document.querySelector('#califications-container .grid-container');

const htmlCalificationRol = (calification, key) => {
  // para usar efectivamente este patrón se debe implementar
  // o funciones que manejen la calificación, o métodos de la misma.
  // Puedo ver las calificaciones como objetos con comportamiento u
  // estructuras de datos. Eso determinará la orientación de la programación
  // (funcional u OO).
  return `
  <input class="grid-item" type="text" min="0" value="${calification}"
  `
}

const renderCalificationRow = (calification, key) => {
  const weightInputEl = document.createElement('input');
  weightInputEl.classList.add('grid-item');
  weightInputEl.setAttribute('type', 'number');
  weightInputEl.setAttribute('min', '0');  
  weightInputEl.setAttribute('value', calification.weight);
  weightInputEl.addEventListener('input', _ => {
    state.califications[key].weight = 
    weightInputEl.value * 1;
    onCalificationsChange();
  });
  
  const scoreInputEl = document.createElement('input');
  scoreInputEl.classList.add('grid-item');
  scoreInputEl.setAttribute('type', 'number');
  scoreInputEl.setAttribute('min', '0');
  scoreInputEl.setAttribute('value', calification.score);
  scoreInputEl.addEventListener('input', _ => {
    state.califications[key].score = 
    scoreInputEl.value * 1;
    onCalificationsChange();
  });
  
  const deleteButtonEl = document.createElement('button');
  deleteButtonEl.classList.add('grid-item');
  deleteButtonEl.textContent = 'Eliminar';
  deleteButtonEl.onclick = _ => {
    state.califications.splice(key, 1);
    onCalificationsChange();
    renderCalifications();
  }
  
  const containerRef = getCalificationGridContainerRef();
  containerRef.appendChild(weightInputEl);
  containerRef.appendChild(scoreInputEl);
  containerRef.appendChild(deleteButtonEl);
}

const renderCalifications = () => {
  const containerRef = getCalificationGridContainerRef();
  
  containerRef.querySelectorAll(':not(.grid-header)').forEach(
    element => element.remove());
    
    state.califications.forEach((calification, index) => {
      renderCalificationRow(calification, index);
    });
    
    renderTotalScore();
  }
  
  