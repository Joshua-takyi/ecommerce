import ProductPage from "../productPage";

export default async function Product({ params }) {
	const { slug } = await params;
	return (
		<div>
			<ProductPage slug={slug} />
		</div>
	);
}
