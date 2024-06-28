import Image from "next/image";

type ProfileDivType = {
  name: string;
  pic: string;
};

export default function ProfileDiv({ name, pic }: ProfileDivType) {
  return (
    <>
      <div className="rounded-xl bg-purple-800 px-4 py-3 min-w-64 flex flex-row gap-5 align-middle">
        <Image
          src={pic}
          width={50}
          height={50}
          alt="Profile Icon"
          className=""
        ></Image>
        <div className="text-2xl flex items-center ">{name}</div>
      </div>
    </>
  );
}
