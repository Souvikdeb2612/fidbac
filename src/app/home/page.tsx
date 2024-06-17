"use client";
import React, { useState } from "react";
import AddEntry from "./_components/AddEntry";
import InfoCard from "./_components/InfoCard";
import Datatable from "./_components/Datatable";

function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-4 gap-2 items-stretch">
        <div className="col-span-2">
          <AddEntry open={open} setOpen={setOpen} />
        </div>
        <div className="col-span-1">
          <InfoCard />
        </div>
        <div className="col-span-1">
          <InfoCard />
        </div>
      </div>
      <Datatable open={open} setOpen={setOpen} />
    </div>
  );
}

export default Page;
