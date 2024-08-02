import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@features/ui/components/Background";
import HtmlWrapper from "@app/HtmlWrapper";
import {Providers} from "@app/Providers";
import React from "react";
import {Toaster} from "react-hot-toast";

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
		<html lang={"fr"}>

			<body>
				{/*<Background />*/}
				<Providers>
					<div className={"z-10 w-screen h-screen"}>
						<Toaster
							position={"top-right"}
							containerStyle={{
								zIndex: 10000000
							}}
						/>
						{children}
					</div>
				</Providers>
			</body>

		</html>
	);
}
