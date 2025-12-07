import { LayoutDashboardIcon, PackageOpenIcon, UserRoundIcon, WalletIcon } from "lucide-react";
import { listed } from "./listed";

export const sidebarItem = [
    {
        nama: "Dashboard",
        href: listed.dashboard,
        icon: <LayoutDashboardIcon />
    },
    {
        nama: "Transaksi",
        href: listed.transaksi,
        icon: <WalletIcon />
    },
    {
        nama: "Produk",
        href: listed.produk,
        icon: <PackageOpenIcon />
    },

]