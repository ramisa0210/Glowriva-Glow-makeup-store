import React, { useState } from "react";
import { motion } from "framer-motion";

const Consultation = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // success or error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message || !form.topic) {
      setStatus("error");
      return;
    }

    // Simulate successful submission
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", topic: "", message: "" });
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: "linear-gradient(135deg, rgba(251, 207, 232, 0.4) 0%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 1) 70%, rgba(251, 207, 232, 0.4) 100%)"
    }}>
      <motion.section
        className="relative w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-3">
            Let's Connect
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Have questions? Our beauty experts are here to help!
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 mx-auto"
        >
          <div className="md:flex">
            
{/* Image Side */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-pink-100 to-rose-900 dark:from-pink-900/30 dark:to-rose-100/300 relative overflow-hidden">
              <motion.img
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                src="/images/m.png"
                className="absolute bottom-0 left-0 w-full h-full object-cover opacity-80"
                alt="Beauty Consultation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 via-white/30 dark:via-gray-100/300 to-transparent"></div>
              <div className="relative h-full flex items-center justify-center p-8">
                <img
                  src="/images/lady.png"
                  className="w-52 h-52 rounded-full object-cover shadow-xl border-4 border-white dark:border-gray-800"
                  alt="Beauty Product"
                />
              </div>
            </div>
            {/* Form Side */}
            <div className="p-6 md:p-8 md:w-3/5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-gray-700 mb-1 text-sm">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-gray-700 mb-1 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-gray-700 mb-1 text-sm">
                    How can we help?
                  </label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm"
                  >
                    <option value="">Select a topic</option>
                    <option value="Product Recommendation">
                      Product Recommendation
                    </option>
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Skin Concern">Skin Concern</option>
                    <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-gray-700 mb-1 text-sm">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about your beauty needs..."
                    className="w-full px-4 py-2.5 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm"
                  ></textarea>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-1"
                >
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all relative overflow-hidden group text-sm"
                  >
                    <span className="relative z-10">Get Beauty Advice</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </motion.div>

                {/* Notifications */}
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-center text-green-600 font-semibold text-sm"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-center text-red-600 font-semibold text-sm"
                  >
                    Please fill all fields before submitting.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>

        
      </motion.section>
    </div>
  );
};

export default Consultation;