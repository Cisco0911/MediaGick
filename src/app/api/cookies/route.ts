import {cookies} from "next/headers";


export async function POST(request: Request) {
	const req = await request.json()

	console.log(req)

	return new Response(JSON.stringify(""))
}

export async function DELETE() {

	cookies().delete("session");
	cookies().delete("refresh");

	return new Response(JSON.stringify(""))
}