"use client";
import { useProfile } from "../../components/UseProfile";
import { useState } from "react";
import Link from "next/link";
import Left from "../../components/icons/left";
import UserTabs from "../../components/layout/UserTabs";
import toast from "react-hot-toast";
import EditableImage from "../../components/layout/EditableImage";
import Image from "next/image";
import { redirect } from "next/navigation";
import MenuItemForm from "../../components/layout/MenuitemForm";

export default function NewMenuItemPage() {
  //const { loading, data } = useProfile();

  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading: profileLoading, data: profileData } = useProfile();
  //   if (loading) {
  //     return "..loading";
  //   }
  //   if (!data.admin) {
  //     return "..not an admin";
  //   }
  if (profileLoading) {
    return "Loading user info...";
  }
  if (!profileData.admin) {
    return "not an admin";
  }

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving This tasty item",
      success: "Saved",
      error: "Error",
    });

    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }
  return (
    <>
      <section className="mt-8 pt-8">
        <UserTabs admin={true} />
        <div className=" mx-auto mt-8 max-w-md">
          <Link href={"/menu-items"} className="button">
            <Left />
            <span>Show all menu items</span>
          </Link>
        </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
      </section>
    </>
  );
}
