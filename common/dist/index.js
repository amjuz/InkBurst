"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogUpdateSchema = exports.BlogPostSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string(),
    name: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.BlogPostSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.BlogUpdateSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
