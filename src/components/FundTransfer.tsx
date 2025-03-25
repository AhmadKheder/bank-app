"use client";

import { showToast } from "@/functions";
import { transferFunds } from "@/store/accountSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "../app/globals.css";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
export default function FundTransfer() {
  const { t } = useTranslation();
  const accounts =
    useSelector((state: RootState) => state.accounts.accounts) || [];
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
    if (fromCurrency === toCurrency) return 1;

    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );
      const data = await response.json();

      if (data.result !== "success") {
        throw new Error("Failed to fetch exchange rates.");
      }

      return data.rates[toCurrency] || 1;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      return 1;
    }
  };

  const handleTransfer = async () => {
    const fromId = Number(transferData.fromAccountId);
    const toId = Number(transferData.toAccountId);
    const amount = Number(transferData.amount);

    if (!fromId || !toId || amount <= 0) {
      showToast({ message: t("Invalid transfer details."), type: "error" });
      return;
    }

    if (fromId === toId) {
      showToast({
        message: t("Cannot transfer to the same account."),
        type: "error",
      });
      return;
    }

    const fromAccount = accounts.find((acc) => acc.id === fromId);
    const toAccount = accounts.find((acc) => acc.id === toId);

    if (!fromAccount || !toAccount) {
      showToast({ message: t("Invalid accounts."), type: "error" });
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
      console.error("Error transferring funds:", error);
      showToast({ message: t("Error transferring funds."), type: "error" });
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">{t("Fund Transfer")}</h2>
      <div className="mb-2">
        <label className="block">{t("From Account")}:</label>
        <Select
          value={transferData.fromAccountId}
          onChange={(e) =>
            setTransferData({ ...transferData, fromAccountId: e.target.value })
          }
          options={accounts.map((acc) => ({
            value: acc.id.toString(),
            label: `${acc.ownerId} - ${acc.currency} ${acc.balance}`,
          }))}
          placeholder={t("Select account")}
        />
      </div>
      <div className="mb-2">
        <label className="block">{t("To Account")}:</label>
        <Select
          value={transferData.toAccountId}
          onChange={(e) =>
            setTransferData({ ...transferData, toAccountId: e.target.value })
          }
          options={accounts.map((acc) => ({
            value: acc.id.toString(),
            label: `${acc.ownerId} - ${acc.currency} ${acc.balance}`,
          }))}
          placeholder={t("Select account")}
        />
      </div>
      <div className="mb-2">
        <label className="block">{t("Amount")}:</label>
        <input
          type="number"
          value={transferData.amount}
          placeholder="0"
          onChange={(e) =>
            setTransferData({ ...transferData, amount: e.target.value })
          }
          className="w-full border text-gray-600 border-input bg-background rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring "
        />
      </div>
      <Button onClick={handleTransfer} variant="default">
        {t("Transfer Funds")}
      </Button>
    </div>
  );
}
