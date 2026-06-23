"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 0",
  },
  card: {
    background: "#ffffff",
    border: "6px solid #c8d8ef",
    borderRadius: "20px",
    padding: "2rem 2.5rem",
    // width: "340px",
    textAlign: "center",
  },
  title: {
    fontSize: "11px",
    letterSpacing: "0.15em",
    color: "#5a7fa8",
    fontWeight: "600",
    margin: "0 0 1.5rem",
    textTransform: "uppercase",
  },
  chartBox: {
    position: "relative",
    height: "80px",
    overflow: "hidden",
    marginBottom: "1.5rem",
  },
  svg: {
    width: "100%",
    height: "100%",
  },
  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.6",
  },
};

const Banner = () => {
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);

  const W = 340,
    mid = 40,
    speed = 60;

  const beatPattern = [
    [0, mid],
    [30, mid],
    [38, mid - 4],
    [42, mid + 20],
    [46, mid - 35],
    [50, mid + 12],
    [54, mid],
    [62, mid],
    [100, mid],
  ];

  function buildPoints(offset) {
    let pts = [];
    for (let cycle = -1; cycle < 3; cycle++) {
      for (let [x, y] of beatPattern) {
        pts.push([x + cycle * 100 - offset, y]);
      }
    }
    return pts.filter(([x]) => x >= 0 && x <= W);
  }

  useEffect(() => {
    function animate(ts) {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;

      offsetRef.current += speed * dt;
      if (offsetRef.current > 100) offsetRef.current -= 100;

      const pts = buildPoints(offsetRef.current);
      if (lineRef.current && pts.length > 1) {
        lineRef.current.setAttribute(
          "points",
          pts.map((p) => p.join(",")).join(" "),
        );
      }

      const beatX = beatPattern[6][0];
      const currentX =
        beatX + Math.round(offsetRef.current / 100) * 100 - offsetRef.current;
      if (dotRef.current) {
        if (currentX >= 0 && currentX <= W) {
          dotRef.current.setAttribute("cx", currentX);
          dotRef.current.setAttribute("cy", mid);
          dotRef.current.setAttribute("opacity", "1");
        } else {
          dotRef.current.setAttribute("opacity", "0");
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="banner">
      <div className="w-11/12 mx-auto min-h-screen flex items-center">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 w-full">
          {/* Right Side */}
          <div className=" flex justify-center">
            <div style={styles.wrapper}>
              <div style={styles.card}>
                <p style={styles.title}>LIVE VITALS MONITOR</p>

                <div style={styles.chartBox}>
                  <svg
                    viewBox="0 0 340 80"
                    preserveAspectRatio="none"
                    style={styles.svg}
                  >
                    <defs>
                      <linearGradient
                        id="lineGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#1d9e75" stopOpacity={0} />
                        <stop
                          offset="40%"
                          stopColor="#1d9e75"
                          stopOpacity={1}
                        />
                        <stop
                          offset="100%"
                          stopColor="#534ab7"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>

                    <polyline
                      ref={lineRef}
                      points=""
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      ref={dotRef}
                      cx="0"
                      cy="40"
                      r="4"
                      fill="#1d9e75"
                      opacity="0"
                    />
                  </svg>
                </div>

                <p style={styles.subtitle}>
                  300+ specialists accepting
                  <br />
                  bookings right now
                </p>
              </div>
            </div>
          </div>

          {/* Left Side */}
          <div className="space-y-5 animate__animated animate__slideInLeft animate__slow">
            <p className="text-sm font-semibold text-[#5A54F2]">
              TRUSTED BY 12,000+ PATIENTS
            </p>

            <h1 className="text-5xl font-bold">
              <span className="text-[#112B5F]">Your health,</span>
              <br />
              <span className="text-[#5A54F2]"> one booking away.</span>
            </h1>

            <p className="text-gray-600 text-lg font-light">
              Find verified specialists near you and reserve a slot in under two
              minutes.
            </p>

            <div className="flex gap-4">
              <Link
                href="/"
                className="btn  bg-gradient-to-r from-[#0F7A73] to-[#5A54F2] text-white border-none hover:opacity-90 rounded-full shadow-none"
              >
                Browse Doctors
                <FaLongArrowAltRight />
              </Link>

              <Link
                href="/"
                className="btn  border-2 border-[#0F7A73] rounded-full shadow-none bg-white text-[#0F7A73]"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
