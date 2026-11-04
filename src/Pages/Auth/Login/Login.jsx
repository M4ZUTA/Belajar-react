import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "@/Pages/Auth/Components/Input";
import Label from "@/Pages/Auth/Components/Label";
import Button from "@/Pages/Auth/Components/Button";
import Card from "@/Pages/Auth/Components/Card";
import Heading from "@/Pages/Auth/Components/Heading";
import Form from "@/Pages/Auth/Components/Form";
import { dummyUser } from "@/Data/Dummy";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email.trim() === dummyUser.email && form.password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      navigate("/admin/dashboard");
    } else {
      setError("Email atau password salah!");
    }
  };
  return (
    <Card className="max-w-md">
      <Heading as="h2">ADMIN-13361</Heading>
      <p className="text-center text-gray-600 mb-6">Login Admin Data Dosen</p>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="Masukkan email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Masukkan password" value={form.password} onChange={handleChange} required />
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full">Login</Button>
      </Form>
    </Card>
  );
};

export default Login;