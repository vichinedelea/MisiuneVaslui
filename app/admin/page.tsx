"use client";
import { useState } from "react";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progressValue, setProgressValue] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        alert("Parolă incorectă");
      }
    } catch (err) {
      console.error(err);
      alert("Eroare la autentificare");
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressValue(e.target.value);
  };

  const handleProgressSubmit = async () => {
    const progress = parseInt(progressValue, 10);
    if (isNaN(progress)) {
      alert("Introdu un număr valid");
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
        alert(`Suma setată la ${progress} lei`);
        setProgressValue("");
      } else {
        alert(`Eroare: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Eșec la actualizarea sumei");
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