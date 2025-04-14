import mongoose, { Schema, Document } from 'mongoose';

// Define the types for the transaction
interface ITransaction extends Document {
  amount: number;
  date: Date;
  description: string;
}

// Define the schema for the Transaction model
const transactionSchema: Schema<ITransaction> = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Create and export the Transaction model
const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
