import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";
import { dosenList } from "@/Data/Dummy";

const Dosen = () => {
  const [dosen, setDosen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nidn: "", nama: "", mataKuliah: "", status: "Aktif" });

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedDosen = localStorage.getItem("dosen");
      if (savedDosen) {
        setDosen(JSON.parse(savedDosen));
      } else {
        setDosen(dosenList);
        localStorage.setItem("dosen", JSON.stringify(dosenList));
      }
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const saveDosen = (newDosen) => {
    setDosen(newDosen);
    localStorage.setItem("dosen", JSON.stringify(newDosen));
  };

  const resetForm = () => {
    setForm({ nidn: "", nama: "", mataKuliah: "", status: "Aktif" });
    setError("");
  };

  const openTambah = () => {
    setIsEdit(false);
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setIsEdit(true);
    setForm({ ...item });
    setError("");
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.nidn)) {
      setError("NIDN wajib terdiri dari 10 digit angka.");
      return;
    }
    if (!form.nama.trim() || !form.mataKuliah.trim()) {
      setError("Nama dan mata kuliah wajib diisi.");
      return;
    }

    if (isEdit) {
      const updated = dosen.map((item) => item.nidn === form.nidn
        ? { ...form, nama: form.nama.trim(), mataKuliah: form.mataKuliah.trim() }
        : item);
      saveDosen(updated);
    } else {
      if (dosen.some((item) => item.nidn === form.nidn)) {
        setError("NIDN sudah terdaftar.");
        return;
      }
      saveDosen([...dosen, { ...form, nama: form.nama.trim(), mataKuliah: form.mataKuliah.trim() }]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (item) => {
    if (item.status === "Aktif") return;
    if (window.confirm(`Yakin ingin menghapus dosen ${item.nama}?`)) {
      saveDosen(dosen.filter((d) => d.nidn !== item.nidn));
    }
  };

  const filteredDosen = dosen.filter((item) => item.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Heading>Daftar Dosen</Heading>
        <Button onClick={openTambah}>+ Tambah Dosen</Button>
      </div>

      <div className="mb-5 max-w-md">
        <Input name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama dosen..." />
      </div>

      {isLoading ? (
        <p className="text-gray-600">Memuat data dosen...</p>
      ) : filteredDosen.length === 0 ? (
        <Card><p className="text-gray-600">Data dosen tidak ditemukan.</p></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredDosen.map((item) => (
            <Card key={item.nidn} className="p-5">
              <div className="flex justify-between items-start gap-3 mb-3">
                <Heading as="h3" className="text-lg">{item.nama}</Heading>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>{item.status}</span>
              </div>
              <p className="text-sm text-gray-600">NIDN: {item.nidn}</p>
              <p className="text-sm text-gray-600 mb-4">Mata Kuliah: {item.mataKuliah}</p>
              <div className="flex flex-wrap gap-2">
                <Link to={`/admin/dosen/${item.nidn}`} className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm">Detail</Link>
                <Button size="sm" variant="warning" onClick={() => openEdit(item)}>Edit</Button>
                <Button size="sm" variant="danger" disabled={item.status === "Aktif"} onClick={() => handleDelete(item)} title={item.status === "Aktif" ? "Dosen aktif tidak boleh dihapus" : "Hapus dosen"}>Hapus</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <Heading as="h2" className="mb-5">{isEdit ? "Edit Dosen" : "Tambah Dosen"}</Heading>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nidn">NIDN</Label>
                <Input name="nidn" value={form.nidn} onChange={handleChange} readOnly={isEdit} required placeholder="Masukkan 10 digit NIDN" />
              </div>
              <div>
                <Label htmlFor="nama">Nama Dosen</Label>
                <Input name="nama" value={form.nama} onChange={handleChange} required placeholder="Masukkan nama dosen" />
              </div>
              <div>
                <Label htmlFor="mataKuliah">Mata Kuliah</Label>
                <Input name="mataKuliah" value={form.mataKuliah} onChange={handleChange} required placeholder="Masukkan mata kuliah" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" value={form.status} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </div>
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => { setIsModalOpen(false); resetForm(); }}>Batal</Button>
                <Button type="submit">{isEdit ? "Update" : "Simpan"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dosen;