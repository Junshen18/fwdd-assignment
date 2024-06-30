import Image from "next/image";

type ProfileDivType = {
  name: string;
  pic: string;
};

export default function ProfileDiv({ name, pic }: ProfileDivType) {
  return (
    <>
      <div className="relative w-[300px] justify-end flex">
        <div className="h-[60px] rounded-xl bg-purple-800 pr-4 pl-11 py-3 w-64 flex flex-row gap-5 align-middle">
          <Image
            src={pic}
            width={70}
            height={70}
            alt="Profile Icon"
            className="absolute -top-1 left-3"
          ></Image>
          <div className="text-xl flex items-center text-center"> {name}</div>
        </div>
      </div>
    </>
  );
}
