"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import StackedNotifications from "./StackedNotifications";
import { Loader2 } from "lucide-react";

const ShiftingContactForm = () => {
  const [selected, setSelected] = useState("individual");
  const [notify, setNotify] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number:""  ,
    mail:"",
    companyName: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
const validateForm = () => {
  const newErrors = {};

  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = "Name is required.";
  }

  // Phone number validation
  if (!formData.number.trim()) {
    newErrors.number = "Phone number is required.";
  } else if (!/^\d{10}$/.test(formData.number)) {
    newErrors.number = "Please enter a valid 10-digit phone number.";
  }

  // Email validation
  if (!formData.mail.trim()) {
    newErrors.mail = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.mail)) {
    newErrors.mail = "Please enter a valid email address.";
  }

  // Company name validation (if selected is 'company')
  if (selected === "company" && !formData.companyName.trim()) {
    newErrors.companyName = "Company name is required for companies.";
  }

  // Message validation
  if (!formData.message.trim()) {
    newErrors.message = "Message cannot be empty.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    console.log(formData);
    try {
      // Replace with your own email service (e.g., EmailJS or backend API)
      setIsLoading(true);
            const response = await fetch("/api/contact", {
              method: "post",
              body: JSON.stringify(formData),
            });
            
            console.log(response);  
            if (!response.ok) {
              console.log("falling over");
              throw new Error(`response status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log(responseData["message"]);

            notify({ id: Math.random(), text: "Mail sent successfully!" });
      console.log(formData);
    } catch (error) {
      notify({ id: Math.random(), text: "An unexpected error occurred." });
      console.error(error);
    } finally {
      setIsLoading(false);
      setFormData({
        name: "",
        number: "",
        mail: "",
        companyName: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <section
      className="p-4 min-h-screen flex items-center justify-center"
      id="contact"
    >
      <div className="w-full max-w-6xl mx-auto shadow-lg flex flex-col-reverse lg:flex-row rounded-lg overflow-hidden">
        <Form
          selected={selected}
          setSelected={setSelected}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          isLoading={isLoading}
        />
        <Images selected={selected} />
      </div>
      <StackedNotifications
        triggerNotification={(setNotification) =>
          setNotify(() => setNotification)
        }
      />
    </section>
  );
};

const Form = ({
  selected,
  setSelected,
  formData,
  handleChange,
  handleSubmit,
  errors,
  isLoading
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`p-8 w-full text-white transition-colors duration-[750ms] ${
        selected === "company" ? "bg-indigo-600" : "bg-foreground"
      }`}
    >
      <h3 className="text-4xl font-bold mb-6">Contact us</h3>

      {/* Name input */}
      <div className="mb-6">
        <p className="text-2xl mb-2">Hi 👋! My name is...</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name..."
          className={`${
            selected === "company"
              ? "bg-indigo-700 placeholder-white/70 "
              : "bg-background placeholder-foreground/70 "
          } transition-colors duration-[750ms]  p-2 rounded-md w-full focus:outline-0 ${
            errors.name ? "border-red-300" : "border-transparent"
          } border-2 p-2 rounded-md w-full focus:outline-0`}
        />
        {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-6">
        <p className="text-2xl mb-2">You can call me at...</p>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Your phone number..."
          className={`${
            selected === "company"
              ? "bg-indigo-700 placeholder-white/70 "
              : "bg-background placeholder-foreground/70 "
          } transition-colors duration-[750ms]  p-2 rounded-md w-full focus:outline-0 ${
            errors.number ? "border-red-300" : "border-transparent"
          } border-2 p-2 rounded-md w-full focus:outline-0`}
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.number}</p>}
      </div>
      <div className="mb-6">
        <p className="text-2xl mb-2">Or mail me at me at...</p>
        <input
          type="mail"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          placeholder="Your phone number..."
          className={`${
            selected === "company"
              ? "bg-indigo-700 placeholder-white/70 "
              : "bg-background placeholder-foreground/70 "
          } transition-colors duration-[750ms]  p-2 rounded-md w-full focus:outline-0 ${
            errors.mail ? "border-red-300" : "border-transparent"
          } border-2 p-2 rounded-md w-full focus:outline-0`}
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.mail}</p>}
      </div>
      {/* Company/individual toggle */}
      <div className="mb-6">
        <p className="text-2xl mb-2">and I represent...</p>
        <FormSelect selected={selected} setSelected={setSelected} />
      </div>

      {/* Company name */}
      <AnimatePresence>
        {selected === "company" && (
          <motion.div
            initial={{ marginTop: -104, opacity: 0 }}
            animate={{ marginTop: 0, opacity: 1 }}
            exit={{ marginTop: -104, opacity: 0 }}
            transition={BASE_TRANSITION}
            className="mb-6"
          >
            <p className="text-2xl mb-2">by the name of...</p>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company name..."
              className={`${
                selected === "company"
                  ? "bg-indigo-700 placeholder-white/70"
                  : "bg-background placeholder-foreground/70"
              } transition-colors duration-[750ms]  p-2 rounded-md w-full focus:outline-0 ${
                errors.companyName ? "border-red-300" : "border-transparent"
              } border-2 p-2 rounded-md w-full focus:outline-0`}
            />
            {errors.companyName && (
              <p className="text-red-400 text-sm">{errors.companyName}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info */}
      <div className="mb-6">
        <p className="text-2xl mb-2">I&#39;d love to ask about...</p>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Whatever your heart desires :)"
          className={`${
            selected === "company"
              ? "bg-indigo-700 placeholder-white/70"
              : "bg-background placeholder-foreground/70"
          } transition-colors duration-[750ms] min-h-[150px] resize-none  p-2 rounded-md w-full focus:outline-0 ${
            errors.message ? "border-red-300" : "border-transparent"
          } border-2 p-2 rounded-md w-full focus:outline-0`}
        />
        {errors.message && (
          <p className="text-red-400 text-sm">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        disabled={isLoading}
        type="submit"
        className={`${
          selected === "company"
            ? "bg-white text-indigo-600"
            : "bg-white text-foreground"
        } transition-colors duration-[750ms] text-lg text-center rounded-lg w-full py-3 font-semibold`}
      >
        {isLoading ? <Loader2 className="animate-spin mx-auto"/>: "Submit"}
      </motion.button>
    </form>
  );
};
const FormSelect = ({ selected, setSelected }) => {
  return (
    <div className="border-[1px] rounded border-white overflow-hidden font-medium w-fit">
      <button
        className={`${
          selected === "individual" ? "text-foreground" : "text-white"
        } text-sm px-3 py-1.5 transition-colors duration-[750ms] relative`}
        onClick={() => setSelected("individual")}
        type="button"
      >
        <span className="relative z-10">An individual</span>
        {selected === "individual" && (
          <motion.div
            transition={BASE_TRANSITION}
            layoutId="form-tab"
            className="absolute inset-0 bg-white z-0"
          />
        )}
      </button>
      <button
        className={`${
          selected === "company" ? "text-indigo-600" : "text-white"
        } text-sm px-3 py-1.5 transition-colors duration-[750ms] relative`}
        onClick={() => setSelected("company")}
        type="button"
      >
        <span className="relative z-10">A company</span>
        {selected === "company" && (
          <motion.div
            transition={BASE_TRANSITION}
            layoutId="form-tab"
            className="absolute inset-0 bg-white z-0"
          />
        )}
      </button>
    </div>
  );
};

const Images = ({ selected }) => {
  return (
    <div className="bg-white relative overflow-hidden w-full min-h-[100px]">
      <motion.div
        initial={false}
        animate={{ x: selected === "individual" ? "0%" : "100%" }}
        transition={BASE_TRANSITION}
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <motion.div
        initial={false}
        animate={{ x: selected === "company" ? "0%" : "-100%" }}
        transition={BASE_TRANSITION}
        className="absolute inset-0 bg-slate-200"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default ShiftingContactForm;

const BASE_TRANSITION = { ease: "anticipate", duration: 0.75 };
