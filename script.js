// Elements
const accinput = document.getElementById("account_balance");
const cashinput = document.getElementById("cash_balance");
const output = document.getElementById("output");
const confirmbtn = document.getElementById("confirm-btn");

// ฟังก์ชันโชว์ log balance
function showBalances(action = '') {
    const accountValue = parseFloat(accinput.value) || 0;
    const cashValue = parseFloat(cashinput.value) || 0;
    const timestamp = new Date().toLocaleTimeString();

    let log = `[${timestamp}]`;
    if (action) log += ` ${action} |`;
    log += ` Account Balance: ${accountValue.toFixed(2)} | Cash Balance: ${cashValue.toFixed(2)}\n`;

    output.value += log;
    output.scrollTop = output.scrollHeight;
}

// Confirm button
confirmbtn.addEventListener("click", () => {
    showBalances('Checked balances');
});

// Currency selector
const btn = document.getElementById('currency-btn');
const menu = document.getElementById('currency-menu');

btn.addEventListener('click', () => {
  menu.classList.toggle('show');
});

document.querySelectorAll('.currency-option').forEach(option => {
  option.addEventListener('click', () => {
    btn.textContent = option.textContent + ' ▼';
    menu.classList.remove('show');
    console.log('Selected currency:', option.dataset.currency);
  });
});

document.addEventListener('click', (e) => {
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('show');
  }
});

// ==============================
// Bank Operation: Deposit/Withdraw
// ==============================
const operationBtn = document.getElementById('operation-btn');
const operationMenu = document.getElementById('operation-menu');
const operationOptions = document.querySelectorAll('.operation-option');
const operationAmount = document.getElementById('operation-amount');
const proceedBtn = document.getElementById('proceed-btn');

let selectedOperation = null;

// Toggle operation menu
operationBtn.addEventListener('click', () => {
    operationMenu.classList.toggle('show');
});

// Select operation
operationOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedOperation = option.dataset.op;
        operationBtn.textContent = option.textContent + ' ▼';
        operationMenu.classList.remove('show');
    });
});

// Close operation menu if click outside
document.addEventListener('click', (e) => {
    if (!operationBtn.contains(e.target) && !operationMenu.contains(e.target)) {
        operationMenu.classList.remove('show');
    }
});

// Proceed button
proceedBtn.addEventListener('click', () => {
    if (!selectedOperation) {
        alert('Please select an operation first');
        return;
    }

    const amount = parseFloat(operationAmount.value) || 0;
    let account = parseFloat(accinput.value);
    let cash = parseFloat(cashinput.value);
    let action = '';

    if (selectedOperation === 'deposit') {
        if (amount > cash) {
            output.value += `Couldn't deposit entered balance (insufficient cash balance)\n`;
            showBalances('Deposit failed');
            return;
        }
        if (account + amount > 1000000) {
            output.value += `Couldn't deposit entered balance (account limit exceeded 100,000)\n`;
            showBalances('Deposit failed');
            return;
        }
        account += amount;
        cash -= amount;
        action = `Deposited ${amount.toFixed(2)}`;
    } else if (selectedOperation === 'withdraw') {
        if (amount > account) {
            output.value += `Couldn't withdraw entered balance (insufficient account balance)\n`;
            showBalances('Withdraw failed');
            return;
        }
        account -= amount;
        cash += amount;
        action = `Withdrew ${amount.toFixed(2)}`;
    }

    // Update balances
    accinput.value = account.toFixed(2);
    cashinput.value = cash.toFixed(2);

    // Log balances
    showBalances(action);
});

// Operation Options
document.querySelectorAll('.operation-option').forEach(option => {
    option.addEventListener('click', () => {
        // ลบ selected ของอันอื่น
        document.querySelectorAll('.operation-option').forEach(o => o.classList.remove('selected'));
        // ใส่ selected ให้ตัวนี้
        option.classList.add('selected');

        // เปลี่ยนข้อความปุ่ม
        const opBtn = document.getElementById('operation-btn');
        opBtn.textContent = option.textContent + ' ▼';
        document.getElementById('operation-menu').classList.remove('show');
    });
});

// Currency Options
document.querySelectorAll('.currency-option').forEach(option => {
    option.addEventListener('click', () => {
        // ลบ selected ของอันอื่น
        document.querySelectorAll('.currency-option').forEach(o => o.classList.remove('selected'));
        // ใส่ selected ให้ตัวนี้
        option.classList.add('selected');

        // เปลี่ยนข้อความปุ่ม
        const curBtn = document.getElementById('currency-btn');
        curBtn.textContent = option.textContent + ' ▼';
        document.getElementById('currency-menu').classList.remove('show');
    });
});


// Currency Options
document.querySelectorAll('.currency-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.currency-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        document.getElementById('currency-btn').textContent = option.textContent + ' ▼';
        document.getElementById('currency-menu').classList.remove('show');
    });
});

