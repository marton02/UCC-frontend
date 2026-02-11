import {IMenuItem} from "@/interfaces/IMenuItem";
import Menu from "@/components/menu";
import {UserProvider} from "@/providers/UserProvider";
import {getCurrentUser} from "@/lib/getCurrentUser";
import {EchoProvider} from "@/providers/EchoProvider";
import {cookies} from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const items: IMenuItem[] = [
    { label: "Eseményeim", href: "/" },
    { label: "Segítség", href: "/helpdesk" },
  ];

  const user = await getCurrentUser();
    const token = (await cookies()).get("auth")?.value ?? ""

  return (
    <UserProvider user={user}>
        <EchoProvider bearerToken={token}>
            <Menu items={items} />
            <main className={"pt-32 flex justify-center "}>
                {children}
            </main>
        </EchoProvider>
    </UserProvider>
  );
}
