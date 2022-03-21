// console.log("hi");

const categorySelection = document.querySelector(".category-selection");
let budgetUpdate = document.querySelector("#budget-Update-btn");
let weeklyBudget = document.querySelector(".weekly-budget");
let budgetInput = document.querySelector("#budget-input");
let reset = document.querySelector(".btn");
let catogoryBtn = document.querySelector(".cat-btn");
let activityBtn = document.querySelector(".activity-btn");
let foodBtn = document.querySelector(".food-btn");
let itemsContainer = document.querySelector(".items-container");
let categoryList = document.querySelectorAll(".category-list");

let weeklyInput = 0;
let balance = 0;
let totalExpense = 0;

budgetUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);
  weeklyInput = budgetInput.value;

  weeklyBudget.textContent = `Budget Amount: ${weeklyInput}`;
  updateBalance();
});
//console.log(budgetInput.value);
const updateBalance = () => {
  balance = weeklyInput - totalExpense;
  console.log(balance);
};

activityBtn.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
  //document.querySelector("#pid").style.display = "none";
  activityCheckout();
  //console.log(itemsContainer.classList);
});
foodBtn.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
  //document.querySelector("#pid").style.display = "none";
  foodCheckout();
  //console.log(itemsContainer.classList);
});

const activityCheckout = () => {
  let newActivityDiv = document.createElement("div");
  const divImg = document.createElement("img");
  const newTypeInput = document.createElement("input");
  const newTypeLabel = document.createElement("label");
  divImg.setAttribute("src", "assets/img/activity1.png");
  newTypeLabel.setAttribute("id", "activityInputType");
  newTypeLabel.textContent = "Type";
  newTypeInput.setAttribute("type", "number");
  newActivityDiv.append(newTypeLabel);
  newActivityDiv.append(newTypeInput);
  itemsContainer.append(newActivityDiv);
  // console.log(catogoryList);
  // if (categoryList.style.display === "none") {
  //   categoryList.style.display = "block";
  // }
};

const foodCheckout = () => {
  let newFoodDiv = document.createElement("div");
  const newTypeInput = document.createElement("input");
  const newTypeLabel = document.createElement("label");
  newTypeLabel.setAttribute("id", "foodInputType");
  newTypeLabel.textContent = "Type";
  newTypeInput.setAttribute("type", "number");
  newFoodDiv.append(newTypeLabel);
  newFoodDiv.append(newTypeInput);
  itemsContainer.append(newFoodDiv);
};

console.log(categoryList);
reset.addEventListener("click", (e) => {
  if (e.target.classList.contains("cancel-btn")) {
    location.reload();
  }
});
