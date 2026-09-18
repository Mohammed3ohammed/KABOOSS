"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useRouter } from "../../../i18n/routing";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
}

const SignUp = () => {
  const t = useTranslations("Signup");
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    weight: "",
    height: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting form with data:", formData);
    

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Success:", data);
      alert("Registration successful! 🎉✅");

      // const combinedData = {
      //   ...data.user,
      //   ...data.client_data,
      // };

      // localStorage.setItem("playerData", JSON.stringify(combinedData));

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("extra_data", JSON.stringify(data.client_data));
      localStorage.setItem("token", data.token);

      router.push(`/client`);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        weight: "",
        height: "",
        age: "",
        gender: "",
      });
    }  catch (error) {
      console.error("Error during registration:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response Data:", error.response?.data);
        alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
        alert("An unexpected error occurred!");
      } else {
        alert("An unexpected error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-auto mt-10 mb-10">
      <div className="flex flex-col justify-evenly items-center w-11/12 h-auto bg-zinc-900 rounded-3xl sm:w-9/12 md:w-6/12 lg:w-4/12 sm-h-4/5">
        <h1 className="text-2xl mt-3 italic text-orange-500 p-4">{t("title")}</h1>
        <p className="italic text-orange-500">{t("paragraph")}</p>
        <form className="flex flex-col text-xl mb-7" onSubmit={handleSubmit}>
          {["name", "email", "phone", "password", "weight", "height", "age"].map((field) => (
            <div key={field} className="mb-4">
              <label className="text-base mb-2 block">{t(field)}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                required
                className="w-full mb-4 h-8 p-2 bg-zinc-700 rounded-md focus:outline-orange-500 pr-10"
              />
            </div>
          ))}

          <label className="text-base mb-2 block">{t("gender")}</label>
          <select
            className="w-80 mb-4 text-base h-auto bg-zinc-700 rounded-md focus:outline-orange-500"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">{t("gender")}</option>
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 text-lg border-2 border-solid border-orange-500 p-1 rounded-full text-white font-semibold h-auto transition hover:bg-orange-500"
          >
            {loading ? "Submitting..." : t("button")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;