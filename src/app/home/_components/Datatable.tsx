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
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ExpenseDialog from "./ExpenseDialog";
import Image from "next/image";

interface Expense {
  id: number;
  title: string;
  price: number;
  segment: string;
  date: string;
  label: string;
}

interface ExpenseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: any;
}

export default function Datatable({
  open,
  setOpen,
  session,
}: ExpenseDialogProps) {
  const userId = session?.data?.user?.id;

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [month, setMonth] = useState(currentMonth);
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/expense?userId=${userId}&month=${month}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenseList(data);
        setError(null); // Reset error state if successful
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setError("Failed to fetch expenses. Please try again."); // Set error message
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, month]);
  useEffect(() => {
    if (!session.data) {
      setLoading(true);
    }
  }, [session]);

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>
            Manage your expenses and view their performance.
          </CardDescription>
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
        ) : expenseList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Segment</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Label</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseList.map(({ id, title, price, segment, date, label }) => (
                <TableRow key={id.toString()}>
                  <TableCell className="font-medium">{title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {segment}
                  </TableCell>
                  <TableCell>${price}</TableCell>
                  <TableCell className="hidden md:table-cell">{date}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{label}</Badge>
                  </TableCell>
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="flex flex-col items-center">
                    <Image
                      alt="add new expense"
                      src="https://illustrations.popsy.co/gray/woman-on-laptop.svg"
                      height={200}
                      width={200}
                    />
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button>Add New Expense</Button>
                      </DialogTrigger>
                      <ExpenseDialog
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
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of{" "}
            <strong>{expenseList.length}</strong> products
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
