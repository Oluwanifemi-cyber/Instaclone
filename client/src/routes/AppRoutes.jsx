import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { lazy, Suspense } from "react";
// LAZY LOADING are performance technique that work together to improve web application speed. SUSPENSE: Lets you display a fallback until its children have finished loading. Morelike keeping the page busy
import { LazySpinner } from "../components/Spinner";
import Home from "../pages/home/Home";
import { useAuth } from "../store";
import { PrivateRoutes, PublicRoutes, VerifyRoutes } from "./ProtectedRoutes";
import SendVerifyMail from "../pages/verifyAccount/SendVerifyMail";
// import Explore from "../pages/explore/Explore";
import VerifyAccount from "../pages/verifyAccount/VerifyAccount";
import ForgottenPassWord from "../pages/forgotpassword/ForgotPassword";
import ResetPassword from "../pages/forgotpassword/ResetPassword";

const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
// This is because we are trying to lazy load Auth, hence no need to import manually
const RootLayout = lazy(() => import("../layouts/RootLayout"));
const VerifyAccountLayout = lazy(() =>
  import("../layouts/VerifyAccountLayout")
);

export default function AppRoutes() {
  const { accessToken, isCheckingAuth, user } = useAuth();
  if (isCheckingAuth) {
    return <LazySpinner />;
  }

  const routes = [
    {
      path: "auth",
      // this is us trying to pass the props to the parent, so it
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PublicRoutes accessToken={accessToken}>
            <AuthLayout />,
          </PublicRoutes>
        </Suspense>
        // can effect the children (login and register)
      ),

      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgottenPassWord />,
        },
        {
          path: "reset-password/:userId/:passwordToken",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <RootLayout />
          </PrivateRoutes>
        </Suspense>
      ),
    },
    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <VerifyRoutes accessToken={accessToken} user={user}>
            <VerifyAccountLayout />
          </VerifyRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "verify-email",
          element: <SendVerifyMail />,
        },
        {
          path: "verify-email/:userId/:verificationToken",
          element: <VerifyAccount />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes); // we have to send the routes to the browser router and return it below:
  return <RouterProvider router={router} />;
}

// path: "auth",
//  element: <AuthLayout />, : this is for the url, that is how we want it to be in the browser (it must start with auth (example: auth/register))
