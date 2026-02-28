import mongoose from "mongoose";

const donationHistorySchema = new mongoose.Schema({
  patient_name: { type: String, required: true },
  hospital_name: { type: String, required: true },
  location: { type: String, required: true },
  donation_date: { type: String, required: true } // format: DD/MM/YYYY
});

const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['male', 'female', 'other'], lowercase: true },
  date_of_birth: { type: String, required: true },
  blood_group: { 
    type: String, 
    required: true, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] 
  },
  phone_number: { 
    type: String, 
    required: true,
    match: [/^(?:\+88|01)?\d{11}$/, 'Please provide a valid Bangladeshi phone number']
  },
  password:{
    type: String,
    default: "",
    required: true
  },
  city: { type: String, required: true, lowercase: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  village: { type: String, required: true },
  image: { type: String, default: "" },
  donation_history: [donationHistorySchema],
  last_donation_date: { type: String, default: "" },
  weight: { type: Number, required: false},
  registered_date: { type: String },
  verified: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
}, { timestamps: true });


export default mongoose.models.Donor || mongoose.model("Donor", DonorSchema);