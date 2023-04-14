import { SignOutButton, UserProfile, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Button, Container } from "~/components/ui";

export default function AccountPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  function handleSignOut() {
    void signOut();
    void router.push("/");
  }
  return (
    <div className="flex justify-center pt-16">
      <UserProfile />
    </div>
  );
}
