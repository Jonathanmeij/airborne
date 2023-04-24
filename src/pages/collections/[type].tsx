import Image from "next/image";
import { Button, Container, SideMenu } from "~/components/ui";
import aboutUs from "../../../public/images/home/about_us.png";
import { ListboxElement, type Option } from "~/components/ui/Input";
import { useState } from "react";
import ProductsSection from "./ProductsSection";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api, type RouterOutputs } from "~/utils/api";
import { type NextPage, type GetStaticProps } from "next";

type ProductType = RouterOutputs["product"]["getProductsByType"][0]["type"];

export const getStaticPaths = () => {
  const productsTypes = ["kite", "board", "wetsuit", "bar"];

  return {
    paths: productsTypes.map((productType) => ({
      params: { type: productType },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const productType = context.params?.type as string;
  const correctProductType = productType.toUpperCase() as ProductType;

  await ssg.product.getProductsByType.prefetch({ type: correctProductType });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      productType,
    },
  };
};

export const ProductTypePage: NextPage<{ productType: ProductType }> = ({
  productType,
}) => {
  const [sortBy, setSortBy] = useState<Option>(options[0] as Option);
  const { data: products } = api.product.getProductsByType.useQuery({
    type: productType.toUpperCase() as ProductType,
  });

  if (!products) return null;

  const testProducts = [...products, ...products, ...products, ...products];

  return (
    <div className="">
      <div className="relative h-[30vh] overflow-hidden rounded-b-xl">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black to-transparent opacity-80" />
        <Image src={aboutUs} fill alt="surfers" className=" object-cover" />
      </div>
      <ProductsOptions
        title={productType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <ProductsSection products={testProducts} />
    </div>
  );
};

export default ProductTypePage;

interface ProductOptionsProps {
  title: string;
  setSortBy: (option: Option) => void;
  sortBy: Option;
}

export function ProductsOptions({
  title,
  setSortBy,
  sortBy,
}: ProductOptionsProps) {
  return (
    <Container
      maxWidth="7xl"
      className="m-auto flex  flex-col gap-6 py-3 md:py-6"
    >
      <div>
        <h1 className="pb-3 text-3xl font-semibold md:text-4xl">{title}s</h1>
        <div className="flex w-full justify-between ">
          <ListboxElement
            options={options}
            setSelected={setSortBy}
            selected={sortBy}
          />
          <SideMenu title="Filter">
            <div className="flex flex-col gap-2">
              <Button>Price</Button>
              <Button>Size</Button>
              <Button>Color</Button>
            </div>
          </SideMenu>
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
