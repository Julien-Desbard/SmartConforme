import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "SmartRelance - Recouvrement augmenté par l'IA",
	description: "Uploadez vos factures, l'IA les relmances et vous encaissez",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
