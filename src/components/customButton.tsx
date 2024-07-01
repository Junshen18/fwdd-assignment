type CustomButtonProps = {
  text: string;
  onClick: () => void;
  bgColor: string;
  borderColor: string;
  w?: string;
};
export default function CustomButton({
  text,
  onClick,
  bgColor,
  borderColor,
  w,
}: CustomButtonProps) {
  return (
    <button
      type="submit"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        width: w ? w : "320px",
      }}
      className={`cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
        border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-3xl
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
