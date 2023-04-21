import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { CartItem, useCartContext } from "~/pages/CartProvider";
import Container from "./ui/Container";
import { panelVariant } from "./Navbar";
import Image from "next/image";
import QuantityInput from "./QuantityInput";
import { LinkButton } from "./ui";

export default function CartMenu() {
  const { cart } = useCartContext();

  function calculateTotal() {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }

  return (
    <div className="">
      <Popover className="h-full">
        {({ open, close }) => (
          <>
            <Popover.Button
              as="div"
              className={`
                   h-full focus:outline-none md:flex md:items-center `}
            >
              <div className=" md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"
                  />
                </svg>
              </div>
              <div className="my-auto hidden md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"
                  />
                </svg>
              </div>
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
                  className=" absolute right-0 z-50 mt-6 w-screen origin-top-right transform sm:px-0 md:right-0  md:mt-3 lg:max-w-lg"
                >
                  <Container maxWidth="7xl" className="m-auto">
                    <div className=" overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="  bg-white p-3 text-zinc-950">
                        <span className=" text-xl font-semibold">Cart</span>
                      </div>
                      <div className="flex flex-col  divide-y bg-zinc-100 px-3 text-zinc-950">
                        {cart.length === 0 && (
                          <div className="p-3 text-center">
                            <span className=" text-zinc-600">
                              Your cart is empty
                            </span>
                          </div>
                        )}
                        {cart.map((item) => (
                          <CartItem key={item.Product.id} CartItem={item} />
                        ))}
                      </div>
                      <div className="flex flex-col bg-white p-3 text-zinc-950">
                        <span>
                          <span className="font-semibold">Subtotal:</span>
                          <span className="float-right">
                            € {calculateTotal()}
                          </span>
                        </span>
                        <LinkButton
                          color="black"
                          rounded="rounded"
                          className="mt-3"
                          to="/cart"
                          onClick={close}
                        >
                          Checkout
                        </LinkButton>
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

export function CartItem({
  CartItem,
  dark = false,
}: {
  CartItem: CartItem;
  dark?: boolean;
}) {
  const { updateQuantity, removeFromCart } = useCartContext();

  function deleteItem() {
    removeFromCart(CartItem.id);
  }

  function updateItem(quantity: number) {
    updateQuantity(CartItem.id, quantity);
  }

  return (
    <>
      <div className="flex justify-between gap-3 py-3 text-sm">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded">
            <Image
              src={CartItem.Product.image}
              alt={CartItem.Product.title}
              fill
              className=" object-cover"
            />
          </div>
          <div>
            <span>{CartItem.Product.title}</span>
            <div className={`${dark ? "text-zinc-200" : "text-zinc-600"} pb-1`}>
              <span className="text-xs">Size: {CartItem.size}, </span>
              <span className="text-xs">Color: {CartItem.color}</span>
            </div>
            <QuantityInput
              dark={dark}
              value={CartItem.quantity}
              onChange={updateItem}
            />
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-3">
          <span className={`${dark ? "text-white" : "text-zinc-600"}`}>
            € {CartItem.Product.price * CartItem.quantity}
          </span>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            height="24"
            width="24"
            fill={dark ? "white" : "#405661"}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="float-right cursor-pointer"
            onClick={deleteItem}
          >
            <path
              d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
              fillRule="nonzero"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

// euro sign: €
