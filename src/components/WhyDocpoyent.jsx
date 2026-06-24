"use client";

import { motion } from "framer-motion";
import {
  FaUserCheck,
  FaCalendarCheck,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaUserCheck size={20} color="#0f6e56" />,
    iconBg: "bg-[#e1f5ee]",
    title: "Verified doctors",
    desc: "Every specialist on our platform is license-verified and peer-reviewed before listing — so you always see a real expert.",
  },
  {
    icon: <FaCalendarCheck size={20} color="#534ab7" />,
    iconBg: "bg-[#eeedfe]",
    title: "Instant appointment booking",
    desc: "Browse available slots and confirm your appointment in under 60 seconds — no phone calls, no waiting in line.",
  },
  {
    icon: <FaLock size={20} color="#185fa5" />,
    iconBg: "bg-[#e6f1fb]",
    title: "Secure patient data",
    desc: "Your health records are encrypted end-to-end and stored in compliance with HIPAA standards. Your data stays yours.",
  },
  {
    icon: <FaHeadset size={20} color="#854f0b" />,
    iconBg: "bg-[#faeeda]",
    title: "24/7 support",
    desc: "Our care team is available around the clock to help with bookings, prescriptions, or any question you might have.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const WhyDocAppoint = () => {
  return (
    <div className="bg-[#EAF3F3]">
      <section className="w-11/12 mx-auto py-12 font-sans">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0f6e56] bg-[#e1f5ee] rounded-full px-3 py-1 mb-4"
          >
            <i
              className="ti ti-rosette-discount-check text-[13px]"
              aria-hidden="true"
            />
            Trusted platform
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-2xl font-medium text-[#111] mb-2"
          >
            Why choose DocAppoint?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-sm text-[#6b7280] max-w-sm mx-auto leading-relaxed"
          >
            Everything you need to access quality healthcare — fast, safe, and
            hassle-free.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={i}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="bg-white border border-black/[0.08] rounded-xl p-5 cursor-default transition-colors duration-150 hover:border-black/[0.18] hover:shadow-sm"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.12 + 0.18,
                  ease: "backOut",
                }}
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${card.iconBg}`}
              >
                {card.icon}
              </motion.div>

              <p className="text-[15px] font-medium text-[#111] mb-1.5">
                {card.title}
              </p>
              <p className="text-[13px] text-[#6b7280] leading-relaxed m-0">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyDocAppoint;
