import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongo'; // ✅ Import your DB connector
import Transaction from '@/models/Transaction'; // ✅ You’ll create this model if you haven't yet

// API route to handle GET and POST for transactions
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database first
  await connectDB();

  // Handle GET requests - Get all transactions
  if (req.method === 'GET') {
    try {
      const transactions = await Transaction.find().sort({ date: -1 }); // Sort transactions by date
      return res.status(200).json(transactions); // Respond with the transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Handle POST requests - Add a new transaction
  if (req.method === 'POST') {
    // Ensure the body is parsed correctly
    if (req.headers['content-type'] !== 'application/json') {
      return res.status(400).json({ message: 'Invalid content type. Must be application/json' });
    }

    const { amount, date, description } = req.body;

    // Validate the required fields
    if (!amount || !date || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Create and save the transaction in the database
      const transaction = await Transaction.create({
        amount,
        date,
        description,
      });

      return res.status(201).json(transaction); // Respond with the created transaction
    } catch (error) {
      console.error('Error saving transaction:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // If method is neither GET nor POST, respond with 405 Method Not Allowed
  res.status(405).json({ message: 'Method not allowed' });
}
