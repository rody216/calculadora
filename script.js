document.addEventListener("DOMContentLoaded", () => {
    const operationDisplay = document.getElementById("operation");
    const resultDisplay = document.getElementById("result");
    let operacion = "";
    let resultado = "";

    function actualizarPantalla() {
        operationDisplay.innerText = operacion;
        resultDisplay.innerText = resultado;
    }

    function agregar(valor) {
        if (valor === "." && (operacion === "" || operacion.endsWith(".") || /[+\-*/]$/.test(operacion))) {
            return;
        }
        if (/[+\-*/]/.test(valor) && /[+\-*/]$/.test(operacion)) {
            return;
        }
        if (operacion === "" && /[+\-*/]/.test(valor)) {
            return;
        }
        operacion += valor;
        actualizarPantalla();
    }

    function limpiar() {
        operacion = "";
        resultado = "";
        actualizarPantalla();
    }

    function borrar() {
        operacion = operacion.slice(0, -1);
        actualizarPantalla();
    }

    function calcular() {
        try {
            if (/^[+\-*/]/.test(operacion) || /[+\-*/]$/.test(operacion) || /[+\-*/]{2,}/.test(operacion)) {
                throw new Error("Invalid operation");
            }
            resultado = eval(operacion).toString();
            actualizarPantalla();
        } catch {
            operationDisplay.innerText = "Error";
            operacion = "";
            resultado = "";
        }
    }

    document.addEventListener("keydown", (event) => {
        if (/[0-9.+\-*/]/.test(event.key)) {
            agregar(event.key);
            highlightButton(event.key);
        } else if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission if inside a form
            calcular();
            highlightButton('=');
        } else if (event.key === "Backspace") {
            borrar();
            highlightButton('C');
        } else if (event.key === "Escape" || event.key === "Delete") {
            limpiar();
            highlightButton('C');
        }
    });

    function highlightButton(key) {
        const buttonMap = {
            '1': "1",
            '2': "2",
            '3': "3",
            '4': "4",
            '5': "5",
            '6': "6",
            '7': "7",
            '8': "8",
            '9': "9",
            '0': "0",
            '+': "+",
            '-': "-",
            '*': "*",
            '/': "/",
            '=': "=",
            'Enter': "=",
            'C': "C",
            'Backspace': "C",
            'Escape': "C",
            'Delete': "C"
        };
        
        const buttonContent = buttonMap[key];
        const buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
            if (button.innerText === buttonContent) {
                button.classList.add('active');
                setTimeout(() => {
                    button.classList.remove('active');
                }, 200);
            }
        });
    }

    window.agregar = agregar;
    window.limpiar = limpiar;
    window.borrar = borrar;
    window.calcular = calcular;
});