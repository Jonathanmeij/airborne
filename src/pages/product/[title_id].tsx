/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Container, Divider } from "~/components";
import Image from "next/image";
import { RouterOutputs, api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { type NextPage, type GetStaticProps } from "next";
import { prisma } from "~/server/db";
import { Disclosure, RadioGroup } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { on } from "stream";
import toast from "react-hot-toast";
import ProductDisclosure from "./ProductDisclosure";

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
              <h2 className=" text-3xl font-medium md:text-4xl ">
                {product.title}
              </h2>

              <ProductForm product={product} />
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-bunker-900 py-6">
        <Container maxWidth="7xl" className=" m-auto h-screen w-full">
          <ProductDisclosure title="Description">
            {product.description}
          </ProductDisclosure>
        </Container>
      </div>
    </div>
  );
};

export default ProductPage;

type FormValues = {
  color: string;
  size: string;
};

function ProductForm({ product }: { product: Product }) {
  const dynamicRoute = useRouter().asPath;

  const { register, handleSubmit, resetField } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    toast.success("Added to cart.", {
      position: "bottom-right",
      style: {
        borderRadius: "10px",
      },
    });
  };

  useEffect(() => {
    resetField("color");
    resetField("size");
  }, [dynamicRoute, resetField]);

  if (!product) {
    return null;
  }

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
}

function RadioButton({ label, value, register }: RadioButtonProps) {
  return (
    <div className="w-min">
      <input
        {...register("size")}
        type="radio"
        value={value}
        className="peer hidden"
        id={value}
      />
      <label
        htmlFor={value}
        className="peer-chering-offset-bunker-900 block w-max cursor-pointer select-none rounded  bg-bunker-900 
        px-2 py-1 ring-bunker-700 peer-checked:bg-bunker-800   peer-checked:ring-2"
      >
        {label} m
      </label>
    </div>
  );
}

function ColorRadioButton({ value, register }: RadioButtonProps) {
  return (
    <div className="">
      <input
        {...register("color")}
        type="radio"
        value={value}
        className="peer hidden"
        id={value}
      />
      <label
        htmlFor={value}
        style={{ backgroundColor: value }}
        className="block h-8 w-8 cursor-pointer select-none rounded-full 
        ring-2 ring-bunker-800 ring-offset-bunker-900 peer-checked:ring-2  peer-checked:ring-bunker-300 peer-checked:ring-offset-2"
      ></label>
    </div>
  );
}
