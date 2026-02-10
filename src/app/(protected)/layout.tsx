import {IMenuItem} from "@/interfaces/IMenuItem";
import Menu from "@/components/menu";
import {UserProvider} from "@/providers/UserProvider";
import {getCurrentUser} from "@/lib/getCurrentUser";

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

  return (
    <UserProvider user={user}>
        <Menu items={items} />
        <main className={"pt-32 flex justify-center "}>
            {children}
        </main>
    </UserProvider>
  );
}
