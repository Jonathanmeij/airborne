/* eslint-disable @typescript-eslint/no-misused-promises */

import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Input,
  LinkButton,
  ResizablePanel,
} from "~/components/ui";
import DisclosurePanel from "~/components/ui/Disclosure";
import { useCartContext } from "../CartProvider";
import { CartItem } from "~/components/Cart";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type ShippingOption = {
  name: string;
  price: number;
  delivery: string;
};

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    name: "Free",
    price: 0.0,
    delivery: "3-5 days",
  },
  {
    name: "Standard",
    price: 4.99,
    delivery: "2-3 days",
  },
  {
    name: "Express",
    price: 9.99,
    delivery: "1-2 days",
  },
];

// type ShippingOptionType = keyof typeof SHIPPING_OPTIONS;

export default function CartPage() {
  const [information, setInformation] = useState<InformationForm>();
  const [shipping, setShipping] = useState<ShippingOption | undefined>(
    SHIPPING_OPTIONS[0]
  );

  const { query } = useRouter();
  const id = getPageId(query);
  const step = id === "information" ? 1 : id === "shipping" ? 2 : 3;

  return (
    <div className="mb-16 h-screen pt-16">
      <Container
        maxWidth="7xl"
        className="relative m-auto flex h-full flex-col-reverse justify-end gap-6  pt-6 lg:flex-row"
      >
        <div className="h-max w-full rounded border border-bunker-800 bg-bunker-900 p-3 lg:w-7/12 lg:p-6">
          <Container maxWidth="md" className="m-auto" padding="none">
            <ProgressBar steps={3} currentStep={step} />

            <ResizablePanel id={id}>
              {id === "information" && (
                <Information
                  information={information}
                  setInformation={setInformation}
                />
              )}
              {id === "shipping" && (
                <Shiping setShipping={setShipping} shipping={shipping} />
              )}
              {id === "payment" && <Payment />}
            </ResizablePanel>
          </Container>
        </div>
        <div className="hidden h-max rounded border border-bunker-800 bg-bunker-900 p-3 lg:block lg:w-5/12 lg:p-6">
          <h2 className=" text-xl font-medium">
            Your <span className=" font-bold"> order</span>
          </h2>
          <CartPanel shipping={shipping} />
        </div>
        <DisclosurePanel title="Your order" className="lg:hidden">
          <CartPanel shipping={shipping} />
        </DisclosurePanel>
      </Container>
    </div>
  );
}

function getPageId(query: ParsedUrlQuery) {
  if (query.payment) return "payment";
  if (query.shipping) return "shipping";
  return "information";
}

interface InformationProps {
  setInformation: (information: InformationForm) => void;
  information?: InformationForm;
}

type InformationForm = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

function Information({ information, setInformation }: InformationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InformationForm>(
    information && {
      defaultValues: information,
    }
  );
  const router = useRouter();

  const onSubmit = (data: InformationForm) => {
    setInformation(data);
    void router.push("/cart?shipping=true");
  };

  return (
    <form
      className="flex w-full flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h2 className=" text-xl font-normal">
          Personal <span className=" font-semibold"> information</span>
        </h2>
        <p className=" text-sm text-gray-500">
          {`This is a fake store, don't use real information.`}
        </p>
      </div>

      <div className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <Input
            name="firstName"
            placeholder="First name"
            label="First name"
            error={errors.firstName?.message?.toString()}
            options={{ required: "First name is required" }}
            register={register}
            isRequired
          />
          <Input
            name="lastName"
            label="Last name"
            placeholder="First name"
            error={errors.lastName?.message?.toString()}
            register={register}
            options={{ required: "Last name is required" }}
            isRequired
          />
        </div>
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          error={errors.email?.message?.toString()}
          register={register}
          options={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email is not valid",
            },
          }}
          className=""
          fullWidth
          isRequired
        />
        <Input
          name="address"
          label="Address"
          placeholder="Address"
          error={errors.address?.message?.toString()}
          register={register}
          options={{ required: "Address is required" }}
          fullWidth
          isRequired
        />
        <div className="flex gap-3">
          <Input
            name="zip"
            label="Zip"
            placeholder="Zip"
            error={errors.zip?.message?.toString()}
            register={register}
            options={{ required: "Zip is required" }}
            isRequired
          />
          <Input
            name="city"
            label="City"
            placeholder="City"
            error={errors.city?.message?.toString()}
            register={register}
            options={{ required: "City is required" }}
            isRequired
          />
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <Button type="submit" color="primary">
          Shipping
        </Button>
      </div>
    </form>
  );
}

interface ShipingProps {
  setShipping: (shipping: ShippingOption) => void;
  shipping: ShippingOption | undefined;
}

function Shiping({ setShipping, shipping }: ShipingProps) {
  if (!shipping) return null;

  return (
    <form className="flex flex-col gap-6">
      <h2 className=" text-xl font-normal">
        shiping <span className=" font-semibold"> information</span>
      </h2>

      <ShippingRadio shipping={shipping} setShipping={setShipping} />
      <div className="flex flex-row justify-between">
        <LinkButton color="noneLight" rounded="rounded" to="/cart">
          Back
        </LinkButton>
        <LinkButton color="primary" to="/cart?payment=true">
          Payment
        </LinkButton>
      </div>
    </form>
  );
}

type PaymentForm = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolder: string;
};

function Payment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentForm>();

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(console.log)}>
      <div>
        <h2 className=" text-xl font-normal">
          payment <span className=" font-semibold"> information</span>
        </h2>
        <p className=" text-sm text-gray-500">
          {`This is a fake store, don't use real information.`}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          name="cardNumber"
          label="Card number"
          placeholder="Card number"
          error={errors.cardNumber?.message?.toString()}
          register={register}
          options={{ required: "Card number is required" }}
          isRequired
        />
        <div className="flex gap-3">
          <Input
            name="expirationDate"
            label="Expiration date"
            placeholder="Expiration date"
            error={errors.expirationDate?.message?.toString()}
            register={register}
            options={{ required: "Expiration date is required" }}
            isRequired
          />

          <Input
            name="cvv"
            label="CVV"
            placeholder="CVV"
            error={errors.cvv?.message?.toString()}
            register={register}
            options={{ required: "CVV is required" }}
            isRequired
          />
        </div>
        <Input
          name="cardHolder"
          label="Card holder"
          placeholder="Card holder"
          error={errors.cardHolder?.message?.toString()}
          register={register}
          options={{ required: "Card holder is required" }}
          isRequired
        />
      </div>

      <div className="flex flex-row justify-between">
        <LinkButton
          to="/cart?shipping=true"
          rounded="rounded"
          color="noneLight"
        >
          Back
        </LinkButton>
        <LinkButton color="primary" to="/cart/succes">
          Confirm
        </LinkButton>
      </div>
    </form>
  );
}

function CartPanel({ shipping }: { shipping?: ShippingOption }) {
  const { cart, calculateTotal } = useCartContext();

  if (cart.length === 0)
    return <p className="pt-3 text-gray-400">Your cart is empty</p>;

  return (
    <>
      <div className=" divide-y divide-bunker-800">
        {cart.map((item) => (
          <CartItem key={item.id} CartItem={item} dark />
        ))}
      </div>
      <div className=" border-t border-bunker-800 py-3 text-sm md:py-6">
        <div>
          <span className="">Subtotal:</span>
          <span className="float-right flex items-center gap-3">
            € {calculateTotal()}
          </span>
        </div>
        <div>
          <span className="">Shipping:</span>
          <span className="float-right flex items-center gap-3">
            € {shipping?.price}
          </span>
        </div>
      </div>
      <div className=" border-t border-bunker-800 pt-3 md:pt-6">
        <span className="">Total:</span>
        <span className="float-right flex items-center gap-3">
          <span className="text-xs font-light ">Euro</span>
          <span className="text-lg font-semibold">
            {" "}
            € {shipping ? calculateTotal() + shipping?.price : calculateTotal()}
          </span>
        </span>
      </div>
    </>
  );
}

function ShippingRadio({ shipping, setShipping }: ShipingProps) {
  return (
    <RadioGroup value={shipping} onChange={setShipping}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-3 text-white">
        {SHIPPING_OPTIONS.map((ship) => (
          <RadioGroup.Option
            key={ship.name}
            value={ship}
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-1 ring-white  ring-opacity-60 ring-offset-1 ring-offset-sky-300"
                  : ""
              }
                  ${
                    checked
                      ? "border-sky-500 bg-bunker-800 bg-opacity-75 "
                      : "bg-bunker-800"
                  }
                    relative flex cursor-pointer rounded border-2 border-bunker-800 
                    p-3 shadow-md focus:outline-none`
            }
          >
            {({ checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-semibold  ${
                          checked ? "text-white" : "text-gray-200"
                        }`}
                      >
                        {ship.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={`inline ${
                          checked ? "text-sky-100" : "text-gray-100"
                        }`}
                      >
                        <span>
                          {ship.price === 0 ? "Free" : `€ ${ship.price}`}
                        </span>{" "}
                        <span aria-hidden="true">&middot;</span>{" "}
                        <span>{ship.delivery}</span>
                      </RadioGroup.Description>
                    </div>
                  </div>
                  {checked && (
                    <div className="shrink-0 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" />
                      </svg>
                    </div>
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

function ProgressBar({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: number;
}) {
  return (
    <div className="md mx-auto  flex justify-between pb-3 md:pb-6">
      {Array.from({ length: steps }, (_, i) => (
        <Step key={i} step={i + 1} currentStep={currentStep} />
      ))}
    </div>
  );
}

const stepVariants = {
  inactive: {
    backgroundColor: "var(--bunker-900)",
    border: "2px solid",
    borderColor: "var(--bunker-800)",
  },
  active: {
    backgroundColor: "var(--bunker-900)",
    border: "2px solid",
    borderColor: "var(--sky-500)",
  },
  completed: {
    backgroundColor: "var(--sky-500)",
    border: "2px solid",
    borderColor: "var(--sky-500)",
  },
};

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  const status =
    step === currentStep
      ? "active"
      : step < currentStep
      ? "completed"
      : "inactive";

  console.log(status, step, currentStep);

  return (
    <motion.div
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bunker-800"
      variants={stepVariants}
      animate={status}
    >
      <AnimatePresence>
        {status === "completed" ? (
          <CheckIcon />
        ) : (
          <motion.span
            key="step"
            animate={{ opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute"
          >
            {step}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <svg
      fill="none"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        variants={checkIconVariants}
        transition={checkIconTransition}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

const checkIconTransition = {
  ease: "easeOut",
  type: "tween",
  delay: 0.2,
  duration: 0.2,
};
const checkIconVariants = {
  completed: {
    pathLength: [0, 1],
  },
};
