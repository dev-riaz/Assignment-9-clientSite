"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";

const DoctorsCard = ({ doctor }) => {
  const { _id, image, name, specialty, location, description, fee } = doctor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute top-3 left-3 z-10 bg-[#1A5276] text-white text-xs font-medium px-3 py-1 rounded-full"
        >
          {specialty}
        </motion.div>

        {/* Doctor Image */}
        <figure className="relative overflow-hidden aspect-[4/2.5]">
          <Image
            src={image}
            fill
            alt={name}
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </figure>
      </div>

      {/* Card Body */}
      <motion.div
        className="p-4 space-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        <h2 className="text-2xl font-bold text-[#0D2137]">{name}</h2>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <MdLocationOn className="text-red-500 shrink-0" />
          <span>{location}</span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="font-bold text-lg text-[#0F7B6C]">{fee} Tk</span>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={`/allAppointments/${_id}`}
              className="flex items-center gap-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] px-4 py-2 rounded-full hover:opacity-90"
            >
              View Details
              <FaLongArrowAltRight />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DoctorsCard;
