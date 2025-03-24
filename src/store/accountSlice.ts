import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  lastOwnerId: number; // Keep track of the last used ownerId
};

// Retrieve last used owner ID from localStorage (if available)
const getLastOwnerId = (): number => {
  if (typeof window !== "undefined") {
    const storedId = localStorage.getItem("lastOwnerId");
    return storedId ? parseInt(storedId, 10) : 1000;
  }
  return 1000;
};

const initialState: AccountsState = {
  accounts: [
    { id: 1, ownerId: 1001, currency: "USD", balance: 5000 },
    { id: 2, ownerId: 1002, currency: "EUR", balance: 3000 },
    { id: 3, ownerId: 1003, currency: "GBP", balance: 2000 },
    { id: 4, ownerId: 1004, currency: "CAD", balance: 4000 },
    { id: 5, ownerId: 1005, currency: "JPY", balance: 250000 },
  ],
  lastOwnerId: getLastOwnerId(),
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Omit<Account, "ownerId">>) => {
      state.lastOwnerId += 1;
      localStorage.setItem("lastOwnerId", state.lastOwnerId.toString()); // Save to local storage

      state.accounts.push({
        ...action.payload,
        ownerId: state.lastOwnerId,
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
      }
    },
  },
});

export const { addAccount, removeAccount, editAccount, transferFunds } = accountSlice.actions;
export default accountSlice.reducer;
