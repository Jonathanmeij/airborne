import { useRouter } from "next/router";
import { Button, Container, LinkButton, ResizablePanel } from "~/components/ui";

type Page = "information" | "payment" | "summary";

export default function CartPage() {
  const { query, back } = useRouter();

  const isPaymentSelected = !!query.payment;
  const isShippingSelected = !!query.shipping;
  const isInformationSelected = !isPaymentSelected && !isShippingSelected;
  //set id to current page
  const id = isInformationSelected
    ? "information"
    : isShippingSelected
    ? "shipping"
    : "payment";
  console.log(id);

  return (
    <div className="h-screen pt-16">
      <Container
        maxWidth="7xl"
        className="relative m-auto flex h-full flex-col-reverse justify-end gap-6  pt-6 lg:flex-row"
      >
        <div className="h-max w-full rounded border border-bunker-900 bg-bunker-900 p-3 lg:w-7/12 lg:p-6">
          <ResizablePanel id={id}>
            {isInformationSelected && <Information back={back} />}
            {isShippingSelected && <Shiping back={back} />}
            {isPaymentSelected && <Payment back={back} />}
          </ResizablePanel>
        </div>
        <div className="h-96 rounded border border-bunker-900 bg-bunker-900 p-3 lg:w-5/12 lg:p-6">
          <h2 className=" text-xl font-medium">
            Your <span className=" font-bold"> order</span>
          </h2>
        </div>
      </Container>
    </div>
  );
}

interface Panel {
  back: () => void;
}

function Information({ back }: Panel) {
  return (
    <div className="flex w-full flex-col gap-3">
      <h2 className=" text-xl font-normal">
        personal <span className=" font-semibold"> information</span>
      </h2>
      <div className="flex flex-row justify-end">
        <LinkButton color="primary" to="/cart?shipping=true">
          Shipping
        </LinkButton>
      </div>
    </div>
  );
}

function Shiping({ back }: Panel) {
  console.log("shipping");

  return (
    <div className="flex flex-col gap-3">
      <h2 className=" text-xl font-normal">
        shiping <span className=" font-semibold"> information</span>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
        harum?
      </p>
      <div className="flex flex-row justify-between">
        <Button onClick={back} rounded="rounded" color="secondaryDark">
          Back
        </Button>
        <LinkButton color="primary" to="/cart?payment=true">
          Payment
        </LinkButton>
      </div>
    </div>
  );
}

function Payment({ back }: Panel) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className=" text-xl font-normal">
        payment <span className=" font-semibold"> information</span>
      </h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
        cum corporis voluptas voluptatum ut voluptatibus labore molestias
        architecto ducimus nesciunt dolor eos, blanditiis fuga cupiditate iste!
        Sunt sint tempore iusto!
      </p>
      <div className="flex flex-row justify-between">
        <Button onClick={back} rounded="rounded" color="secondaryDark">
          Back
        </Button>
        <LinkButton color="primary" to="/cart?summary=true">
          Summary
        </LinkButton>
      </div>
    </div>
  );
}
