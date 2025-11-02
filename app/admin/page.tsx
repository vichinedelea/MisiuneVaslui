"use client";

import { useState } from "react";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progressValue, setProgressValue] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressValue(e.target.value);
  };

  const handleProgressSubmit = async () => {
    const progress = parseInt(progressValue, 10);
    if (isNaN(progress)) {
      alert("Please enter a valid number");
      return;
    }

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Progress set to ${progress} lei`);
        setProgressValue(""); // reset input
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update progress");
    }
  };

  return (
    <div className="p-6">
      {!isAuthenticated ? (
        <div>
          <h1 className="text-2xl mb-4">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border p-2 mb-2"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl mb-4">Setează suma de bani strânsă (lei)</h1>
          <input
            type="number"
            value={progressValue}
            onChange={handleProgressChange}
            placeholder="Introdu suma"
            className="border p-2 mb-2"
          />
          <button
            onClick={handleProgressSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Setează
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;