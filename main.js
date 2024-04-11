import { allContent } from "./assets/allcontent.js";
//
// All general variables needed
let viewPortWidth;
let transformProperty;
let allButtons;
let button1;
let button2;
let button3;
let buttonPlanB;
let distance;
let diagonalDistance;
let angle;

//check object needed to show which content will be showned
let buttonState = {
  planBPressed: false,
  step1Pressed: true,
  step2Pressed: false,
  step3Pressed: false,
  step4Pressed: false,
};

function initialize() {
  allButtons = chooseButton();
  viewPortWidth = window.innerWidth;
  button1 = getPosition(allButtons[0]);
  button2 = getPosition(allButtons[1]);
  button3 = getPosition(allButtons[2]);
  buttonPlanB = getPosition(allButtons[4]);

  distance = getDistance(button1, button2);
  diagonalDistance = getDistance(buttonPlanB, button2);
  angle = getAngleBetweenElements(buttonPlanB, button2);
  createAllLines();
}

function chooseButton() {
  const selectSteps = document.querySelectorAll(`[data-summary]`);
  return selectSteps;
}

function chooseContentElement() {
  const contentElements = document.querySelectorAll("[data-content]");
  return contentElements;
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

function createAllLines() {
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
}

function nextText(content, element) {
  const button = document.querySelector('[data-content="button"]');
  const keys = Object.keys(content);
  let i = 0;
  button.addEventListener("click", () => {
    i++;

    //button changed effect 1/3 2/3 3/3

    button.textContent = `${i + 1}/${keys.length}`;

    console.log(i);
    const key = keys[i];
    const item = content[key];
    console.log(element.getAttribute("data-content"));
    if (element.getAttribute("data-content") === "title") {
      console.log(item.title);
      element.textContent = item.title;
    } else if (element.getAttribute("data-content") === "text") {
      console.log(item.textContent);
      element.innerText = item.textContent;
    }
    if (i === keys.length - 1) {
      i = -1;
    }
  });
}

function createArticle(content) {
  chooseContentElement().forEach((element) => {
    switch (element.getAttribute("data-content")) {
      case "title":
        element.textContent = content.text.text1.title;
        nextText(content.text, element);
        break;
      case "text":
        element.innerText = content.text.text1.textContent;
        nextText(content.text, element);

        break;
      case "description":
        element.textContent = content.image.description;
        break;
      case "image":
        element.style.backgroundImage = `url('./assets/${content.image.url}')`;
        break;
      case "button":
        const keys = Object.keys(content.text);
        console.log(keys.length);

        if (keys.length > 1) {
          element.textContent = `1/${keys.length}`;
        } else {
          element.textContent = "1/1";
        }
        break;
      default:
        break;
    }
  });
}

// createArticle();
function createAllArticles() {
  Object.entries(buttonState).forEach(([key, value]) => {
    if (buttonState.step1Pressed) {
      switch (key) {
        case "step2Pressed":
          if (value) {
            const data = allContent.planA.stepTwo;
            createArticle(data);
          }
          break;
        case "step3Pressed":
          if (value) {
            const data = allContent.planA.stepThree;
            createArticle(data);
          }
          break;
        case "step4Pressed":
          if (value) {
            const data = allContent.planA.stepFour;
            createArticle(data);
          }
          break;
        default:
          // Default case
          const data = allContent.planA.stepOne;
          createArticle(data);
          break;
      }
    } else {
      switch (key) {
        case "step2Pressed":
          if (value) {
            const data = allContent.planB.stepTwo;
            createArticle(data);
          }
          break;
        case "step3Pressed":
          if (value) {
            const data = allContent.planB.stepThree;
            createArticle(data);
          }
          break;
        case "step4Pressed":
          if (value) {
            const data = allContent.planB.stepFour;
            createArticle(data);
          }
          break;
        default:
          // Default case
          const data = allContent.planB.stepOne;
          createArticle(data);
          break;
      }
    }
  });
}

createAllArticles();
function activeStep() {
  allButtons.forEach((element) => {
    element.addEventListener("click", () => {
      const getLines = document.querySelectorAll(".line");
      switch (element.getAttribute("data-summary")) {
        case "step-1":
          Object.entries(buttonState).forEach(([key, value]) => {
            if (key === "step1Pressed") {
              buttonState[key] = true;
            } else {
              buttonState[key] = false;
            }
          });
          console.log("step-1");
          element.classList.remove("not-active");
          element.classList.add("active");

          //reset all other buttons
          allButtons.forEach((element) => {
            if (element.getAttribute("data-summary") !== "step-1") {
              element.classList.remove("active");
              element.classList.add("not-active");
            }
          });
          //reset all lines
          getLines.forEach((element) => {
            element.classList.remove("appear");
          });
          getLines[3].style.transform = transformProperty;
          break;
        case "step-2":
          buttonState["step2Pressed"] = true;
          element.classList.remove("not-active");
          element.classList.add("active");
          console.log("step-2");
          if (buttonState.planBPressed) {
            Object.entries(buttonState).forEach(([key, value]) => {
              if (key !== "step2Pressed" && key !== "planBPressed") {
                buttonState[key] = false;
              }
            });

            const transformString = transformProperty.replace(
              "scale(0)",
              "scale(1)"
            );
            getLines[0].classList.remove("appear");
            getLines[3].style.transform = transformString;
            allButtons;
          } else {
            Object.entries(buttonState).forEach(([key, value]) => {
              if (key !== "step2Pressed" && key !== "step1Pressed") {
                buttonState[key] = false;
              }
            });
            getLines[0].classList.add("appear");
          }
          //removes buttons
          allButtons[2].classList.remove("active");
          allButtons[2].classList.add("not-active");
          allButtons[3].classList.remove("active");
          allButtons[3].classList.add("not-active");
          //removes lines
          getLines[1].classList.remove("appear");
          getLines[2].classList.remove("appear");

          break;
        case "step-3":
          buttonState["step3Pressed"] = true;

          console.log("step-3");
          element.classList.remove("not-active");
          element.classList.add("active");
          getLines[1].classList.add("appear");
          //add previous buttons
          allButtons[1].classList.remove("not-active");
          allButtons[1].classList.add("active");

          //add previous lines

          if (buttonState.planBPressed) {
            Object.entries(buttonState).forEach(([key, value]) => {
              if (key !== "step3Pressed" && key !== "planBPressed") {
                buttonState[key] = false;
              }
            });
            const transformString = transformProperty.replace(
              "scale(0)",
              "scale(1)"
            );
            getLines[3].style.transform = transformString;
          } else {
            Object.entries(buttonState).forEach(([key, value]) => {
              if (key !== "step3Pressed" && key !== "step1Pressed") {
                buttonState[key] = false;
              }
            });
            getLines[0].classList.add("appear");
          }

          //removes buttons
          allButtons[3].classList.remove("active");
          allButtons[3].classList.add("not-active");
          //removes lines
          getLines[2].classList.remove("appear");

          break;
        case "step-4":
          buttonState["step4Pressed"] = true;

          console.log("step-4");
          element.classList.remove("not-active");
          element.classList.add("active");
          //add previous buttons
          allButtons[1].classList.remove("not-active");
          allButtons[1].classList.add("active");
          allButtons[2].classList.remove("not-active");
          allButtons[2].classList.add("active");
          //add previous lines
          getLines[2].classList.add("appear");
          getLines[1].classList.add("appear");

          if (buttonState.planBPressed) {
            Object.entries(buttonState).forEach(([key, value]) => {
              if (key !== "step4Pressed" && key !== "planBPressed") {
                buttonState[key] = false;
              }
            });
            const transformString = transformProperty.replace(
              "scale(0)",
              "scale(1)"
            );
            getLines[3].style.transform = transformString;
          } else {
            Object.entries(buttonState).forEach(([key, value]) => {
              if (key !== "step4Pressed" && key !== "step1Pressed") {
                buttonState[key] = false;
              }
            });
            getLines[0].classList.add("appear");
          }

          break;
        case "plan-b":
          Object.entries(buttonState).forEach(([key, value]) => {
            if (key === "planBPressed") {
              buttonState[key] = true;
            } else {
              buttonState[key] = false;
            }
          });
          console.log("plan-b");
          element.classList.remove("not-active");
          element.classList.add("active");

          //reset all other buttons
          allButtons.forEach((element) => {
            if (element.getAttribute("data-summary") !== "plan-b") {
              element.classList.remove("active");
              element.classList.add("not-active");
            }
          });
          //reset all lines
          getLines.forEach((element) => {
            element.classList.remove("appear");
          });
          getLines[3].style.transform = transformProperty;

          buttonState.planBPressed = true;
          break;
        default:
          // default case, if none of the above conditions match
          break;
      }
      createAllArticles();
    });
  });
}

window.addEventListener("resize", () => {
  // set all values of array to false
  Object.entries(buttonState).forEach(([key, value]) => {
    if (key !== "step1Pressed") {
      buttonState[key] = false;
    } else {
      buttonState[key] = true;
    }
  });

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
  // Reinitialize variables and calculations
  initialize();
  activeStep();
});

initialize();
activeStep();
