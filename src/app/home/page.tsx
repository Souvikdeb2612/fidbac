"use client";
import React, { useEffect, useState } from "react";
import AddEntry from "./_components/AddEntry";
import InfoCard from "./_components/InfoCard";
import Datatable from "./_components/Datatable";
import { useSession } from "next-auth/react";
import axios from "axios";

function Page() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const userId = session?.data?.user?.id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ weekly: {}, monthly: {} });

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expense-info?userId=${userId}`);
        // if (type === "week") {
        setData(response.data);
        // } else if (type === "month") {
        //   setData(response.data.monthly);
        // }
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
    </div>
  );
}

export default Page;
