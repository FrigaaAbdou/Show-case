import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("Mindful User");
  const [email, setEmail] = useState("user@example.com");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setName(parsedUser.username || "");
        setEmail(parsedUser.email || "");
      } catch (err) {
        console.error("Error parsing user data", err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userData = localStorage.getItem("user");
    if (!userData) {
      setError("User not found.");
      return;
    }
    const parsedUser = JSON.parse(userData);
    const userId = parsedUser.id;
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(`http://localhost:3000/api/auth/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ username: name, email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to update profile");
      } else {
        setSuccess("Profile updated successfully.");
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    }
  };

  return (
    <section className="min-h-fit flex items-center justify-center py-16">
      <div className="w-full max-w-md bg-blue-50 p-8 rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-blue-800 text-center">
          Profile Settings
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center">{success}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>

        {/* See My Orders Button */}
        <button
          onClick={() => navigate("/orders")}
          className="w-full py-3 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
        >
          See My Orders
        </button>
      </div>
    </section>
  );
}

export default Profile;