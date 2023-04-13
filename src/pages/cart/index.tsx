import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Container } from "~/components";

type Page = "information" | "payment" | "summary";

export default function CartPage() {
  const { query } = useRouter();

  const isPaymentSelected = !!query.payment;
  const isSummarySelected = !!query.summary;
  const isInformationSelected = !isPaymentSelected && !isSummarySelected;

  console.log({ isPaymentSelected, isSummarySelected, isInformationSelected });

  return (
    <div className="h-screen">
      <Container
        maxWidth="7xl"
        className="relative m-auto flex flex-col-reverse gap-6 pt-16 md:flex-row"
      >
        <div className="h-96 rounded  border border-bunker-900 p-3 md:w-7/12 md:p-6">
          {isInformationSelected && <Information />}
          {isPaymentSelected && <Payment />}
        </div>
        <div className="h-96 rounded border border-bunker-900 p-3 md:w-5/12 md:p-6">
          <h2 className=" text-xl font-medium">
            Your <span className=" font-bold"> order</span>
          </h2>
        </div>
      </Container>
    </div>
  );
}

interface PageProps {
  page: Page;
}

function Information({}: PageProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <h2 className=" text-xl font-medium">
        personal <span className=" font-bold"> information</span>
      </h2>
      <Link href="/cart?payment=true">payment</Link>
    </div>
  );
}

function Payment({}: PageProps) {
  return (
    <h2 className=" text-xl font-medium">
      payment <span className=" font-bold"> information</span>
    </h2>
  );
}
