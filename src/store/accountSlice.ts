import { showToast } from "@/functions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { t } from "i18next";

type Account = {
  id: number;
  ownerId: number;
  currency: string;
  balance: number;
};
type TransferPayload = {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
};
type AccountsState = {
  accounts: Account[];
};

// Function to generate a random ownerId
const generateRandomOwnerId = (): number => {
  const year = new Date().getFullYear();
  return Number(`${year}${Math.floor(1000 + Math.random() * 9000)}`);
};

const initialState: AccountsState = {
  accounts: [
    { id: 1, ownerId: generateRandomOwnerId(), currency: "USD", balance: 5000 },
    { id: 2, ownerId: generateRandomOwnerId(), currency: "EUR", balance: 3000 },
    { id: 3, ownerId: generateRandomOwnerId(), currency: "GBP", balance: 2000 },
    { id: 4, ownerId: generateRandomOwnerId(), currency: "CAD", balance: 4000 },
    { id: 5, ownerId: generateRandomOwnerId(), currency: "JPY", balance: 250000 },
  ],
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Omit<Account, "ownerId">>) => {
      const newOwnerId = generateRandomOwnerId();
      state.accounts.push({
        ...action.payload,
        ownerId: newOwnerId,
      });
    },
    removeAccount: (state, action: PayloadAction<number>) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
    },
    editAccount: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex(
        (account) => account.id === action.payload.id
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    transferFunds: (state, action: PayloadAction<TransferPayload>) => {
      const { fromAccountId, toAccountId, amount } = action.payload;
      const fromAccount = state.accounts.find(acc => acc.id === fromAccountId);
      const toAccount = state.accounts.find(acc => acc.id === toAccountId);

      if (fromAccount && toAccount && fromAccount.balance >= amount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;
      } else {
        console.error('Transfer failed: Insufficient balance or invalid accounts.');
        showToast({ message: t("Transfer failed: Insufficient balance or invalid accounts."), type: "error" });
      }
    },
  },
});

export const { addAccount, removeAccount, editAccount, transferFunds } = accountSlice.actions;
export default accountSlice.reducer;
