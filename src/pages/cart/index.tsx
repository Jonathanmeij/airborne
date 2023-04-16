/* eslint-disable @typescript-eslint/no-misused-promises */

import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import {
  type FieldValues,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import {
  Button,
  Container,
  Input,
  LinkButton,
  ResizablePanel,
} from "~/components/ui";
import DisclosurePanel from "~/components/ui/Disclosure";
import { FormInput } from "~/components/ui/FormInput";

// type Page = "information" | "payment" | "summary";

export default function CartPage() {
  const { query, back } = useRouter();

  // const isPaymentSelected = !!query.payment;
  // const isShippingSelected = !!query.shipping;
  // const isInformationSelected = !isPaymentSelected && !isShippingSelected;
  const id = getPageId(query);

  return (
    <div className="h-screen pt-16">
      <Container
        maxWidth="7xl"
        className="relative m-auto flex h-full flex-col-reverse justify-end gap-6  pt-6 lg:flex-row"
      >
        <div className="h-max w-full rounded border border-bunker-800 bg-bunker-900 p-3 lg:w-7/12 lg:p-6">
          <Container maxWidth="2xl" className="m-auto">
            <ResizablePanel id={id}>
              {id === "information" && <Information back={back} />}
              {id === "shipping" && <Shiping back={back} />}
              {id === "payment" && <Payment back={back} />}
            </ResizablePanel>
          </Container>
        </div>
        <div className="hidden h-96 rounded border border-bunker-800 bg-bunker-900 p-3 lg:block lg:w-5/12 lg:p-6">
          <h2 className=" text-xl font-medium">
            Your <span className=" font-bold"> order</span>
          </h2>
        </div>
        <DisclosurePanel title="Your order" className="lg:hidden">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            harum?
          </p>
        </DisclosurePanel>
      </Container>
    </div>
  );
}

function getPageId(query: ParsedUrlQuery) {
  if (query.payment) return "payment";
  if (query.shipping) return "shipping";
  return "information";
}

interface Panel {
  back: () => void;
}

type InformationForm = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

function Information({}: Panel) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<InformationForm>();
  const router = useRouter();

  const onSubmit = (data: InformationForm) => {
    console.log(data);
  };

  console.log(getValues());

  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className=" text-xl font-normal">
        personal <span className=" font-semibold"> information</span>
      </h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <Input
            name="First name"
            placeholder="First name"
            error={errors.firstName?.message?.toString()}
            register={register}
          />
        </div>

        <div className="flex flex-row justify-end">
          <Button type="submit" color="primary">
            Shipping
          </Button>
        </div>
      </form>
    </div>
  );
}

function Shiping({ back }: Panel) {
  return (
    <div className="flex flex-col gap-6">
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
    <div className="flex flex-col gap-6">
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
