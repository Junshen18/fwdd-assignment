export default function FindRoomPage() {
  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center flex flex-col justify-center items-center"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <div
          className={
            "flex flex-col items-center justify-center h-3/5 bg-transparent -translate-y-10 scale-125"
          }
        >
          <h1 className="text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#F5BFBF] to-white drop-shadow-lg">
            PYTHON
          </h1>
          <h1 className="text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#EB7E7E] to-[#F5BFBF] drop-shadow-lg mt-2">
            WIZARD
          </h1>
        </div>
      </div>
    </>
  );
}
