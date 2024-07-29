import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@features/ui/components/Background";
import StoreProvider from "@app/StoreProvider";
import HtmlWrapper from "@features/ui/components/HtmlWrapper";

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
			<StoreProvider>
				<div className={"z-10 w-full h-full"}>
					{children}
				</div>
			</StoreProvider>
			</body>

		</HtmlWrapper>
	);
}
