"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ExpenseDialog from "./ExpenseDialog";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

interface ExpenseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: any;
}
export default function AddEntry({ open, setOpen }: ExpenseDialogProps) {
  const session = useSession();
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex gap-1">
          Hi
          <div>
            {session?.data?.user?.name ? (
              <span>{session?.data?.user?.name}!</span>
            ) : (
              <Skeleton className="h-4 w-[100px]" />
            )}
          </div>
        </CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing Our Dynamic Orders Dashboard for Seamless Management and
          Insightful Analysis.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add New Expense</Button>
          </DialogTrigger>
          <ExpenseDialog open={open} setOpen={setOpen} session={session} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
