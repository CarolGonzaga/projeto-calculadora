"use strict";
// Variável para armazenar os elementos de exibição (display e mini-display) na interface.
const display = document.getElementById("display");
/*
  Variáveis para rastrear:
  - entrada atual = currentInput
  - operador atual = currentOperator
  - primeiro operando = firstOperand
*/
let currentInput = "";
let currentOperator = null;
let firstOperand = null;
// Função para atualizar o display com a entrada atual.
function updateDisplay() {
    display.textContent = currentInput || "0";
}
// Função para adicionar um valor à entrada atual.
function appendToInput(value) {
    // Se a última operação foi uma operação de igual, começar uma nova expressão.
    if (currentOperator === "=") {
        currentInput = value;
        currentOperator = null;
    }
    else {
        currentInput += value;
    }
    updateDisplay();
}
// Manipula o clique em botões numéricos.
function handleNumberClick(value) {
    appendToInput(value);
}
// Manipula o clique em botões de operadores.
function handleOperatorClick(operator) {
    // Atualiza a última operação realizada.
    currentOperator = operator;
    if (currentOperator !== "=" && firstOperand !== null) {
        calculate();
    }
    if (currentOperator !== "=") {
        firstOperand = +currentInput;
        currentInput = "";
    }
}
// Realiza cálculos com base no operador atual e nos operandos.
function calculate() {
    if (currentOperator !== null && firstOperand !== null) {
        const secondOperand = +currentInput;
        switch (currentOperator) {
            case "+":
                currentInput = (firstOperand + secondOperand).toString();
                break;
            case "-":
                currentInput = (firstOperand - secondOperand).toString();
                break;
            case "*":
                currentInput = (firstOperand * secondOperand).toString();
                break;
            case "/":
                currentInput = (firstOperand / secondOperand).toString();
                break;
        }
        firstOperand = null;
        updateDisplay();
    }
}
// Limpa toda a entrada e reinicia o cálculo.
function handleClearClick() {
    currentInput = "";
    currentOperator = null;
    firstOperand = null;
    updateDisplay();
}
// Remove o último caractere da entrada.
function handleClearOneClick() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}
// Manipula o clique no botão de igual (=).
function handleEqualsClick() {
    calculate();
    currentOperator = "=";
}
// Adiciona event listeners para os botões quando a página é carregada.
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.textContent || "";
            if (!isNaN(+value) || value === ".") {
                handleNumberClick(value);
            }
            else if (value === "=") {
                handleEqualsClick();
            }
            else if (value === "C") {
                handleClearClick();
            }
            else {
                handleOperatorClick(value);
            }
        });
    });
    const btnClearOne = document.getElementById("btn-clearOne");
    if (btnClearOne) {
        btnClearOne.addEventListener("click", () => {
            handleClearOneClick();
        });
    }
    else {
        console.error("Botão btn-clearOne não encontrado!");
    }
});
