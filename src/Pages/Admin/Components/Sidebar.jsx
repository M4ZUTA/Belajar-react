import { NavLink, useNavigate } from "react-router-dom";
import Button from "@/Pages/Admin/Components/Button";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded transition ${isActive ? "bg-orange-600 text-white" : "text-white hover:bg-orange-500"}`;

  return (
    <nav className="bg-orange-700 px-4 py-3 flex flex-wrap items-center gap-3">
      <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
      <NavLink to="/admin/dosen" className={linkClass}>Dosen</NavLink>
      <div className="ml-auto">
        <Button variant="secondary" size="sm" onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
};

export default Sidebar;