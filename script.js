const popUp = document.querySelector(".pop-up");
const incomeBox = document.querySelector(".income-box");
const expenseBox = document.querySelector(".expense-box");
const balanceBox = document.querySelector(".balance-box");
const incomeValue = document.querySelector(".income-value");
const expenseValue = document.querySelector(".expense-value");
const balanceValue = document.querySelector(".balance-value");
const typeOptions = document.querySelector(".type-options");
const typeIncomeBtn = document.getElementById("income");
const typeExpenseBtn = document.getElementById("expense");
const descriptionInput = document.querySelector(".description");
const amountInput = document.querySelector(".amount");
const dateInput = document.querySelector(".date");
const chooseCategory = document.getElementById("select-category");
const addBtn = document.querySelector(".addbtn");
const allTransactionDropdown = document.getElementById("select-transaction");
const transactionCategory = document.getElementById("select-category-transaction");
const transactionDetails = document.querySelector(".lower");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => e.preventDefault());

let transactionType = "income"; // default

// ✅ Toggle between income and expense button
typeIncomeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    transactionType = "income";
    typeIncomeBtn.classList.add("active");
    typeExpenseBtn.classList.remove("active");
});

typeExpenseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    transactionType = "expense";
    typeExpenseBtn.classList.add("active");
    typeIncomeBtn.classList.remove("active");
});

// ✅ Toast Notification
function toastNotification() {
    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = "✅ Transaction added";
    popUp.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1000);
}

let totalIncome = 0;
let totalExpense = 0;

// ✅ Transaction Details Function
function transactionDetailsfunc() {
    const descValue = descriptionInput.value.trim();
    // Ensure amount is a number, defaulting to 0 if input is invalid
    const amountValue = parseFloat(amountInput.value) || 0; 
    const dateValue = dateInput.value;
    const categoryValue = chooseCategory.value;

    // Validation
    if (!descValue || amountValue <= 0 || !dateValue) {
        alert("Please enter a description, a valid amount greater than 0, and a date!");
        return;
    }

    // Create card and insert transaction details
    let card = document.createElement("div");
    card.classList.add("transaction-card");

   
    card.innerHTML = `
        <h4 class="${transactionType}">
            Rs.${amountValue.toFixed(2)} 
            <span class="type-text">(${transactionType === "income" ? "+ Income" : "- Expense"})</span>
        </h4>
        <p>${descValue} | ${categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1)}</p>
        <small>${dateValue}</small>
    `;

    // Apply color ONLY to the card's border and general background
    card.style.borderLeft = transactionType === "income" ? "4px solid green" : "4px solid red";
    card.style.backgroundColor = transactionType === "income" ? "#f0fff0" : "#fff0f0"; // Lighter shades
    transactionDetails.prepend(card); // Use prepend to show the latest transaction first

    // Update totals
    if (transactionType === "income") {
        totalIncome += amountValue;
    } else {
        totalExpense += amountValue;
    }

    const balance = totalIncome - totalExpense;

    // Update UI
    incomeValue.textContent = `Rs.${totalIncome.toFixed(2)}`;
    expenseValue.textContent = `Rs.${totalExpense.toFixed(2)}`;
    balanceValue.textContent = `Rs.${balance.toFixed(2)}`;

    // Reset fields
    descriptionInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
   // Reset the category value back to the default "general"
    chooseCategory.value = "general";

    toastNotification();
}

// ✅ Add transaction
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    transactionDetailsfunc();
});
