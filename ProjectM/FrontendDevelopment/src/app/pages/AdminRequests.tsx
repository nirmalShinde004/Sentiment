import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";

interface Request {
  id: number;
  user_name: string;
  email: string;
  product_name: string;
  source: string;
  status: string;
  created_at: string;
}

export default function AdminRequests() {

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/requests")
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  }, []);

  const handleAnalyze = async (id: number) => {
    try {

      const res = await fetch(`http://localhost:5000/api/admin/analyze/${id}`, {
        method: "POST"
      });

      const data = await res.json();

      alert(data.message);

      // Refresh list
      // 🔥 REFRESH FULL DATA FROM BACKEND
const updated = await fetch("http://localhost:5000/api/admin/requests");
const newData = await updated.json();
setRequests(newData);

    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold mb-2">User Requests</h1>
        <p className="text-muted-foreground">
          Analyze products requested by users.
        </p>
      </div>

      <Card glass>

        {loading ? (
          <p className="text-center p-6">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-center p-6 text-muted-foreground">
            No requests available
          </p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-border">

                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Source</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Action</th>

                </tr>
              </thead>

              <tbody>

                {requests.map((req) => (

                  <tr
                    key={req.id}
                    className="border-b border-border/50 hover:bg-muted/20"
                  >

                    <td className="py-4 px-4">
                      {req.user_name}
                      <div className="text-xs text-muted-foreground">
                        {req.email}
                      </div>
                    </td>

                    <td className="py-4 px-4">{req.product_name}</td>

                    <td className="py-4 px-4">{req.source}</td>

                    <td className="py-4 px-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          req.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : req.status === "processing"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {req.status}
                      </span>

                    </td>

                    <td className="py-4 px-4">

                      {req.status !== "completed" && (

                        <button
                          onClick={() => handleAnalyze(req.id)}
                          className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
                        >
                          Analyze
                        </button>

                      )}

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