"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import logo from "../../../public/Captins/Image2.jpg";
import { useRouter } from "../../../i18n/routing";

interface ProgramData {
  subscription_id: number;
  program_id: number;
  program_type: string;
  program_price: string;
  program_sessions: number;
  coach_name: string;
  status: string;
  start_date: string;
  end_date: string;
}

const Page = () => {
  const t = useTranslations("Coatchs");
  const [plan, setPlan] = useState("");
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:8000/api/client/myPrograms", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPrograms(response.data.programs);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first before subscribing! 🔒");
        return;
      }

      if (!plan) {
        alert("Please choose a subscription plan! 📅");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/client/subscribe",
        { plan, program_id: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Successfully subscribed with the coach! ✅");
      router.push("/client");
      window.location.reload();
    } catch (error: unknown) {
      console.error("Subscription Error:", error);
      alert("An error occurred during subscription! ❌");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mt-10 italic text-red-800">{t("Coatch1.title")}</h1>
      </div>
      <div>
        <p className="text-center mt-5 text-2xl">{t("Coatch1.result")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-20">
          <div>
            <section className="py-12 px-6 lg:px-20">
              <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-2xl">
                <h2 className="text-3xl font-bold text-gray-600 mb-6 text-center">
                  Training Program - Captain Assem El-Kasaby
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                  Specialist in sports injury rehabilitation and professional Kung Fu training.
                </p>
                <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-600 mb-3">{t("Coatch1.physica")}</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>{t("Coatch1.fitness")}</li>
            <li>{t("Coatch1.strength")}</li>
            <li>{t("Coatch1.physical")}</li>
          </ul>
        </div>
                <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-600 mb-3">{t("Coatch1.combat")}</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>{t("Coatch1.advanced")}</li>
            <li>{t("Coatch1.improving")}</li>
            <li>{t("Coatch1.combatt")}</li>
          </ul>
                </div>

                <form onSubmit={handleSubscribe} className="flex flex-col gap-5 lg:w-8/12 p-4 md:w-8/12 w-full justify-center">
                  <select
                    id="gym-plan"
                    name="gym-plan"
                    className="bg-black text-gray-400"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  >
                    <option value="" className=''>{t("Coatch1.gym_plan")}</option>
                    <option value="kids-kungfu">{t("Coatch1.quarterly")}</option>
                    <option value="adults-kungfu">{t("Coatch1.quarterly")}</option>
                    <option value="gymnastics">{t("Coatch1.gymnastics")}</option>
                  </select>
                  <button
                    type="submit"
                    className="border-2 border-solid border-red-800 py-2 px-6 mt-5 rounded-full text-white hover:bg-orange-500 hover:text-white transition duration-300 w-full sm:w-auto text-center cursor-pointer"
                  >
                    {t("button")}
                  </button>
                </form>
              </div>
            </section>
          </div>

          <div className="flex justify-center items-center relative">
            <Image src={logo} alt="logo" className="w-80 h-96 rounded-2xl transform transition duration-300 hover:scale-105" />
          </div>
        </div>

        <div className="mt-16 p-8 bg-gray-800 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Your Subscribed Programs</h2>
          {loading ? (
            <p>Loading...</p>
          ) : programs.length > 0 ? (
            programs.map((program) => (
              <div key={program.subscription_id} className="bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-2xl font-semibold">{program.coach_name}</h3>
                <p>
                  <strong>Type:</strong> {program.program_type}
                </p>
                <p>
                  <strong>Sessions:</strong> {program.program_sessions}
                </p>
                <p>
                  <strong>Price:</strong> {program.program_price} EGP
                </p>
                <p>
                  <strong>Status:</strong> {program.status}
                </p>
                <p>
                  <strong>Start Date:</strong> {program.start_date}
                </p>
                <p>
                  <strong>End Date:</strong> {program.end_date}
                </p>
              </div>
            ))
          ) : (
            <p>You have not subscribed to any program yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
