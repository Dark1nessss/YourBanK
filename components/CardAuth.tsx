"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const CardAuth = () => {
  const mockCardNumber = "1234 5678 9123 9876";
  const mockUserName = "John Doe";
  const mockExpirationDate = "12/12";

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const rotationX = isMounted ? (mousePosition.y / window.innerHeight - 0.5) * 50 : 0;
  const rotationY = isMounted ? (mousePosition.x / window.innerWidth - 0.5) * -50 : 0;

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="bank-card"
        style={{
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
        }}
      >
        <div className="bank-card_content">
          <Image src="/icons/logo_white.svg" width={30} height={30} alt="logo" />
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

        <div className="bank-card_icon">
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
          className="absolute top-0 left-0"
        />
      </div>
    </div>
  );
};

export default CardAuth;