"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import useSound from "use-sound";

type LoginPanelType = {
  buttonText: string;
  title: string;
  desc: string;
};

export default function LoginPanel({
  buttonText,
  title,
  desc,
}: LoginPanelType) {
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            onClick={() => buttonSound()}
            className="pointer-events-auto hover:animate-bounce text-5xl leading-none"
          >
            {buttonText}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[500px] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-white text-black rounded-2xl p-8">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{desc}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <button type="submit">Save changes</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <div className="w-[350px] h-[550px] bg-indigo-500 rounded-lg">
        Create an account
        <form>
          <div>Username</div>
          <input type="text" name="name"></input>
          <div>Password</div>
          <input type="password" name="password"></input>
        </form>
      </div> */}
    </>
  );
}
