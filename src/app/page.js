import Image from "next/image";
import Link from "next/link";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import Homemenu from "./components/layout/Homemenu";
import SectionHeader from "./components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <Homemenu />
      <section className="text-center my-16" id="about">
        <SectionHeader
          subHeader={"our Story"}
          mainHeader={"About us"}
          classname="m-5 p-5 mt-5"
        />
        <div className=" text-gray-500 max-w-[600px] mx-auto mt-4 text-center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <br />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <br></br>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>

          <br />
          <section id="contact">
            <SectionHeader
              subHeader={"Don't hesitate"}
              mainHeader={"Contact us"}
            />
            <br />
            <a
              href="tel:+789456123478"
              className="text-4xl text-center underline text-gray-500"
            >
              +789456123478
            </a>
          </section>
          <br />
        </div>
      </section>
    </>
  );
}
