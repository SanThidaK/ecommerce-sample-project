import { useAuth } from "@/context/auth-context";
import Header from "./head";
import Footer from "./footer";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth(); 
  
  return loading ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#33383c]"></div>
      <p className="mt-4 text-lg">Logging In...</p>
    </div>
  ) : (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutContent;
