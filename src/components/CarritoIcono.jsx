import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";

export default function CarritoIcono() {
  const { carrito } = useCarrito();

  return (
    <Link to="/carrito" className="relative flex items-center gap-1">
      <i className="pi pi-shopping-cart text-lg" />
      <span className="text-sm">Carrito</span>
      {carrito.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-[2px] rounded-full">
          {carrito.length}
        </span>
      )}
    </Link>
  );
}
