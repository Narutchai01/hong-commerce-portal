import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LoginForm from "@/components/login";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <LoginForm />
      </div>

      <Footer />
    </div>
  );
}