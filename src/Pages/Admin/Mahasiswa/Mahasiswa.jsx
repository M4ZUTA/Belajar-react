import { useState, useEffect } from "react";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";

import { mahasiswaList } from "@/Data/Dummy";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    nim: "",
    nama: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMahasiswa(mahasiswaList);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleTambah = () => {
    setIsEdit(false);

    setForm({
      nim: "",
      nama: "",
    });

    setIsModalOpen(true);
  };

  const handleEdit = (mhs) => {
    setIsEdit(true);

    setForm({
      nim: mhs.nim,
      nama: mhs.nama,
    });

    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      setMahasiswa(
        mahasiswa.map((mhs) =>
          mhs.nim === form.nim
            ? { ...mhs, nama: form.nama }
            : mhs
        )
      );
    } else {
      const nimExists = mahasiswa.some(
        (mhs) => mhs.nim === form.nim
      );

      if (nimExists) {
        alert("NIM sudah terdaftar!");
        return;
      }

      setMahasiswa([...mahasiswa, form]);
    }

    setForm({
      nim: "",
      nama: "",
    });

    setIsModalOpen(false);
  };

  const handleDelete = (nim, nama) => {
    if (confirm(`Yakin ingin hapus ${nama}?`)) {
      setMahasiswa(
        mahasiswa.filter((mhs) => mhs.nim !== nim)
      );
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">
          Daftar Mahasiswa
        </Heading>

        <Button onClick={handleTambah}>
          + Tambah Mahasiswa
        </Button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {mahasiswa.map((mhs, index) => (
            <tr
              key={mhs.nim}
              className={
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }
            >
              <td className="py-2 px-4">{mhs.nim}</td>
              <td className="py-2 px-4">{mhs.nama}</td>

              <td className="py-2 px-4 text-center space-x-2">
                <a
                  href={`/admin/mahasiswa/${mhs.nim}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                >
                  Detail
                </a>

                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEdit(mhs)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(mhs.nim, mhs.nama)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <Heading as="h2" className="mb-4">
              {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
            </Heading>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="nim">NIM</Label>

                <Input
                  type="text"
                  name="nim"
                  value={form.nim}
                  onChange={handleChange}
                  readOnly={isEdit}
                  required
                  placeholder="Masukkan NIM"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="nama">Nama</Label>

                <Input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama mahasiswa"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </Button>

                <Button type="submit">
                  {isEdit ? "Update" : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Mahasiswa;