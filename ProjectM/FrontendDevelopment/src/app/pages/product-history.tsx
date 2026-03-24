import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { StatCard } from "../components/ui/stat-card";
import {
  Search,
  Eye,
  RefreshCw,
  Trash2,
  Package,
  TrendingUp,
} from "lucide-react";

interface ProductAnalysis {
  id: number;
  product_name: string;
  source: string;
  total_reviews: number;
  positive: number;
  neutral: number;
  negative: number;
  keywords: Record<string, number>;
  date: string;
  result?: any;
  status?: string;
}

export function ProductHistory() {
  const [products, setProducts] = useState<ProductAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/history")
      .then((res) => res.json())
      .then((data: ProductAnalysis[]) => {
        console.log("HISTORY DATA:", data); // debug
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product history:", err);
        setLoading(false);
      });
  }, []);

  // ✅ FIXED NAVIGATION
const handleViewReport = (product: ProductAnalysis) => {
  navigate(`/app/results/${product.id}`, {
    state: {
      product,
      result: product.result,
    },
  });
};

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgSentiment =
    products.length === 0
      ? 0
      : Math.round(
          products.reduce((acc, p) => acc + p.positive, 0) /
            products.length
        );

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading product history...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Product Analysis History
        </h1>
        <p className="text-muted-foreground">
          View all analyzed products
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StatCard
          icon={Package}
          label="Total Products"
          value={products.length}
        />
        <StatCard
          icon={TrendingUp}
          label="Avg Sentiment"
          value={`${avgSentiment}%`}
        />
      </div>

      <Card glass>
        <div className="mb-6">
          <Input
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center py-6 text-muted-foreground">
            No data found
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Reviews</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const isCompleted =
                  product.status === "completed";

                return (
                  <tr key={product.id} className="border-b">
                    <td className="p-3">
                      {product.product_name}
                    </td>

                    <td className="p-3">
                      {product.total_reviews}
                    </td>

                    <td className="p-3">
                      {isCompleted ? "✅ Completed" : "⏳ Pending"}
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() =>
                          handleViewReport(product)
                        }
                        disabled={!isCompleted}
                      >
                        <Eye />
                      </button>

                      <button>
                        <RefreshCw />
                      </button>

                      <button>
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}