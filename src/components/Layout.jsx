import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="pt-[64px]">
      <div className="relative min-h-screen">
        {/* Fondo de fibra de carbono */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{ backgroundImage: "url('/images/fibra-carbon.jpg')" }}
        />
        {/* Overlay negro semitransparente */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />
        {/* Contenido de la página */}
        <div className="relative z-20"> <Navbar />{children}</div>
      </div>
      
      <Footer />
    </div>
    
  );
}
