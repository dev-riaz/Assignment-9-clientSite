"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
} from "react-icons/fa";
import Image from "next/image";
import { MdHealthAndSafety } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toastShown = useRef(false);

  useEffect(() => {
    const error = searchParams.get("error");

    if (error && !toastShown.current) {
      toastShown.current = true;
      toast.error(error);

      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url);
    }
  }, [searchParams]);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    // ---- Validation ----
    const newErrors = {};

    if (!loginData.email || !loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      setFormError("Please fix the errors below and try again.");
      toast.error(firstError);
      return;
    }

    // ---- Submit ----
    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signIn.email({
        ...loginData,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Logged in successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error(error);

      const message =
        error.message || "Invalid email or password. Please try again.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.log(error);
      toast.error("Google Login Failed");
    }
  };
  return (
    <div className="min-h-screen bg-[#edf4ff] flex items-center justify-center p-4 sm:p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-5xl mx-auto bg-white rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-2xl flex flex-col lg:grid lg:grid-cols-2">
        {/* RIGHT SIDE - Form */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="px-6 sm:px-10 md:px-16 py-8 sm:py-10 order-1 lg:order-none"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-center"
          >
            {/* Mobile logo */}
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <div className="bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] p-2 rounded-xl">
                <MdHealthAndSafety size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">
                DocAppoint
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Login
            </h1>

            <p className="mt-2 text-slate-500 text-sm sm:text-md">
              Please enter your credentials to LogIn
            </p>
          </motion.div>

          <form
            onSubmit={handleLogin}
            className="mt-6 space-y-4 sm:space-y-6"
            noValidate
          >
            {/* Form-level error */}
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3"
              >
                <FaExclamationCircle className="flex-shrink-0" />
                <span>{formError}</span>
              </motion.div>
            )}

            {/* Email */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <label className="block text-slate-700 font-semibold mb-2 text-sm sm:text-base">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full h-10 border text-sm rounded-2xl pl-11 sm:pl-14 pr-4 outline-none focus:border-blue-500 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <label className="block text-slate-700 font-semibold mb-2 text-sm sm:text-base">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full h-10 border text-sm rounded-2xl pl-11 sm:pl-14 pr-12 outline-none focus:border-blue-500 ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
                >
                  {showPassword ? (
                    <FaEyeSlash size={14} />
                  ) : (
                    <FaEye size={14} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}
            </motion.div>

            {/* Forgot Password */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex justify-end"
            >
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Forgot Password?
              </a>
            </motion.div>

            {/* Button */}
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-2xl bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </motion.button>

            {/* Divider */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </motion.div>

            {/* Google Button */}
            <motion.button
              onClick={handleGoogleLogin}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="w-full h-10 border border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-medium text-sm sm:text-md hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} />
              Continue with Google
            </motion.button>

            {/* Register link */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={7}
              className="text-center text-slate-500 text-sm"
            >
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-blue-500 font-semibold hover:underline"
              >
                Register
              </a>
            </motion.p>
          </form>
        </motion.div>

        {/* LEFT SIDE - Blue panel (hidden on mobile) */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          className="hidden lg:block relative bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] p-12 overflow-hidden"
        >
          {/* Decorative Circle */}
          <div className="absolute bottom-16 left-[-80px] w-[350px] h-[350px] rounded-full bg-white/10"></div>
          <div className="absolute bottom-24 left-10 w-[260px] h-[260px] rounded-full border-[30px] border-white/10"></div>

          <div className="relative z-10">
            {/* Logo */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center gap-2 mb-10"
            >
              <div className="bg-white/20 p-2 rounded-xl">
                <MdHealthAndSafety size={24} className="text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                DocAppoint
              </h1>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-5xl font-bold text-white leading-tight"
            >
              Welcome
              <br />
              <span className="text-cyan-300">Back!</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="w-16 h-1 bg-cyan-300 rounded-full my-4"
            />
          </div>

          {/* Doctor Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 flex justify-center z-10"
          >
            <Image
              src={"/assets/doctormam-removebg-preview right.png"}
              width={200}
              height={400}
              alt="doctor image"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginContent;
