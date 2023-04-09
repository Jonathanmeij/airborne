import { Button, Container, Divider } from "~/components";
import Image from "next/image";
import { type RouterOutputs, api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { NextPage, type GetStaticProps } from "next";
import { prisma } from "~/server/db";
import { log } from "console";

export const getStaticPaths = async () => {
  const products = await prisma.product.findMany({
    select: {
      title_id: true,
    },
  });

  return {
    paths: products.map((product) => ({
      params: {
        title_id: product.title_id,
      },
    })),
    fallback: "blocking",
  };
};

//euro sign:

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const title_id = context.params?.title_id;

  if (typeof title_id !== "string") {
    throw new Error("Invalid id");
  }

  await ssg.product.getProductByTitle.prefetch({ title_id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      title_id,
    },
  };
};

const ProductPage: NextPage<{ title_id: string }> = ({ title_id }) => {
  const { data: product } = api.product.getProductByTitle.useQuery({
    title_id,
  });

  if (!product) {
    return <div className="pt-16">Product does not exist</div>;
  }

  return (
    <div className="pt-16">
      <div className="min relative  h-[20rem]  rounded-lg md:hidden">
        <Image fill src={product.image} alt="kite" className="object-cover " />
      </div>

      <div className="w-full  py-6">
        <Container maxWidth="7xl" className=" m-auto w-full">
          <div className="w-full md:flex">
            <div className="relative hidden h-[40rem] w-2/3  rounded-lg md:block">
              <Image
                src={product.image}
                fill
                alt="kite"
                className="object-cover"
              />
            </div>
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
