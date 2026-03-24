import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

export default function RequestProduct() {
  const [activeTab, setActiveTab] = useState<"url" | "text">("url");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    url: "",
    text: "",
  });

  const [productName, setProductName] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName) {
      return alert("Enter product name");
    }

    setLoading(true);

    try {
      const res = await fetch("https://sentiment-fawn.vercel.app/api/request-analysis", {
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

      alert(data.message || "Request submitted!");

      // reset form
      setProductName("");
      setFormData({ url: "", text: "" });

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("Failed to submit request");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Request Product Analysis</h1>
        <p className="text-muted-foreground">
          Submit your product and our admin will analyze it for you
        </p>
      </div>

      <Card glass>
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab("url")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "url"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Product URL
          </button>

          <button
            onClick={() => setActiveTab("text")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "text"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Paste Reviews
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium">
              Product Name
            </label>

            <Input
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          {/* URL / TEXT */}
          {activeTab === "url" ? (
            <div>
              <label className="block mb-2 text-sm">
                Product URL
              </label>

              <Input
                type="url"
                placeholder="https://example.com/product"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                required
              />

              <p className="text-sm text-muted-foreground mt-2">
                Enter product link (Amazon, Flipkart, etc.)
              </p>
            </div>
          ) : (
            <div>
              <label className="block mb-2 text-sm">
                Product Reviews
              </label>

              <Textarea
                rows={10}
                placeholder="Paste reviews here..."
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                required
              />

              <p className="text-sm text-muted-foreground mt-2">
                Paste multiple reviews for better analysis
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="font-semibold mb-2">
              What happens next?
            </h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Admin will review your request</li>
              <li>• AI sentiment analysis will be performed</li>
              <li>• Results will appear in your dashboard</li>
              <li>• You can view detailed reports anytime</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </Card>

      {/* Loading UI */}
      {loading && (
        <Card glass className="text-center py-12">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />

          <h3 className="text-xl font-semibold mb-2">
            Sending Request
          </h3>

          <p className="text-muted-foreground">
            Your request is being sent to admin...
          </p>
        </Card>
      )}
    </div>
  );
}