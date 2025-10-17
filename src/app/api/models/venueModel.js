import mongoose from "mongoose";

const VenueSchema = new mongoose.Schema({
    venueName: { type: String, required: true },
    ownerName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    venueType: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    capacityMin: { type: Number, required: true },
    capacityMax: { type: Number, required: true },
    gstIn: { type: String, required: false },
    amenities: { type: [String], required: true },
    images: { type: [Buffer], required: false },
    description: { type: String, required: false },
    status: { type: String, required: true, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true, });

const VenueModel = mongoose.models.Venue || mongoose.model("Venue", VenueSchema, "venues");

export default VenueModel;