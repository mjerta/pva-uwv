let viewPortWidth;
let transformProperty;
let allButtons;
let button1;
let button2;
let button3;
let buttonPlanB;
let planBPressed;

let distance;
let diagonalDistance;
let angle;

function initialize() {
  allButtons = chooseButton();
  console.log(allButtons[0]);
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
  createLine(
    allButtons[0].offsetLeft + button1.width,
    button1.top + button1.width / 2,
    distance,
    4
  );
  createLine(
    allButtons[1].offsetLeft + button1.width,
    button2.top + button2.width / 2,
    distance,
    4
  );
  createLine(
    allButtons[2].offsetLeft + button1.width,
    button3.top + button3.width / 2,
    distance,
    4
  );
  createLine(
    allButtons[4].offsetLeft + button1.width,
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
  console.log("viewport", viewPortWidth);
  const line = document.createElement("div");
  line.classList.add("line");
  // if (viewPortWidth >= 1440) {
  //   console.log("offset", allButtons[0].offsetLeft + 50);
  //   const calculate = (viewPortWidth - 1440) / 2;
  //   console.log("x ", x);
  //   console.log(calculate);
  //   line.style.left = Math.round(x) - calculate + "px";
  // } else {
  //   line.style.left = x + "px";
  // }
  console.log("x", x);
  line.style.left = Math.floor(x) + "px";

  line.style.top = y + "px";
  line.style.width = width + 2 + "px";
  line.style.height = height + "px";

  if (angle) {
    transformProperty = `rotate(${angle + 3}deg) translate(0px, -3px) scale(0)`;
    line.style.transform = transformProperty;
  }
  document.body.appendChild(line);
}

function activeStep() {
  allButtons.forEach((element) => {
    element.addEventListener("click", () => {
      const getLines = document.querySelectorAll(".line");
      switch (element.getAttribute("data-summary")) {
        case "step-1":
          allButtons.forEach((element) => {
            element.classList.remove("active");
            element.classList.add("not-active");
          });
          getLines.forEach((element) => {
            element.classList.remove("appear");
          });
          getLines[3].style.transform = transformProperty;

          planBPressed = false;
          break;
        case "step-2":
          console.log(planBPressed);
          if (planBPressed) {
            console.log("plan b is pressed");
            const transformString = transformProperty.replace(
              "scale(0)",
              "scale(1)"
            );
            getLines[3].style.transform = transformString;
          } else {
            getLines[0].classList.add("appear");
          }

          break;
        case "step-3":
          getLines[1].classList.add("appear");
          break;
        case "step-4":
          getLines[2].classList.add("appear");
          break;
        case "plan-b":
          // allButtons[0].classList.remove("active");
          // allButtons[0].classList.add("not-active");

          // reset all other buttons
          allButtons.forEach((element) => {
            element.classList.remove("active");
            element.classList.add("not-active");
          });
          getLines.forEach((element) => {
            element.classList.remove("appear");
          });
          getLines[3].style.transform = transformProperty;

          planBPressed = true;
          break;
        default:
          // default case, if none of the above conditions match
          break;
      }
      console.log(element);

      element.classList.add("active");
      element.classList.remove("not-active");
    });
  });
}

initialize();
activeStep();

createLine(
  allButtons[0].offsetLeft + button1.width,
  button1.top + button1.width / 2,
  distance,
  4
);
createLine(
  allButtons[1].offsetLeft + button1.width,
  button2.top + button2.width / 2,
  distance,
  4
);
createLine(
  allButtons[2].offsetLeft + button1.width,
  button3.top + button3.width / 2,
  distance,
  4
);
createLine(
  allButtons[4].offsetLeft + button1.width,
  buttonPlanB.top + buttonPlanB.width / 2,
  diagonalDistance,
  4,
  angle
);
