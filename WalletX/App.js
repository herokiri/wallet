(() => {
    
    function getAmount(kind) {
        const storedTransactions = localStorage.getItem('transactions');
        const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

        return transactions.reduce((sum, n) => sum + (n.kind === kind ? parseInt(n.amount) : 0), 0);
    }

    // обновляем общие данные доходов и расходов
    function updateAmounts() {
        let incomeAmount = document.getElementById('income-amount');
        let expenseAmount = document.getElementById('expense-amount');
        incomeAmount.innerText = getAmount('income') + " \u20bd";
        expenseAmount.innerText = getAmount('expense') + " \u20bd";
    }
    updateAmounts();

    // Функция для удаления операции по id
    function deleteTransactionById(id) {
        const storedTransactions = localStorage.getItem('transactions');
        let transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
        transactions = transactions.filter(transaction => transaction['id'] !== id);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        updateAmounts();
        displayTransactions();
    }

    function displayTransactions() {

        const storedTransactions = localStorage.getItem('transactions');
        const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

        // Получение элемента, в котором будет отображаться список операций
        const transactionList = document.getElementById('transactionList');

        // Очистка списка операций перед обновлением
        transactionList.innerHTML = '';

  // Создание копии списка транзакций и его обращение
        const reversedTransactions = [...transactions].reverse();

        // Перебор всех транзакций в обратном порядке и создание элементов списка
        reversedTransactions.forEach(function(transaction) {
            const listItem = document.createElement('li');
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'x';
            deleteButton.classList.add("btn", "btn-danger", "delete-button-by-id");

            deleteButton.addEventListener('click', function() {
                deleteTransactionById(transaction.id);
            });
          
            listItem.textContent = `Сумма: ${transaction.amount}, Категория: ${transaction.category}`;

            if(transaction.kind === "income") 
                listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center', 'income');
            else 
                listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center', 'expense');
            transactionList.appendChild(listItem);

            listItem.append(deleteButton);
        });
    }

      
      displayTransactions();



    // форма добавление транзакции
    document.getElementById('transactionForm').addEventListener('submit', function(event) {
        event.preventDefault();
      
        // Получение данных из формы
        const kind = document.querySelector('input[name="kind"]:checked').value;
        const category = document.querySelector('input[name="category"]').value.toLowerCase();
        const amount = parseFloat(document.querySelector('input[name="amount"]').value);
      
        // Создание объекта транзакции
        const transaction = {
            id: Math.random(),
            kind: kind,
            category: category,
            amount: amount
        };
      
        // Получение списка транзакций из localStorage
        const storedTransactions = localStorage.getItem('transactions');
        const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
      
        // Добавление новой транзакции в список
        transactions.push(transaction);
      
        // Обновление списка транзакций в localStorage
        localStorage.setItem('transactions', JSON.stringify(transactions));
      
        // Очистка формы
        document.getElementById('transactionForm').reset();
      
        // Вывод сообщения об успешном добавлении
        alert('Транзакция успешно добавлена!');

        updateAmounts();
        displayTransactions();

    });
      
})();