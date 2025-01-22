"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import React from "react";

export function BreadcrumbComponent() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const slug = pathname.split("/").filter(Boolean);

	const generateBreadcrumbLabels = (slug) => {
		// Get the category from the query parameters
		const category = searchParams.get("category");

		// Default category label if no category is found
		const categoryLabel = category
			? category
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ")
			: "Collection";

		// Preserve all query parameters for the collection link
		const collectionUrl = `/collection?${searchParams.toString()}`;

		// If we're on a product page
		if (slug[0] === "product") {
			const productName = slug[1]
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");

			return [
				{
					label: "Home",
					path: "/",
				},
				{
					label: categoryLabel,
					path: collectionUrl, // Use the preserved query parameters
				},
				{
					label: productName,
					path: pathname,
				},
			];
		}

		// For collection pages
		if (slug[0] === "collection") {
			return [
				{
					label: "Home",
					path: "/",
				},
				{
					label: categoryLabel,
					path: collectionUrl, // Use the preserved query parameters
				},
			];
		}

		// Default behavior for other pages
		return [
			{
				label: "Home",
				path: "/",
			},
			...slug.map((segment, index) => ({
				label: segment
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
				path: `/${slug.slice(0, index + 1).join("/")}`,
			})),
		];
	};

	const breadcrumbs = generateBreadcrumbLabels(slug);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb, index) => (
					<React.Fragment key={breadcrumb.path}>
						<BreadcrumbItem>
							{index === breadcrumbs.length - 1 ? (
								<BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={breadcrumb.path}>
									{breadcrumb.label}
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
