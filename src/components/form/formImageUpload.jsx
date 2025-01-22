"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export const FormImageUpload = ({ images, onUploadSuccess, onDeleteImage, error }) => {
	return (
		<div className="space-y-4">
			<p className="text-xl font-semibold text-gray-800">
				Product Images <span className="text-red-500">*</span>
			</p>
			{error && <p className="text-red-500 text-sm">{error}</p>}
			<CldUploadWidget
				uploadPreset="snapNstyle"
				onSuccess={onUploadSuccess}
				options={{
					multiple: true,
					maxFiles: 4,
					transformation: [
						{ width: 500, height: 300, crop: "fill" },
						{ quality: "auto", fetch_format: "auto" },
					],
				}}
			>
				{({ open }) => (
					<button
						type="button"
						onClick={() => open()}
						className="bg-blue-500 text-white hover:bg-blue-400/30 p-4 rounded-md transition-all"
					>
						Upload an Image
					</button>
				)}
			</CldUploadWidget>
			{images.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{images.map((url, index) => (
						<div key={index} className="relative group">
							<div className="aspect-square rounded-lg overflow-hidden">
								<Image
									src={url}
									alt={`Product ${index + 1}`}
									width={400}
									height={400}
									className="object-cover w-full h-full"
								/>
							</div>
							<button
								type="button"
								onClick={() => onDeleteImage(index)}
								className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white"
							>
								<X size={16} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

FormImageUpload.propTypes = {
	images: PropTypes.array.isRequired,
	onUploadSuccess: PropTypes.func.isRequired,
	error: PropTypes.string,
	onDeleteImage: PropTypes.func.isRequired,
};
