"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Label, SearchField } from "@heroui/react";
import { FaCalendarAlt, FaStethoscope } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import DoctorsCard from "@/components/DoctorsCard";

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Fee: Low → High", value: "fee_asc" },
  { label: "Fee: High → Low", value: "fee_desc" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const AllAppointmentClient = ({ doctors }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...doctors];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty?.toLowerCase().includes(q),
      );
    }
    if (sort === "fee_asc")
      result.sort((a, b) => Number(a.fee) - Number(b.fee));
    if (sort === "fee_desc")
      result.sort((a, b) => Number(b.fee) - Number(a.fee));
    return result;
  }, [search, sort, doctors]);

  return (
    <div className="bg-[#EAF3F3] min-h-screen">
      <div className="w-11/12 mx-auto py-10">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#3C3489] bg-[#EEEDFE] rounded-full px-3.5 py-1.5 mb-4"
          >
            <FaCalendarAlt size={12} />
            All appointments
          </motion.div>

          {/* Title */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="w-9 h-9 rounded-xl bg-[#e1f5ee] flex items-center justify-center shrink-0">
              <MdOutlinePersonSearch size={20} color="#0f6e56" />
            </div>
            <h1 className="text-3xl font-semibold text-[#0D2137]">
              Find your doctor
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex items-center justify-center gap-2 text-sm text-[#6b7280] max-w-md mx-auto leading-relaxed"
          >
            <FaStethoscope size={13} className="text-[#534ab7] shrink-0" />
            <span>
              Browse all available specialists and book your appointment
              instantly.
            </span>
          </motion.div>
        </motion.div>

        {/* ── Search + Sort ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5"
        >
          <SearchField
            name="search"
            value={search}
            onChange={(val) => setSearch(val)}
            className="flex-1 w-full"
          >
            <Label className="sr-only">Search</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-full"
                placeholder="Search by name or specialty…"
              />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-9 border border-[#c8d8ef] rounded-lg px-3 text-[13px] bg-white text-[#111] outline-none focus:border-[#1A5276] cursor-pointer shrink-0"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Count */}
        <p className="text-xs text-[#6b7280] mb-5">
          Showing {filtered.length} doctor{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* ── Cards ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-sm text-[#6b7280]">
            No doctors found for &ldquo;{search}&rdquo;.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {filtered.map((doctor, i) => (
              <motion.div
                key={doctor._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i % 3}
              >
                <DoctorsCard doctor={doctor} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointmentClient;
