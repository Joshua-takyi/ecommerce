export const buildQuery = (searchParams) => {
	const query = {};
	const name = searchParams.get("name");
	const category = searchParams.get("category");
	const price = searchParams.get("price");
	const rating = searchParams.get("rating");
	const isOnSale = searchParams.get("isOnSale");
	const available = searchParams.get("available");
	const tags = searchParams.get("tags") || "";
	const isNewItem = searchParams.get("isNewItem");
	const model = searchParams.get("model");
	const discountPercentage = searchParams.get("discountPercentage");
	const salesStartAt = searchParams.get("salesStartAt");
	const salesEndAt = searchParams.get("salesEndAt");
	const search = searchParams.get("search");
	if (name) query.name = name;
	if (category) query.category = category;
	if (price) query.price = parseFloat(price);
	if (rating) query.rating = parseFloat(rating);
	if (isOnSale) query.isOnSale = isOnSale;
	if (available) query.available = available;
	if (isNewItem) query.isNewItem = isNewItem;
	if (discountPercentage)
		query.discountPercentage = parseFloat(discountPercentage);
	if (salesStartAt) query.salesStartAt = new Date(salesStartAt);
	if (salesEndAt) query.salesEndAt = new Date(salesEndAt);

	if (tags) {
		const tagArray = tags.split(",").map((tag) => tag.trim());
		query.tags = {
			$in: tagArray.map((tag) => new RegExp(tag, "i")), // Case-insensitive matching
		};
	}
	if (model) {
		const modelArray = model.split(",").map((tag) => tag.trim());
		query.model = {
			$in: modelArray.map((tag) => new RegExp(tag, "i")), // Case-insensitive matching
		};
	}
	if (search) {
		query.for = [
			{ name: { $regex: search, $options: "i" } },
			{ description: { $regex: search, $options: "i" } },
			{ category: { $regex: search, $options: "i" } },
			{ tags: { $regex: search, $options: "i" } },
			{ model: { $regex: search, $options: "i" } },
		];
	}
	return query;
};

export const BuildSort = (sortBy, sortOrder) => {
	return sortBy
		? { [sortBy]: sortOrder === "desc" ? -1 : 1 }
		: { createdAt: -1 };
};
