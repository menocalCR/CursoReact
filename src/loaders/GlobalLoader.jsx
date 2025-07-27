import { AutoLoader } from "../loaders/AutoLoader";
import { TestimoniosLoader } from "../loaders/TestimoniosLoader";
import { UsuarioLoader } from "../loaders/UsuarioLoader";
import { SucursalLoader } from "./SucursalLoader";

export default function GlobalLoader() {
  return (
    <>
      <AutoLoader />
      <TestimoniosLoader />
      <UsuarioLoader />
      <SucursalLoader/>
    </>
  );
}
