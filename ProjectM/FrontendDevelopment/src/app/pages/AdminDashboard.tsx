import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export function AdminDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [tab, setTab] = useState<"requests" | "users">("requests");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔒 PROTECT ADMIN
  if (user.role !== "admin") {
    return <h1 className="text-red-500">Access Denied</h1>;
  }

  const fetchRequests = async () => {
    const res = await fetch("http://localhost:5000/api/admin/requests");
    const data = await res.json();
    setRequests(data);
  };

  // 🔥 FIXED ANALYZE FUNCTION
  const analyzeRequest = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/analyze/${id}`,
        { method: "POST" }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Analysis Completed");
        fetchRequests(); // refresh list
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Delete user?")) return;

    await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  useEffect(() => {
    fetchRequests();
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex gap-4">
        <Button onClick={() => setTab("requests")}>Requests</Button>
        <Button onClick={() => setTab("users")}>Users</Button>
      </div>

      {tab === "requests" && (
        <Card className="p-4">
          <h2 className="text-xl mb-4">Requests</h2>

          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-3 mb-2 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{req.product_name}</p>
                <p>{req.user_name}</p>
                <p>
                  Status:{" "}
                  <span
                    className={
                      req.status === "completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {req.status}
                  </span>
                </p>
              </div>

              {req.status !== "completed" ? (
                <Button onClick={() => analyzeRequest(req.id)}>
                  Analyze
                </Button>
              ) : (
                <span className="text-green-500 font-bold">
                  Completed
                </span>
              )}
            </div>
          ))}
        </Card>
      )}

      {tab === "users" && (
        <Card className="p-4">
          <h2 className="text-xl mb-4">Users</h2>

          {users.map((u) => (
            <div
              key={u.id}
              className="border p-3 mb-2 flex justify-between"
            >
              <div>
                <p className="font-bold">{u.name}</p>
                <p>{u.email}</p>
              </div>

              <Button
                className="bg-red-500"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}