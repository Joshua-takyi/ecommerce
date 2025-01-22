import Product from "../productPage";
import PropTypes from "prop-types";
export default async function ProductDetailsPage({ params }) {
	const { slug } = await params;
	return (
		<div>
			<Product slug={slug} />
		</div>
	);
}

ProductDetailsPage.propTypes = {
	params: PropTypes.object.isRequired,
};
