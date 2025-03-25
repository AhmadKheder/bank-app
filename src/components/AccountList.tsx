"use client";

import { Input } from "@/components/ui/input";
import { showToast } from "@/functions";
import { addAccount, editAccount, removeAccount } from "@/store/accountSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "../app/globals.css";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
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
  const [newAccount, setNewAccount] = useState({
    currency: "EUR",
    balance: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editAccountId, setEditAccountId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ balance: "", currency: "" });

  const handleAddAccount = () => {
    if (!newAccount.balance) {
      showToast({ message: t("Balance is required."), type: "error" });
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
    showToast({ message: t("Account added successfully."), type: "success" });
  };

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

  const filteredAccounts = searchTerm
    ? accounts.filter((account) =>
        account.ownerId.toString().includes(searchTerm)
      )
    : accounts;

  const currencyOptions = [
    { value: "EUR", label: "EUR (€)" },
    { value: "USD", label: "USD ($)" },
    { value: "GBP", label: "GBP (£)" },
  ];

  return (
    <div className="p-4 border rounded shadow my-4">
      <h1 className="text-xl font-bold">{t("Bank Accounts")}</h1>
      {/* Search bar */}
      <Input
        type="number"
        placeholder={t("Search by Owner ID number")}
        className="border p-2 w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add account form */}
      <div className="flex items-center mb-4 gap-2">
        <Select
          value={newAccount.currency}
          onChange={(e) =>
            setNewAccount({ ...newAccount, currency: e.target.value })
          }
          options={currencyOptions}
          className="max-w-32 "
        />

        <div className="flex items-center">
          <Input
            type="number"
            placeholder={t("Balance")}
            value={newAccount.balance}
            onChange={(e) =>
              setNewAccount({ ...newAccount, balance: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <Button onClick={handleAddAccount} variant="default">
            {t("Add Account")}
          </Button>
        </div>
      </div>
      {/* Accounts list */}
      {isDashboard && searchTerm === "" ? null : (
        <ul>
          {filteredAccounts.map((account) => (
            <li
              key={account.id}
              className="border rounded-lg p-2 my-2 flex justify-between items-center"
            >
              {editAccountId === account.id ? (
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={editValues.balance}
                    onChange={(e) =>
                      setEditValues({ ...editValues, balance: e.target.value })
                    }
                    className="border p-2 w-32"
                  />
                  <Select
                    value={editValues.currency}
                    onChange={(e) =>
                      setEditValues({ ...editValues, currency: e.target.value })
                    }
                    options={currencyOptions}
                    className="max-w-32 "
                  />

                  {/* Update Button */}
                  <Button
                    onClick={() => handleUpdateAccount(account.id)}
                    variant="default"
                  >
                    {t("Update")}
                  </Button>

                  {/* Cancel (X) Button */}
                  <Button
                    onClick={() => setEditAccountId(null)}
                    variant="secondary"
                    className="p-1 text-gray-00"
                  >
                    {t("Cancel")}
                  </Button>
                </div>
              ) : (
                <span>
                  {t("Owner")}: {account.ownerId}, {account.currency} -{" "}
                  {currencySymbols[account.currency] || ""} {account.balance}
                </span>
              )}
              <div className="flex gap-2">
                {editAccountId === account.id ? null : (
                  <Button
                    onClick={() => {
                      setEditAccountId(account.id);
                      setEditValues({
                        balance: account.balance.toString(),
                        currency: account.currency,
                      });
                    }}
                    variant="secondary"
                  >
                    {t("Edit")}
                  </Button>
                )}
                <Button
                  onClick={() => dispatch(removeAccount(account.id))}
                  variant="destructive"
                >
                  {t("Remove")}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
