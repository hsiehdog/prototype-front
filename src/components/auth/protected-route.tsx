"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { authClient } from "@/lib/auth/client";

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { data, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (error && error.message?.includes("Unauthorized")) {
      router.replace(redirectTo);
      return;
    }

    if (!isPending && !data?.session) {
      router.replace(redirectTo);
    }
  }, [data?.session, error, isPending, redirectTo, router]);

  if (isPending || (!data?.session && !error)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data?.session) {
    return null;
  }

  return <>{children}</>;
}
