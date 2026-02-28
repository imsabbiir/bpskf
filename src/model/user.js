import mongoose from "mongoose";


const donationHistorySchema = new mongoose.Schema({
  patient_name: { type: String},
  hospital_name: { type: String},
  location: { type: String },
  donation_date: { type: String } // Format: YYYY-MM-DD
}, { _id: false });


const UserSchema = new mongoose.Schema({
  common: {
    name: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'], lowercase: true },
    date_of_birth: { type: String,  },
    blood_group: { 
      type: String, 
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] 
    },
    phone_number: { 
      type: String, 
      unique: true,
      match: [/^(?:\+88|01)?\d{11}$/, 'Please provide a valid Bangladeshi phone number']
    },
    address: {
      city: { type: String,  },
      district: { type: String,  },
      upazila: { type: String,  },
      village: { type: String,  }
    },
    image: { type: String, default: "" }
  },

  ip_addresses: {
    ip: { type: String, default: "0.0.0.0" },
    device: { type: String, default: "Unknown" },
    created_at: { type: String, default: () => new Date().toISOString().split('T')[0] }
  },

  donor: {
    status: { 
      type: String, 
      enum: ['approved', 'pending', 'blocked'], 
      default: 'pending' 
    },
    weight: { type: Number, default: 0 },
    last_donation_date: { type: String, default: "" },
    donation_history: [donationHistorySchema]
  },

  volunteer: {
    requested: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ['approved', 'pending', 'blocked', "none"], 
      default: 'none' 
    },
    approved_date: { type: String, default: null },
    skills: [{ type: String }],
    availability: { type: String, default: "" },
    assigned_area: { type: String, default: "" }
  },
  
  
  password: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);