"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function InfoCard({
  data,
  type,
  loading,
}: {
  data: any;
  type: string;
  loading: boolean;
}) {
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
              <p>${data?.total}</p>
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
