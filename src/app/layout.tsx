import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "@app/Providers";
import React from "react";
import {Toaster} from "react-hot-toast";
import { Inter } from "next/font/google";


const font = Inter({
	weight: ['100', "200", '300', '400', "500", "600", '700', '800', '900'],
	style: ['normal'],
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
