import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

export function AnalyzeProduct() {
  const [activeTab, setActiveTab] = useState<"url" | "text">("url");

  const [formData, setFormData] = useState({
    url: "",
    text: "",
  });

  const [productName, setProductName] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [userRequests, setUserRequests] = useState<any[]>([]);

  const submitRequest = async () => {
    if (!productName) return alert("Enter product name");

    const res = await fetch("http://localhost:5000/api/request-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        product_name: productName,
        source: activeTab === "url" ? formData.url : formData.text,
      }),
    });

    const data = await res.json();
    alert(data.message);
    fetchUserResults();
  };

  const fetchUserResults = async () => {
    const res = await fetch(
      `http://localhost:5000/api/user/results/${user.email}`
    );

    const data = await res.json();
    setUserRequests(data);
  };

  useEffect(() => {
    fetchUserResults();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Request Product Analysis</h1>

      <Card>
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab("url")}>URL</button>
          <button onClick={() => setActiveTab("text")}>Text</button>
        </div>

        <Input
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        {activeTab === "url" ? (
          <Input
            placeholder="Product URL"
            value={formData.url}
            onChange={(e) =>
              setFormData({ ...formData, url: e.target.value })
            }
          />
        ) : (
          <Textarea
            rows={5}
            placeholder="Paste reviews"
            value={formData.text}
            onChange={(e) =>
              setFormData({ ...formData, text: e.target.value })
            }
          />
        )}

        <Button onClick={submitRequest} className="w-full mt-4">
          Send Request to Admin
        </Button>
      </Card>

      <Card>
        <h2>Your Requests</h2>

        {userRequests.map((req, i) => (
          <div key={i}>
            <p>{req.product_name}</p>
            <p>Status: {req.status}</p>

            {req.result && (
              <>
                <p>👍 {req.result.positive}%</p>
                <p>😐 {req.result.neutral}%</p>
                <p>👎 {req.result.negative}%</p>
              </>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}