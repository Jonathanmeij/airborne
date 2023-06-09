/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Container from "./ui/Container";
import account from "../../public/images/icons/account.svg";
import Image from "next/image";
import LinkButton from "./ui/LinkButton";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Popover } from "@headlessui/react";
import CartMenu from "./Cart";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isSignedIn } = useUser();

  const variants = {
    scrolled: {
      backgroundColor: "var(--color-primary)",
    },
    notScrolled: {
      backgroundColor: "#00000000",
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
      <Container maxWidth="7xl" className="relative m-auto">
        <div className="flex h-16 items-center justify-between">
          <h1 className=" text-2xl font-bold">
            <Link href="/">AIRBORNE</Link>
          </h1>

          <div className="flex items-center gap-6 md:hidden">
            <CartMenu />
            <MobileMenu />
          </div>

          <ul className="z-100 hidden gap-10 md:flex">
            {/* <li>Kites</li>
            <li>Wetsuits</li>
            <li>Boards</li> */}
            <LinkButton padding="small" font="normal" to="/product/sailor-v2">
              <li>Kites</li>
            </LinkButton>
            <LinkButton padding="small" font="normal" to="/product/surfshield">
              <li>Wetsuits</li>
            </LinkButton>
            <LinkButton padding="small" font="normal" to="/product/glide-v1">
              <li>Boards</li>
            </LinkButton>

            <LinkButton
              className="flex items-center"
              padding="none"
              font="normal"
              to={isSignedIn ? "/account" : "/sign-in"}
            >
              <li className="flex gap-3">
                <Image src={account} alt="" />
              </li>
            </LinkButton>
            <CartMenu />
          </ul>
        </div>
      </Container>
    </motion.div>
  );
}

export const panelVariant = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
      duration: 0.15,
    },
  },
  closed: {
    opacity: 0,
    scale: 0.7,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.15,
    },
  },
};

export const itemVariant = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    opacity: 0,
    scale: 0.8,
  },
};

function MobileMenu() {
  const genericHamburgerLine = `h-1 w-8 my-1 rounded bg-white transition ease transform duration-300`;

  return (
    <div className="">
      <Popover className="">
        {({ open, close }) => (
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
            <AnimatePresence>
              {open && (
                <Popover.Panel
                  as={motion.div}
                  variants={panelVariant}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  static
                  className=" absolute left-0 z-50 mt-3 w-screen origin-top-right  transform sm:px-0 lg:max-w-3xl"
                >
                  <Container maxWidth="7xl" className="m-auto">
                    <div className=" overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-3 bg-white p-4 text-zinc-950 lg:grid-cols-2">
                        <MenuItem close={close} href="/product/sailor-v2">
                          <span className="flex items-center">
                            <span className="text-lg font-medium text-zinc-900">
                              Sailor V2
                            </span>
                          </span>
                          <span className="block text-sm text-zinc-500">
                            All around kite
                          </span>
                        </MenuItem>
                        <MenuItem close={close} href="/product/surfshield">
                          <span className="flex items-center">
                            <span className="text-lg font-medium text-zinc-900">
                              Surfshield
                            </span>
                          </span>
                          <span className="block text-sm text-zinc-500">
                            Wetsuit specially designed for rough conditions
                          </span>
                        </MenuItem>
                        <MenuItem close={close} href="/product/glide-v1">
                          <span className="text-lg font-medium text-zinc-900">
                            Glide V1
                          </span>
                          <span className="block text-sm text-zinc-500">
                            Easy to use and fast board
                          </span>
                        </MenuItem>
                      </div>
                      <div className="bg-zinc-100 p-4">
                        <MenuItem close={close} href="/account">
                          <div className="flex items-center gap-3 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="white"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="black"
                                d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
                              />
                            </svg>
                            <span className="  font-medium text-zinc-900">
                              Account
                            </span>
                          </div>
                        </MenuItem>
                      </div>
                    </div>
                  </Container>
                </Popover.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </div>
  );
}

function MenuItem({
  children,
  href,
  close,
}: {
  children: React.ReactNode;
  href: string;
  close: () => void;
}) {
  return (
    <Link href={href} onClick={close}>
      <motion.div
        variants={itemVariant}
        className="flow-root origin-top-right rounded-md px-2 py-2  hover:bg-zinc-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-400 focus-visible:ring-opacity-50"
      >
        <span className="flex-row items-center">{children}</span>
      </motion.div>
    </Link>
  );
}
