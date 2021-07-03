const startOfRange = document.querySelector("#from");
const endOfRange = document.querySelector("#to");
const searchButton = document.querySelector("button");
const resualtArea = document.querySelector(".output");

function isArraysCompare(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  for (i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function getDividers(number) {
  //get list of number dividers
  let dividersList = [];

  for (let index = 1; index < number; index++) {
    if (number % index === 0) {
      dividersList.push(index);
    }
  }
  return dividersList;
}

function sumOfDividers(number) {
  // get dividers sum

  let divsList = getDividers(number);
  let sum = 0;

  divsList.forEach((item) => {
    sum += item;
  });
  return sum;
}

function getPair(number) {
  let firstSum = sumOfDividers(number);
  let secondDividers = sumOfDividers(firstSum);

  if (firstSum < number) {
    return;
  } else if (secondDividers === number) {
    return [number, firstSum];
  }

  return;
}

function isPairExists(source, pair) {
  pair.reverse();

  if (isArraysCompare(source, pair)) {
    return true;
  }
  return false;
}

function getFriendlyNumbers(start, end) {
  let pairsList = [];

  for (let index = start; index < end; index++) {
    if (getPair(index) !== undefined) {
      pairsList.push(getPair(index));
    }
  }
  return pairsList;
}

searchButton.addEventListener("click", () => {
  let start = Math.round(Number(startOfRange.value));
  let end = Math.round(Number(endOfRange.value));

  if (isNaN(start) || isNaN(end)) {
    alert("Incorrect value");
  } else if (start >= end) {
    alert("Start of range must be less than end of range");
  } else if (start <= 0 || end <= 0) {
    alert("Values must be more than zero");
  } else {
    let result = getFriendlyNumbers(start, end);

    resualtArea.innerHTML = `${result.join("<br>")}`;
  }
});