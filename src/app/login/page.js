"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
// pages/index.js

export default function LoginPage() {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const { data: session } = useSession(); // Access the session object

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
    console.log("inside LoginPage");
    console.log(res);

    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="mx-auto text-primary text-4xl text-center">Login</h1>;
      <form className="max-w-xs mx-auto">
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          disabled={loginInProgress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          disabled={loginInProgress}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loginInProgress}
          onClick={handleFormSubmit}
        >
          Login
        </button>
        <div className="text-gray-500 text-center my-4">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex justify-center gap-4 items-center"
        >
          <img src="/google.jpeg" height={32} width={32}></img>
          Login with google
        </button>
      </form>
    </section>
  );
}
