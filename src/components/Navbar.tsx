/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Container from "./Container";
import search from "../../public/images/icons/search.svg";
import account from "../../public/images/icons/account.svg";
import cart from "../../public/images/icons/cart.svg";
import Image from "next/image";
import LinkButton from "./LinkButton";
import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
          <ul className="z-100 hidden gap-10 md:flex">
            {/* <li>Kites</li>
            <li>Wetsuits</li>
            <li>Boards</li> */}
            <LinkButton padding="small" font="normal" to="/kites">
              <li>Kites</li>
            </LinkButton>
            <LinkButton padding="small" font="normal" to="/wetsuits">
              <li>Wetsuits</li>
            </LinkButton>
            <LinkButton padding="small" font="normal" to="/boards">
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

// export default function Navbar() {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll();
//   const [hasScrolled, setHasScrolled] = useState(false);

//   const variants = {
//     scrolled: {
//       backgroundColor: "#12181c",
//       backdropFilter: "blur(10px)",
//     },
//     notScrolled: {
//       backgroundColor: "#00000000",
//       backdropFilter: "blur(0px)",
//     },
//   };

//   function update() {
//     if (scrollY.get() > 0) {
//       setHasScrolled(true);
//     } else {
//       setHasScrolled(false);
//     }
//   }

//   useEffect(() => {
//     return scrollY.onChange(() => update());
//   });

//   return (
//     <motion.div
//       variants={variants}
//       animate={hasScrolled ? "scrolled" : "notScrolled"}
//       transition={{ duration: 0.5 }}
//       ref={ref}
//       className="fixed z-50 h-16 w-screen "
//     >
//       <Container maxWidth="7xl" className="m-auto">
//         <div className="flex h-16 items-center justify-between">
//           <ul className="z-100 hidden gap-10 md:flex">
//             {/* <li>Kites</li>
//             <li>Wetsuits</li>
//             <li>Boards</li> */}
//             <LinkButton padding="small" font="normal" to="/kites">
//               <li>Kites</li>
//             </LinkButton>
//             <LinkButton padding="small" font="normal" to="/wetsuits">
//               <li>Wetsuits</li>
//             </LinkButton>
//             <LinkButton padding="small" font="normal" to="/boards">
//               <li>Boards</li>
//             </LinkButton>
//           </ul>
//           <h1 className=" text-2xl font-bold">
//             <Link href="/">AIRBORNE</Link>
//           </h1>
//           <ul className=" hidden gap-10 md:flex">
//             <LinkButton
//               className="flex items-center"
//               padding="none"
//               font="normal"
//               to="/search"
//             >
//               <li className="flex gap-3">
//                 <Image src={search} alt="" />
//                 <span className="hidden lg:block">Search</span>
//               </li>
//             </LinkButton>
//             <LinkButton
//               className="flex items-center"
//               padding="none"
//               font="normal"
//               to="/account"
//             >
//               <li className="flex gap-3">
//                 <Image src={account} alt="" />
//                 <span className="hidden lg:block">Account</span>
//               </li>
//             </LinkButton>
//             <LinkButton
//               padding="none"
//               className="flex items-center"
//               font="normal"
//               to="/cart"
//             >
//               <li className="flex gap-3">
//                 <Image src={cart} alt="" />
//                 <span className="hidden lg:block">Cart</span>
//               </li>
//             </LinkButton>
//           </ul>
//         </div>
//       </Container>
//     </motion.div>
//   );
// }

// function MobileMenuButton() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <button className="text-gray-500 w-10 h-10 relative focus:outline-none bg-white" onClick={() => set}>
//                 <span className="sr-only">Open main menu</span>
//                 <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
//                     <span aria-hidden="true" className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': open,' -translate-y-1.5': !open }"></span>
//                     <span aria-hidden="true" className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out" :class="{'opacity-0': open } "></span>
//                     <span aria-hidden="true" className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out" :class="{'-rotate-45': open, ' translate-y-1.5': !open}"></span>
//                 </div>
//             </button>
//   )
// }
