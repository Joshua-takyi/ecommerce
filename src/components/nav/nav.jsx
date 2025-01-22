import Link from "next/link";
import { Wrapper } from "../wrapper";
import DropdownMenu from "../dropdown/dropdown";
import { categories } from "@/database/db";
import { Heart, ShoppingCart, User } from "lucide-react";

export default function Nav() {
	return (
		<nav className={`sticky top-0 z-50 bg-white shadow-sm`}>
			<Wrapper>
				<div className="grid grid-cols-12 items-center h-16">
					{/* Logo */}
					<header className="col-span-2 z-50">
						<Link href="/">
							<h1 className="text-xl font-bold">PhoneXcess</h1>
						</Link>
					</header>

					{/* Navigation Links */}
					<div className="col-span-8 flex items-center justify-center space-x-12">
						<DropdownMenu header="products" items={categories} />
						<DropdownMenu header="brands" items={categories} />
						<DropdownMenu header="categories" items={categories} />
					</div>

					{/* Icons */}
					<div className="col-span-2 flex justify-end items-center gap-6">
						<Link
							href="/cart"
							className="hover:text-gray-600 transition-colors p-2"
						>
							<ShoppingCart className="w-5 h-5" />
						</Link>
						<Link
							href="/wishlist"
							className="hover:text-gray-600 transition-colors p-2"
						>
							<Heart className="w-5 h-5" />
						</Link>
						<Link
							href="/signin"
							className="hover:text-gray-600 transition-colors p-2"
						>
							<User className="w-5 h-5" />
						</Link>
					</div>
				</div>
			</Wrapper>
		</nav>
	);
}
