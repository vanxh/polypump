"use client";

import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function ConnectButton() {
  const { data: session, status } = useSession();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  if (status === "authenticated") {
    return (
      <Button onClick={openAccountModal} variant="secondary">
        {session?.user?.name?.substring(0, 4)}...
        {session?.user?.name?.substring(session?.user?.name?.length - 4)}
      </Button>
    );
  }

  return (
    <Button onClick={openConnectModal} variant="secondary">
      Connect
    </Button>
  );
}
