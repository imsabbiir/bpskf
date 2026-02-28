import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
    required: true
  },
  phone:{
    type: String,
    trim: true,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
})

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);