import Header from "@/components/header";
import QrScanner from "@/components/qrCode";

export default function CreateRoom() {
  return (
    <>
      <div
        className="flex flex-col w-screen h-screen justify-center items-center gap-7"
        style={{
          backgroundImage: `url('/createRoom-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <h1 className="text-xl w-2/3 text-center md:w-auto md:text-3xl">
          Scan the Game QR to create room
        </h1>
        <div className="w-96">
          <QrScanner />
        </div>
      </div>
    </>
  );
}
