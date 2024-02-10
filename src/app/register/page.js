"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatinguser, setCreatinguser] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatinguser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatinguser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="mx-auto text-primary text-4xl text-center">Register</h1>
      {userCreated && (
        <div className="my-4 text-center font-semibold">
          User Created.
          <br /> Now you can{" "}
          <Link href={"/login"} className="underline">
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center font-semibold">
          An Error has occured
          <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatinguser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatinguser}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatinguser}>
          Register
        </button>
        <div className="text-gray-500 text-center my-4">
          or login with provider
        </div>
        <button
          className="flex justify-center gap-4 items-center"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <img src="/google.jpeg" height={32} width={32}></img>
          Login with google
        </button>
        <div className="m-4 text-center">
          Existing account?{" "}
          <Link href={"/login"} className="underline">
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
