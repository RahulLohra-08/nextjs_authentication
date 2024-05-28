"use client";
import Image from "next/image";
import HomePage from "./home/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div className="">
      <ToastContainer />
      <HomePage />
    </div>
  );
}
