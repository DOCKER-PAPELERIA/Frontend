// Exportación de la clase ActivarMenuDesplegableYUsuario
export class ActivarMenuDesplegableYUsuario {
    // El constructor toma dos parámetros: el activador y el elemento a mostrar/ocultar
    constructor(activador, claseActivada1) {
        this.activador = activador; // El elemento que activa la acción
        this.claseActivada1 = claseActivada1; // El elemento que se muestra/oculta
    } 

    // Método para manejar el menú desplegable
    menu() {
        // Agrega un event listener al activador para manejar el click
        this.activador.addEventListener("click", () => {
            // Alterna la visibilidad del elemento entre "flex" y "none"
            if (this.claseActivada1.style.display === "flex") {
                this.claseActivada1.style.display = "none";
            } else {
                this.claseActivada1.style.display = "flex";
            }
        });
    }

    // Método para manejar la visibilidad del perfil del usuario
    usuario() {
        // Agrega un event listener al activador para manejar el click
        this.activador.addEventListener("click", () => {
            // Alterna la visibilidad del elemento entre "flex" y "none"
            if (this.claseActivada1.style.display === "flex") {
                this.claseActivada1.style.display = "none";
            } else {
                this.claseActivada1.style.display = "flex";
            }
        });
    }
}
