"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (minimum 2 characters)")
    .max(80, "Name cannot exceed 80 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Business email is required")
    .email("Please enter a valid email address (e.g. name@company.com)")
    .refine((val) => EMAIL_REGEX.test(val), {
      message: "Please enter a valid email with domain (e.g. name@company.com)",
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Contact phone number is required")
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length >= 10 && digitsOnly.length <= 15;
      },
      {
        message: "Please enter a valid 10-digit mobile number (e.g. +91 98765 43210)",
      }
    ),
  companyName: z.string().optional(),
  serviceType: z.enum([
    "lighting-products",
    "solar-components",
    "electrical-products",
    "manpower-supply",
    "general-inquiry",
    // Backward compatibility for legacy links
    "electrical-trading",
    "solar-modules",
    "ac-maintenance",
  ], {
    errorMap: () => ({ message: "Please select an inquiry category" }),
  }),
  productOfInterest: z.string().optional(),
  requiredQuantity: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please provide brief details of your requirement (min 10 characters)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  defaultService?:
    | "lighting-products"
    | "solar-components"
    | "electrical-products"
    | "manpower-supply"
    | "general-inquiry"
    | "electrical-trading"
    | "solar-modules"
    | "ac-maintenance";
  initialProduct?: string;
  initialQuantity?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultService = "lighting-products",
  initialProduct = "",
  initialQuantity = "",
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      serviceType: defaultService,
      productOfInterest: initialProduct,
      requiredQuantity: initialQuantity,
      message: initialProduct
        ? `I am interested in product: ${initialProduct}.${initialQuantity ? ` Estimated Quantity: ${initialQuantity}.` : ""} Please provide technical specifications and availability.`
        : "",
    },
  });

  const watchProduct = watch("productOfInterest");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Format message with product and quantity details
    const fullMessage = [
      data.productOfInterest ? `Product of Interest: ${data.productOfInterest}` : "",
      data.requiredQuantity ? `Required Quantity: ${data.requiredQuantity}` : "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          message: fullMessage,
        }),
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit inquiry. Please try again.");
      }

      setIsSubmitted(true);
      reset();
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error("Error submitting form:", err);
      setSubmitError(err?.message || "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {isSubmitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-buraq-sage rounded-full flex items-center justify-center mx-auto text-buraq-primary">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-buraq-dark">Inquiry Received</h3>
          <p className="text-sm text-buraq-muted max-w-md mx-auto">
            Thank you for reaching out to BURAQ. Our team will review your requirement and contact you at the earliest via email (<span className="text-buraq-primary font-semibold">{COMPANY_INFO.primaryEmail}</span>) or phone.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-full bg-buraq-primary text-white text-sm font-semibold hover:bg-buraq-primary-hover transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="mb-2">
            <h3 className="text-2xl sm:text-3xl font-black text-buraq-dark tracking-tight">
              Send an Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-buraq-muted mt-1">
              Submit your product specifications or requirements for structured offline quotation.
            </p>
          </div>

          {submitError && (
            <p className="text-xs font-semibold text-rose-600">
              {submitError}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-buraq-dark mb-1.5">
                Full Name <span className="text-buraq-accent">*</span>
              </label>
              <input
                type="text"
                placeholder="Sourav Mandal"
                {...register("fullName")}
                className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm transition-colors focus:outline-none ${errors.fullName
                  ? "border-red-500 bg-red-50/50 focus:border-red-500"
                  : "border-buraq-border bg-buraq-bg/40 focus:border-buraq-primary focus:bg-white"
                  }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-buraq-dark mb-1.5">
                Business Email <span className="text-buraq-accent">*</span>
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm transition-colors focus:outline-none ${errors.email
                  ? "border-red-500 bg-red-50/50 focus:border-red-500"
                  : "border-buraq-border bg-buraq-bg/40 focus:border-buraq-primary focus:bg-white"
                  }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-buraq-dark mb-1.5">
                Contact Phone <span className="text-buraq-accent">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                {...register("phone")}
                className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm transition-colors focus:outline-none ${errors.phone
                  ? "border-red-500 bg-red-50/50 focus:border-red-500"
                  : "border-buraq-border bg-buraq-bg/40 focus:border-buraq-primary focus:bg-white"
                  }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-buraq-dark mb-1.5">
                Company / Organization (Optional)
              </label>
              <input
                type="text"
                placeholder="Industrial Enterprises Ltd"
                {...register("companyName")}
                className="w-full px-4 py-3 rounded-xl border border-buraq-border bg-buraq-bg/40 text-base sm:text-sm transition-colors focus:outline-none focus:border-buraq-primary focus:bg-white"
              />
            </div>
          </div>

          {/* Service Pillar Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-buraq-dark mb-1.5">
              Category of Interest <span className="text-buraq-accent">*</span>
            </label>
            <select
              {...register("serviceType")}
              className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm transition-colors focus:outline-none ${errors.serviceType
                ? "border-red-500 bg-red-50/50 focus:border-red-500"
                : "border-buraq-border bg-buraq-bg/40 focus:border-buraq-primary focus:bg-white"
                }`}
            >
              <option value="lighting-products">Lighting Products (LED Panels, High Bays, Downlights, Floodlights)</option>
              <option value="solar-components">Solar Components (PV Modules, Inverters, DC Cables, Mounting)</option>
              <option value="electrical-products">Electrical Products (Power Cables, Switchgear, Breakers)</option>
              <option value="manpower-supply">Secondary Service: Manpower Supply (Workers, Engineers, Helpers)</option>
              <option value="general-inquiry">General Business Inquiry</option>
            </select>
            {errors.serviceType && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.serviceType.message}
              </p>
            )}
          </div>

          {/* Optional Specific Product & Quantity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-buraq-dark mb-1.5">
                Product of Interest (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 2x2 LED Panel, 540Wp PV Module"
                {...register("productOfInterest")}
                className="w-full px-4 py-3 rounded-xl border border-buraq-border bg-buraq-bg/40 text-base sm:text-sm transition-colors focus:outline-none focus:border-buraq-primary focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-buraq-dark mb-1.5">
                Required Quantity (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 50 units, 500 meters"
                {...register("requiredQuantity")}
                className="w-full px-4 py-3 rounded-xl border border-buraq-border bg-buraq-bg/40 text-base sm:text-sm transition-colors focus:outline-none focus:border-buraq-primary focus:bg-white"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-buraq-dark mb-1.5">
              Project / Requirement Details <span className="text-buraq-accent">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describe your product specifications, required quantities, delivery location, or project requirements..."
              {...register("message")}
              className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm transition-colors focus:outline-none ${errors.message
                ? "border-red-500 bg-red-50/50 focus:border-red-500"
                : "border-buraq-border bg-buraq-bg/40 focus:border-buraq-primary focus:bg-white"
                }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message.message}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-buraq-primary text-white font-bold text-sm sm:text-base shadow-md hover:bg-buraq-primary-hover disabled:opacity-60 transition-all duration-200 cursor-pointer"
            >
              <Send className="w-4 h-4 text-buraq-sage" />
              <span className="font-bold tracking-wide">
                {isSubmitting ? "Submitting Enquiry..." : "Submit Enquiry"}
              </span>
            </button>
          </div>

          <p className="text-[11px] text-center text-buraq-muted">
            Offline B2B Supply &bull; Quotes on enquiry &bull; No online payment required
          </p>
        </form>
      )}
    </div>
  );
};
