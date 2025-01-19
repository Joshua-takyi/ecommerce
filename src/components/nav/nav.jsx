import Link from "next/link";
import { Wrapper } from "../wrapper";
import DropdownMenu from "../dropdown/dropdown";
import { categories } from "@/database/db";

export default function Nav() {
	return (
		<nav className="shadow-sm p-4">
			<Wrapper className={`flex justify-between items-center`}>
				<div className="p-2">
					<DropdownMenu header="Categories" items={categories} />
				</div>
				<header>
					<Link href="/">
						<h1>PhoneXcess</h1>
					</Link>
				</header>
			</Wrapper>
		</nav>
	);
}
