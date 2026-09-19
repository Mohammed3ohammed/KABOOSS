"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import logo from "../../../public/Captins/Image4.jpg";
import { useRouter } from '../../../i18n/routing';

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
        { plan, program_id: 3},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Successfully subscribed with the coach! ✅");
      router.push("/client");
    } catch (error: unknown) {
      console.error("Subscription Error:", error);
      alert("An error occurred during subscription! ❌");
    }
  };

  return (
    <>
      <div className='flex justify-center'>
        <h1 className='text-3xl font-bold mt-10 italic text-red-800'>{t("coatch3.title")}</h1>
      </div>
      <div>
        <p className='text-center mt-5 text-2xl'>{t("coatch3.result")}</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-20'>
          <div>
            <section className="py-12 px-6 lg:px-20">
              <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-2xl">
                <h2 className="text-3xl font-bold text-gray-400 mb-6 text-center">{t("coatch3.name")}</h2>
                <p className="text-gray-700 text-lg mb-4">{t("coatch3.description")}</p>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold text-gray-400 mb-3">{t("coatch3.customized")}</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>{t("coatch3.weight")}</li>
                    <li>{t("coatch3.muscle")}</li>
                    <li>{t("coatch3.fitness")}</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold text-gray-400 mb-3">{t("coatch3.holistic")}</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>{t("coatch3.latest")}</li>
                    <li>{t("coatch3.nutrition")}</li>
                    <li>{t("coatch3.energy")}</li>
                  </ul>
                  <form onSubmit={handleSubscribe} className='flex flex-col gap-5 lg:w-8/12 p-4 md:w-8/12 w-full justify-center'>
                    <select 
                      id="gym-plan" 
                      name="gym-plan" 
                      className='bg-black text-gray-400'
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                    >
                      <option value="">{t("coatch3.gym_plan")}</option>
                      <option value="monthly">{t("coatch3.monthly")}</option>
                      <option value="quarterly">{t("coatch3.quarterly")}</option>
                    </select>
                    <button
                      type="submit"
                      className="border-2 border-solid border-red-800 py-2 px-6 mt-5 rounded-full text-white hover:bg-orange-500 hover:text-white transition duration-300 w-full sm:w-auto text-center cursor-pointer"
                    >
                      {t("button")}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
          <div className='flex justify-center items-center relative'>
            <Image src={logo} alt="logo" className='w-80 h-96 rounded-2xl transform transition duration-300 hover:scale-105 animate-bounceLight cursor-pointer' />
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

