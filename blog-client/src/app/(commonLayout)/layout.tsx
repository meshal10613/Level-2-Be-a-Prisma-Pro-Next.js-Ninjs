import { getUser } from "@/actions/user.action";
import { Navbar } from "@/components/layout/navbar";

export default async function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data } = await getUser();
    // if(!data) return null;
    const user = data?.user;
    return (
        <div>
            <Navbar user={user} />
            {children}
        </div>
    );
}
