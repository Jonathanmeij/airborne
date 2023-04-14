import { SignIn } from "@clerk/nextjs";
import { Container } from "~/components/ui";

export default function SignInPage() {
  return (
    <Container
      maxWidth="7xl"
      className="relative m-auto flex h-screen w-screen items-center justify-center pt-16"
    >
      <SignIn />
    </Container>
  );
}
