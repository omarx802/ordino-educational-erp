import { LoginForm } from "@/src/components/login-form"
import { ModeToggle } from "@/src/components/mode-toggle"

export default function Login() {
  return (
    <>
      <div className="fixed top-2 right-2 p-2">
        <ModeToggle />
      </div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <LoginForm />
      </div>
    </>
  );
}
