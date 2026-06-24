"use client"
import { useEffect, useRef, useState } from "react";

const s = {
  section: {
  
    fontFamily: "sans-serif",
    textAlign: "center",
   
    margin: "0 auto",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 500,
    color: "#185fa5",
    background: "#e6f1fb",
    borderRadius: 20,
    padding: "4px 14px",
    marginBottom: "1rem",
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    color: "#111",
    margin: "0 0 0.4rem",
  },
  sub: {
    fontSize: 13,
    color: "#6b7280",
    margin: "0 auto 2.5rem",
    maxWidth: 380,
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
   
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    padding: "2rem 1rem",
    borderLeft: "1px solid #e5e7eb",
  },
  iconWrap: {
    marginBottom: "0.75rem",
  },
  num: {
    fontSize: 32,
    fontWeight: 500,
    color: "#111",
    margin: "0 0 4px",
    letterSpacing: "-0.5px",
  },
  label: {
    fontSize: 13,
    color: "#6b7280",
    margin: 0,
  },
};

const stats = [
  {
    icon: "ti-users",
    iconColor: "#185fa5",
    target: 12000,
    suffix: "+",
    label: "Patients served",
  },
  {
    icon: "ti-stethoscope",
    iconColor: "#0f6e56",
    target: 500,
    suffix: "+",
    label: "Verified doctors",
  },
  {
    icon: "ti-microscope",
    iconColor: "#534ab7",
    target: 25,
    suffix: "+",
    label: "Specialities",
  },
  {
    icon: "ti-calendar-stats",
    iconColor: "#854f0b",
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

function StatCard({ icon, iconColor, target, suffix, label }) {
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
    <div ref={ref} style={s.card}>
      <div style={s.iconWrap}>
        <i
          className={`ti ${icon}`}
          style={{ fontSize: 22, color: iconColor }}
          aria-hidden="true"
        />
      </div>
      <p style={s.num}>
        {formatNum(count, target)}
        {triggered && count === target ? suffix : ""}
      </p>
      <p style={s.label}>{label}</p>
    </div>
  );
}

const HealthcareNumber = () => {
  return (
    <div className="bg-[#EAF3F3]">
      <section style={s.section} className="w-11/12 py-4">
        <div style={s.badge}>
          <i
            className="ti ti-chart-bar"
            style={{ fontSize: 13 }}
            aria-hidden="true"
          />
          Platform statistics
        </div>
        <h2 style={s.title}>Healthcare by the numbers</h2>
        <p style={s.sub}>
          Trusted by thousands of patients and specialists across the country.
        </p>

        <div style={s.grid}>
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HealthcareNumber;
