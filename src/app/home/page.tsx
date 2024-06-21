"use client";

import React, { useEffect, useState } from "react";
import AddEntry from "./_components/AddEntry";
import InfoCard from "./_components/InfoCard";
import Datatable from "./_components/Datatable";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateCurrency } from "../actions/currency";

function Page() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const userId = session?.data?.user?.id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ weekly: {}, monthly: {} });
  const [selectedCurrency, setSelectedCurrency] = useState("Dollar");

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) return;
    setCurrencyOpen(isOpen);
  };

  const handleSaveClick = async () => {
    try {
      await updateCurrency({
        userId: Number(userId),
        currency: selectedCurrency,
      });
      setCurrencyOpen(false);
    } catch (error) {
      console.error("Error saving currency:", error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expense-info?userId=${userId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!session.data) {
      setLoading(true);
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/get-currency?userId=${userId}`)
        .then((response) => {
          if (response.data.currency) {
            setSelectedCurrency(response.data.currency);
            localStorage.setItem("currency", response.data.currency);
          } else {
            setCurrencyOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching expenses:", error);
        });
    }
  }, [userId]);

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-4 gap-2 items-stretch">
        <div className="col-span-2">
          <AddEntry open={open} setOpen={setOpen} session={session} />
        </div>
        <div className="col-span-1">
          <InfoCard data={data.weekly} type="week" loading={loading} />
        </div>
        <div className="col-span-1">
          <InfoCard data={data.monthly} type="month" loading={loading} />
        </div>
      </div>
      <Datatable open={open} setOpen={setOpen} session={session} />
      <Dialog open={currencyOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-6">Select Currency</DialogTitle>
            <RadioGroup
              value={selectedCurrency}
              onValueChange={setSelectedCurrency}
              className="px-4"
            >
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="r1">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl">$</p>
                    <p className="text-md">Dollar</p>
                  </div>
                </Label>
                <RadioGroupItem value="Dollar" id="r1" />
              </div>
              <div className="flex justify-between items-center space-x-2">
                <Label htmlFor="r2">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl">€</p>
                    <p className="text-md">Euro</p>
                  </div>
                </Label>
                <RadioGroupItem value="Euro" id="r2" />
              </div>
              <div className="flex justify-between items-center space-x-2">
                <Label htmlFor="r3">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl">₹</p>
                    <p className="text-md">Rupee</p>
                  </div>
                </Label>
                <RadioGroupItem value="Rupee" id="r3" />
              </div>
            </RadioGroup>
          </DialogHeader>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Page;
