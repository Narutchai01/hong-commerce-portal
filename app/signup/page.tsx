import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SignupForm from "@/components/signup";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <SignupForm />
      </div>

      <Footer />
    </div>
  );
}