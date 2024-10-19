document.addEventListener('DOMContentLoaded', function () {
    const setIncomeBtn = document.getElementById('set-income-btn');
    const editIncomeBtn = document.getElementById('edit-income-btn');
    const inputSection = document.getElementById('input-section');
    const balanceSection = document.getElementById('balance-section');
    const balanceDisplay = document.getElementById('balance');
    const salaryDisplay = document.getElementById('salary');
    const inputBalance = document.getElementById('input-balance');
    const inputSalary = document.getElementById('input-salary');
    const body = document.querySelector('body'); // Select body for blur effect

    let balance = 0;
    let salary = 0;

    setIncomeBtn.addEventListener('click', function () {
        balance = inputBalance.value;
        salary = inputSalary.value;
        if (balance && salary) {
            balanceDisplay.textContent = balance;
            salaryDisplay.textContent = salary;
            inputSection.style.display = 'none';
            balanceSection.style.display = 'block';
        }
    });

    editIncomeBtn.addEventListener('click', function () {
        inputBalance.value = balance;
        inputSalary.value = salary;
        inputSection.style.display = 'block';
        balanceSection.style.display = 'none';
    });

    // Expense logic
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');

    addExpenseBtn.addEventListener('click', function () {
        const description = descriptionInput.value;
        const amount = amountInput.value;

        if (description && amount) {
            addExpense(description, amount);
            descriptionInput.value = '';
            amountInput.value = '';
        }
    });

    function addExpense(description, amount) {
        const row = document.createElement('tr');

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = description;

        const amountCell = document.createElement('td');
        amountCell.textContent = `$${amount}`;

        const actionsCell = document.createElement('td');

        // Create Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');

        // Create Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        // Create Paid Button
        const paidBtn = document.createElement('button');
        paidBtn.textContent = 'Paid';
        paidBtn.classList.add('paid-btn');

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
        actionsCell.appendChild(paidBtn);

        row.appendChild(descriptionCell);
        row.appendChild(amountCell);
        row.appendChild(actionsCell);

        expenseList.appendChild(row);

        // Add event listeners for the action buttons
        editBtn.addEventListener('click', function () {
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.classList.add('save-btn');

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.classList.add('cancel-btn');

            actionsCell.replaceChild(saveBtn, editBtn);
            actionsCell.appendChild(cancelBtn);

            const descriptionInput = document.createElement('input');
            descriptionInput.type = 'text';
            descriptionInput.value = descriptionCell.textContent;
            descriptionCell.textContent = '';
            descriptionCell.appendChild(descriptionInput);

            const amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.value = amountCell.textContent.slice(1); 
            amountCell.textContent = '';
            amountCell.appendChild(amountInput);

            saveBtn.addEventListener('click', function () {
                descriptionCell.textContent = descriptionInput.value;
                amountCell.textContent = `$${amountInput.value}`;
                actionsCell.replaceChild(editBtn, saveBtn);
                actionsCell.removeChild(cancelBtn);
            });

            cancelBtn.addEventListener('click', function () {
                descriptionCell.textContent = description;
                amountCell.textContent = `$${amount}`;
                actionsCell.replaceChild(editBtn, saveBtn);
                actionsCell.removeChild(cancelBtn);
            });
        });

        deleteBtn.addEventListener('click', function () {
            showNotification(`Are you sure you want to delete "${description}"?`, function () {
                expenseList.removeChild(row);
            });
        });

        paidBtn.addEventListener('click', function () {
            showNotification(`Have you successfully paid "${description}"?`, function () {
                expenseList.removeChild(row);
                // Add to history later
            });
        });
    }

    function showNotification(message, onConfirm) {
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notification-message');
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');

        // Show notification and blur background
        notificationMessage.textContent = message;
        notification.style.display = 'flex';
        body.classList.add('blur-active');

        yesBtn.onclick = function () {
            onConfirm();
            notification.style.display = 'none';
            body.classList.remove('blur-active');
        };

        noBtn.onclick = function () {
            notification.style.display = 'none';
            body.classList.remove('blur-active');
        };
    }
});

// Function to open the notification modal
function openNotification(message) {
    const notification = document.getElementById('notification');
    const blurBody = document.getElementById('blur-body');
    const notificationContent = document.querySelector('.notification-content p');
    
    notificationContent.textContent = message;
    notification.style.display = 'flex'; // Show notification
    blurBody.classList.add('blur-active'); // Apply blur to the body
}

// Function to close the notification modal
function closeNotification() {
    const notification = document.getElementById('notification');
    const blurBody = document.getElementById('blur-body');
    
    notification.style.display = 'none'; // Hide notification
    blurBody.classList.remove('blur-active'); // Remove blur from the body
}

// Function to simulate deleting an expense
function deleteExpense() {
    openNotification('Are you sure you want to delete this expense?');
}

// Event listeners for Yes and No buttons in the notification
document.getElementById('yes-btn').addEventListener('click', function() {
    // Logic to delete the expense goes here
    closeNotification(); // Close notification after action
});

document.getElementById('no-btn').addEventListener('click', function() {
    closeNotification(); // Close notification on No button click
});

// Example of expense deletion trigger
document.getElementById('delete-expense-btn').addEventListener('click', deleteExpense);
