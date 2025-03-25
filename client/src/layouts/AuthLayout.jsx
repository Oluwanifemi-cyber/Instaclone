import { Outlet } from "react-router";
import AuthImage from "../assets/AuthImage.png";

export default function AuthLayout() {
  return (
    <section className="max-w[960px] mx-auto flex justify-center gap-8 min-h-screen mt-[100px]">
      <div className="hidden lg:block ml-auto lg:w-[450px] h-[550px]">
        <img src={AuthImage} alt="AuthImage" className="w-full h-full rounded-md"/>
      </div>
      <div className="w-[50%]">
        <Outlet />
      </div>
    </section>
  );
}
