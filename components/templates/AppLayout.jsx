import Footer from "../organisms/Footer";
import Navbar from "../organisms/Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col relative min-h-screen">
      <Navbar />
      <div className="flex flex-col h-full flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
