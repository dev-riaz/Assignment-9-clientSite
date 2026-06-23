import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#112B5F] text-white">
        <div className="w-11/12 mx-auto py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="text-center md:text-left">
              <Link href="/" className="flex items-center gap-2">
                <MdHealthAndSafety className="text-4xl text-[#5A54F2]" />
                <span className="text-2xl font-bold">DocAppoint</span>
              </Link>

              <p className="mt-3 text-gray-300 max-w-sm">
                Find trusted doctors, schedule appointments, and manage your
                healthcare journey with ease.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex gap-8 text-sm">
              <Link href="/" className="hover:text-[#5A54F2]">
                Home
              </Link>
              <Link href="/doctors" className="hover:text-[#5A54F2]">
                Doctors
              </Link>
              <Link href="/appointments" className="hover:text-[#5A54F2]">
                Appointments
              </Link>
              <Link href="/contact" className="hover:text-[#5A54F2]">
                Contact
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#5A54F2] transition"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#5A54F2] transition"
              >
                <FaTwitter />
              </Link>

              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#5A54F2] transition"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#5A54F2] transition"
              >
                <FaGithub />
              </Link>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} DocAppoint. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
