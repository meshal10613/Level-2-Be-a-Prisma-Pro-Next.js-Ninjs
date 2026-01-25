"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { User } from "@/types";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    user: User | null;
    className?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
        className?: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar = ({
    user,
    logo = {
        url: "https://www.shadcnblocks.com",
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
        alt: "logo",
        title: "Shadcnblocks.com",
    },
    menu = [
        { title: "Home", url: "/" },
        {
            title: "Blogs",
            url: "/blogs",
        },
        {
            title: "About",
            url: "/about",
        },
        {
            title: "Dashboard",
            url: "/dashboard",
        },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
    className,
}: Navbar1Props) => {
    const router = useRouter();
    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await authClient.signOut();
            toast.success("Logged out successfully", { id: toastId });

            // Re-run server components (Navbar, layouts, etc.)
            router.refresh();
        } catch (error) {
            toast.error("Failed to logout", { id: toastId });
        }
    };

    return (
        <section className={cn("py-4", className)}>
            <div className="container mx-auto px-4">
                {/* Desktop Menu */}
                <nav className="hidden items-center justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <img
                                src={logo.src}
                                className="max-h-8 dark:invert"
                                alt={logo.alt}
                            />
                            <span className="text-lg font-semibold tracking-tighter">
                                {logo.title}
                            </span>
                        </a>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {menu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <ModeToggle />
                        {user ? (
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleLogout}
                                    variant={`outline`}
                                    size={`default`}
                                    className="cursor-pointer"
                                >
                                    Logout
                                </Button>
                                <div className="relative w-10 h-10">
                                    <Image
                                        src={
                                            user.image ||
                                            `https://img.daisyui.com/images/profile/demo/spiderperson@192.webp`
                                        }
                                        alt={user.name}
                                        fill
                                        className="rounded-full"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="default"
                                >
                                    <Link href={auth.login.url}>
                                        {auth.login.title}
                                    </Link>
                                </Button>
                                <Button asChild size="default">
                                    <Link href={auth.signup.url}>
                                        {auth.signup.title}
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <img
                                src={logo.src}
                                className="max-h-8 dark:invert"
                                alt={logo.alt}
                            />
                        </a>
                        <div className="flex items-center gap-3">
                            <ModeToggle />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <a
                                                href={logo.url}
                                                className="flex items-center gap-2"
                                            >
                                                <img
                                                    src={logo.src}
                                                    className="max-h-8 dark:invert"
                                                    alt={logo.alt}
                                                />
                                            </a>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 p-4">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="flex w-full flex-col gap-4"
                                        >
                                            {menu.map((item) =>
                                                renderMobileMenuItem(item),
                                            )}
                                        </Accordion>

                                        <div className="flex flex-col gap-3">
                                            <Button asChild variant="outline">
                                                <a href={auth.login.url}>
                                                    {auth.login.title}
                                                </a>
                                            </Button>
                                            <Button asChild>
                                                <a href={auth.signup.url}>
                                                    {auth.signup.title}
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    return (
        <Link
            key={item.title}
            href={item.url}
            className="text-md font-semibold"
        >
            {item.title}
        </Link>
    );
};

export { Navbar };
