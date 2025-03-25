import logo from "../../assets/logo.png";
import {Link} from "react-router";
import { useForm } from "react-hook-form";


export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return(
    <>
    <div className="w-[90vw] md:w-[450px] border rounded-md border-[#A1A1A1] py-[40px] px-[28px]">
    <div className="flex justify-center">
        <Link to="/" >
    <img src={logo}alt="logo"/>
        </Link>
        </div>
        <form className="md:maw-w-[400px] mx-auto mt-10">
        <div className="mb-4">
        <label className="floating-label">
          <span></span>
          <input
           type="email" 
          placeholder="Email" 
          className="input input-lg w-full" 
          id="email"
          />
        </label>
        </div>
        <div className="mb-4">
        <label className="floating-label">
          <span></span>
          <input
           type="text" 
          placeholder="Full name" 
          className="input input-lg w-full" 
          id="Full name"
          />
        </label>
        </div>
        <div className="mb-4">
        <label className="floating-label">
          <span></span>
          <input
           type="text" 
          placeholder="Username" 
          className="input input-lg w-full" 
          id="Username"
          />
        </label>
        </div>
        <div className="mb-4 relative">
        <label className="floating-label">
          <span></span>
          <input
           type="text" 
          placeholder="Password" 
          className="input input-lg w-full" 
          id="Password"
          />
        </label>
        <button className="absolute inset-y-0 right-2">show</button>
       
        </div>
        <button className="btn  btn-lg w-full mt-4 bg-[#8D0D76] text-white ">Sign Up</button>
        <div>
        <h1 className=" flex justify-center text-lg py-10 mt-4" >By signing up, you agree to our Terms, data policy</h1>
        </div>
        </form>

        </div>
        <div className="w-[90vw] md:w-[450px] border rounded-md border-[#A1A1A1] h-[80px] items-center flex justify-center mt-5">
        <h3>Dont have an account?</h3>
        <Link to="/auth/login" className="text-[#8D0D76]">Log In</Link>
        </div>
    </>
  
        
  );
}
