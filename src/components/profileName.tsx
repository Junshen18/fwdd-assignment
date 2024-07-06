import Image from "next/image";

type ProfileDivType = {
  name: string;
  pic: string;
};

export default function ProfileDiv({ name, pic }: ProfileDivType) {
  return (
    <>
      <div className="relative w-60 md:w-[300px]  justify-end flex items-center">
        <div className="h-12 md:h-[60px] rounded-xl bg-purple-800 pr-4 pl-11 py-3 w-60 md:w-64 flex flex-row gap-5 align-middle ">
          <Image
            src={pic}
            width={70}
            height={70}
            alt="Profile Icon"
            className="absolute -top-1 lg:left-3 -left-3 h-14 md:h-[70px]"
          ></Image>
          <div className="text-xl flex items-center text-center pl-3 md:pl-5 lg:pl-0">
            {name}
          </div>
        </div>
      </div>
    </>
  );
}
