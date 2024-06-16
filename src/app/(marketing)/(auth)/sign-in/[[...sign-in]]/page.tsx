import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const Page = () => {
  return <SignIn />;
};

export default Page;
