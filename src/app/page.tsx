import Image from "next/image";
import Button from "@features/ui/components/Button";
import Link from "next/link";

export default function Home() {
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
