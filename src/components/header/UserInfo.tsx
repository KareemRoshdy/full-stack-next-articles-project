"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { DOMAIN } from "@/utils/constants";

interface Props {
  user: any;
}

const UserInfo = ({ user }: Props) => {
  const [username, setUsername] = useState("");
  async function getData(id: number) {
    const userData = await fetch(`${DOMAIN}/api/users/profile/${id}`);
    const data = await userData.json();
    setUsername(data.user.username);
  }

  useEffect(() => {
    getData(user.id);
  }, [user]);

  return (
    <div className="ms-2 flex gap-2 items-center">
      <Link href={`/profile`} className="text-teal-300 capitalize font-bold">
        {username?.split(" ")[0]}
      </Link>

      <LogoutButton />
    </div>
  );
};

export default UserInfo;
