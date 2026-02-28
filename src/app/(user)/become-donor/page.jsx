"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Droplet,
  MapPin,
  History,
  User,
  CheckCircle2,
  Heart,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Step-by-step Validation Schema
const validationSchemas = [
  Yup.object({
    name: Yup.string().required("Full name is required"),
    dob: Yup.date().required("Date of birth is required"),
    phone: Yup.string()
      .matches(
        /^(?:\+88|01)?\d{11}$/,
        "Invalid Bangladeshi number (e.g. 017xxxxxxxx)",
      )
      .required("Phone number is required"),
  }),
  Yup.object({
    blood_group: Yup.string().required("Please select your blood group"),
    weight: Yup.number().typeError("Must be a number").nullable(),
  }),
  Yup.object({
    city: Yup.string().required("Division is required"),
    district: Yup.string().required("District is required"),
    upazila: Yup.string().required("Upazila is required"),
    village: Yup.string().required("Village/Street details required"),
  }),
  Yup.object().shape({
    last_donation: Yup.string().when("isFirstTime", {
      is: false,
      then: (schema) => schema.required("Last donation date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
];

export default function DonorForm() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/imsabbiir/bangldesh-area-json/main/bangladesh-area.json",
        );
        const data = await res.json();
        setArea(data.bangladesh);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArea();
  }, []);

  // --- SEQUENTIAL VALIDATION LOGIC ---
  const handleNext = async (values, validateForm, setFieldTouched) => {
    const errors = await validateForm();

    if (step === 1) {
      if (!values.name) return setFieldTouched("name", true, true);
      if (!values.dob) return setFieldTouched("dob", true, true);
      if (!values.phone || errors.phone)
        return setFieldTouched("phone", true, true);
    }
    if (step === 2) {
      if (!values.blood_group)
        return setFieldTouched("blood_group", true, true);
    }
    if (step === 3) {
      if (!values.city) return setFieldTouched("city", true, true);
      if (!values.district) return setFieldTouched("district", true, true);
      if (!values.upazila) return setFieldTouched("upazila", true, true);
      if (!values.village) return setFieldTouched("village", true, true);
    }

    setStep((s) => s + 1);
  };

  const initialValues = {
    name: "",
    gender: "male",
    dob: "",
    phone: "",
    blood_group: "",
    weight: "",
    city: "",
    district: "",
    upazila: "",
    village: "",
    last_donation: "",
    isFirstTime: false,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 p-8 text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic tracking-tighter">
              LIFE-DROP
            </h2>
            <p className="text-red-100 text-xs font-bold uppercase tracking-widest">
              Step {step} / 4
            </p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= i ? "bg-white" : "bg-red-900/30"
                }`}
              />
            ))}
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step - 1]}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            // Mapping Flat Form values to Nested Mongoose Schema
            const finalPayload = {
              common: {
                name: values.name,
                gender: values.gender,
                date_of_birth: values.dob,
                blood_group: values.blood_group,
                phone_number: values.phone,
                address: {
                  city: values.city,
                  district: values.district,
                  upazila: values.upazila,
                  village: values.village,
                },
                image: "",
              },
              donor: {
                status: "pending",
                weight: values.weight ? Number(values.weight) : 0,
                last_donation_date: isFirstTime ? "" : values.last_donation,
                donation_history: [],
              },
              volunteer: {
                requested: false,
                status: "none",
              },
              password: "", // Handled by server or added later
            };
            console.log("final playload", finalPayload);

            try {
              const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalPayload),
              });

              if (response.ok) {
                toast.success("Registration Successful!");
                resetForm();
                setStep(1);
                setIsFirstTime(false);
              } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message}`);
              }
            } catch (error) {
              toast.error("Something went wrong. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            setFieldValue,
            errors,
            touched,
            validateForm,
            setFieldTouched,
            isSubmitting,
          }) => (
            <Form className="p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <User className="text-red-500" /> Identity
                    </h3>
                    <div>
                      <Field
                        name="name"
                        placeholder="Full Name"
                        className={`w-full p-4 rounded-2xl bg-slate-100 outline-none border ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                      />
                      <div className="text-red-500 text-[10px] font-bold uppercase mt-1 px-2">
                        <ErrorMessage name="name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        as="select"
                        name="gender"
                        className="w-full p-4 rounded-2xl bg-slate-100 outline-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Field>
                      <div>
                        <Field
                          name="dob"
                          type="date"
                          className={`w-full p-4 rounded-2xl bg-slate-100 outline-none border ${
                            errors.dob && touched.dob
                              ? "border-red-500"
                              : "border-transparent"
                          }`}
                        />
                        <div className="text-red-500 text-[10px] font-bold uppercase mt-1 px-2">
                          <ErrorMessage name="dob" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Field
                        name="phone"
                        placeholder="Phone (e.g. 017...)"
                        className={`w-full p-4 rounded-2xl bg-slate-100 outline-none border ${
                          errors.phone && touched.phone
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                      />
                      <div className="text-red-500 text-[10px] font-bold uppercase mt-1 px-2">
                        <ErrorMessage name="phone" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Droplet className="text-red-500" /> Blood Group
                    </h3>
                    <div>
                      <div className="grid grid-cols-4 gap-2">
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (bg) => (
                            <button
                              key={bg}
                              type="button"
                              onClick={() => {
                                setFieldValue("blood_group", bg);
                                setFieldTouched("blood_group", false);
                              }}
                              className={`py-3 rounded-xl font-black ${
                                values.blood_group === bg
                                  ? "bg-red-600 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {bg}
                            </button>
                          ),
                        )}
                      </div>
                      <div className="text-red-500 text-[10px] font-bold mt-2">
                        <ErrorMessage name="blood_group" />
                      </div>
                    </div>
                    <Field
                      name="weight"
                      type="number"
                      placeholder="Weight (kg) - Optional"
                      className="w-full p-4 rounded-2xl bg-slate-100 outline-none"
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <MapPin className="text-red-500" /> Location
                    </h3>

                    <div>
                      <Field
                        as="select"
                        name="city"
                        onChange={(e) => {
                          setFieldValue("city", e.target.value);
                          setFieldValue("district", "");
                          setFieldValue("upazila", "");
                        }}
                        className={`w-full p-4 rounded-2xl bg-slate-100 outline-none border ${
                          errors.city && touched.city
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                      >
                        <option value="">Division</option>
                        {area.map((d) => (
                          <option key={d.id} value={d.division}>
                            {d.division}
                          </option>
                        ))}
                      </Field>
                      <div className="text-red-500 text-[10px] font-bold uppercase mt-1 px-2">
                        <ErrorMessage name="city" />
                      </div>
                    </div>

                    <div>
                      <Field
                        as="select"
                        name="district"
                        disabled={!values.city}
                        onChange={(e) => {
                          setFieldValue("district", e.target.value);
                          setFieldValue("upazila", "");
                        }}
                        className={`w-full p-4 rounded-2xl bg-slate-100 outline-none border ${
                          errors.district && touched.district
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                      >
                        <option value="">District</option>
                        {area
                          .find((i) => i.division === values.city)
                          ?.districts.map((dist) => (
                            <option key={dist.id} value={dist.name}>
                              {dist.name}
                            </option>
                          ))}
                      </Field>
                      <div className="text-red-500 text-[10px] font-bold uppercase mt-1 px-2">
                        <ErrorMessage name="district" />
                      </div>
                    </div>

                    <div>
                      <Field
                        as="select"
                        name="upazila"
                        disabled={!values.district}
                        className={`w-full p-4 rounded-2xl bg-slate-100 outline-none border ${
                          errors.upazila && touched.upazila
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                      >
                        <option value="">Upazila</option>
                        {area
                          .find((i) => i.division === values.city)
                          ?.districts.find((d) => d.name === values.district)
                          ?.upazilas.map((up) => (
                            <option key={up.id} value={up.name}>
                              {up.name}
                            </option>
                          ))}
                      </Field>
                      <div className="text-red-500 text-[10px] font-bold uppercase mt-1 px-2">
                        <ErrorMessage name="upazila" />
                      </div>
                    </div>

                    <div>
                      <Field
                        name="village"
                        placeholder="Village/Street"
                        className={`w-full p-4 rounded-2xl bg-slate-100 outline-none border ${
                          errors.village && touched.village
                            ? "border-red-500"
                            : "border-transparent"
                        }`}
                      />
                      <div className="text-red-500 text-[10px] font-bold uppercase mt-1 px-2">
                        <ErrorMessage name="village" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="s4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <History size={20} className="text-red-500" /> Donation
                      Status
                    </h3>

                    <div className="flex items-center justify-between bg-red-50 p-5 rounded-xl border border-red-100">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full transition-colors ${
                            isFirstTime
                              ? "bg-red-500 text-white"
                              : "bg-slate-200 text-slate-400"
                          }`}
                        >
                          <Heart
                            size={20}
                            fill={isFirstTime ? "currentColor" : "none"}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-700">
                            First Time Donor
                          </p>
                          <p className="text-[10px] text-red-400 uppercase font-bold">
                            New Hero
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsFirstTime(!isFirstTime);
                          setFieldValue("isFirstTime", !isFirstTime);
                        }}
                        className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                          isFirstTime ? "bg-red-500" : "bg-slate-300"
                        }`}
                      >
                        <motion.div
                          animate={{ x: isFirstTime ? 28 : 0 }}
                          className="bg-white w-5 h-5 rounded-full shadow-md"
                        />
                      </button>
                    </div>

                    {!isFirstTime && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                          When was your last donation?
                        </label>
                        <Field
                          name="last_donation"
                          type="date"
                          className="w-full p-4 rounded-2xl bg-slate-100 border-none outline-none"
                        />
                        <div className="text-red-500 text-[10px] font-bold uppercase mt-1 px-2">
                          <ErrorMessage name="last_donation" />
                        </div>
                      </motion.div>
                    )}

                    <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex gap-3 text-green-700 text-sm">
                      <CheckCircle2 className="shrink-0" size={18} />
                      <p>
                        I confirm that the information provided is accurate and
                        I am ready to donate.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-10">
                {step > 1 && (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-4 font-bold text-slate-400 disabled:opacity-50"
                  >
                    Back
                  </button>
                )}
                <button
                  type={step === 4 ? "submit" : "button"}
                  disabled={isSubmitting}
                  onClick={
                    step < 4
                      ? () => handleNext(values, validateForm, setFieldTouched)
                      : undefined
                  }
                  className="flex-2 py-4 px-8 bg-red-600 text-white font-bold rounded-2xl shadow-xl shadow-red-200 active:scale-95 transition-all flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : step === 4 ? (
                    "Complete Registration"
                  ) : (
                    "Next Step"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
