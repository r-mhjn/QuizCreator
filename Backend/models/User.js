const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		address: {
			houseno: {
				type: String,
			},
			locality: {
				type: String,
			},
			city: {
				type: String,
			},
			pincode: {
				type: String,
			},
			sector: {
				type: String,
			},
		},
		cart: [
			{
				productName: {
					type: String,
				},
				quantity: {
					type: Number,
				},
				description: {
					type: String,
				},
				price: {
					type: String,
				},
			},
		],
		orders: [
			{
				order: [
					{
						productName: {
							type: String,
						},
						quantity: {
							type: String,
						},
						price: {
							type: String,
						},
						orderedOn: {
							type: Date,
							date: Date.now(),
						},
					},
				],
			},
		],

		password: {
			type: String,
			required: true,
		},
		phoneno: {
			type: String,
			required: true,
			maxLength: 10,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = User = mongoose.model('myUser', UserSchema);
