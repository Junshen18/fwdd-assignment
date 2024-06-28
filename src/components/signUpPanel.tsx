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

export default function SignUpPanel() {
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            onClick={() => buttonSound()}
            className="pointer-events-auto hover:animate-bounce text-5xl leading-none drop-shadow-lg"
          >
            Sign Up
          </button>
        </DialogTrigger>
        <DialogContent className="z-10 sm:max-w-[425px] items-center flex flex-col absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-[#6b69b9] text-white rounded-[10px] p-8 drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold m-2">
              Sign Up
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="username" className="">
                Username:
              </Label>
              <Input id="username" defaultValue="" className="col-span-3" />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="email" className="text-right">
                Email:
              </Label>
              <Input id="email" defaultValue="" className="col-span-3 " />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="password" className="">
                Password:
              </Label>
              <Input
                id="password"
                type="password"
                defaultValue=""
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <button
              type="submit"
              onClick={() => {
                router.push("/findRoom");
                buttonSound();
              }}
              className="bg-[#515a92] hover:bg-[#484877] text-2xl py-2 px-10 rounded-full drop-shadow-lg"
            >
              Sign Up
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
