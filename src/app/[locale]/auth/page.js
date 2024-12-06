import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Admin Login",
  description:
    "Admin login page. Website created by Chris Thornburg, github:CJThornburg "
};

// export const dynamic = "force-static";

function AuthPage() {
  return <LoginForm  />;
}

export default AuthPage;
