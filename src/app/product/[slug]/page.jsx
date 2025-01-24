import ProductPage from "../productPage";

export default async function Product({ params }) {
	const { slug } = await params;
	return (
		<div className="w-full h-full">
			<ProductPage slug={slug} />
		</div>
	);
}
