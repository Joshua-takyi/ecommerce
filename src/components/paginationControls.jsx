const PaginationControls = ({ page, totalPages, onPageChange }) => {
	return (
		<div className="flex gap-2 justify-center items-center mt-8">
			<button
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}
				className="px-6 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
				aria-label="Previous page"
			>
				Previous
			</button>
			<span className="px-4 py-2">
				Page {page} of {totalPages}
			</span>
			<button
				onClick={() => onPageChange(page + 1)}
				disabled={page === totalPages}
				className="px-6 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
				aria-label="Next page"
			>
				Next
			</button>
		</div>
	);
};

export default PaginationControls;
