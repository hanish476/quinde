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
    const [modal, setModal] = useState({ show: false, type: "", data: null }); // 'success' | 'error'
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false); // NEW STATE

    // Auto-save draft
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

        const sheetUrl = import.meta.env.VITE_SHEETURL;
        const watsurl = import.meta.env.VITE_WHATSAPP_LINK;
        setIsSubmitting(true);

        setTimeout(() => {
            if (!modal.show) {
                // Only pulse if no modal appeared (i.e., still loading)
                const btn = document.activeElement;
                if (btn?.tagName === "BUTTON") btn.classList.add("scale-105");
                setTimeout(() => {
                    if (btn) btn.classList.remove("scale-105");
                }, 200);
            }
        }, 50);
        
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
                // Show success modal
                setModal({
                    show: true,
                    type: "success",
                    data: {
                        name: data.name || formData.name,
                        fullAddress: data.fullAddress || [
                            formData.address.houseName,
                            formData.address.place,
                            formData.address.city,
                            formData.address.district,
                            formData.address.pincode,
                        ]
                            .filter(Boolean)
                            .join(", "),
                        mobile: data.mobile || formData.mobile,
                    },
                });
                localStorage.removeItem("spellingBeeRegistrationDraft");
                setFormData({
                    name: "",
                    address: { houseName: "", place: "", city: "", district: "", pincode: "" },
                    institution: { name: "", address: "" },
                    dob: "",
                    mobile: "",
                    watsapp: "",
                    gmail: "",
                });
            } else {
                // Show error modal (more visible than toast)
                setModal({
                    show: true,
                    type: "error",
                    data: {
                        message: data.message || "Submission failed. Please try again.",
                    },
                });
            }
        } catch (err) {
            console.error(err);
            setModal({
                show: true,
                type: "error",
                data: { message: "Network error! Please check your connection." },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setModal({ show: false, type: "", data: null });
    };

    // NEW: Handle close after success
    const handleSuccessClose = () => {
        setModal({ show: false, type: "", data: null });
        setShowWhatsAppModal(true); // Show WhatsApp modal after success
    };

    // NEW: Handle WhatsApp modal close
    const closeWhatsAppModal = () => {
        setShowWhatsAppModal(false);
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (modal.show || showWhatsAppModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [modal.show, showWhatsAppModal]);

    return (
        <div className="mt-10 sm:mt-0 min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-brrown/80 p-4 pt-16">
            {/* Toast (optional: keep for quick errors during typing, but success now uses modal) */}
            {toast.show && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20">
                    <div
                        className={`px-4 py-3 rounded-md text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span>{toast.message}</span>
                            <button
                                onClick={() => setToast({ ...toast, show: false })}
                                className="ml-3 text-white font-bold text-lg leading-none"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
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

                    {/* Address */}
                    <div>
                        <h2 className="font-semibold text-lg text-brrown mb-2">Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["houseName", "place", "city", "district", "pincode"].map((key) => (
                                <div key={key}>
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

                    {/* Institution */}
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

                    {/* Contact */}
                    <div>
                        <h2 className="font-semibold text-lg text-brrown mb-2">Contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { name: "mobile", label: "Mobile Number *" },
                                { name: "watsapp", label: "WhatsApp (Optional)" },
                                { name: "gmail", label: "Email (Optional)" },
                            ].map((f) => (
                                <div key={f.name}>
                                    <label className="block text-sm text-brrown mb-1">{f.label}</label>
                                    <input
                                        name={f.name}
                                        value={formData[f.name]}
                                        onChange={handleChange}
                                        placeholder=""
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
                            className={`px-8 py-3 rounded-full font-semibold text-cream transition-all flex items-center justify-center gap-2 relative
        ${isSubmitting
                                    ? "bg-brrown/70 cursor-not-allowed"
                                    : "bg-brrown hover:bg-brrown/90 active:scale-[0.98]"
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="opacity-75">Submitting</span>
                                    {/* Inline SVG Spinner (tailwind-friendly) */}
                                    <svg
                                        className="w-5 h-5 text-cream animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                </>
                            ) : (
                                "Submit Registration"
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>

            {/* Success/Error Modal (existing) */}
            {modal.show && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-cream w-full max-w-md rounded-2xl shadow-xl border border-brrown p-6 relative"
                        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-brrown hover:text-brrown/80 font-bold text-xl"
                        >
                            &times;
                        </button>

                        {modal.type === "success" && (
                            <>
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                                        <svg
                                            className="w-8 h-8 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-brrown mb-2">
                                        Registration Successful! 🎉
                                    </h2>
                                    <p className="text-brrown/80">
                                        Thank you for registering for the Spelling Bee competition.
                                    </p>
                                </div>

                                <div className="bg-brrown/5 rounded-lg p-4 mb-6 space-y-2 text-brrown">
                                    <div>
                                        <span className="font-semibold">Name:</span>{" "}
                                        <span>{modal.data.name}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Address:</span>{" "}
                                        <span>{modal.data.fullAddress}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Mobile:</span>{" "}
                                        <span>{modal.data.mobile}</span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={handleSuccessClose} // CHANGED TO NEW FUNCTION
                                        className="px-6 py-2 bg-brrown text-cream rounded-full font-semibold hover:bg-brrown/90"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </>
                        )}

                        {modal.type === "error" && (
                            <>
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                                        <svg
                                            className="w-8 h-8 text-red-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-brrown mb-2">Oops!</h2>
                                    <p className="text-red-600">{modal.data.message}</p>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={closeModal}
                                        className="px-6 py-2 bg-brrown text-cream rounded-full font-semibold hover:bg-brrown/90"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* NEW: WhatsApp Group Modal */}
            {showWhatsAppModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeWhatsAppModal}
                >
                    <div
                        className="bg-cream w-full max-w-md rounded-2xl shadow-xl border border-brrown p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeWhatsAppModal}
                            className="absolute top-4 right-4 text-brrown hover:text-brrown/80 font-bold text-xl"
                        >
                            &times;
                        </button>

                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-brrown mb-2">
                                Join Our WhatsApp Group
                            </h2>
                            <p className="text-brrown/80 mb-4">
                                Stay updated with competition news and resources
                            </p>
                        </div>

                        <div className="bg-brrown/5 rounded-lg p-4 mb-6">
                            <p className="text-brrown text-center">
                                Click the button below to join our official WhatsApp group
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {/* Replace YOUR_WHATSAPP_LINK with your actual group link */}
                            <a
                                href="https://chat.whatsapp.com/LBUU5AntX6r8RGHB9DuqSG?mode=wwt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-green-600 text-cream rounded-full font-semibold hover:bg-green-700 text-center transition-colors"
                            >
                                Join WhatsApp Group
                            </a>
                            <button
                                onClick={closeWhatsAppModal}
                                className="px-6 py-3 bg-brrown text-cream rounded-full font-semibold hover:bg-brrown/90"
                            >
                                Skip for Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;