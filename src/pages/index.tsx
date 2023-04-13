import { type NextPage } from "next";
import Head from "next/head";
import Image, { type StaticImageData } from "next/image";
import bg from "../../public/images/home/bg.png";
import mobile from "../../public/images/home/mobile.jpg";
import kite_product from "../../public/images/products/sailor-v2.png";
import wetsuit_product from "../../public/images/products/surfshield.png";
import kiteboard from "../../public/images/products/glide-v1.png";
import about_us from "../../public/images/home/about_us.png";

import { Button, Container, LinkButton } from "../components/index";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Footer from "~/components/Footer";

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.45], [0.5, 0]);
  const mobileScreenOpacity = useTransform(
    scrollYProgress,
    [0, 0.45],
    [0.4, 0]
  );

  return (
    <>
      <main className=" relative  h-screen w-screen">
        <div ref={ref} className="fixed">
          <motion.div
            style={{
              opacity: mobileScreenOpacity,
              scale: imageScale,
            }}
            className="fixed top-0 z-10  h-screen  w-screen bg-black  "
          ></motion.div>
          <motion.div
            style={{
              opacity: gradientOpacity,
              scale: imageScale,
            }}
            className="fixed top-0 z-10  h-screen  w-screen bg-gradient-to-br from-black to-transparent opacity-70"
          ></motion.div>

          <motion.div style={{ scale: imageScale, opacity }}>
            <Image
              src={bg}
              alt="kiteboarder jumping"
              className="z-0 hidden h-screen w-screen object-cover contrast-125 saturate-[20%] md:block"
            ></Image>
            <Image
              src={mobile}
              alt="kiteboarder jumping"
              className="z-0 block  h-screen w-screen object-cover contrast-125 saturate-[20%] md:hidden"
            ></Image>
          </motion.div>
          <Container maxWidth="7xl" className=" relative z-20 m-auto">
            <motion.div
              style={{ scale, opacity: textOpacity }}
              className="absolute bottom-0 z-20 flex flex-col gap-4  pb-24 pr-4  md:gap-6 md:pb-16 md:pr-0  md:text-left"
            >
              <h1 className="max max-w-xl text-5xl font-bold md:text-7xl">
                Take Your Kitesurfing to New Heights
              </h1>
              <p className="max md:text-md z-0 max-w-lg text-lg font-light text-gray-200">
                Airborne Kiteboarding offers a wide range of kitesurfing gear
                for all levels of riders, from beginner packages to
                high-performance gear.
              </p>
              <Button
                color="primary"
                padding="wide"
                className=" self-start md:mx-0"
              >
                SHOP NOW
              </Button>
            </motion.div>
          </Container>
        </div>
      </main>

      <div className=" w-full ">
        <KitesSection />
        <AboutUsSection />
      </div>
      <Footer />
    </>
  );
};

export default Home;

function KitesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.9], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.9], [20, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      style={{ borderRadius }}
      ref={ref}
      className="relative min-h-screen  "
    >
      <Container
        maxWidth="8xl"
        className=" m-auto flex min-h-screen flex-col items-center justify-center"
      >
        <motion.div
          style={{ scale, opacity: textOpacity }}
          className=" flex flex-col items-center justify-center py-12"
        >
          <h2 className=" pb-4 text-center text-4xl font-medium">
            Discover our <span className=" font-bold"> Products</span>
          </h2>
          <p className="max-w-2xl text-center font-light text-gray-300">
            Check the new 2023 range of kites, boards and wetsuits.
          </p>
        </motion.div>
        <div className=" mb-12 grid w-full grid-cols-1 gap-6 ">
          <GridElement key="1" image={kite_product}>
            <h3 className=" text-3xl font-semibold">Sailor V2</h3>
            {/* <p className="max-w-sm">
              With the new Sailor V2, you peform at your best in any condition.
            </p> */}
            <div>
              <LinkButton
                to="/product/sailor-v2"
                rounded="rounded"
                color="secondary"
              >
                View product
              </LinkButton>
            </div>
          </GridElement>
          <GridElement key="2" image={wetsuit_product}>
            <h3 className=" text-3xl font-semibold">SurfShield</h3>
            {/* <p className="max-w-sm">
              Stay warm and dry with the new SurfShield wetsuit. Specially
              designed for rough conditions.
            </p> */}
            <div>
              <LinkButton
                to="/product/surfshield"
                rounded="rounded"
                color="secondary"
              >
                View product
              </LinkButton>
            </div>
          </GridElement>
          <GridElement key="3" image={kiteboard}>
            <h3 className=" text-3xl font-semibold">Glide V1</h3>
            {/* <p className="max-w-sm">
              The new Glide V1 is the perfect board for beginners and
              intermediate riders. Its easy to use.
            </p> */}
            <div>
              <LinkButton
                to="/product/glide-v1"
                rounded="rounded"
                color="secondary"
              >
                View product
              </LinkButton>
            </div>
          </GridElement>
        </div>
      </Container>
    </motion.div>
  );
}

function GridElement({
  children,
  image,
}: {
  children?: React.ReactNode;
  image: StaticImageData;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.9], [0.8, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [0, 0.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [0, 0, 1]);

  return (
    <motion.div
      style={{ scale }}
      ref={ref}
      className="relative h-[70vh] overflow-hidden rounded-lg bg-gray-800 "
    >
      <div className=" absolute top-0 z-10 h-full w-full bg-gray-950 opacity-10" />
      <div className=" absolute top-0 z-10 h-full w-full bg-gradient-to-t from-black opacity-80" />
      <Image
        src={image}
        alt="kite"
        className=" h-full w-full object-cover brightness-125 saturate-[30%] filter"
      />
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute top-0 z-10  h-full w-full   p-4  "
      >
        <Container
          maxWidth="7xl"
          className="m-auto flex h-full w-full flex-col items-center justify-end gap-6 pb-6"
        >
          {children}
        </Container>
      </motion.div>
    </motion.div>
  );
}

// h-[calc(100vh-64px)]

function AboutUsSection() {
  return (
    <div className="relative h-max w-full bg-neutral-900 md:h-screen">
      <Container maxWidth="7xl" className="m-auto md:h-screen">
        <div className=" md:max-w-8xl mx-auto h-full w-full md:flex md:items-center">
          <Image
            src={about_us}
            alt="group picture on beach"
            className="hp w-full rounded object-cover md:h-2/3 md:w-3/5 "
          />
          <div className="py-12 md:ml-6 md:rounded md:py-0">
            <h2 className=" pb-4  text-4xl font-medium md:w-2/5">
              About <span className=" font-bold"> Us</span>
            </h2>
            <p className="max-w-2xl font-light text-gray-300">
              We are a small team of passionate kitesurfers who love to share
              our passion with others. We are based in the beautiful city of
              Amsterdam and we are always ready to help you with any questions
              you might have. Feel free to contact us.We are based in the
              beautiful city of Amsterdam and we are always ready to help you
              with any questions you might have. Feel free to contact us.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
