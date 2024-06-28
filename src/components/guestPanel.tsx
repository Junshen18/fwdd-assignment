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
import { useState } from "react";

export default function GuestPanel() {
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

  function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            onClick={() => {
              buttonSound();
              setRandomNumber(generateRandomNumber);
            }}
            className="pointer-events-auto hover:animate-bounce text-5xl leading-none drop-shadow-lg"
          >
            Guest
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] items-center flex flex-col absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-[#6b69b9] text-white rounded-[10px] p-8 drop-shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold m-2">
              Play as Guest
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="email" className="text-right">
                Name:
              </Label>
              <Input
                id="email"
                defaultValue={`Guest${randomNumber}`}
                className="col-span-3 "
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <button
              type="submit"
              className="bg-[#515a92] hover:bg-[#484877] text-2xl py-2 px-10 rounded-full drop-shadow-lg"
            >
              Start
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
