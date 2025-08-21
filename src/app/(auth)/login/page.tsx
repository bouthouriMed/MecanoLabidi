"use client";

import React, { useState } from "react";
import {
  LoginContainer,
  LoginForm,
  Input,
  Label,
  Button,
  Title,
  ErrorMsg,
} from "./login.styles";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
}
