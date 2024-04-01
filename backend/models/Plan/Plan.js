const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
    {
        planeName: {
            type: String,
            required: true
        },
        features: [String],
        limitations: [String],
        price: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;