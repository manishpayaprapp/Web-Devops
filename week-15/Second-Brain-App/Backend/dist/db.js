"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importStar(require("mongoose"));
const config_1 = require("./config");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true, maxlength: 32 },
    password: { type: String, required: true },
}, { timestamps: true });
const contentSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true, maxlength: 120 },
    link: { type: String, required: true, trim: true },
    type: { type: String, enum: ["youtube", "twitter"], required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: true });
const sharedLinkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
exports.ContentModel = (0, mongoose_1.model)("Content", contentSchema);
exports.LinkModel = (0, mongoose_1.model)("Links", sharedLinkSchema);
async function connectDatabase() {
    await mongoose_1.default.connect(config_1.DB_URL);
}
