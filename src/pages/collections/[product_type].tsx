import Image from "next/image";
import { Button, Container, ListBox } from "~/components/ui";
import aboutUs from "../../../public/images/home/about_us.png";
import { ListboxElement, Option } from "~/components/ui/Input";
import { useState } from "react";

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
  const [sortBy, setSortBy] = useState<Option>(options[0] as Option);

  return (
    <Container
      maxWidth="7xl"
      className="m-auto flex min-h-screen flex-col gap-6 py-3 md:py-6"
    >
      <div>
        <h1 className="pb-3 text-3xl font-semibold md:text-4xl">Kites</h1>
        <div className="flex w-full justify-between ">
          <ListboxElement
            options={options}
            setSelected={setSortBy}
            selected={sortBy}
          />
          <Button font="normal" rounded="rounded" color="secondaryDarker">
            Filter
          </Button>
        </div>
      </div>
    </Container>
  );
}

const options: Option[] = [
  { value: "Featured" },
  { value: "Price: Low to High" },
  { value: "Price: High to Low" },
  { value: "Newest" },
  { value: "Oldest" },
];
