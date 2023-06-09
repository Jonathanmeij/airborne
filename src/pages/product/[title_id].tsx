/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Container, Divider } from "~/components/ui";
import Image from "next/image";
import { type RouterOutputs, api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPage, type GetStaticProps } from "next";
import { prisma } from "~/server/db";
import React, { useEffect } from "react";
import { type UseFormRegister, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ProductDisclosure from "./ProductDisclosure";
import { useCartContext } from "../CartProvider";
import Footer from "~/components/Footer";

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

type Product = RouterOutputs["product"]["getProductByTitle"];

const ProductPage: NextPage<{ title_id: string }> = ({ title_id }) => {
  const { data: product } = api.product.getProductByTitle.useQuery({
    title_id,
  });

  if (!product) {
    return <div className="pt-16">Product does not exist</div>;
  }

  return (
    <>
      <div className="pt-16">
        <div className="min relative  h-[20rem]  rounded-lg md:hidden">
          <Image
            fill
            src={product.image}
            alt="kite"
            className="object-cover "
          />
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
                <h2 className=" text-3xl font-medium md:text-4xl ">
                  {product.title}
                </h2>

                <ProductForm product={product} />
              </div>
            </div>
          </Container>
        </div>
        <div className="bg-zinc-900 py-6">
          <Container maxWidth="7xl" className=" m-auto h-screen w-full">
            <ProductDisclosure title="Description">
              {product.description}
            </ProductDisclosure>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;

type FormValues = {
  color: string;
  size: string;
};

function ProductForm({ product }: { product: Product }) {
  const dynamicRoute = useRouter().asPath;
  const { addToCart } = useCartContext();

  const { register, handleSubmit, resetField, setValue } =
    useForm<FormValues>();

  useEffect(() => {
    resetField("color");
    resetField("size");
    if (!product) {
      return;
    }
    if (product.colors[0] !== undefined) {
      setValue("color", product.colors[0].name);
    }
    if (product.sizes[0] !== undefined) {
      setValue("size", product.sizes[0]);
    }
  }, [dynamicRoute, resetField, setValue, product]);

  if (!product) {
    return null;
  }

  const productNoColor = {
    id: product.id,
    title: product.title,
    title_id: product.title_id,
    description: product.description,
    price: product.price,
    image: product.image,
    sizes: product.sizes,
    productType: product.productType,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  const onSubmit = (data: FormValues) => {
    addToCart(productNoColor, data.color, data.size, 1);

    toast.success("Added to cart.", {
      position: "bottom-right",
      style: {
        borderRadius: "10px",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* <input {...register("radio")} type="radio" value="red" />
      <input {...register("radio")} type="radio" value="blue" />
      <input {...register("radio")} type="radio" value="black" /> */}

      <div>
        <h4 className="">Color</h4>
        <div className="flex gap-3 pt-3">
          {product.colors.map((color) => (
            <ColorRadioButton
              key={color.id}
              label={color.name}
              value={color.color}
              register={register}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="">Size</h4>
        <div className=" flex  flex-wrap gap-3 pt-3">
          {product.sizes.map((size) => (
            <RadioButton
              key={size}
              label={size}
              value={size}
              register={register}
            />
          ))}
        </div>
      </div>

      <Divider />
      <div className="flex justify-between ">
        <span className="flex items-center gap-3">
          <span className="text-xs font-light ">Euro</span>
          <span className="text-lg font-semibold"> € {product.price}</span>
        </span>
        <Button type="submit" color="primary">
          Add to cart
        </Button>
      </div>
    </form>
  );
}

{
  /* <RadioButton label="red" value="red" register={register} />
        <RadioButton label="blue" value="blue" register={register} />
        <RadioButton label="black" value="black" register={register} /> */
}

interface RadioButtonProps {
  label: string;
  value: string;
  register: UseFormRegister<FormValues>;
  checked?: boolean;
}

function RadioButton({ label, value, register, checked }: RadioButtonProps) {
  return (
    <div className="w-min">
      <input
        {...register("size")}
        type="radio"
        value={value}
        className="peer hidden"
        id={value}
        checked={checked}
      />
      <label
        htmlFor={value}
        className="peer-chering-offset-zinc-900 block w-max cursor-pointer select-none rounded  bg-zinc-900 
        px-2 py-1 ring-zinc-700 peer-checked:bg-zinc-800   peer-checked:ring-2"
      >
        {label}
      </label>
    </div>
  );
}

function ColorRadioButton({
  value,
  label,
  register,
  checked,
}: RadioButtonProps) {
  return (
    <div className="">
      <input
        {...register("color")}
        type="radio"
        value={label}
        className="peer hidden"
        id={label}
        checked={checked}
      />
      <label
        htmlFor={label}
        style={{ backgroundColor: value }}
        className="block h-8 w-8 cursor-pointer select-none rounded-full 
        ring-2 ring-zinc-800 ring-offset-zinc-900 peer-checked:ring-2  peer-checked:ring-zinc-300 peer-checked:ring-offset-2"
      ></label>
    </div>
  );
}
