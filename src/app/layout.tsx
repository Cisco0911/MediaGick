import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "@app/Providers";
import React from "react";
import {Toaster} from "react-hot-toast";
import { Cormorant_Garamond, Josefin_Sans, Josefin_Slab } from "next/font/google";


const font = Josefin_Slab({
	weight: ['100', "200", '300', '400', "500", "600", '700'],
	style: ['normal', "italic"],
	subsets: ['latin'],
	display: 'swap',
});

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
		<html lang={"fr"} className={font.className}>

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
