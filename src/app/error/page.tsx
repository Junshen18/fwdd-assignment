import Image from "next/image";

export default function ErrorPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-5">
        <Image src="/404-error.png" width={300} height={300} alt="404 error" />
        <div className="text-2xl">Sorry, something went wrong</div>
      </div>
    </>
  );
}
