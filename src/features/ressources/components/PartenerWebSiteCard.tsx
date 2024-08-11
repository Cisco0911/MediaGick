import React from "react";
import {Card, CardBody} from "@nextui-org/card";
import Image from "next/image";
import Anka from "@app/_assets/image/partener-logo/Anka.png"
import Amazon from "@app/_assets/image/partener-logo/Amazon.png"
import PlayStore from "@app/_assets/image/partener-logo/PlayStore.png"
import AppStore from "@app/_assets/image/partener-logo/AppStore.png"
import ImmoAsk from "@app/_assets/image/partener-logo/ImmoAsk.png"
import CoinAfrique from "@app/_assets/image/partener-logo/CoinAfrique2.png"
import LinkedIn from "@app/_assets/image/partener-logo/LinkedIn.png"
import GoogleMap from "@app/_assets/image/partener-logo/GoogleMap.png"
import {GlobeEuropeAfricaIcon} from "@heroicons/react/24/solid";
import {AnimatePresence, motion, Variants} from "framer-motion";


type PartenerWebSiteCardProps = {
	isActive: boolean,
	color: string,
	label: string,
	children: React.ReactNode
}

function PartenerWebSiteCard({
	isActive,
	color,
	label,
	children}: PartenerWebSiteCardProps) {

	const variants: Variants = {
		inactive: {
			filter: "grayscale(1)"
		},
		active: {
			filter: "none",
			// scale: 1.1
		},
	}


	return (
		<motion.div className={"backdrop-blur-3xl rounded-xl"}
		            variants={variants} initial={"inactive"}
		            animate={isActive ? "active" : "inactive"}
		>
			<Card
				isBlurred
				className={`relative p-5 overflow-hidden`}
				style={{
					background: isActive ? "white" : color + "73",
				}}
			>

				{/*<AnimatePresence initial={false}>*/}
				{/*	{*/}
				{/*		!isActive &&*/}
				{/*        <motion.div className={"absolute z-10 top-0 bottom-0 left-0 right-0 bg-gray-500/50"}*/}
				{/*                    initial={{opacity: 0}}*/}
				{/*                    animate={{opacity: 1}}*/}
				{/*                    exit={{opacity: 0}}*/}
				{/*                    transition={{duration: 0.5}}*/}
				{/*        />*/}
				{/*	}*/}
				{/*</AnimatePresence>*/}

				<CardBody>
					<div className={"flex flex-col items-center space-y-5"}>

						<span style={{ color: isActive ? "black" : "white" }} className={"text-3xl font-bold"}>{label}</span>
						<div className={"relative w-40 h-40 flex justify-center items-center rounded-3xl overflow-hidden"}>
							{children}
						</div>

					</div>
				</CardBody>

			</Card>
		</motion.div>
	)
}

type ConcreteProps = {
	domain: string
}


export function AnkaCard({domain}: ConcreteProps) {

	const matcher = [
		"www.anka.africa"
	]

	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#c800b7"}
			label={"Anka"}
		>
			<Image src={Anka}
			       alt={"Anka logo"}
			/>
		</PartenerWebSiteCard>
	)

}

export function AmazonCard({domain}: ConcreteProps) {

	const matcher = [
		"www.amazon.fr",
		"www.amazon.com",
	]

	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#000000"}
			label={"Amazon"}
		>
			<Image src={Amazon}
			       alt={"Amazon logo"}
			       />
		</PartenerWebSiteCard>
	)

}

export function PlayStoreCard({domain}: ConcreteProps) {

	const matcher = [
		"play.google.com"
	]

	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#EA4335"}
			label={"Play Store"}
		>
			<Image src={PlayStore}
			       alt={"Play Store logo"}
			       />
		</PartenerWebSiteCard>
	)

}

export function AppStoreCard({domain}: ConcreteProps) {

	const matcher = [
		"www.apple.com"
	]

	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#1b83f4"}
			label={"App Store"}
		>
			<Image src={AppStore}
			       alt={"App Store logo"}
			       />
		</PartenerWebSiteCard>
	)

}

export function ImmoAskCard({domain}: ConcreteProps) {

	const matcher = [
		"immoask.com"
	]

	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#2d2a2a"}
			label={"ImmoAsk"}
		>
			<Image src={ImmoAsk}
			       alt={"ImmoAsk logo"}
			       />
		</PartenerWebSiteCard>
	)

}

export function CoinAfriqueCard({domain}: ConcreteProps) {

	const matcher = [
		"coinafrique.com",
		"www.coinafrique.com",
		"tg.coinafrique.com"
	]

	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#2d2a2a"}
			label={"Coin Afrique"}
		>
			<Image src={CoinAfrique}
			       alt={"Coin Afrique logo"}
			       />
		</PartenerWebSiteCard>
	)

}

export function LinkedInCard({domain}: ConcreteProps) {

	const matcher = [
		"www.linkedin.com"
	]


	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#0a66c2"}
			label={"LinkedIn"}
		>
			<Image src={LinkedIn}
			       alt={"LinkedIn logo"}
			       />
		</PartenerWebSiteCard>
	)

}

export function GoogleMapCard({domain}: ConcreteProps) {

	const matcher = [
		"www.google.com/maps"
	]

	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#018824"}
			label={"Google Map"}
		>
			<Image src={GoogleMap}
			       alt={"Google Map logo"}
			       />
		</PartenerWebSiteCard>
	)

}

export function VotreSiteCard({domain}: ConcreteProps) {

	const matcher = [
		"www.anka.africa",
		"www.amazon.fr",
		"www.amazon.com",
		"play.google.com",
		"www.apple.com",
		"immoask.com",
		"www.linkedin.com",
		"www.google.com/maps"
	]

	return(
		<PartenerWebSiteCard
			isActive={ matcher.includes(domain) }
			color={"#858a8c"}
			label={"Votre site"}
		>
			<GlobeEuropeAfricaIcon className={"size-36 fill-custom_white"} />
		</PartenerWebSiteCard>
	)

}