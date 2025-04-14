import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/mongo'; // ✅ Import your DB connector
import Transaction from '@/models/Transaction'; // ✅ You’ll create this model if you haven't yet

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // ✅ Connect to MongoDB first

  if (req.method === 'GET') {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions);
  }

  if (req.method === 'POST') {
    const { amount, date, description } = req.body;

    if (!amount || !date || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const transaction = await Transaction.create({ amount, date, description });
    return res.status(201).json(transaction);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
