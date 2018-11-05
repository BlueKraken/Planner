# TODO:

1. Separar todo list del main script y el markup inicial

## Custom elements

1. crear una clase que extienda HTMLElement

2. en el constructor:

* llamar a super(); en el constructor del nuevo elemento
* crear un htmlElement contenedor y el shadowRoot para el elemento

```javascript
const shadowRoot = this.attachShadow({ mode: 'open' });
const element = document.createElement('div');
```

* rellenar el contenedor con la estructura del elemento

## function.bind

Al exportar sólo una función de un objeto, o enviar su referencia, hace que su contexto de ejecución cambie de su contexto de declaración su contexto de invocación (pierde/cambia 'this'). Por lo que en estos casos se debe *bindear* la functión a su contexto, definiendo así el 'this' correcto y de manera permanente.

Ejemplo:

```javascript
const objeto = { a:1, printA: _ => console.log(this.a)}

export printA = objeto.printA.bind(objeto);
```
