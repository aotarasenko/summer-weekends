import ATM from "./ATM.js";

const input = document.querySelector("input");
const getMoneyBtn = document.querySelector("button");

let atm = new ATM();

function getMoney(value) {
  atm.setUserValue(value);
  atm.getMoney();
  atm.banknotesForOutput.sort((a, b) => b - a);
  console.log(atm.banknotesForOutput);

  atm.endSession();
  console.log(atm.maxStoreValue);
}

getMoneyBtn.addEventListener("click", () => {
  let userValue = +input.value;
  if (isNaN(userValue) || userValue < 1) {
    alert("Incorrect value");
    return;
  }

  if (userValue % 1 > 0) {
    let isUserWantContinue = confirm("ATM don`t give a penny, continue?");
    if (isUserWantContinue) {
      getMoney(userValue);
    } else {
      return;
    }
  }

  getMoney(userValue);
});
