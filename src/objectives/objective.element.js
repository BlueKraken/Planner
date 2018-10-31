//TODO: los componentes no pueden recibir desde los atributos un objeto,
//solo primitivos, por lo que debería buscar opciones para hacer el markup más ameno?
//y si cad acomponente es sólo una función?
export class ObjectiveElement extends HTMLElement {

  get goals() {
    if(!this.goals) {
      this.goals = [];
    }
    return this.goals;
  }

  constructor(objective) {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const element = document.createElement('div');

    this.objective = objective;

    element.innerHTML = `
      <div>${this.objective.name}</div>
    `;
    element.onclick = this.onclick;

    shadowRoot.appendChild(element);
  }

  attributeChangedCallback() {
    console.log('element attributes changed.');
  }

  onclick() {
    console.log('clicked');
    console.log(this);
    this.objective = this.objective.changeName('mi nombre cambió');
    console.log(this.objective);
  }
}

customElements.define('objetivo-list-item', ObjectiveElement);