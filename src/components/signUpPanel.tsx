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
import { signup } from "@/app/api/auth/action";

export default function SignupPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await signup(formData);
      if (result.success) {
        setIsOpen(false); // Close the dialog
        setSuccessMessage(
          "Sign up successful! Please check your email to verify your account."
        );
        // Optionally, you can clear the form fields here
        setName("");
        setEmail("");
        setPassword("");
      } else {
        // Signup failed
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {successMessage && (
        <div
          className="fixed top-0 left-0 right-0 bg-green-100 border-b border-green-400 text-green-700 px-4 py-3 text-center"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => {
              buttonSound();
              setIsOpen(true);
            }}
            className="pointer-events-auto hover:animate-bounce md:text-5xl text-3xl leading-none drop-shadow-lg"
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="username" className="">
                  Username:
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={name}
                  className="col-span-3"
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <Label htmlFor="email" className="text-right">
                  Email:
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  className="col-span-3"
                  onChange={(event) => setEmail(event.target.value)}
                  required
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
                  value={password}
                  className="col-span-3"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <DialogFooter className="mt-3">
              <button
                type="submit"
                style={{
                  backgroundColor: "#515a92",
                  borderColor: "#484877",
                  width: "210px",
                }}
                className={`cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
                border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-3xl
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
                onClick={() => buttonSound()}
              >
                Sign Up
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
