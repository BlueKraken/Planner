# TODO:
1. Separar todo list del main script y el markup inicial

# Custom elements:

1. crear una clase que extienda HTMLElement

2. en el constructor:
  * llamar a super(); en el constructor del nuevo elemento
  * crear un htmlElement contenedor y el shadowRoot para el elemento
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const element = document.createElement('div');
  * rellenar el contenedor con la estructura del elemento

