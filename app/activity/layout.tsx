"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import GoogleAuthModal from "@/components/auth/GoogleAuthModal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

export default function ActivityLayout({children}: { children?: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { user, loading, signOut } = useFirebaseAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/geoLogo.png"
                                    alt="Logo"
                                    width={80}
                                    height={80}
                                    className="rounded-lg"
                                />
                            </Link>
                            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <Link
                                    href="/activity"
                                    className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Home
                                </Link>
                                
                                {!loading && (
                                    <>
                                        {user ? (
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                                        <AvatarFallback>
                                                            {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {user.displayName || user.email}
                                                    </span>
                                                </div>
                                                <Button
                                                    onClick={handleSignOut}
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center space-x-1"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    <span>Sign Out</span>
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                onClick={() => setIsAuthModalOpen(true)}
                                                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    />
                                                </svg>
                                                <span>Sign In with Google</span>
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* Hamburger icon */}
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md border-t border-gray-200/50">
                            <Link
                                href="/activity"
                                className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            
                            {!loading && (
                                <>
                                    {user ? (
                                        <div className="px-3 py-2 space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                                    <AvatarFallback>
                                                        {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {user.displayName || user.email}
                                                </span>
                                            </div>
                                            <Button
                                                onClick={handleSignOut}
                                                variant="outline"
                                                size="sm"
                                                className="w-full flex items-center justify-center space-x-1"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Sign Out</span>
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => {
                                                setIsAuthModalOpen(true);
                                                setIsMenuOpen(false);
                                            }}
                                            className="bg-blue-600 text-white hover:bg-blue-700 w-full mx-3 flex items-center justify-center space-x-2"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                />
                                            </svg>
                                            <span>Sign In with Google</span>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-16">
                {children}
            </main>
            
            {/* Google Auth Modal */}
            <GoogleAuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={() => setIsAuthModalOpen(false)}
            />
        </div>
    );
}