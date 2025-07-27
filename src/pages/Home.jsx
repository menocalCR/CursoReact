import Layout from "../components/Layout";
import BeneficiosSlider from "../components/BeneficiosSlider";
import BannerPrincipal from "../components/BannerPrincipal";
import TestimoniosSlider from "../components/TestimoniosSlider";
import { TestimoniosLoader } from "../loaders/TestimoniosLoader";
import MarcasCarrusel from "../components/MarcasCarrusel";

export default function Home() {
  return (
    <Layout>
      <BannerPrincipal/>
      <BeneficiosSlider />
      <MarcasCarrusel />
      <TestimoniosLoader />
      <TestimoniosSlider />
    </Layout>
  );
}
