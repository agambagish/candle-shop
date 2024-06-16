import { cn } from "@/lib/utils";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={cn(
        "grid items-center gap-8 pb-8 pt-6 lg:py-6",
        "container flex h-dvh max-w-2xl flex-col justify-center"
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
