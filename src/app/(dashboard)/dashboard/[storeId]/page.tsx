import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage you store.",
};

const Page = () => {
  return <p className="font-bold text-2xl">Rendering Actual Dashboard!</p>;
};

export default Page;
