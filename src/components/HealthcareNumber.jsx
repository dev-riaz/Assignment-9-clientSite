
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaStethoscope,
  FaMicroscope,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

const stats = [
  {
    icon: <FaUsers size={22} color="#185fa5" />,
    target: 12000,
    suffix: "+",
    label: "Patients served",
  },
  {
    icon: <FaStethoscope size={22} color="#0f6e56" />,
    target: 500,
    suffix: "+",
    label: "Verified doctors",
  },
  {
    icon: <FaMicroscope size={22} color="#534ab7" />,
    target: 25,
    suffix: "+",
    label: "Specialities",
  },
  {
    icon: <FaCalendarAlt size={22} color="#854f0b" />,
    target: 50000,
    suffix: "+",
    label: "Appointments booked",
  },
];

function formatNum(n, target) {
  if (target >= 10000) return (n / 1000).toFixed(n < target ? 1 : 0) + "k";
  return Math.round(n).toString();
}

function useCounter(target, duration = 1800, triggered = false) {
  const [value, setValue] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!triggered || done.current) return;
    done.current = true;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    }
    requestAnimationFrame(step);
  }, [triggered, target, duration]);
  return value;
}

function StatCard({ icon, target, suffix, label, isFirst, index }) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const count = useCounter(target, 1800, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className={`bg-white py-8 px-4 text-center rounded-2xl ${!isFirst ? "border-l border-[#e5e7eb]" : ""}`}
    >
      <motion.div
        className="flex justify-center mb-3"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: index * 0.12 + 0.2,
          ease: "backOut",
        }}
      >
        {icon}
      </motion.div>
      <p className="text-[32px] font-medium text-[#111] tracking-tight mb-1">
        {formatNum(count, target)}
        {triggered && count === target ? suffix : ""}
      </p>
      <p className="text-[13px] text-[#6b7280]">{label}</p>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const HealthcareNumber = () => {
  return (
    <div className="bg-[#EAF3F3]">
      <section className="py-12 text-center font-sans">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#185fa5] bg-[#e6f1fb] rounded-full px-3.5 py-1 mb-4"
        >
          <MdBarChart size={13} aria-hidden="true" />
          Platform statistics
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          className="text-2xl font-medium text-[#111] mb-1.5"
        >
          Healthcare by the numbers
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
          className="text-[13px] text-[#6b7280] max-w-sm mx-auto leading-relaxed mb-10"
        >
          Trusted by thousands of patients and specialists across the country.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 overflow-hidden w-11/12 mx-auto gap-4 rounded-2xl">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} isFirst={i === 0} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HealthcareNumber;
