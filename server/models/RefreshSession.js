import mongoose from "mongoose";

const refreshSessionSchema = new mongoose.Schema(
    {
        user: {  // which user this refresh token belongs to
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        jti: {  // jti means JWT ID.  // It's simply a unique identifier for one particular refresh token/session. //  A user can have multiple refresh tokens, but each refresh token has a unique jti.
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        tokenFamily: { // tokenFamily identifies the whole chain of rotated tokens.
            type: String,
            required: true,
            index: true,
        },

        tokenHash: { // hash of the refresh token
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },

        revokedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const RefreshSession = mongoose.model(
    "RefreshSession",
    refreshSessionSchema
);

export default RefreshSession;