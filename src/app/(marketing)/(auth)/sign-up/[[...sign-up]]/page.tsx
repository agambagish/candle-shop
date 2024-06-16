import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const Page = () => {
  return <SignUp />;
};

export default Page;
