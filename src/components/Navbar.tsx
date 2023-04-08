/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Container from "./Container";
import account from "../../public/images/icons/account.svg";
import cart from "../../public/images/icons/cart.svg";
import Image from "next/image";
import LinkButton from "./LinkButton";
import { motion, useScroll } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import Button from "./Button";

export default function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  const variants = {
    scrolled: {
      backgroundColor: "#0a0d0f",
      backdropFilter: "blur(10px)",
    },
    notScrolled: {
      backgroundColor: "#00000000",
      backdropFilter: "blur(0px)",
    },
  };

  function update() {
    if (scrollY.get() > 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  }

  useEffect(() => {
    return scrollY.onChange(() => update());
  });

  return (
    <motion.div
      variants={variants}
      animate={hasScrolled ? "scrolled" : "notScrolled"}
      transition={{ duration: 0.5 }}
      ref={ref}
      className="fixed z-50 h-16 w-screen "
    >
      <Container maxWidth="7xl" className="m-auto">
        <div className="flex h-16 items-center justify-between">
          <h1 className=" text-2xl font-bold">
            <Link href="/">AIRBORNE</Link>
          </h1>

          <div className="md:hidden">
            <MobileMenu />
          </div>

          <ul className="z-100 hidden gap-10 md:flex">
            {/* <li>Kites</li>
            <li>Wetsuits</li>
            <li>Boards</li> */}
            <LinkButton padding="small" font="normal" to="/product/sailor">
              <li>Kites</li>
            </LinkButton>
            <LinkButton padding="small" font="normal" to="/product/surfshield">
              <li>Wetsuits</li>
            </LinkButton>
            <LinkButton padding="small" font="normal" to="/product/glide">
              <li>Boards</li>
            </LinkButton>

            <LinkButton
              className="flex items-center"
              padding="none"
              font="normal"
              to="/account"
            >
              <li className="flex gap-3">
                <Image src={account} alt="" />
              </li>
            </LinkButton>
            <LinkButton
              padding="none"
              className="flex items-center"
              font="normal"
              to="/cart"
            >
              <li className="flex gap-3">
                <Image src={cart} alt="" />
              </li>
            </LinkButton>
          </ul>
        </div>
      </Container>
    </motion.div>
  );
}

function MobileMenu() {
  const genericHamburgerLine = `h-1 w-8 my-1 rounded bg-white transition ease transform duration-300`;
  return (
    <div className="">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
               
                group flex h-12 w-12 flex-col items-center justify-center focus:outline-none `}
            >
              <div
                className={`${genericHamburgerLine} ${
                  open
                    ? "translate-y-3  rotate-45 opacity-100 group-hover:opacity-100"
                    : " group-hover:opacity-100"
                }`}
              />
              <div
                className={`${genericHamburgerLine} ${
                  open ? "opacity-0" : "opacity-100 "
                }`}
              />
              <div
                className={`${genericHamburgerLine} ${
                  open
                    ? "-translate-y-3 -rotate-45  group-hover:opacity-100"
                    : " "
                }`}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className=" absolute left-0 z-50 mt-3 w-screen  transform sm:px-0 lg:max-w-3xl">
                <Container maxWidth="7xl" className="m-auto">
                  <div className=" overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-3 bg-white p-4 text-bunker-950 lg:grid-cols-2">
                      <a
                        href="/insights"
                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <span className="flex items-center">
                          <span className="text-lg font-medium text-gray-900">
                            Sailor V2
                          </span>
                        </span>
                        <span className="block text-sm text-gray-500">
                          All around kite
                        </span>
                      </a>
                      <a
                        href="/automations"
                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <span className="flex items-center">
                          <span className="text-lg font-medium text-gray-900">
                            Surfshield
                          </span>
                        </span>
                        <span className="block text-sm text-gray-500">
                          Wetsuit specially designed for rough conditions
                        </span>
                      </a>
                      <a
                        href="/reports"
                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <span className="flex items-center">
                          <span className="text-lg font-medium text-gray-900">
                            Glide V1
                          </span>
                        </span>
                        <span className="block text-sm text-gray-500">
                          Easy to use and fast board
                        </span>
                      </a>
                    </div>
                    <div className="bg-gray-50 p-4">
                      <a
                        href="##"
                        className="flow-root rounded-md px-2 py-2  transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="black"
                            d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
                          />
                        </svg>
                      </a>
                      <a
                        href="##"
                        className="flow-root rounded-md px-2 py-2  transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="black"
                            d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Container>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
