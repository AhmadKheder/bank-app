"use client";

import { transferFunds } from "@/store/accountSlice";
import { RootState } from "@/store/store";
import { t } from "i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FundTransfer() {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const dispatch = useDispatch();

  const [transferData, setTransferData] = useState({
    fromAccountId: "",
    toAccountId: "",
    amount: "",
  });

  const fetchExchangeRate = async (
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> => {
    console.log({ fromCurrency, toCurrency });
    if (fromCurrency === toCurrency) return 1;

    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );
      const data = await response.json();

      if (data.result !== "success") {
        throw new Error("Failed to fetch exchange rates.");
      }

      //   const fromRate = data.rates[fromCurrency];
      const fromRate = 1;
      const toRate = data.rates[toCurrency];

      if (!fromRate || !toRate) {
        throw new Error("Currency conversion not supported.");
      }
      console.log(toRate / fromRate, { toRate, fromRate });

      return toRate / fromRate; // Conversion factor
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      throw error;
    }
  };
  const handleTransfer = async () => {
    const fromId = Number(transferData.fromAccountId);
    const toId = Number(transferData.toAccountId);
    const amount = Number(transferData.amount);

    if (!fromId || !toId || amount <= 0) {
      alert("Invalid transfer details.");
      return;
    }

    if (fromId === toId) {
      alert("Cannot transfer to the same account.");
      return;
    }

    const fromAccount = accounts.find((acc) => acc.id === fromId);
    const toAccount = accounts.find((acc) => acc.id === toId);

    if (!fromAccount || !toAccount) {
      alert("Invalid accounts.");
      return;
    }

    try {
      const conversionRate = await fetchExchangeRate(
        fromAccount.currency,
        toAccount.currency
      );
      const convertedAmount = amount * conversionRate;

      dispatch(
        transferFunds({
          fromAccountId: fromId,
          toAccountId: toId,
          amount: convertedAmount,
        })
      );

      setTransferData({ fromAccountId: "", toAccountId: "", amount: "" });
    } catch (error) {
      alert("Error fetching exchange rates. Please try again.");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">{t("Fund Transfer")}</h2>
      <div className="mb-2">
        <label className="block">{t("From Account")}:</label>
        <select
          value={transferData.fromAccountId}
          onChange={(e) =>
            setTransferData({ ...transferData, fromAccountId: e.target.value })
          }
          className="border p-2 w-full"
        >
          <option value="">{t("Select account")}</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.ownerId} - {acc.currency} {acc.balance}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block">{t("To Account")}:</label>
        <select
          value={transferData.toAccountId}
          onChange={(e) =>
            setTransferData({ ...transferData, toAccountId: e.target.value })
          }
          className="border p-2 w-full"
        >
          <option value="">{t("Select account")}</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.ownerId} - {acc.currency} {acc.balance}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block">{t("Amount")}:</label>
        <input
          type="number"
          value={transferData.amount}
          onChange={(e) =>
            setTransferData({ ...transferData, amount: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>
      <button
        onClick={handleTransfer}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {t("Transfer Funds")}
      </button>
    </div>
  );
}
