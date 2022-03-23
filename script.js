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

let weeklyInput = 0;
let balance = 0;
let totalExpense = 0;
let expenses = [];

form.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);
  weeklyInput = budgetInput.value;

  weeklyBudget.textContent = `Budget Amount: ${weeklyInput}`;
  weekInpt.reset();
  updateBalance();
});

document.querySelector("#event-List").addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    e.preventDefault();
    //document.querySelector("#pid").style.display = "none";

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
  newTypeInput.setAttribute("value", "0");

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
  nameInput = document.querySelector(".name-input");
  amountInput = document.querySelector(".amount-input");
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
    document.querySelector(".alert").style.marginTop = "20px";
    document.querySelector(".alert").style.marginLeft = "60px";
    document.querySelector(".alert").style.fontSize = "28px";

    document.querySelector(".alert").textContent = `Alert:  Insufficient Funds`;
    // document.querySelector("#pid").style.display = "none";
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
    document.querySelector(".act-Expense").innerText = "$" + totalExpense;
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
