
import mongoose from 'mongoose';

// E-Wallet Schema
const selectedWalletSchema = new mongoose.Schema({
    selectedWallet: String,
    userId : String
});
const SelectedWallet = mongoose.model('SelectedWallet', selectedWalletSchema);

// Bank Schema
const selectedBankSchema = new mongoose.Schema({
    selectedBank: String,
    userId : String
});
const SelectedBank = mongoose.model('SelectedBank', selectedBankSchema);

// CreditOrDebitCard Schema
const cardSchema = new mongoose.Schema({
    cardNumber: String,
    expirationDate: String,
    cvv: String,
    ownerName: String,
    country: String,
    userId : String
});
const CreditOrDebitCard = mongoose.model('CreditOrDebitCard', cardSchema);

// Task Schema
const taskSchema = new mongoose.Schema({
    taskName: String,
    taskPrice: String
});
const Task = mongoose.model('Task', taskSchema);

// Export all models
export {
    SelectedWallet,
    SelectedBank,
    CreditOrDebitCard,
    Task
};
