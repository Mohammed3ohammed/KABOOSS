"use client";
import { useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "../../../i18n/routing";
import { Eye, EyeOff } from "lucide-react";

const LogIn = () => {
  const t = useTranslations("Login");
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/login", formData, {
        headers: { "Cache-Control": "no-cache" },
      });

      if (response.data.token) {
        const { token, user, extra_data } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("extra_data", JSON.stringify(extra_data));

        if (user.email === "admin@gmail.com") {
          router.push("/admin");
        } else if (user.role === "coach") {
          router.push("/coach");
        } else {
          router.push("/client");
        }
      } else {
        setError("Login failed!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (axios.isAxiosError(err)) {
        setError("Login failed!");
      } else {
        setError("Network error, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-evenly items-center w-11/12 h-3/5 bg-zinc-900 rounded-3xl sm:w-9/12 md:w-6/12 lg:w-4/12 sm-h-4/5">
        <h1 className="text-xl mt-2 italic text-red-800">{t("title")}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col text-lg mb-8 sm:text-xl">
          <label className="text-base mb-2 mt-5">{t("email")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-80 h-8 p-2 bg-zinc-700 rounded-md focus:outline-red-800"
          />
          <label className="text-base mb-2 mt-4">{t("password")}</label>

          <div className="relative w-80">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mb-4 h-8 p-2 bg-zinc-700 rounded-md focus:outline-red-800 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-4 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 text-lg border-2 border-solid border-red-800 p-1 rounded-full text-white font-semibold h-auto transition hover:bg-orange-500"
          >
            {loading ? "Logging in... 🔃" : t("button")}
          </button>
        </form>
        <Link href="/sign" className="text-lg text-red-800 sm:text-lg">
          {t("create")}
        </Link>
      </div>
    </div>
  );
};

export default LogIn;