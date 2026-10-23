"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
const node_crypto_1 = require("node:crypto");
function random(length) {
    return (0, node_crypto_1.randomBytes)(Math.ceil(length / 2)).toString("hex").slice(0, length);
}
