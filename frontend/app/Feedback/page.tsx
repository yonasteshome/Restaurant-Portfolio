"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/feedback");
      setFeedbacks(res.data);
    } finally {
      setLoading(false);
    }
  };

  const markReviewed = async (id) => {
    try {
      const res = await api.patch(`/feedback/${id}/reviewed`);
      setFeedbacks((prev) => prev.map((f) => (f._id === id ? res.data : f)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Customer Feedback</h1>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feedbacks.map((item) => (
          <Card key={item._id} className="rounded-2xl shadow p-2">
            <CardHeader>
              <CardTitle>{item.customer_name || "Anonymous"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{item.message}</p>

              {item.is_reviewed ? (
                <span className="text-green-600 font-semibold">Reviewed ✔</span>
              ) : (
                <Button onClick={() => markReviewed(item._id)}>Mark Reviewed</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
