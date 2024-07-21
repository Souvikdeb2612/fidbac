"use client";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MONTHS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TransactionDialog from "./TransactionDialog";
import Image from "next/image";
import { deleteTransaction } from "@/app/actions/transaction";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { cn, currencyFormat } from "@/lib/utils";
import useCurrencyStore from "../../../stores/currency-store";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  // label: string;
  type: string;
}

interface TransactionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: any;
}

export default function Datatable({
  open,
  setOpen,
  session,
}: TransactionDialogProps) {
  const userId = session?.user?.id;

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [month, setMonth] = useState(currentMonth);
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalTransactions, setTotalTransactions] = useState(0);

  const { currency } = useCurrencyStore((state) => ({
    currency: state.currency,
  }));

  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/transaction?userId=${userId}&month=${month}&page=${page}&pageSize=${pageSize}`
        );
        setTransactionList(response.data.transactions);
        setTotalTransactions(response.data.total);
        setError(null); // Reset error state if successful
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again."); // Set error message
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, month, page, pageSize]);

  useEffect(() => {
    if (!session?.user) {
      setLoading(true);
    }
  }, [session]);

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    setPage(1); // Reset to first page on month change
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
      location.reload(); // Optionally, you could refetch data here instead
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const totalPages = Math.ceil(totalTransactions / pageSize);

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <div>
          <CardTitle>Transactions</CardTitle>
          {/* <CardDescription>
            Manage your transactions and view their performance.
          </CardDescription> */}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <ChevronDown />
                <p className="capitalize">{month}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start">
            <DropdownMenuRadioGroup
              value={month}
              onValueChange={handleMonthChange}
            >
              {MONTHS.map(({ value, label }) => (
                <DropdownMenuRadioItem value={value} key={label}>
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {loading ? (
          <>
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
          </>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : transactionList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                {/* <TableHead className="hidden md:table-cell">Label</TableHead> */}
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionList.map(
                ({ id, title, amount, category, date, type }) => (
                  <TableRow key={id.toString()}>
                    <TableCell className="font-medium">{title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {category}
                    </TableCell>
                    <TableCell
                      className={cn(
                        type === "expense" ? "text-destructive" : "text-green"
                      )}
                    >
                      {currencyFormat(currency)}
                      {amount}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(parseISO(date), "PP")}
                    </TableCell>
                    {/* <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{label}</Badge>
                  </TableCell> */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                          <DropdownMenuItem onClick={() => handleDelete(id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="flex flex-col items-center">
                    <Image
                      alt="add new transaction"
                      src="https://illustrations.popsy.co/gray/woman-on-laptop.svg"
                      height={200}
                      width={200}
                    />
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button>Add New Transaction</Button>
                      </DialogTrigger>
                      <TransactionDialog
                        open={open}
                        setOpen={setOpen}
                        session={session}
                      />
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
      {!loading && !error && (
        <CardFooter>
          <div className="md:flex justify-between items-center w-full text-xs text-muted-foreground">
            <p className="max-md:mb-3">
              Showing <strong>{(page - 1) * pageSize + 1}</strong> to{" "}
              <strong>{Math.min(page * pageSize, totalTransactions)}</strong> of{" "}
              <strong>{totalTransactions}</strong> transactions
            </p>
            <div className="flex gap-2 max-md:justify-end">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="w-full"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="w-full"
              >
                Next
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
