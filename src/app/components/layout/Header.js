"use client";
import { CartContext } from "../AppContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import ShoppingCart from "../icons/ShoppingCart";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    );
  }
}
export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session.status;
  const Userdata = session.data?.user;
  const { cartProducts } = useContext(CartContext);
  let name = Userdata?.name || Userdata?.email;
  if (name && name.includes(" ")) {
    name = name.split(" ")[0];
  }
  return (
    <header className="flex items-center justify-between">
      <Link className="text-primary font-semibold text-2xl" href={"/"}>
        ST Pizza
      </Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        <AuthLinks status={status} userName={name} />
        <Link href={"/cart"} className="relative">
          <ShoppingCart />
          {cartProducts?.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
              {cartProducts.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
