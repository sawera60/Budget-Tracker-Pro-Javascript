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
// Toggle between income and expense button
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

// Toast Notification
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

// ✅ Store transactions here
let transactions = [];

// Transaction Details Function
function transactionDetailsfunc() {
    const descValue = descriptionInput.value.trim();
    const amountValue = Math.round(parseFloat(amountInput.value)) || 0;
    const dateValue = dateInput.value;
    const categoryValue = chooseCategory.value;

    if (!descValue || amountValue <= 0 || !dateValue) {
        alert("Please enter a description, a valid amount greater than 0, and a date!");
        return;
    }

    // Create card
    let card = document.createElement("div");
    card.classList.add("transaction-card");
    card.innerHTML = `
        <h4 class="${transactionType}">
            Rs.${Math.round(amountValue.toFixed(2))} 
            <span class="type-text">(${transactionType === "income" ? "+ Income" : "- Expense"})</span>
        </h4>
        <p>${descValue} | ${categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1)}</p>
        <small>${dateValue}</small>
    `;

    card.style.borderLeft = transactionType === "income" ? "4px solid green" : "4px solid red";
    card.style.backgroundColor = transactionType === "income" ? "#f0fff0" : "#fff0f0";
    transactionDetails.prepend(card);

    // Update totals
    if (transactionType === "income") {
        totalIncome += amountValue;
    } else {
        totalExpense += amountValue;
    }

    const balance = totalIncome - totalExpense;

    incomeValue.textContent = `Rs.${totalIncome.toFixed(2)}`;
    expenseValue.textContent = `Rs.${totalExpense.toFixed(2)}`;
    balanceValue.textContent = `Rs.${balance.toFixed(2)}`;

    // ✅ Push to array so that we can use this array to filter out the category 
    transactions.push({
        type: transactionType,
        amount: amountValue,
        description: descValue,
        date: dateValue,
        category: categoryValue
    });

    // Reset fields
    descriptionInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
    chooseCategory.value = "general";

    toastNotification();
}

// ✅ Render Transactions Function
function renderTransactions(filteredArray) {
    transactionDetails.innerHTML = "";
    filteredArray.forEach((t) => {
        const card = document.createElement("div");
        card.classList.add("transaction-card");
        card.innerHTML = `
            <h4 class="${t.type}">
                Rs.${Math.round(t.amount.toFixed(2))} 
                <span class="type-text">(${t.type === "income" ? "+ Income" : "- Expense"})</span>
            </h4>
            <p>${t.description} | ${t.category.charAt(0).toUpperCase() + t.category.slice(1)}</p>
            <small>${t.date}</small>
        `;
        card.style.borderLeft = t.type === "income" ? "4px solid green" : "4px solid red";
        card.style.backgroundColor = t.type === "income" ? "#f0fff0" : "#fff0f0";
        transactionDetails.appendChild(card);
    });
}

// ✅ Apply Filters Function
function applyFilters() {
    const selectedType = allTransactionDropdown.value;
    const selectedCategory = transactionCategory.value;

    let filtered = transactions.filter((t) => {
        const typeMatch =
            selectedType === "transaction" || // All
            (selectedType === "forincome" && t.type === "income") ||
            (selectedType === "forexpense" && t.type === "expense");

        const categoryMatch =
            selectedCategory === "transaction" || // All
            t.category === selectedCategory;

        return typeMatch && categoryMatch;
    });

    renderTransactions(filtered);
}

// ✅ Event listeners for filters
allTransactionDropdown.addEventListener("change", applyFilters);
transactionCategory.addEventListener("change", applyFilters);

// ✅ Add transaction
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    transactionDetailsfunc();
    applyFilters(); // re-render after adding
});
