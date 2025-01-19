import PropTypes from "prop-types";

export const Wrapper = ({ children, className }) => {
	return (
		<div className={`container mx-auto  ${className}`}>
			{children}
		</div>
	);
};

Wrapper.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
