"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import Link from "next/link";

const links = [
  { text: "History", link: "/history", icon: FaHistory },
  { text: "Favorites", link: "/favorites", icon: CiStar },
];

export const UserButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Check if click is outside both trigger and dropdown content
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={triggerRef}>
      <button onClick={() => setIsClicked((prev) => !prev)}>
        <Image
          width={1000}
          height={1000}
          src="https://th.bing.com/th/id/R.578e62715eaa62d3979fc72d09ff2807?rik=zwnZbhfC%2f%2bEdFw&riu=http%3a%2f%2fwww.baytekent.com%2fwp-content%2fuploads%2f2016%2f12%2ffacebook-default-no-profile-pic1.jpg&ehk=MKVbuUiOWCQ4f7d%2fTknilYnrg4IyIHs54kQO1mxHX2E%3d&risl=&pid=ImgRaw&r=0"
          alt="User Profile"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>
      {isClicked && (
        <div
          ref={dropdownRef}
          className="bg-slate-100 z-50 p-2 w-[125px] flex flex-col items-start justify-start gap-y-2 absolute right-0 top-100"
        >
          {links.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className="w-full flex items-center justify-between"
            >
              <span>{item.text}</span>
              <item.icon />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
