import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        tokenHash: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        usedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

passwordResetTokenSchema.index(
    { expiresAt: 1 }, // TTl = Time To Live Index
    { expireAfterSeconds: 0 } // Once expiresAt has been reached, this document is eligible for automatic deletion
);

export default mongoose.model(
    "PasswordResetToken",
    passwordResetTokenSchema
);