import { Button, Container, Divider } from "~/components";
import Image from "next/image";
import { type RouterOutputs, api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { NextPage, type GetStaticProps } from "next";
import { prisma } from "~/server/db";
import { log } from "console";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

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
  const [color, setColor] = useState("red");

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
              <h2 className=" text-3xl  font-medium md:text-4xl ">
                {product.title}
              </h2>

              <div>
                {/* {product.colors.map((color) => (
                    <div
                      key={color}
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))} */}
                <Radio label="color" selected={color} setSelected={setColor}>
                  <>
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color}
                        value={color}
                        className={({ active, checked }) =>
                          `
                  ${
                    checked
                      ? " ring-2 ring-bunker-300 ring-offset-2 ring-offset-bunker-950"
                      : ""
                  }
                    relative flex cursor-pointer rounded-full shadow-md   focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div
                              className="h-8 w-8 rounded-full"
                              style={{ backgroundColor: color }}
                            ></div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </>
                </Radio>
              </div>

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

function Radio({
  label,
  children,
  selected,
  setSelected,
}: {
  label: string;
  children: React.ReactNode;
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <div className="w-full ">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="">{label}</RadioGroup.Label>
          <div className="flex gap-3 pt-3">{children}</div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// {plans.map((plan) => (
//   <RadioGroup.Option
//     key={plan.name}
//     value={plan}
//     className={({ active, checked }) =>
//       `${
//         active
//           ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
//           : ""
//       }
//       ${checked ? "ring-2 ring-bunker-800" : ""}
//         relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
//     }
//   >
//     {({ active, checked }) => (
//       <>
//         <div className="flex  items-center justify-between">
//           <div className="flex items-center">
//             <div className="text-sm">
//               <RadioGroup.Label as="p" className={`font-medium  `}>
//                 {plan.name}
//               </RadioGroup.Label>
//             </div>
//           </div>
//         </div>
//       </>
//     )}
//   </RadioGroup.Option>
// ))}
