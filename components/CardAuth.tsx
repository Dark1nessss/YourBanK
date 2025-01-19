"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const CardAuth = () => {
  const mockCardNumber = "1234 5678 9123 9876";
  const mockUserName = "John Doe";
  const mockExpirationDate = "12/12";

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted

  useEffect(() => {
    setIsMounted(true); // Set to true once the component has mounted

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Only access window if the component is mounted (client-side)
  const rotationX = isMounted ? (mousePosition.y / window.innerHeight - 0.5) * 60 : 0;
  const rotationY = isMounted ? (mousePosition.x / window.innerWidth - 0.5) * -60 : 0;

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="auth-bank-card relative flex h-[190px] w-full max-w-[320px] justify-between rounded-[20px] border border-white bg-gradient-to-r from-green-500 to-blue-600 shadow-xl backdrop-blur-[6px] transition-all duration-300"
        style={{
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
        }}
      >
        <div className="auth-bank-card_content relative z-10 flex flex-col justify-between rounded-l-[20px] bg-gray-700 bg-opacity-80 px-5 pb-4 pt-5">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <h1 className="text-16 font-semibold text-white">YourBank</h1>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">{mockUserName}</h1>
              <h2 className="text-12 font-semibold text-white">{mockExpirationDate}</h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              {mockCardNumber.slice(0, 4)} {mockCardNumber.slice(5, 9)} {mockCardNumber.slice(10, 12)} {mockCardNumber.slice(12)}
            </p>
          </article>
        </div>

        <div className="auth-bank-card_icon flex flex-col items-end justify-between rounded-r-[20px] bg-gradient-to-r from-green-500 to-blue-600 bg-cover bg-center py-5 pr-5">
          <Image 
            src="/icons/Paypass.svg"
            width={20}
            height={24}
            alt="Paypass"
          />
          <Image 
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="MasterCard"
            className="ml-5"
          />
        </div>

        <Image 
          src="/icons/Lines.svg"
          width={316}
          height={190}
          alt="Card design"
          className="auth-bank-card_lines absolute top-0 left-0"
        />
      </div>
    </div>
  );
};

export default CardAuth;