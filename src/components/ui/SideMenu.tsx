import { Popover } from "@headlessui/react";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import Divider from "./Divider";

interface SideMenuProps {
  title: string;
  children: React.ReactNode;
}

const bgVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.4,
  },
  exit: {
    opacity: 0,
  },
};

const panelVariants = {
  closed: {
    x: 300,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};

export function SideMenu({ title, children }: SideMenuProps) {
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button as={Button} color="secondaryDarker" rounded="rounded">
            {title}
          </Popover.Button>

          <AnimatePresence>
            {open && (
              <>
                <Popover.Overlay
                  variants={bgVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  as={motion.div}
                  className="fixed inset-0 z-50 bg-black opacity-100"
                />
                <motion.div
                  variants={panelVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed right-0 top-0 z-50 h-screen w-72 bg-zinc-900 md:w-96"
                >
                  <Popover.Panel static>
                    <div className="flex h-16 w-full items-center justify-between px-3 md:px-6">
                      <h2 className=" text-xl font-semibold">{title}</h2>
                      <Button
                        color="secondaryDark"
                        rounded="rounded"
                        onClick={close}
                        textSize="small"
                      >
                        Close
                      </Button>
                    </div>
                    <Divider />
                    <div>{children}</div>
                  </Popover.Panel>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
