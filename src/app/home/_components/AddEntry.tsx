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

export default function AddEntry() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Your Orders</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing Our Dynamic Orders Dashboard for Seamless Management and
          Insightful Analysis.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Expense</Button>
          </DialogTrigger>
          <ExpenseDialog />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
