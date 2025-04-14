import React, { useState, useEffect } from 'react';

// Define the types for the data
type DashboardData = {
  month: string;
  expenses: number;
};

type Transaction = {
  date: string;  // Assuming date is a string in ISO format or something similar
  amount: number; // Assuming the amount is a number
};

const Dashboard = () => {
  const [data, setData] = useState<DashboardData[]>([]); // Define the correct type for state

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/transactions');
      const transactions: Transaction[] = await response.json(); // Add Transaction[] type here

      // Reduce the transactions to get the total expenses per month
      const monthlyExpenses = transactions.reduce((acc: Record<string, number>, transaction: Transaction) => {
        const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });

        if (!acc[month]) acc[month] = 0;
        acc[month] += transaction.amount;

        return acc;
      }, {});

      // Convert the monthly expenses to the correct format
      const formattedData: DashboardData[] = Object.entries(monthlyExpenses).map(([month, expenses]) => ({
        month,
        expenses: Number(expenses), // Ensure expenses is a number
      }));

      setData(formattedData); // Update the state with the formatted data
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map((item) => (
          <li key={item.month}>
            {item.month}: ${item.expenses}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
