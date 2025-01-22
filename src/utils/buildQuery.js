export const buildQuery = (searchParams) => {
	const query = {};

	// Helper function to parse and add regex conditions
	const addRegexCondition = (field, value) => {
		if (value) {
			query[field] = { $regex: value, $options: "i" }; // Case-insensitive regex
		}
	};

	// Helper function to parse and add array conditions
	const addArrayCondition = (field, value) => {
		if (value) {
			const array = value.split(",").map((item) => item.trim());
			query[field] = { $in: array.map((item) => new RegExp(item, "i")) };
		}
	};

	// Add conditions based on search parameters
	addRegexCondition("name", searchParams.get("name"));
	addRegexCondition("search", searchParams.get("search"));

	if (searchParams.get("price")) query.price = parseFloat(searchParams.get("price"));
	if (searchParams.get("rating")) query.rating = parseFloat(searchParams.get("rating"));
	if (searchParams.get("isOnSale")) query.isOnSale = searchParams.get("isOnSale") === "true";
	if (searchParams.get("available")) query.available = searchParams.get("available") === "true";
	if (searchParams.get("isNewItem")) query.isNewItem = searchParams.get("isNewItem") === "true";
	if (searchParams.get("discountPercentage")) query.discountPercentage = parseFloat(searchParams.get("discountPercentage"));
	if (searchParams.get("salesStartAt")) query.salesStartAt = new Date(searchParams.get("salesStartAt"));
	if (searchParams.get("salesEndAt")) query.salesEndAt = new Date(searchParams.get("salesEndAt"));

	addArrayCondition("category", searchParams.get("category"));
	addArrayCondition("tags", searchParams.get("tags"));

	// Handle model parameter
	const model = searchParams.get("model");
	if (model) {
		try {
			const parsedModel = JSON.parse(model);
			if (Array.isArray(parsedModel) && parsedModel.length > 0) {
				query.model = { $in: parsedModel.map((m) => new RegExp(m, "i")) };
			}
		} catch (e) {
			console.error("Error parsing model:", e);
		}
	}

	return query;
};

export const BuildSort = (sortBy, sortOrder) => {
	return sortBy ? { [sortBy]: sortOrder === "desc" ? -1 : 1 } : { createdAt: -1 };
};