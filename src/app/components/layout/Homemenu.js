"use client";
import Image from "next/image";
import Menuitem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";
import { useState } from "react";
import { useEffect } from "react";

export default function Homemenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);
  return (
    <>
      <section className="">
        <div className="absolute left-0 right-0 w-full justify-start">
          <div className="absolute left-0 -top-[70px] text-left -z-10">
            <Image
              src={"/sallad1.png"}
              width={109}
              height={189}
              alt={"sallad"}
            />
          </div>
          <div className="absolute -top-[] right-0 -z-10">
            <Image
              src={"/sallad2.png"}
              width={107}
              height={195}
              alt={"sallad"}
            />
          </div>
        </div>
        <SectionHeader subHeader={"check out"} mainHeader={"Best Sellers"} />
        <div className="grid md:grid-cols-3 gap-4">
          {bestSellers?.length > 0 &&
            bestSellers.map((item) => <Menuitem key={item._id} {...item} />)}
        </div>
      </section>
    </>
  );
}
