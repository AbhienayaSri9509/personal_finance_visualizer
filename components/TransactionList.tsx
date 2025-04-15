import { useEffect, useState } from 'react';

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.amount} - {transaction.description} - {transaction.category} - {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
