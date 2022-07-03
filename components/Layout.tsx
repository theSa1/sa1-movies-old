import { Header } from "./Header";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="bg-slate-100 w-screen min-h-screen">
      <Header />
      <div className="h-16"></div>
      {children}
    </div>
  );
};
