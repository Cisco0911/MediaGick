import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@features/ui/components/Background";
import HtmlWrapper from "@app/HtmlWrapper";
import {Providers} from "@app/Providers";
import React from "react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Media-Gick",
  description: "Your Media Magick Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

	return (
		<HtmlWrapper>

			<body>
				{/*<Background />*/}
				<Providers>
					<div className={"z-10 w-screen h-screen"}>
						{children}
					</div>
				</Providers>
			</body>

		</HtmlWrapper>
	);
}
