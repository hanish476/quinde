// src/pages/RegistrationPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: { houseName: "", place: "", city: "", district: "", pincode: "" },
        institution: { name: "", address: "" },
        dob: "",
        mobile: "",
        watsapp: "",
        gmail: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    useEffect(() => {
        const stored = localStorage.getItem("spellingBeeRegistrationDraft");
        if (stored) setFormData(JSON.parse(stored));
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("spellingBeeRegistrationDraft", JSON.stringify(formData));
        }, 1000);
        return () => clearTimeout(timeout);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const subField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [subField]: value },
            }));
        } else if (name.startsWith("institution.")) {
            const subField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                institution: { ...prev.institution, [subField]: value },
            }));
        } else setFormData((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!formData.name.trim()) e.name = "Required";
        if (!formData.address.houseName.trim()) e["address.houseName"] = "Required";
        if (!formData.address.place.trim()) e["address.place"] = "Required";
        if (!formData.address.city.trim()) e["address.city"] = "Required";
        if (!formData.address.district.trim()) e["address.district"] = "Required";
        if (!/^\d{6}$/.test(formData.address.pincode))
            e["address.pincode"] = "6-digit pincode";
        if (!formData.institution.name.trim()) e["institution.name"] = "Required";
        if (!formData.institution.address.trim()) e["institution.address"] = "Required";
        if (!formData.dob) e.dob = "Required";
        if (!/^\d{10}$/.test(formData.mobile)) e.mobile = "10-digit number";
        if (formData.watsapp && !/^\d{10}$/.test(formData.watsapp))
            e.watsapp = "Invalid number";
        if (formData.gmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.gmail))
            e.gmail = "Invalid email";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            setToast({ show: true, message: "Please correct the errors.", type: "error" });
            return;
        }

        // IMPORTANT: Exposing the Google Apps Script URL here is a security vulnerability.
        // Replace this URL with your backend proxy endpoint.
        const sheetUrl = "https://script.google.com/macros/s/AKfycbzVvYzmDPyiJxQnPM0TBhBq6lDyj2CSnx8-SYr6Qi05eUJnC_SJQRBm10a93kettug/exec"; // Use your current script URL
        setIsSubmitting(true);

        const formBody = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
            if (typeof val === "object") {
                Object.entries(val).forEach(([sub, subVal]) =>
                    formBody.append(`${key}.${sub}`, subVal)
                );
            } else formBody.append(key, val);
        });

        try {
            const res = await fetch(sheetUrl, { method: "POST", body: formBody });
            const data = await res.json(); 

            if (data.status === "success") {
       
                setToast({ show: true, message: data.message || "Registration successful!", type: "success" });
                setFormData({
                    name: "",
                    address: { houseName: "", place: "", city: "", district: "", pincode: "" },
                    institution: { name: "", address: "" },
                    dob: "",
                    mobile: "",
                    watsapp: "",
                    gmail: "",
                });
                localStorage.removeItem("spellingBeeRegistrationDraft");
            } else {
                // Use the error message from the Apps Script response (data.message)
                setToast({ show: true, message: data.message || "Submission failed!", type: "error" });
            }
        } catch (err) {
            console.error(err);
            setToast({ show: true, message: "Network error!", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-brrown/80 p-4 pt-16"> {/* Added pt-16 for fixed notification bar */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl bg-cream shadow-2xl rounded-3xl p-6 md:p-8 border border-brrown relative"
            >
                <h1 className="text-3xl font-bold text-center mb-2 text-brrown">
                    🐝 Spelling Bee Registration
                </h1>
                <p className="text-center text-brrown/80 mb-6">
                    Fill out your details carefully. Your progress is auto-saved.
                </p>

                {toast.show && (
                    <div
                        className={`mb-4 p-3 rounded-md text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span>{toast.message}</span>
                            <button
                                onClick={() => setToast({ ...toast, show: false })}
                                className="text-white font-bold text-lg leading-none"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section 1 */}
                    <div>
                        <h2 className="font-semibold text-lg text-brrown mb-2">Personal Info</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-brrown mb-1">Full Name *</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-300 bg-cream" : "border-brrown focus:ring-brrown bg-cream text-brrown"
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-brrown mb-1">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.dob ? "border-red-500 focus:ring-red-300 bg-cream" : "border-brrown focus:ring-brrown bg-cream text-brrown"
                                        }`}
                                />
                                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h2 className="font-semibold text-lg text-brrown mb-2">Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["houseName", "place", "city", "district", "pincode"].map((key, i) => (
                                <div key={i}>
                                    <label className="block text-sm text-brrown mb-1 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")} *
                                    </label>
                                    <input
                                        name={`address.${key}`}
                                        value={formData.address[key]}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors[`address.${key}`] ? "border-red-500 focus:ring-red-300 bg-cream" : "border-brrown focus:ring-brrown bg-cream text-brrown"
                                            }`}
                                    />
                                    {errors[`address.${key}`] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[`address.${key}`]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h2 className="font-semibold text-lg text-brrown mb-2">Institution</h2>
                        <div className="space-y-3">
                            <input
                                name="institution.name"
                                value={formData.institution.name}
                                onChange={handleChange}
                                placeholder="Institution Name"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors["institution.name"] ? "border-red-500 focus:ring-red-300 bg-cream" : "border-brrown focus:ring-brrown bg-cream text-brrown"
                                    }`}
                            />
                            <textarea
                                name="institution.address"
                                value={formData.institution.address}
                                onChange={handleChange}
                                placeholder="Institution Address"
                                rows="2"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors["institution.address"] ? "border-red-500 focus:ring-red-300 bg-cream" : "border-brrown focus:ring-brrown bg-cream text-brrown"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h2 className="font-semibold text-lg text-brrown mb-2">Contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { name: "mobile", label: "Mobile Number *" },
                                { name: "watsapp", label: "WhatsApp (Optional)" },
                                { name: "gmail", label: "Email (Optional)" },
                            ].map((f, i) => (
                                <div key={i}>
                                    <label className="block text-sm text-brrown mb-1">{f.label}</label>
                                    <input
                                        name={f.name}
                                        value={formData[f.name]}
                                        onChange={handleChange}
                                        placeholder={f.label}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors[f.name] ? "border-red-500 focus:ring-red-300 bg-cream" : "border-brrown focus:ring-brrown bg-cream text-brrown"
                                            }`}
                                    />
                                    {errors[f.name] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[f.name]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-8 py-3 rounded-full font-semibold text-cream transition-all ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-brrown hover:bg-brrown/90"
                                }`}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Registration"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default RegistrationPage;