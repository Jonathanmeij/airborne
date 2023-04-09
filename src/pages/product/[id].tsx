import { Button, Container, Divider } from "~/components";
import Image from "next/image";
import { type RouterOutputs, api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { NextPage, type GetStaticProps } from "next";
import { prisma } from "~/server/db";
import { log } from "console";

type Product = RouterOutputs["product"]["getProduct"];

export const getStaticPaths = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: products.map((product) => ({
      params: {
        id: product.id,
      },
    })),
    fallback: "blocking",
  };
};

//euro sign:

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") {
    throw new Error("Invalid id");
  }

  await ssg.product.getProduct.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

const ProductPage: NextPage<{ id: string }> = ({ id }) => {
  const { data: product } = api.product.getProduct.useQuery({ id });

  if (!product) {
    return <div className="pt-16">Product does not exist</div>;
  }

  const product_image = `../../../public${product.image}`;

  return (
    <div className="pt-16">
      <Image
        style={{ width: "100%" }}
        src={product_image}
        alt="kite"
        className="md:hidden "
      />

      <div className="w-full  py-6">
        <Container maxWidth="7xl" className=" m-auto w-full">
          <div className="w-full md:flex">
            <Image
              src={product_image}
              style={{ width: "100%" }}
              alt="kite"
              className="hidden w-2/3 rounded-lg md:block"
            />
            <div className="my-auto flex w-full flex-col gap-6 md:w-2/5 md:pl-6">
              <h2 className="pb-4 text-3xl  font-medium md:text-4xl ">
                {product.title}
              </h2>
              <p className=" font-light text-gray-300">{product.description}</p>

              <Divider />
              <div className="flex justify-between ">
                <span className="flex items-center gap-3">
                  <span className="text-xs font-light ">Euro</span>
                  <span className="text-lg font-semibold">
                    {" "}
                    € {product.price}
                  </span>
                </span>
                <Button color="primary">Add to cart</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-bunker-900 py-6">
        <Container maxWidth="7xl" className=" m-auto h-screen w-full">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
            debitis numquam tenetur dolores ut est fuga ducimus magnam,
            repudiandae laborum mollitia nostrum doloribus quaerat consequuntur
            facilis velit, ipsa sit cumque perferendis! Rerum dolores quis
            perferendis sit ex asperiores aliquam cumque!
          </p>
        </Container>
      </div>
    </div>
  );
};

export default ProductPage;
