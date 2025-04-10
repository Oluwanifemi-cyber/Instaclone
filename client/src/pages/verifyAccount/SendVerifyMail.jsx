import { useEffect, useState } from "react";
import { resendEmailVerificationLink } from "../../api/auth";
import { useAuth } from "../../store";
import { toast } from "sonner";
import MetaArgs from "./../../components/MetaArgs";
import handleError from "../../utils/handleError";

function SendVerifymail() {
  const { user, accessToken, handleLogout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const logoutTimeer = setTimeout(() => {
      handleLogout();
    }, 30 * 60 * 1000);

    //clean up function

    return () => clearTimeout(logoutTimeer);
  }, [handleLogout]);

  const resendMail = async () => {
    setIsSubmitting(true);
    try {
      const res = await resendEmailVerificationLink(accessToken);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MetaArgs
        title="Resend verification email"
        content="Resend verification email"
      />
      <div className="flex justify-center items-center min-h-screen flex-col text-center">
        <h1 className="text-4xl font-bold">Hi, {user?.fullname}</h1>
        <p className="text-xl font-medium mt-2">
          You're yet to verify your email
        </p>
        <p className="mb-4">
          Please click the button below to send a new verification
        </p>

        <button
          type="submit"
          className="btn bg-[#8D0D76] w-[250px] text-white"
          disabled={isSubmitting}
          onClick={resendMail}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Send new verification"
          )}
        </button>

        <p className="mt-4 text-sm">
          If you've not yet received a verification mail,please check your
          spam/junk folder. you will be automatically logged out in 30mins if
          you have not verified your email
        </p>
      </div>
    </>
  );
}

export default SendVerifymail;
