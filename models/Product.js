import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    name: {type: String, required: true},
    about: String,
    phoneNumber: Number,
    socialLink: Array,
    experiences: Array,
    education: Array,
    projects: Array,
    selectedSkills: Array,
    selectedProf: Array,
    dob: String,
    cv: String,
    emailid: String,
    location: String,
});

export const Product = models.Product || model('Product', ProductSchema);