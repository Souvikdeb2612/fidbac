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
  session,
  type,
}: {
  session: any;
  type: string;
}) {
  const [data, setData] = useState({ total: 0, percentageChange: 0 });
  const [loading, setLoading] = useState(false);
  const userId = session?.data?.user?.id;

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expense-info?userId=${userId}`);
        if (type === "week") {
          setData(response.data.weekly);
        } else if (type === "month") {
          setData(response.data.monthly);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, type]);

  useEffect(() => {
    if (!session.data) {
      setLoading(true);
    }
  }, [session]);

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
