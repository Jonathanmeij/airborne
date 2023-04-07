import { Button, Container, Divider } from "~/components";
import kite_product from "../../../public/images/home/kite_product.png";
import Image from "next/image";

export default function ProductPage() {
  return (
    <div className="pt-16">
      <Image src={kite_product} alt="kite" className="md:hidden " />

      <div className="w-full  py-6">
        <Container maxWidth="7xl" className=" m-auto w-full">
          <div className="w-full md:flex">
            <Image
              src={kite_product}
              alt="kite"
              className="hidden w-2/3 rounded-lg md:block"
            />
            <div className="my-auto flex w-full flex-col gap-6 md:w-2/5 md:pl-6">
              <h2 className="pb-4 text-3xl  font-medium md:text-4xl ">
                Product Name
              </h2>
              <p className=" font-light text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptas, quod, quia, voluptates quae voluptatibus quibusdam
              </p>

              <Divider />
              <div className="flex justify-between ">
                <span className="flex items-center gap-3">
                  <span className="text-xs font-light ">USD</span>
                  <span className="text-lg font-semibold">$ 1299.99</span>
                </span>
                <Button color="primary">Add to cart</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-bunker-900 py-6">
        <Container maxWidth="7xl" className=" m-auto h-screen w-full">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
            debitis numquam tenetur dolores ut est fuga ducimus magnam,
            repudiandae laborum mollitia nostrum doloribus quaerat consequuntur
            facilis velit, ipsa sit cumque perferendis! Rerum dolores quis
            perferendis sit ex asperiores aliquam cumque!
          </p>
        </Container>
      </div>
    </div>
  );
}

// <h2 className=" pb-4  text-4xl font-medium md:w-2/5">
//               About <span className=" font-bold"> Us</span>
//             </h2>
//             <p className="max-w-2xl  font-light text-gray-300">
//               We are a small team of passionate kitesurfers who love to share
//               our passion with others. We are based in the beautiful city of
//               Amsterdam and we are always ready to help you with any questions
//               you might have. Feel free to contact us.We are based in the
//               beautiful city of Amsterdam and we are always ready to help you
//               with any questions you might have. Feel free to contact us.
//             </p>
