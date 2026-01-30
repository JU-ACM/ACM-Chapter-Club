"use client";

import { useState } from "react";
import { studyyearOptions } from "@/data/studyYearOptions";
import { departmentList } from "@/data/departmentList";
import { Benefits } from "@/components/Benefits";
import { Toast } from "@/components/ui/toast";

interface FormData {
  name: string;
  email: string;
  acmMemberNumber: string;
  yearOfStudy: string;
  department: string;
}

/**
 Registration Form for JU ACM Student Chapter
 User must be subscribed as ACM Student Member
**/
export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    acmMemberNumber: "",
    yearOfStudy: studyyearOptions[0]?.value || "",
    department: departmentList[0]?.value || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    isVisible: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setToast({
          isVisible: true,
          message: "Registration submitted successfully! 🎉",
          type: "success",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          acmMemberNumber: "",
          yearOfStudy: studyyearOptions[0]?.value || "",
          department: departmentList[0]?.value || "",
        });
      } else {
        const data = await response.json();
        setToast({
          isVisible: true,
          message: data.error || "Failed to submit registration",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      setToast({
        isVisible: true,
        message: "Network error. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
      <section className="px-8 py-10 bg-slate-50 grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-md p-8"
        >
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 w-full text-center pb-6">
            Register
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6">
            {/*Name Field*/}
            <TextField
              title="Name"
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
              required
            />

            {/*Email Field*/}
            <TextField
              title="Email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              type="email"
              required
            />

            {/*ACM Member Number Field*/}
            <TextField
              title="ACM Member Number"
              value={formData.acmMemberNumber}
              onChange={(value) => handleInputChange("acmMemberNumber", value)}
              required
            />

            {/*Study Year Field*/}
            <OptionField
              opdata={studyyearOptions}
              title="Year of Study"
              value={formData.yearOfStudy}
              onChange={(value) => handleInputChange("yearOfStudy", value)}
            />

            {/*Department Field*/}
            <OptionField
              opdata={departmentList}
              title="Department"
              value={formData.department}
              onChange={(value) => handleInputChange("department", value)}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          {/*ACM Member Subscription Link*/}
          <a
            href="https://services.acm.org/public/qj/quickjoin/qj_control.cfm?promo=PWEBTOP&form_type=Student"
            className="mt-8 block text-sm underline text-blue-600 visited:text-purple-600 text-center"
          >
            Register yourself as an ACM student member
          </a>
        </form>
        <Benefits />
      </section>
    </>
  );
}

/*
 Generic Text Field for Registration Form
*/
function TextField({
  title,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900">
        {title}
      </label>
      <div className="mt-2">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

/*
 Generic Option Field for Registration Form
*/
function OptionField({
  opdata,
  title,
  value,
  onChange,
}: {
  opdata: OptionData[];
  title: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold leading-6 text-gray-900">
        {title}
      </label>
      <div className="mt-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {opdata.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
