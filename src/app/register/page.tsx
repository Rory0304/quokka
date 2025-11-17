import { LoginBanner } from "@/components/pages/login/LoginBanner";
import { LoginForm } from "@/components/pages/login/LoginForm";

export default function Register() {
  return (
    <div className="flex flex-col py-12 items-center  bg-white  w-full h-screen px-6">
      <LoginBanner />
      <LoginForm />
    </div>
  );
}
