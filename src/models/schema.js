import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		role: {
			type: String,
			required: true,
			enum: ["admin", "user"],
			default: "user",
		},
		image: {
			type: String,
			default: null,
			required: false,
		},
		providersId: {
			type: String,
			default: null,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const UserAuth =
	mongoose.models.UserAuth || mongoose.model("UserAuth", userAuthSchema);

export { UserAuth };
