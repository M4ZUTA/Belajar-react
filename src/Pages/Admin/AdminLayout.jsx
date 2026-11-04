import { Outlet } from "react-router-dom";
import Sidebar from "@/Pages/Admin/Components/Sidebar";
import Header from "@/Pages/Admin/Components/Header";
import Footer from "@/Pages/Admin/Components/Footer";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Sidebar />
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;