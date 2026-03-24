import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Download } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Review {
  original: string;
  cleaned: string;
  sentiment: "positive" | "neutral" | "negative";
}

interface AnalysisData {
  product_name: string;
  positive_percent: number;
  neutral_percent: number;
  negative_percent: number;
  keywords: Record<string, number>;
  reviews: Review[];
}

export function AnalysisResults() {
  const { id } = useParams();
  const location = useLocation();

  const [data, setData] = useState<AnalysisData | null>(() => {
    const state = location.state as any;
    return state?.result
      ? { ...state.result, product_name: state.product.product_name }
      : null;
  });

  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    if (!data) {
      fetch("http://127.0.0.1:5000/api/history")
        .then((res) => res.json())
        .then((results) => {
          const found = results.find(
            (r: any) => r.id === Number(id)
          );

          if (found?.result) {
            setData({
              ...found.result,
              product_name: found.product_name,
            });
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, data]);

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading analysis...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        No analysis found.
      </div>
    );
  }

  // ✅ Charts Data
  const sentimentData = [
    { name: "Positive", value: data.positive_percent, color: "#10b981" },
    { name: "Neutral", value: data.neutral_percent, color: "#f59e0b" },
    { name: "Negative", value: data.negative_percent, color: "#ef4444" },
  ];

  const keywordData = Object.entries(data.keywords || {}).map(
    ([keyword, count]) => ({
      keyword,
      count,
    })
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/app/history">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <div>
            <h1 className="text-4xl font-bold">
              {data.product_name}
            </h1>
            <p className="text-muted-foreground">
              Sentiment Analysis Report
            </p>
          </div>
        </div>

        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glass className="text-center">
          <p className="text-muted-foreground mb-2">Positive</p>
          <p className="text-5xl font-bold text-emerald-400 mb-2">
            {data.positive_percent}%
          </p>
          <Badge variant="positive">Positive Reviews</Badge>
        </Card>

        <Card glass className="text-center">
          <p className="text-muted-foreground mb-2">Neutral</p>
          <p className="text-5xl font-bold text-amber-400 mb-2">
            {data.neutral_percent}%
          </p>
          <Badge variant="neutral">Neutral Reviews</Badge>
        </Card>

        <Card glass className="text-center">
          <p className="text-muted-foreground mb-2">Negative</p>
          <p className="text-5xl font-bold text-red-400 mb-2">
            {data.negative_percent}%
          </p>
          <Badge variant="negative">Negative Reviews</Badge>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glass>
          <h3 className="text-xl font-semibold mb-6">
            Sentiment Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) =>
                  `${name}: ${value}%`
                }
                outerRadius={100}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card glass>
          <h3 className="text-xl font-semibold mb-6">
            Most Common Keywords
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={keywordData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="keyword"
                width={120}
              />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#6366f1"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* REVIEWS */}
      <Card glass>
        <h3 className="text-xl font-semibold mb-6">
          Reviews Analysis
        </h3>

        {data.reviews.length === 0 ? (
          <p className="text-muted-foreground">
            No review data available.
          </p>
        ) : (
          <div className="space-y-4">
            {data.reviews.map((review, index) => (
              <div
                key={index}
                className="border border-border rounded-xl p-4"
              >
                <Badge variant={review.sentiment}>
                  {review.sentiment}
                </Badge>

                <p className="text-foreground mt-2">
                  {review.original}
                </p>

                <p className="text-sm text-muted-foreground italic">
                  {review.cleaned}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}