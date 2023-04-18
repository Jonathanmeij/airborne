import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container, LinkButton } from "~/components/ui";

const speed = 0.5;

export default function SuccesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1800);
  });
  return (
    <div className="flex h-screen w-screen items-center justify-center px-3 pt-16 md:px-6">
      <AnimatePresence>
        {isLoading && <Spinner />}
        {!isLoading && <Succes />}
      </AnimatePresence>
      {/* <Spinner /> */}
    </div>
  );
}

function Succes() {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        initial={{ opacity: 0, height: 40, width: 40 }}
        animate={{ opacity: 1, height: 50, width: 50 }}
        className=" relative block h-10 w-10  rounded-full border-4 border-green-500  "
      >
        <CheckIcon />
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 text-center text-xl font-bold md:text-2xl"
      >
        Thank you for your order!
      </motion.h1>

      <motion.div
        className="mt-3 flex flex-col items-center"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <p className="mb-6 max-w-md text-center">
          Your order has been placed. We will send you a confirmation email with
          a link to track your order.
        </p>
        <LinkButton color={"primary"} to="/">
          Back to home
        </LinkButton>
      </motion.div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <motion.div className="relative">
      <motion.span
        initial={{ height: 40, width: 40 }}
        animate={{ rotate: 360 }}
        exit={{ opacity: 0 }}
        transition={spinTransition}
        className="block  rounded-full border-4 border-t-4 border-bunker-800 border-t-bunker-400"
      ></motion.span>
    </motion.div>
  );
}

const spinTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 0.8,
};
