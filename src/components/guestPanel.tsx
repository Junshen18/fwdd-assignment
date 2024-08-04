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
import { useRouter } from "next/navigation";
import CustomButton from "./customButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function GuestPanel() {
  const [name, setName] = useState("");
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: `guest${randomNumber}@temporary.com`,
        password: `tempPass${randomNumber}`,
        options: {
          data: {
            username: name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        console.log("Guest session created:", data.user);
        router.push("/findRoom");
      }
    } catch (error) {
      console.error("Error creating guest session:", error);
    }
  };

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
              const newRandomNumber = generateRandomNumber();
              setRandomNumber(newRandomNumber);
              setName(`Guest${newRandomNumber}`);
            }}
            className="pointer-events-auto hover:animate-bounce md:text-5xl text-3xl leading-none drop-shadow-lg"
          >
            Guest
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] items-center flex flex-col absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-[#6b69b9] text-white rounded-[10px] p-8 drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold m-2">
              Play as Guest
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="name" className="text-right">
                  Name:
                </Label>
                <Input
                  id="name"
                  value={name}
                  className="col-span-3"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter className="mt-3">
              <CustomButton
                text="Start"
                bgColor="#515a92"
                borderColor="#484877"
                onClick={() => {
                  buttonSound();
                }}
                w="200px"
                buttonType="submit"
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
