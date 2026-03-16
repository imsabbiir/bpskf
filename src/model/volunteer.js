import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    skills: { type: [String], default: [] },
    city: { type: String },
    district: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.models.Volunteer || mongoose.model("Volunteer", VolunteerSchema);