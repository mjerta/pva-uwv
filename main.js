const allButtons = chooseButton();
console.log(allButtons);
const detailsRectFirst = getPosition(allButtons[0]);
const detailsRectSecond = getPosition(allButtons[1]);
const detailsRectTirth = getPosition(allButtons[2]);
const detailsRectPlanB = getPosition(allButtons[4]);
let distance = getDistance();

console.log(distance);

function chooseButton() {
  const selectSteps = document.querySelectorAll(`[data-summary]`);
  return selectSteps;
}

function activeStep() {
  allButtons.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.add("active");
      element.classList.remove("not-active");
    });
  });
}

function getPosition(element) {
  return element.getBoundingClientRect();
}

function getDistance() {
  const distance = detailsRectSecond.left - detailsRectFirst.right;
  return distance;
}

function createLine(x, y, width, height) {
  const line = document.createElement("div");
  line.classList.add("line");
  line.style.left = x + "px";
  line.style.top = y + "px";
  line.style.width = width + "px";
  line.style.height = height + "px";

  document.body.appendChild(line);
}
activeStep();

createLine(
  detailsRectFirst.right,
  detailsRectFirst.top + detailsRectFirst.width / 2,
  distance,
  4
);
createLine(
  detailsRectSecond.right,
  detailsRectSecond.top + detailsRectSecond.width / 2,
  distance,
  4
);
createLine(
  detailsRectTirth.right,
  detailsRectTirth.top + detailsRectTirth.width / 2,
  distance,
  4
);
createLine(
  detailsRectPlanB.right,
  detailsRectPlanB.top + detailsRectPlanB.width / 2,
  distance,
  4
);
