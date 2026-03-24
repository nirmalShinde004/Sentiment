import { useState } from "react";

export function UserRequest() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [productName, setProductName] = useState("");
  const [source, setSource] = useState("");

  const submitRequest = async () => {
    if (!productName || !source) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:5000/api/request-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        product_name: productName,
        source: source,
      }),
    });

    alert("Request sent to admin");
    setProductName("");
    setSource("");
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Request Product Analysis</h1>

      <input
        className="w-full border p-2"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <textarea
        className="w-full border p-2"
        placeholder="Paste reviews or product URL"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <button
        onClick={submitRequest}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Send Request
      </button>
    </div>
  );
}