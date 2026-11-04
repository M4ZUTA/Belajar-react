import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import { dosenList } from "@/Data/Dummy";

const DosenDetail = () => {
  const { nidn } = useParams();
  const navigate = useNavigate();
  const [dosen, setDosen] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("dosen");
    const data = saved ? JSON.parse(saved) : dosenList;
    setDosen(data.find((item) => item.nidn === nidn) || null);
  }, [nidn]);

  if (!dosen) {
    return (
      <Card>
        <p className="text-gray-700 mb-4">Data dosen tidak ditemukan.</p>
        <Button onClick={() => navigate("/admin/dosen")}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card>
      <Heading className="mb-5">Detail Dosen</Heading>
      <div className="space-y-3 mb-6">
        <p><span className="font-semibold">NIDN:</span> {dosen.nidn}</p>
        <p><span className="font-semibold">Nama:</span> {dosen.nama}</p>
        <p><span className="font-semibold">Mata Kuliah:</span> {dosen.mataKuliah}</p>
        <p><span className="font-semibold">Status:</span> {dosen.status}</p>
      </div>
      <Button onClick={() => navigate("/admin/dosen")}>Kembali</Button>
    </Card>
  );
};

export default DosenDetail;