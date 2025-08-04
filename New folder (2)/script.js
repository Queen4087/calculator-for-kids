const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const numButtons = document.querySelectorAll(".num-btn");
const opButtons = document.querySelectorAll(".op-btn");

let currentInput = "";
let lastInputIsOperator = false;

function updateDisplay() {
  display.textContent = currentInput || "0";
}

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const num = button.getAttribute("data-num");

    // Prevent multiple dots in the current number
    if (num === "." && currentInput.slice(-1) === ".") return;
    if (num === "." && currentInput.includes(".") && !lastInputIsOperator)
      return;

    currentInput += num;
    lastInputIsOperator = false;
    updateDisplay();
  });
});

opButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const op = button.getAttribute("data-op");

    // Avoid two operators in a row
    if (currentInput === "") return;
    if (lastInputIsOperator) {
      currentInput = currentInput.slice(0, -1) + op;
    } else {
      currentInput += op;
      lastInputIsOperator = true;
    }
    updateDisplay();
  });
});

clearBtn.addEventListener("click", () => {
  currentInput = "";
  lastInputIsOperator = false;
  updateDisplay();
});

equalsBtn.addEventListener("click", () => {
  if (currentInput === "") return;

  // If last char is operator, remove it
  if (lastInputIsOperator) currentInput = currentInput.slice(0, -1);

  try {
    // Evaluate safely
    const result = Function(`return ${currentInput}`)();
    currentInput = String(result);
    lastInputIsOperator = false;
    updateDisplay();
  } catch {
    display.textContent = "Oops! Error!";
    currentInput = "";
    lastInputIsOperator = false;
  }
});
