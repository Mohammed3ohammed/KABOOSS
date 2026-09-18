"use client";
import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import axios from "axios";
import { useRouter } from "../../../i18n/routing";

type Coach = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Subscription = {
  client_name: string;
  client_email: string;
  program_type: string;
  coach_name: string;
  subscription_status: string;
  start_date: string;
  end_date: string;
};

const Page = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [newCoach, setNewCoach] = useState<Partial<Coach>>({
    name: "",
    email: "",
    phone: "",
  });
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: "",
    email: "",
    phone: "",
  });

  const router = useRouter();


  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSubscriptions(response.data.clients);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const addCoach = () => {
    axios
      .post("http://127.0.0.1:8000/api/admin/coaches/add", newCoach)
      .then((res) => {
        setCoaches([...coaches, res.data]);
        setIsModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const addClient = () => {
    axios
      .post("http://127.0.0.1:8000/api/admin/clients/add", newClient)
      .then((res) => {
        setClients([...clients, res.data]);
        setIsClientModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Logout failed");
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("extra_data");
      router.push("/log");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>

      {/* Coaches Section */}
      <div className="flex justify-between items-center mt-20 mb-4">
        <h2 className="text-xl font-semibold">Coaches List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <UserPlus size={20} />
          Add Coach
        </button>
      </div>
      <table className="table-auto min-w-full border-collapse shadow-lg">
        <thead className="bg-white text-black">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach) => (
            <tr key={coach.id} className="border-b">
              <td className="px-4 py-2">{coach.id}</td>
              <td className="px-4 py-2">{coach.name}</td>
              <td className="px-4 py-2">{coach.email}</td>
              <td className="px-4 py-2">{coach.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Clients Section */}
      <div className="flex justify-between items-center mt-20 mb-4">
        <h2 className="text-xl font-semibold">Clients List</h2>
        <button
          onClick={() => setIsClientModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <UserPlus size={20} />
          Add Client
        </button>
      </div>
      <table className="table-auto min-w-full border-collapse shadow-lg">
        <thead className="bg-white text-black">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b">
              <td className="px-4 py-2">{client.id}</td>
              <td className="px-4 py-2">{client.name}</td>
              <td className="px-4 py-2">{client.email}</td>
              <td className="px-4 py-2">{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Subscriptions Section */}
      <div className="flex justify-between items-center mt-20 mb-4">
        <h2 className="text-xl font-semibold">Subscriptions List</h2>
      </div>
      <table className="table-auto min-w-full border-collapse shadow-lg mb-8">
        <thead className="bg-white text-black">
          <tr>
            <th className="px-4 py-2 text-left">Client Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Program Type</th>
            <th className="px-4 py-2 text-left">Coach</th>
            <th className="px-4 py-2 text-left">Start Date</th>
            <th className="px-4 py-2 text-left">End Date</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{subscription.client_name}</td>
              <td className="px-4 py-2">{subscription.client_email}</td>
              <td className="px-4 py-2 capitalize">{subscription.program_type}</td>
              <td className="px-4 py-2">{subscription.coach_name}</td>
              <td className="px-4 py-2">{new Date(subscription.start_date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(subscription.end_date).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded ${
                  subscription.subscription_status === 'Active' 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-red-200 text-red-800'
                }`}>
                  {subscription.subscription_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Coach</h2>
            <input
              type="text"
              placeholder="Name"
              className="border w-full p-2 mb-2 rounded"
              onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              onClick={addCoach}
            >
              Add Coach
            </button>
          </div>
        </div>
      )}

      {isClientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Client</h2>
            <input
              type="text"
              placeholder="Name"
              className="border w-full p-2 mb-2 rounded"
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              onClick={addClient}
            >
              Add Client
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Page;