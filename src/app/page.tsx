import Image from "next/image";
import Button from "@features/ui/components/Button";
import Link from "next/link";
import TaskResponseDisplay from "@features/ui/components/TaskResponseDisplay";
import React from "react";







export default async function Home() {


	return (
		<div className="home">
			<Link href="/account">
				<Button variant="primary" className={"w-20"}>
					account
				</Button>
			</Link>
		</div>
	);
}
