import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { StatCard } from "../components/ui/stat-card";
import { Package, MessageSquare, TrendingUp, Calendar } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Analysis {
  id: number;
  product_name: string;
  source: string;
  total_reviews: number;
  positive: number;
  neutral: number;
  negative: number;
  keywords: Record<string, number>;
  date: string;
}

export function Dashboard() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => {
        setAnalyses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching history:", err);
        setLoading(false);
      });
  }, []);

  // =========================
  // Aggregate stats
  // =========================

  const totalProducts = new Set(analyses.map((a) => a.product_name)).size;

  const totalReviews = analyses.reduce((sum, a) => sum + a.total_reviews, 0);

  const avgSentiment =
    analyses.length > 0
      ? (
          analyses.reduce((sum, a) => sum + a.positive, 0) /
          analyses.length
        ).toFixed(1)
      : "0";

  const lastAnalysisDate =
    analyses.length > 0 ? analyses[0].date.split(" ")[0] : "No data";

  // =========================
  // Pie chart (AVERAGE)
  // =========================

  const sentimentData =
    analyses.length === 0
      ? []
      : [
          {
            name: "Positive",
            value:
              analyses.reduce((sum, a) => sum + a.positive, 0) /
              analyses.length,
            color: "#10b981",
          },
          {
            name: "Neutral",
            value:
              analyses.reduce((sum, a) => sum + a.neutral, 0) /
              analyses.length,
            color: "#f59e0b",
          },
          {
            name: "Negative",
            value:
              analyses.reduce((sum, a) => sum + a.negative, 0) /
              analyses.length,
            color: "#ef4444",
          },
        ];

  // =========================
  // Trend chart
  // =========================

  const trendData = analyses
    .slice()
    .reverse()
    .map((a) => ({
      month: a.date,
      positive: a.positive,
      neutral: a.neutral,
      negative: a.negative,
    }));

  // =========================
  // Recent analyses
  // =========================

  const recentAnalyses = analyses.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Here's an overview of your sentiment analytics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          label="Total Products Analyzed"
          value={totalProducts}
        />

        <StatCard
          icon={MessageSquare}
          label="Total Reviews Processed"
          value={totalReviews}
        />

        <StatCard
          icon={TrendingUp}
          label="Average Positive %"
          value={`${avgSentiment}%`}
        />

        <StatCard
          icon={Calendar}
          label="Last Analysis"
          value={lastAnalysisDate}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <Card glass>
          <h3 className="text-xl font-semibold mb-6">
            Overall Sentiment Distribution
          </h3>

          {analyses.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No sentiment data available yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) =>
                    `${name}: ${value.toFixed(1)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Line Chart */}
        <Card glass>
          <h3 className="text-xl font-semibold mb-6">
            Sentiment Trends Over Time
          </h3>

          {analyses.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No trend data available yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148, 163, 184, 0.1)"
                />

                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />

                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="positive"
                  stroke="#10b981"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="neutral"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="negative"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Recent Analyses */}
      <Card glass>
        <h3 className="text-xl font-semibold mb-6">Recent Analyses</h3>

        {recentAnalyses.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No analyses have been performed yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Product
                  </th>

                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Reviews
                  </th>

                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Sentiment
                  </th>

                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentAnalyses.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{a.product_name}</td>

                    <td className="py-4 px-4 text-muted-foreground">
                      {a.total_reviews}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          a.positive > a.negative
                            ? "bg-emerald-500/20 text-emerald-400"
                            : a.negative > a.positive
                            ? "bg-red-500/20 text-red-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {a.positive > a.negative
                          ? "positive"
                          : a.negative > a.positive
                          ? "negative"
                          : "neutral"}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-muted-foreground">
                      {a.date}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </Card>
    </div>
  );
}