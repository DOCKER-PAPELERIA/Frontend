// link.js
export class Link {
    constructor(direccion, selector) {
        this.direccion = direccion;
        this.selector = selector;
    }

    redireccionar() {
        const elements = document.querySelectorAll(`${this.selector}`);

        elements.forEach(element => {
            element.addEventListener("click", () => {
                window.location.href = this.direccion;
            });
        });

        if (elements.length === 0) {
            console.error(`No se encontraron elementos con el selector: ${this.selector}`);
        }
    }
}