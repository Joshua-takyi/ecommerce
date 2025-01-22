const FilterSidebar = ({ category, onFilterChange }) => {
	// Add your filter logic here
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">{category}</h2>
			{/* Add filter UI components here */}
		</div>
	);
};

export default FilterSidebar;
