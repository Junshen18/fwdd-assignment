"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import useSound from "use-sound";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomButton from "./customButton";
import { login } from "@/app/entry/action";

export default function LoginPanel() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Store login data in localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("password", password);
    console.log(`Login data stored ${name}, ${password}`);
    router.push("/findRoom");
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            onClick={() => {
              buttonSound();
            }}
            className="pointer-events-auto hover:animate-bounce md:text-5xl text-3xl leading-none drop-shadow-lg"
          >
            Login
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] items-center flex flex-col absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-[#6b69b9] text-white rounded-[10px] p-8 drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold m-2">
              Login
            </DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="name" className="text-right">
                  Name:
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={name}
                  className="col-span-3"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="password" className="">
                  Password:
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  defaultValue=""
                  className="col-span-3"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter className="mt-3 justify-center">
              <button
                type="submit"
                formAction={login}
                style={{
                  backgroundColor: "#515a92",
                  borderColor: "#484877",
                  width: "200px",
                }}
                className={`cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
        border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-3xl
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
                onClick={() => {
                  buttonSound();
                }}
              >
                Login
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
