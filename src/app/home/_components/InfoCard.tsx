"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { currency } from "@/lib/utils";

export default function InfoCard({
  data,
  type,
  loading,
}: {
  data: any;
  type: string;
  loading: boolean;
}) {
  const currencyType = localStorage.getItem("currency");
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardDescription>
          This {type === "week" ? "Week" : "Month"}
        </CardDescription>
        <CardTitle className="text-4xl">
          <div>
            {loading ? (
              <Skeleton className="h-10 w-[150px]" />
            ) : (
              <p>
                {currency(currencyType || "Dollar")}
                {data?.total}
              </p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {loading ? (
            <Skeleton className="h-4 w-[150px]" />
          ) : (
            <p>
              {data.percentageChange}% from last{" "}
              {type === "week" ? "week" : "month"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
