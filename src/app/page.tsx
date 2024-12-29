import { CreateAccount } from "@/src/components/signup-form"
import { ModeToggle } from "@/src/components/mode-toggle";

export default function Page() {
  return (
    <>
      <div className="fixed top-2 right-2 p-2">
        <ModeToggle />
        212.7 26.8% 83.9%
      </div>
    <div className="flex h-screen w-full items-center justify-center px-4">
      <CreateAccount />
    </div>
    </>
  );
}
