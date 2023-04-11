import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import Head from "next/head";
import CartProvider from "./CartProvider";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#0284c7",
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <CartProvider>
        <Toaster />
        <Navbar />
        <Head>
          <title>Airborne</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </CartProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
