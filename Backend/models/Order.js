const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: [
        {
            order_date: { type: Date, default: Date.now },
            address: { type: String },
            phoneNumber: { type: String },
            items: [
                {
                    name: { type: String },
                    size: { type: String },
                    img:{type:String},
                    quantity: { type: Number },
                    price: { type: Number },
                    customizations: {
                        sauce: { type: String },
                        cheese: { type: String },
                        veggies: [String]
                    }
                }
            ],
            status: {
                type: String,
                enum: ['Placed', 'Prepared', 'On the way', 'Delivered'],
                default: 'Placed'
            }
        }
    ]
});

module.exports = mongoose.model('Order', OrderSchema);
