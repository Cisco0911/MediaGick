"use client";


import React from "react";
import useZoomFontSize from "@app/_lib/hooks/fontSizeHook";

type Props = {
	children: React.ReactNode;
};

export default function HtmlWrapper({ children } : Props) {
	const fontSize = useZoomFontSize();

	return (
		<html lang="en" style={{ fontSize: `${fontSize}px` }}>
		{children}
		</html>
	);
}
