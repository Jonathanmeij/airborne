import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import {
  type FieldValues,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import { Button, Container, LinkButton, ResizablePanel } from "~/components/ui";

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
        <div className="h-max w-full rounded border border-bunker-900 bg-bunker-900 p-3 lg:w-7/12 lg:p-6">
          <ResizablePanel id={id}>
            {id === "information" && <Information back={back} />}
            {id === "shipping" && <Shiping back={back} />}
            {id === "payment" && <Payment back={back} />}
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
  const { register, handleSubmit } = useForm<InformationForm>();

  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className=" text-xl font-normal">
        personal <span className=" font-semibold"> information</span>
      </h2>

      <form className="flex flex-col gap-3">
        <Input label="First Name" {...register("firstName")} />
      </form>

      <div className="flex flex-row justify-end">
        <LinkButton color="primary" to="/cart?shipping=true">
          Shipping
        </LinkButton>
      </div>
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

const Input = <T extends FieldValues>({
  name,
  register,
  placeholder,
}: {
  name: string;
  register: UseFormRegister<T>;
  placeholder: string;
}) => {
  return (
    <input
      className="w-full rounded border border-bunker-900 bg-bunker-900 p-3"
      name={name}
      placeholder={placeholder}
      {...register}
    />
  );
};
