"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import UseFormValidator from "@/hooks/validator";
import { FormInput } from "@/components/form/formInput";
import { FormTextarea } from "@/components/form/textareaInput";
import { FormSelect } from "@/components/form/formSelect";
import { FormImageUpload } from "@/components/form/formImageUpload";
import { FormDynamicList } from "@/components/form/dynamicList";
import { FormSubmitButton } from "@/components/form/submitBtn";
import { SelectCategories, tags } from "@/database/db";
import { FormDateTimeInput } from "@/components/form/formTimeInput";
import { FormCheckbox } from "@/components/form/checkbox";
import { FormColors } from "@/components/form/formcolors";
import ProductSchema from "@/schema/validator";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AddTask = () => {
	const { validateField, validateForm, errors } =
		UseFormValidator(ProductSchema);

	const initialState = {
		name: "",
		description: "",
		price: "",
		image: [],
		category: [],
		stock: "",
		discountPercentage: "",
		model: [],
		tags: [],
		details: [],
		isOnSale: false,
		colors: [],
		materials: [],
		features: [],
		isNewItem: false,
		salesStartAt: "",
		salesEndAt: "",
	};
	const [data, setData] = useState(initialState);

	// Handle form submission and mutations
	const { mutate, isLoading } = useMutation({
		mutationKey: ["addProduct"],
		mutationFn: async (formattedData) => {
			try {
				const res = await axios.post(`${API_URL}/v1/addProduct`, formattedData);

				if (res.status !== 201) {
					const errorData = await res.json();
					throw new Error(errorData.error || "Failed to create product");
				}
				return res.data;
			} catch (error) {
				if (!axios.isAxiosError(error)) {
					throw error;
				}
				throw new Error(
					error.response?.data?.error || "Failed to create product"
				);
			}
		},
		onSuccess: () => {
			toast.success("Product created successfully!");
			setData(initialState);
		},
		onError: (error) => {
			toast.error(error.message || "Failed to create product");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		// Format the data before submission
		// validate sales start and end date to make sure sales start is not greater than sales end
		if (data.isOnSale && data.salesStartAt && data.salesEndAt) {
			if (new Date(data.salesStartAt) > new Date(data.salesEndAt)) {
				toast.error("Sales start date cannot be greater than sales end date");
				return;
			}
		}
		const formattedData = {
			...data,
			price: Number(data.price), // Convert to number
			stock: Number(data.stock), // Convert to number
			discountPercentage: Number(data.discountPercentage) || 0, // Convert to number
			salesStartAt:
				data.isOnSale && data.salesStartAt
					? new Date(data.salesStartAt).toISOString()
					: null,
			salesEndAt:
				data.isOnSale && data.salesEndAt
					? new Date(data.salesEndAt).toISOString()
					: null,
		};

		// Validate the form
		if (!validateForm(formattedData)) {
			toast.error("Please fix the errors in the form.");
			return;
		}

		// Submit the form
		mutate(formattedData);
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white rounded-xl shadow-lg p-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">
						Add New Product
					</h1>
					<form className="space-y-8" onSubmit={handleSubmit}>
						{/* Basic Information */}
						<div className="space-y-6">
							<p className="text-xl font-semibold text-gray-800">
								Basic Information
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormInput
									label="Item Name"
									name="name"
									value={data.name}
									onChange={(e) => {
										setData((prev) => ({ ...prev, name: e.target.value })); // Update state
										validateField("name", e.target.value);
									}}
									placeholder="Enter product name"
									required
								/>
								<div className="flex gap-2 justify-between items-center">
									<FormCheckbox
										label="Is on sale?"
										name="isOnSale"
										checked={data.isOnSale}
										onChange={(e) => {
											setData((prev) => ({
												...prev,
												isOnSale: e.target.checked,
											}));
											validateField("isOnSale", e.target.checked);
										}}
									/>
									<FormCheckbox
										label="Is new item?"
										name="isNewItem"
										checked={data.isNewItem}
										onChange={(e) => {
											setData((prev) => ({
												...prev,
												isNewItem: e.target.checked,
											}));
											validateField("isNewItem", e.target.checked);
										}}
									/>
								</div>
							</div>
							<FormTextarea
								label="Description"
								name="description"
								value={data.description}
								onChange={(e) => {
									setData((prev) => ({ ...prev, description: e.target.value }));
									validateField("description", e.target.value);
								}}
								placeholder="Enter product description"
							/>
						</div>

						{/* Categories and tags */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormSelect
								isMulti={true}
								label="Categories"
								options={SelectCategories}
								value={data.category}
								onChange={(value) => {
									setData((prev) => ({ ...prev, category: value }));
									validateField("category", value);
								}}
								placeholder="Select a category"
								required
							/>

							{/* tags */}
							<FormSelect
								isMulti={true}
								label="Tags"
								options={tags}
								value={data.tags}
								onChange={(value) => {
									setData((prev) => ({ ...prev, tags: value }));
									validateField("tags", value);
								}}
								placeholder="Select a tag"
								required
							/>
						</div>
						{/* price and discountedPercentage */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<FormInput
								label="Price"
								name="price"
								value={data.price}
								type="number"
								onChange={(e) => {
									setData((prev) => ({ ...prev, price: e.target.value }));
									validateField("price", e.target.value);
								}}
								placeholder="Enter price"
								required
							/>
							<FormInput
								label="Discount Percentage"
								name="discountPercentage"
								type="number"
								value={data.discountPercentage}
								onChange={(e) => {
									setData((prev) => ({
										...prev,
										discountPercentage: e.target.value,
									}));
									validateField("discountPercentage", e.target.value);
								}}
								placeholder="Enter discount percentage"
							/>
							<FormInput
								label="Stock"
								name="stock"
								type="number"
								value={data.stock}
								onChange={(e) => {
									setData((prev) => ({ ...prev, stock: e.target.value }));
									validateField("stock", e.target.value);
								}}
								placeholder="Enter stock"
							/>
						</div>
						{/* sales start and end */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormDateTimeInput
								label="Sale Start Date & Time"
								value={data.salesStartAt}
								onChange={(value) => {
									setData((prev) => ({ ...prev, salesStartAt: value }));
									validateField("salesStartAt", value);
								}}
								placeholder="Select start date and time"
								required={data.isOnSale}
								disabled={!data.isOnSale}
							/>
							<FormDateTimeInput
								label="Sale End Date & Time"
								value={data.salesEndAt}
								onChange={(value) => {
									setData((prev) => ({ ...prev, salesEndAt: value }));
									validateField("salesEndAt", value);
								}}
								placeholder="Select end date and time"
								required={data.isOnSale}
								disabled={!data.isOnSale}
							/>
						</div>
						<div className="grid md:grid-cols-2 grid-cols-1 gap-6">
							<FormColors
								colors={data.colors}
								onAddColor={(color) => {
									setData((prev) => ({
										...prev,
										colors: [...prev.colors, color],
									}));
									validateField("colors", color);
								}}
								onChangeColor={(index, color) => {
									const updatedColors = [...data.colors];
									updatedColors[index] = color;
									setData((prev) => ({ ...prev, colors: updatedColors }));
									validateField("colors", color);
								}}
								onDeleteColor={(color) => {
									const updatedColors = data.colors.filter((c) => c !== color);
									setData((prev) => ({ ...prev, colors: updatedColors }));
								}}
								isMultiple // Enable multiple color selection
							/>

							{/* model */}
							<FormDynamicList
								className="w-full"
								label={`model`}
								items={data.model}
								onAddItem={() => {
									setData((prev) => ({
										...prev,
										model: [...prev.model, ""],
									}));
								}}
								onChangeItem={(index, value) => {
									const updatedModel = [...data.model];
									updatedModel[index] = value;
									setData((prev) => ({ ...prev, model: updatedModel }));
									validateField("model", value);
								}}
								onDeleteItem={(index) => {
									const updatedModel = data.model.filter((_, i) => i !== index);
									setData((prev) => ({ ...prev, model: updatedModel }));
								}}
							/>
						</div>
						<div className="flex flex-col md:gap-5 gap-3">
							{/* Dynamic Lists */}
							<FormDynamicList
								label="Materials"
								items={data.materials}
								onAddItem={() => {
									setData((prev) => ({
										...prev,
										materials: [...prev.materials, ""],
									}));
								}}
								onChangeItem={(index, value) => {
									const updatedMaterials = [...data.materials];
									updatedMaterials[index] = value;
									setData((prev) => ({ ...prev, materials: updatedMaterials }));
								}}
								onDeleteItem={(index) => {
									const updatedMaterials = data.materials.filter(
										(_, i) => i !== index
									);
									setData((prev) => ({ ...prev, materials: updatedMaterials }));
								}}
								placeholder="Enter material"
							/>
							<FormDynamicList
								label="Details"
								items={data.details}
								onAddItem={() => {
									setData((prev) => ({
										...prev,
										details: [...prev.details, ""],
									}));
								}}
								onChangeItem={(index, value) => {
									const updatedDetails = [...data.details];
									updatedDetails[index] = value;
									setData((prev) => ({ ...prev, details: updatedDetails }));
									validateField("details", value);
								}}
								onDeleteItem={(index) => {
									const updatedDetails = data.details.filter(
										(_, i) => i !== index
									);
									setData((prev) => ({ ...prev, details: updatedDetails }));
								}}
								placeholder="Enter detail"
							/>
							<FormDynamicList
								label="Features"
								items={data.features}
								onAddItem={() => {
									setData((prev) => ({
										...prev,
										features: [...prev.features, ""],
									}));
								}}
								onChangeItem={(index, value) => {
									const updatedFeatures = [...data.features];
									updatedFeatures[index] = value;
									setData((prev) => ({ ...prev, features: updatedFeatures }));
									validateField("features", value);
								}}
								onDeleteItem={(index) => {
									const updatedFeatures = data.features.filter(
										(_, i) => i !== index
									);
									setData((prev) => ({ ...prev, features: updatedFeatures }));
								}}
								placeholder="Enter feature"
							/>
						</div>
						{/* Image Upload */}
						<FormImageUpload
							images={data.image}
							onUploadSuccess={(result) => {
								const { secure_url } = result.info;
								setData((prev) => ({
									...prev,
									image: [...prev.image, secure_url],
								}));
								validateField("image", secure_url);
							}}
							onDeleteImage={(index) => {
								setData((prev) => ({
									...prev,
									image: prev.image.filter((_, i) => i !== index),
								}));
							}}
						/>

						{/* Submit Button */}
						<FormSubmitButton
							label="Add Product"
							isLoading={isLoading}
							type="submit"
							disabled={isLoading}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddTask;
