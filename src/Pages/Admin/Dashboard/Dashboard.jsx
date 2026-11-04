import { useEffect, useState } from "react";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import { dosenList } from "@/Data/Dummy";

const Dashboard = () => {
  const [dosen, setDosen] = useState([]);

  useEffect(() => {
    const storedDosen = localStorage.getItem("dosen");
    setDosen(storedDosen ? JSON.parse(storedDosen) : dosenList);
  }, []);

  const totalDosen = dosen.length;
  const dosenAktif = dosen.filter((item) => item.status === "Aktif").length;
  const dosenCuti = dosen.filter((item) => item.status === "Cuti").length;

  const cards = [
    { title: "Total Dosen", value: totalDosen },
    { title: "Dosen Aktif", value: dosenAktif },
    { title: "Dosen Cuti", value: dosenCuti },
  ];

  return (
    <div>
      <Heading className="mb-6">Dashboard</Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((item) => (
          <Card key={item.title} className="p-6">
            <p className="text-gray-600">{item.title}</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{item.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;