import { logout } from "@/app/entry/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type ProfileDivType = {
  name: string;
  pic: string;
};

export default function ProfileDiv({ name, pic }: ProfileDivType) {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative flex items-center justify-end">
      <div className="relative" ref={dropdownRef}>
        <Image
          src={pic}
          width={70}
          height={70}
          alt="Profile Icon"
          className="h-14 w-14 md:h-[70px] md:w-[70px] rounded-full cursor-pointer z-10"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className="absolute right-0 md:right-[-150px] mt-2 w-48 bg-white rounded-xl shadow-lg z-20">
            <div className="text-black w-full text-left px-4 py-2 bg-gray-200 md:hidden rounded-t-xl">
              {name}
            </div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm rounded-xl text-gray-700 hover:bg-gray-100"
            >
              Change Avatar
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm rounded-b-xl text-gray-700 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        )}
      </div>
      <div className="hidden md:flex items-center bg-purple-800 rounded-xl ml-[-20px] pl-[30px] pr-4 py-3">
        <span className="text-xl text-white">{name}</span>
      </div>
    </div>
  );
}
