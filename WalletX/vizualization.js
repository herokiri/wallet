// Получение списка транзакций из localStorage
const storedTransactions = localStorage.getItem('transactions');
const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

// Функция для подсчета суммы доходов и расходов по категориям
function calculateCategoryTotals() {
  const totals = {
    income: {},
    expense: {}
  };

  transactions.forEach(function(transaction) {
    const category = transaction.category;
    const amount = transaction.amount;

    if (transaction.kind === 'income') {
      if (totals.income[category]) {
        totals.income[category] += amount;
      } else {
        totals.income[category] = amount;
      }
    } else if (transaction.kind === 'expense') {
      if (totals.expense[category]) {
        totals.expense[category] += amount;
      } else {
        totals.expense[category] = amount;
      }
    }
  });

  return totals;
}

// Функция для создания круговой диаграммы
function createPieChart() {
  const categoryTotals = calculateCategoryTotals();

  const incomeCategories = Object.keys(categoryTotals.income);
  const expenseCategories = Object.keys(categoryTotals.expense);

  const incomeData = incomeCategories.map(category => categoryTotals.income[category]);
  const expenseData = expenseCategories.map(category => categoryTotals.expense[category]);

  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: incomeCategories,
      datasets: [{
        label: 'Доходы',
        data: incomeData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          // ... добавьте цвета для других категорий доходов
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          // ... добавьте цвета для других категорий доход
  // ...
],
borderWidth: 1
}],
},
options: {
responsive: true,
plugins: {
  legend: {
    position: 'right'
  },
  title: {
    display: true,
    text: 'Доходы по категориям'
  }
}
}
});

const ctx2 = document.getElementById('chart2').getContext('2d');
const chart2 = new Chart(ctx2, {
type: 'pie',
data: {
  labels: expenseCategories,
  datasets: [{
    label: 'Расходы',
    data: expenseData,
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(255, 205, 86, 0.5)',
      // ... добавьте цвета для других категорий расходов
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 205, 86, 1)',
      // ... добавьте цвета для других категорий расходов
    ],
    borderWidth: 1
  }],
},
options: {
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true,
      text: 'Расходы по категориям'
    }
  }
}
});
}

// Вызов функции для создания круговых диаграмм при загрузке страницы
createPieChart();
