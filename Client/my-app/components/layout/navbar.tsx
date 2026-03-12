'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard, UserCircle, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer"

import { useAuth } from "@/context/AuthContext"
import { LoginModal } from "@/components/auth/LoginModal"

const publicRoutes = [
    {
        name: "Application",
        path: "/",
        icon: ClipboardList,
    }
]

const restrictedRoutes = [
    {
        name: "dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Companies",
        path: "/Topics",
        icon: LayoutDashboard,
    },
    {
        name: "Archive: Applicants",
        path: "/Archive/Applicants",
        icon: ClipboardList,
    },
    {
        name: "Archive: Companies",
        path: "/Archive/Companies",
        icon: LayoutDashboard,
    }
]

export default function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false)
    const { isAuthenticated, logout } = useAuth()

    const routes = isAuthenticated
        ? [...publicRoutes, ...restrictedRoutes]
        : publicRoutes

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-kaizen-red flex items-center justify-center shadow-lg shadow-kaizen-red/20">
                            <span className="text-white font-bold text-sm">📝</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-primary-text">
                            TheYoko
                        </span>
                    </Link>

                    {/* Desktop Navigation - Hidden Sidebar Icon (as requested) */}
                    <div className="hidden md:flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
                        {routes.map((route) => (
                            <Link
                                key={route.path}
                                href={route.path}
                                className={cn(
                                    "text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200",
                                    pathname === route.path
                                        ? "bg-white text-kaizen-red shadow-sm border border-gray-200"
                                        : "text-gray-500 hover:text-gray-900"
                                )}
                            >
                                {route.name}
                            </Link>
                        ))}
                    </div>

                    {/* Admin Actions */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={logout}
                                className="text-gray-500 hover:text-kaizen-red text-xs font-semibold"
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsLoginModalOpen(true)}
                                className="text-gray-500 hover:text-kaizen-red text-xs font-semibold"
                            >
                                Admin
                            </Button>
                        )}

                        {/* Mobile Navigation Toggle */}
                        <div className="md:hidden">
                            <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
                                <DrawerTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-primary-text w-10 h-10 rounded-full hover:bg-gray-100">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent className="h-full w-[280px] sm:w-[320px] rounded-l-[20px] rounded-r-none border-y-0 border-r-0 fixed right-0 top-0 bottom-0 left-auto">
                                    <DrawerHeader className="border-b pb-6 mb-4">
                                        <div className="flex items-center justify-between">
                                            <DrawerTitle className="text-left flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-kaizen-red flex items-center justify-center shadow-lg shadow-kaizen-red/20">
                                                    <span className="text-white font-bold text-base">📝</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-lg leading-none">Kaizen UI</span>
                                                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1">Navigation Menu</span>
                                                </div>
                                            </DrawerTitle>
                                            <DrawerClose asChild>
                                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 h-9 w-9">
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </DrawerClose>
                                        </div>
                                    </DrawerHeader>
                                    <div className="flex flex-col gap-2 px-4 py-2">
                                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
                                            Available Routes
                                        </div>
                                        {routes.map((route) => (
                                            <Link
                                                key={route.path}
                                                href={route.path}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold transition-all duration-300 group",
                                                    pathname === route.path
                                                        ? "bg-kaizen-red text-white shadow-lg shadow-kaizen-red/20"
                                                        : "text-gray-600 hover:bg-gray-100 hover:text-primary-text"
                                                )}
                                            >
                                                <div className={cn(
                                                    "p-2 rounded-lg transition-all duration-300 group-hover:scale-110",
                                                    pathname === route.path ? "bg-white/20" : "bg-gray-50"
                                                )}>
                                                    <route.icon className={cn(
                                                        "h-5 w-5",
                                                        pathname === route.path ? "text-white" : "text-gray-500"
                                                    )} />
                                                </div>
                                                {route.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-auto p-8 border-t bg-gray-50/30">
                                        <p className="text-[11px] text-gray-400 text-center font-medium leading-relaxed">
                                            Modern UI System v1.0<br />
                                            Handcrafted by Antigravity
                                        </p>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
        </nav>
    )
}
