const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        profilePicture: {
            type: Object,
            default: null
        },
        email: {
            type: String,
            default: false, // Set to false if email is not mandatory
        },
        password: {
            type: String,
            default: false, // Set to false if password is not mandatory
        },
        googleId: {
            type: String,
            default: false, // Required only for users logging in with google
        },
        authMethod: {
            type: String,
            enum: ['google', 'local', 'facebook', 'github'],
            required: true,
            default: 'local'
        },
        passwordResetToken: {
            type: String,
            default: null
        },
        passwordResetExpires: {
            type: Date,
            default: null
        },
        accountVerificationToken: {
            type: String,
            default: null
        },
        accountVerificationExpires: {
            type: Date,
            default: null
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        totalEarning: { type: Number, default: 0 },
        nextEarningDate: {
            type: Date,
            default: () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) // default to the first date of next month
        },
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plan',
        },
        isEmailVerified:{
            type: Boolean,
            default: false,
        },
        payments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Payment'}],
        hasSelectedPlan: {type: Boolean, default: true},
        lastLogin: {type: Date, default: Date.now},

        // User Relationships
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], // Link to other users
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], // Link to other users
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;