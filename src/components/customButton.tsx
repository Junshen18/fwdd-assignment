"use client";
type CustomButtonProps = {
  text: string;
  onClick: () => void;
  formAction?: string;
  bgColor: string;
  borderColor: string;
  w?: string;
  buttonType?: "submit" | "reset" | "button";
};
export default function CustomButton({
  text,
  onClick,
  formAction,
  bgColor,
  borderColor,
  w,
  buttonType,
}: CustomButtonProps) {
  return (
    <button
      formAction={formAction}
      type={buttonType}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        width: w ? w : "320px",
      }}
      className={`cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
        border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-2xl md:text-3xl
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
