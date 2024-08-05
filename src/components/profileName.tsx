import { logout } from "@/app/api/auth/action";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type ProfileDivType = {
  name: string;
  pic: string;
};

export default function ProfileDiv({ name, pic }: ProfileDivType) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
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
    <div className="relative flex items-center justify-end md:mr-4 lg:mr-10">
      <div className="relative" ref={dropdownRef}>
        <Image
          src={pic}
          width={70}
          height={70}
          alt="Profile Icon"
          className="h-14 w-14 sm:h-[70px] sm:w-[70px] md:h-[90px] md:w-[90px] lg:h-[110px] lg:w-[110px] rounded-full cursor-pointer z-10"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className="absolute right-0 md:right-[-90px] mt-2 w-48 bg-white rounded-xl shadow-lg z-20">
            <div className="text-black w-full text-left px-4 py-2 bg-gray-200 md:hidden rounded-t-xl">
              {name}
            </div>
            <button
              onClick={() => setChangeAvatar(true)}
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
        {changeAvatar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto"
            onClick={() => setChangeAvatar(false)}
          >
            <div className="bg-indigo-700 rounded-xl w-3/4 h-1/2 md:w-2/3 lg:h-4/5 items-center justify-center relative flex flex-col p-5 text-2xl">
              <h1 className="text-2xl md:text-4xl">Change Avatar</h1>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-white text-2xl md:text-5xl absolute top-5 right-7 cursor-pointer"
                onClick={() => setChangeAvatar(false)}
              />
              <div className="flex justify-center items-center h-full bg-slate-100 rounded-xl w-11/12 mt-4 p-4 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-left justify-left self-center w-fit">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={index}
                      className="flex self-start items-center justify-center w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 m-2"
                    >
                      <Image
                        src={`/pfp${index + 1}.svg`}
                        width={100}
                        height={100}
                        alt={`Avatar ${index + 1}`}
                        className="rounded-full cursor-pointer hover:scale-125 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add logic to change the avatar
                          console.log(`Selected avatar: pfp${index + 1}.svg`);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:flex items-center bg-purple-800 rounded-xl ml-[-20px] pl-[30px] pr-4 py-3">
        <span className="text-xl text-white lg:text-4xl">{name}</span>
      </div>
    </div>
  );
}
