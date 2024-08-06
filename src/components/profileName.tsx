import { logout } from "@/app/api/auth/action";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";

type ProfileDivType = {
  name: string;
};

export default function ProfileDiv({ name }: ProfileDivType) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [changeAvatarPanel, setChangeAvatarPanel] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    // fetch avatar from supabase
    const fetchAvatar = async () => {
      const userId = localStorage.getItem("user_id");
      console.log("local storage userId:", userId);
      if (!userId) return;

      console.log("fetching avatar..");
      const { data, error } = await supabase
        .from("user")
        .select("user_avatar")
        .eq("user_id", userId)
        .single();
      console.log("fetched avatar:", data);

      if (error) {
        console.error("Error fetching avatar:", error);
      } else {
        setAvatar(data.user_avatar || "/pfp1.svg");
      }
    };
    fetchAvatar();
    // setAvatar(pic);

    // handle click outside of dropdown
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

  // handle logout
  const handleLogout = () => {
    logout();
    localStorage.clear();
  };

  // handle change avatar
  const changeAvatar = async (avatarIndex: number) => {
    setIsLoading(true);
    const newAvatarUrl = `/pfp${avatarIndex}.svg`;

    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) throw new Error("User ID not found");

      // update avatar in supabase
      const { error } = await supabase
        .from("user")
        .update({ user_avatar: newAvatarUrl })
        .eq("user_id", userId);

      if (error) throw error;

      // update avatar in local storage
      localStorage.setItem("user_avatar", newAvatarUrl);

      // update avatar in state
      setAvatar(newAvatarUrl);

      // close change avatar panel and show dropdown
      setChangeAvatarPanel(false);
      setShowDropdown(!showDropdown);
      router.refresh(); // Refresh the page to update the avatar
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-end md:mr-4 lg:mr-10">
      <div className="relative" ref={dropdownRef}>
        <Image
          src={avatar || "/pfp1.svg"}
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
              onClick={() => setChangeAvatarPanel(true)}
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
        {changeAvatarPanel && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto"
            onClick={() => setChangeAvatarPanel(false)}
          >
            <div className="bg-indigo-700 rounded-xl w-3/4 h-1/2 md:w-2/3 lg:h-4/5 items-center justify-center relative flex flex-col p-5 text-2xl">
              <h1 className="text-2xl md:text-4xl">Change Avatar</h1>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-white text-2xl md:text-5xl absolute top-5 right-7 cursor-pointer"
                onClick={() => setChangeAvatarPanel(false)}
              />
              <div className="flex justify-center items-center h-full bg-slate-100 rounded-xl w-11/12 mt-4 p-4 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-left justify-left self-start w-fit">
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
                          changeAvatar(index + 1);
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
