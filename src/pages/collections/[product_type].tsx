import Image from "next/image";
import { Container } from "~/components/ui";
import aboutUs from "../../../public/images/home/about_us.png";

export default function CollectionPage() {
  return (
    <div className="">
      <div className="relative h-96 overflow-hidden rounded-b-xl">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent opacity-80" />
        <Image src={aboutUs} fill alt="surfers" className=" object-cover" />
      </div>
      <ProductSection />
    </div>
  );
}

function ProductSection() {
  return (
    <Container maxWidth="7xl" className="m-auto min-h-screen py-3 md:py-6">
      <h1 className="text-3xl font-semibold md:text-4xl">Kites</h1>
    </Container>
  );
}
