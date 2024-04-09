let viewPortWidth;
const allButtons = chooseButton();
let button1;
let button2;
let button3;
let buttonPlanB;

let distance;
let diagonalDistance;
let angle;

function initialize() {
  console.log(allButtons[0].offsetLeft + 50);

  viewPortWidth = window.innerWidth;
  button1 = getPosition(allButtons[0]);
  button2 = getPosition(allButtons[1]);
  button3 = getPosition(allButtons[2]);
  buttonPlanB = getPosition(allButtons[4]);

  distance = getDistance(button1, button2);
  diagonalDistance = getDistance(buttonPlanB, button2);
  angle = getAngleBetweenElements(buttonPlanB, button2);
}

window.addEventListener("resize", () => {
  // Reinitialize variables and calculations
  initialize();

  // Remove existing lines
  allButtons.forEach((element) => {
    if (element.getAttribute("data-summary") !== "step-1") {
      element.classList.remove("active");
      element.classList.add("not-active");
    }
    // else if (element.getAttribute("data-summary") !== "plan-b") {
    //   element.classList.remove("active");
    //   element.classList.add("not-active");
    // }
  });
  document.querySelectorAll(".line").forEach((line) => {
    line.remove();
  });

  // Redraw lines
  createLine(button1.right, button1.top + button1.width / 2, distance, 4);
  createLine(button2.right, button2.top + button2.width / 2, distance, 4);
  createLine(button3.right, button3.top + button3.width / 2, distance, 4);
  createLine(
    buttonPlanB.right,
    buttonPlanB.top + buttonPlanB.width / 2,
    diagonalDistance,
    4,
    angle
  );
});

function chooseButton() {
  const selectSteps = document.querySelectorAll(`[data-summary]`);
  return selectSteps;
}

function getPosition(element) {
  return element.getBoundingClientRect();
}

function getDistance(element1, element2) {
  if (element1.top !== element2.top) {
    const deltaX = element2.left - element1.left;
    const deltaY = element2.top - element1.top;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  } else {
    const distance = element2.left - element1.right;
    return distance;
  }
}

function getAngleBetweenElements(element1, element2) {
  const deltaX = element2.left - element1.right;
  const deltaY = element2.top - element1.top;

  // Calculate the angle in radians
  const angleRadians = Math.atan2(deltaY, deltaX);

  // Convert radians to degrees
  const angleDegrees = angleRadians * (180 / Math.PI);

  return angleDegrees;
}

function createLine(x, y, width, height, angle) {
  console.log(viewPortWidth);
  const line = document.createElement("div");
  line.classList.add("line");
  if (viewPortWidth >= 1440) {
    const calculate = (viewPortWidth - 1440) / 2;
    console.log("x ", x);
    console.log(calculate);
    line.style.left = Math.round(x) - calculate + 7 + "px";
  } else {
    line.style.left = x + "px";
  }
  line.style.top = y + "px";
  line.style.width = width + "px";
  line.style.height = height + "px";

  if (angle) {
    line.style.transform = `rotate(${
      angle + 3
    }deg) translate(0px, -3px) scale(0)`;
  }
  document.body.appendChild(line);
}

function activeStep() {
  allButtons.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.getAttribute("data-summary") === "step-2") {
        document.querySelectorAll(".line")[0].classList.add("appear");
      } else if (element.getAttribute("data-summary") === "step-3") {
        document.querySelectorAll(".line")[1].classList.add("appear");
      } else if (element.getAttribute("data-summary") === "step-4") {
        document.querySelectorAll(".line")[2].classList.add("appear");
      }
      element.classList.add("active");
      element.classList.remove("not-active");
    });
  });
}

initialize();
activeStep();

createLine(button1.right, button1.top + button1.width / 2, distance, 4);
createLine(button2.right, button2.top + button2.width / 2, distance, 4);
createLine(button3.right, button3.top + button3.width / 2, distance, 4);
createLine(
  buttonPlanB.right,
  buttonPlanB.top + buttonPlanB.width / 2,
  diagonalDistance,
  4,
  angle
);
