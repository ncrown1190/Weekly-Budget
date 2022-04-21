//
let form = document.querySelector("#form");
let budgetUpdate = document.querySelector("#budget-Update-btn");
let weeklyBudget = document.querySelector(".weekly-budget");
let budgetInput = document.querySelector("#budget-input");
let weekInpt = document.querySelector(".weekInput");
let itemsContainer = document.querySelector(".items-container");
let remainingBalance = document.querySelector(".remaing-balance");
let totalExpenses = document.querySelector("#total-expenses");
let reset = document.querySelector(".btn");
//let expenseColor = document.querySelector(".expence-input");

let weeklyInput = 0;
let balance = 0;
let totalExpense = 0;
let totalActivity = 0;
let totalFood = 0;
let totalClothing = 0;
let totalBills = 0;
let totalOthers = 0;

let expenses = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
  weeklyInput = budgetInput.value;

  weeklyBudget.textContent = `Budget Amount: $${weeklyInput}`;
  weekInpt.reset();
  updateBalance();
});

document.querySelector("#event-List").addEventListener("click", (e) => {
  //HIDE EVERYTHING
  document.querySelectorAll(".view2").forEach((view2) => {
    view2.classList.add("hidden");
  });
  //SHOW ONE
  if (e.target.localName === "a") {
    e.preventDefault();
    checkout(e);
  }
});

const checkout = (event) => {
  let newDiv = document.createElement("div");
  const divImg = document.createElement("img");
  const newTypeInput = document.createElement("input");
  const newTypeText = document.createElement("input");
  newDiv.setAttribute("class", "view2");
  newTypeText.setAttribute("type", "text");
  newTypeText.setAttribute("class", "name-input");
  newTypeText.setAttribute("placeholder", "item-name");

  newTypeInput.setAttribute("type", "number");
  newTypeInput.setAttribute("class", "amount-input");
  newTypeInput.setAttribute("min", "0");
  newTypeInput.setAttribute("placeholder", "0");

  console.log(event.target.innerText);
  if (event.target.innerText === "Activities") {
    divImg.setAttribute("src", "assets/img/entertainment1.png");

    //document.querySelector(".activity-btn").classList.toggle("cat-btn");
  } else if (event.target.innerText === "Food") {
    divImg.setAttribute("src", "assets/img/food1.png");
  } else if (event.target.innerText === "Clothing") {
    divImg.setAttribute("src", "assets/img/clothing4.png");
  } else if (event.target.innerText === "Bills") {
    divImg.setAttribute("src", "assets/img/bill1.png");
  } else {
    divImg.setAttribute("src", "assets/img/prr.png");
  }
  newDiv.append(divImg);
  newDiv.append(newTypeText);
  newDiv.append(newTypeInput);
  itemsContainer.append(newDiv);
  console.log(event.target);
};
budgetUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  //nameInput = document.querySelector(".name-input");

  //filter out the hidden inputs
  nameInput = [...document.querySelectorAll(".name-input")].filter(function (
    input
  ) {
    return ![...input.parentElement.classList].includes("hidden");
  })[0];

  //validate text input
  allLetters(nameInput);

  //amountInput = document.querySelector(".amount-input");
  amountInput = [...document.querySelectorAll(".amount-input")].filter(
    function (input) {
      return ![...input.parentElement.classList].includes("hidden");
    }
  )[0];

  console.log({ nameInput });
  let expense = {
    name: nameInput.value,
    amount: amountInput.value,
  };

  let newExpense = document.createElement("p");
  newExpense.setAttribute("class", "listItems");
  newExpense.textContent = `${expense.name}: $${expense.amount}`;
  itemsContainer.append(newExpense);
  let expenseAmount = parseInt(expense.amount);
  expenses.push(expenseAmount);
  updateExpenseTotal();

  // addExpenses();
});
const updateBalance = () => {
  balance = weeklyInput - totalExpense;
  console.log(balance);
  remainingBalance.innerText = "$" + balance;
  if (balance < 0) {
    remainingBalance.classList.remove("green");
    remainingBalance.classList.add("red");
    document.querySelector(".alert").style.display = "block";
    document.querySelector(".alert").style.color = "red";
    document.querySelector(".alert").style.marginTop = "15px";
    document.querySelector(".alert").style.marginLeft = "35%";
    document.querySelector(".alert").style.fontSize = "28px";

    document.querySelector(".alert").textContent = `Alert:  Insufficient Funds`;
    //to disable "mouse click"
    //document.querySelector("#id").style.pointEvents = "none";

    budgetUpdate.style.pointerEvents = "none";
    //to re-enable "click"
    //document.querySelector("#id"),style.pointerEvents ="auto";
    //
  } else {
    remainingBalance.classList.remove("red");
    remainingBalance.classList.add("green");
  }
};
console.log(updateBalance());
const updateExpenseTotal = () => {
  totalExpense = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalExpense += expenses[i];
    //console.log(expenses);
    //document.querySelector(".act-Expense").innerText = "$" + totalExpense;
  }
  totalExpenses.textContent = `Total Expenses: $${totalExpense}`;
  //console.log(totalExpense);
  updateBalance();
};
updateExpenseTotal();

reset.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("cancel-btn")) {
    location.reload();
  }
});

//update the category total
budgetUpdate.addEventListener("click", (e) => {
  let visibleIcon = [...document.querySelectorAll(".view2 img")].filter(
    function (img) {
      return ![...img.parentElement.classList].includes("hidden");
    }
  )[0].src;
  console.log(visibleIcon);
  // get the price amount
  let priceAmount = [...document.querySelectorAll(".amount-input")].filter(
    function (input) {
      return ![...input.parentElement.classList].includes("hidden");
    }
  )[0].value;
  console.log({ priceAmount });
  //find out icon which is displyed

  //if this is food icon then
  if (visibleIcon.includes("food")) {
    //console.log("add to the food");
    totalFood += Number(priceAmount);
    document.querySelector(".food-Expense").innerText = `$${totalFood}`;
  }
  //then category total add to food
  // if this is the activity icon
  if (visibleIcon.includes("entertainment1")) {
    totalActivity += Number(priceAmount);
    // console.log(totalActivity);
    document.querySelector(".act-Expense").innerText = `$${totalActivity}`;
    //console.log("add to the activity");
  }
  //then category total add to activity
  //if this is the other icon food

  //if this is the other icon clothing
  if (visibleIcon.includes("clothing")) {
    //console.log("add to the clothing");
    totalClothing += Number(priceAmount);
    // console.log(totalActivity);

    document.querySelector(".clothing-Expense").innerText = `$${totalClothing}`;
  }
  //if this is the other icon bill
  if (visibleIcon.includes("bill1")) {
    //console.log("add to the bills");
    totalBills += Number(priceAmount);
    // console.log(totalActivity);
    document.querySelector(".bills-Expense").innerText = `$${totalBills}`;
  }
  //if this is the other icon other
  if (visibleIcon.includes("prr")) {
    //console.log("add to the others");
    totalOthers += Number(priceAmount);
    // console.log(totalActivity);
    document.querySelector(".other-expense").innerText = `$${totalOthers}`;
  }
  console.log("update");
});

//validation for letters
function allLetters(nameInput) {
  let letters = /^[A-Za-z]+$/;
  if (nameInput.value.match(letters)) {
    return true;
  } else {
    alert("Please insert alphabets only");
    return false;
  }
}

// function allnumeric() {
//   let numbers = /^[0-9]+$/;
//   if (amountInput.value.match(numbers)) {
//     return true;
//   } else {
//     alert("please insert numbers only");
//     return false;
//   }
// }
