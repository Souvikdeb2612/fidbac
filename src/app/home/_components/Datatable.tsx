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
import { expenseList } from "@/lib/dummy";
import { MONTHS } from "@/lib/constants";
import { useState } from "react";
import { fetchExpenses } from "@/db/queries/expenses";

export default function Datatable() {
  // const expenses = await fetchExpenses();
  // console.log("first", expenses);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [month, setMonth] = useState(currentMonth);
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
            <DropdownMenuRadioGroup value={month} onValueChange={setMonth}>
              {MONTHS.map(({ value, label }) => (
                <DropdownMenuRadioItem value={value}>
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead> */}
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
                {/* <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/placeholder.svg"
                  width="64"
                />
              </TableCell> */}
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
                      <Button aria-haspopup="true" size="icon" variant="ghost">
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
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
