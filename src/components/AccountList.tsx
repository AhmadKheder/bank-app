"use client";

import { addAccount, editAccount, removeAccount } from "@/store/accountSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "../app/globals.css";

const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export default function AccountList({
  isDashboard = false,
}: {
  isDashboard?: boolean;
}) {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  console.log(">>>Ahmad", isDashboard ? "Dashboard" : "Not Dashboard");
  const [newAccount, setNewAccount] = useState({
    currency: "EUR",
    balance: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editAccountId, setEditAccountId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ balance: "", currency: "" });
  const handleAddAccount = () => {
    if (!newAccount.balance) {
      alert(t("Balance is required."));
      return;
    }

    dispatch(
      addAccount({
        id: Date.now(),
        currency: newAccount.currency,
        balance: Number(newAccount.balance),
      })
    );

    setNewAccount({ currency: "EUR", balance: "" });
  };

  // Handle updating an account
  const handleUpdateAccount = (id: number) => {
    dispatch(
      editAccount({
        id,
        ownerId: accounts.find((acc) => acc.id === id)?.ownerId || 0,
        currency: editValues.currency,
        balance: Number(editValues.balance),
      })
    );
    setEditAccountId(null);
  };

  // Filter accounts based on search term
  const filteredAccounts = searchTerm
    ? accounts.filter((account) =>
        account.ownerId.toString().includes(searchTerm)
      )
    : accounts;

  return (
    <div className="p-4 border rounded shadow my-4">
      <h1 className="text-xl font-bold">Bank Accounts</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Owner ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {/* Add account form */}
      <div className="mb-4">
        <select
          value={newAccount.currency}
          onChange={(e) =>
            setNewAccount({ ...newAccount, currency: e.target.value })
          }
          className="border p-2 mr-2"
        >
          <option value="EUR">EUR (€)</option>
          <option value="USD">USD ($)</option>
          <option value="GBP">GBP (£)</option>
        </select>
        <input
          type="number"
          placeholder="Balance"
          value={newAccount.balance}
          onChange={(e) =>
            setNewAccount({ ...newAccount, balance: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddAccount}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {t("Add Account")}
        </button>
      </div>

      {/* Accounts list */}
      {isDashboard && searchTerm == "" ? null : (
        <ul>
          {filteredAccounts.map((account) => (
            <li
              key={account.id}
              className="border p-2 my-2 flex justify-between"
            >
              {editAccountId === account.id ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editValues.balance}
                    onChange={(e) =>
                      setEditValues({ ...editValues, balance: e.target.value })
                    }
                    className="border p-2 w-24"
                  />
                  <select
                    value={editValues.currency}
                    onChange={(e) =>
                      setEditValues({ ...editValues, currency: e.target.value })
                    }
                    className="border p-2"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                  <button
                    onClick={() => handleUpdateAccount(account.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    {t("Update")}
                  </button>
                </div>
              ) : (
                <span>
                  {t("Owner")}: {account.ownerId}, {account.currency} -{" "}
                  {currencySymbols[account.currency] || ""} {account.balance}
                </span>
              )}
              <div className="flex gap-2">
                {editAccountId === account.id ? null : (
                  <button
                    onClick={() => {
                      setEditAccountId(account.id);
                      setEditValues({
                        balance: account.balance.toString(),
                        currency: account.currency,
                      });
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    {t("Edit")}
                  </button>
                )}
                <button
                  onClick={() => dispatch(removeAccount(account.id))}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  {t("Remove")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
