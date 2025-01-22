import PropTypes from "prop-types";

const CollectionHeader = ({ title, description }) => (
	<div className="flex flex-col gap-4 md:py-6 mb-8">
		<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-[#011627]">
			{title}
		</h1>
		<div className="text-gray-600">
			<p className="text-pretty w-full max-w-4xl text-sm md:text-base">
				{description}
			</p>
		</div>
	</div>
);

CollectionHeader.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
};

export default CollectionHeader;
