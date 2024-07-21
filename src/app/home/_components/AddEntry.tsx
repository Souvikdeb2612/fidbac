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
import TransactionDialog from "./TransactionDialog";
import { Skeleton } from "@/components/ui/skeleton";

interface TransactionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: any;
}
export default function AddEntry({
  open,
  setOpen,
  session,
}: TransactionDialogProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex gap-1">
          Hi
          <div>
            {session?.user?.name ? (
              <span>{session?.user?.name}!</span>
            ) : (
              <Skeleton className="h-4 w-[100px]" />
            )}
          </div>
        </CardTitle>
        <CardDescription className="max-w-lg md:text-balance leading-relaxed">
          Manage your transactions efficiently with our intuitive dashboard.
          Add, view, and analyze your transactions with ease.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="max-md:w-full">Add New Transaction</Button>
          </DialogTrigger>
          <TransactionDialog open={open} setOpen={setOpen} session={session} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
