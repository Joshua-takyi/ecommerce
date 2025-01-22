import { X } from "lucide-react";
import PropTypes from "prop-types";

const Modal = ({ children, onClose }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md">
				<div className="relative">
					<button
						onClick={onClose}
						className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800"
					>
						<X size={20} />
					</button>
					{children}
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Modal;
