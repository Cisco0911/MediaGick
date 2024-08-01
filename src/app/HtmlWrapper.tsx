"use client";


import React from "react";
import useZoomFontSize, {useResponsiveFontSize} from "@app/_lib/hooks/fontSizeHook";

type Props = {
	children: React.ReactNode;
};

export default function HtmlWrapper({ children } : Props) {
	// const fontSize = useZoomFontSize(18);

	const fontSize = useResponsiveFontSize(18, 1000);

	return (
		<html lang="en" >
		{children}
		</html>
	);
}
