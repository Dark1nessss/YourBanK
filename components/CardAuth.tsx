'use client';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const CardAuth = () => {
  const mockCardNumber = '1234 5678 9123 9876';
  const mockUserName = 'John Doe';
  const mockExpirationDate = '12/12';

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    },
    [cardRef]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0.5, y: 0.5 });
  }, []);

  const rotationX = (mousePosition.y - 0.5) * 30;
  const rotationY = (mousePosition.x - 0.5) * -30;

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        ref={cardRef}
        className="bank-card transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bank-card_content">
          <Image
            src="/icons/logo_white.svg"
            width={30}
            height={30}
            alt="logo"
          />
          <h1 className="text-16 font-semibold text-white">YourBank</h1>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">
                {mockUserName}
              </h1>
              <h2 className="text-12 font-semibold text-white">
                {mockExpirationDate}
              </h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              {mockCardNumber.slice(0, 4)} {mockCardNumber.slice(5, 9)}{' '}
              {mockCardNumber.slice(10, 12)} {mockCardNumber.slice(12)}
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
