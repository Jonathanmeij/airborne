import { Popover } from "@headlessui/react";
import Button from "./Button";

interface SideMenuProps {
  title: string;
  children: React.ReactNode;
}

export function SideMenu({ title, children }: SideMenuProps) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button as={Button} color="secondaryDarker" rounded="rounded">
            {title}
          </Popover.Button>

          {open && (
            <>
              <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
              <div className="fixed right-0 top-0 z-50 h-screen w-72 bg-zinc-900 md:w-96">
                <Popover.Panel static>{children}</Popover.Panel>
              </div>
            </>
          )}
        </>
      )}
    </Popover>
  );
}
