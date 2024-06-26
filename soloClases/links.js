// link.js
export class Link {
    constructor(direccion, selector) {
        this.direccion = direccion;
        this.selector = selector;
    }

    redireccionar() {
        const elementSelector = document.querySelector(this.selector);
        if (elementSelector) {
            elementSelector.addEventListener("click", () => {
                window.location.href = this.direccion;
            });
        } else {
            console.error(`No se encontró el elemento con el selector: ${elementSelector}`);
        }
    }
}
