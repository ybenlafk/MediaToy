'use client';
import React from "react";
import UserProfile from "../components/Profile/UserProfile";
import { useGlobalState } from "../components/globalState";


export default function Home() {
  const {state} = useGlobalState();
  const {user} = state;
  return (
    <div className="">
      <UserProfile />
    </div>
  );
}
