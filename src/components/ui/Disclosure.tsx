import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";

export default function ProductDisclosure({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const svgVariants = {
    open: {
      rotate: 90,
    },
    closed: {
      rotate: 270,
    },
  };

  return (
    <div
      className={`mx-auto h-max w-full rounded border border-zinc-800 bg-zinc-900 p-3 ${
        className || ""
      }`}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex w-full items-center  justify-between
                 py-3 text-left text-sm font-medium  hover:font-semibold`}
            >
              <span className="text-lg ">{title}</span>
              <motion.div
                animate={open ? "open" : "closed"}
                variants={svgVariants}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="px-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                </svg>
              </motion.div>
            </Disclosure.Button>
            <Disclosure.Panel className=" pb- text-slate-100">
              <div className="max-w-xl">{children}</div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
