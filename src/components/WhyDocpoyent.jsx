"use client";
const s = {
  section: {
    // padding: "4rem 1.5rem",
    fontFamily: "sans-serif",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 500,
    color: "#0f6e56",
    background: "#e1f5ee",
    borderRadius: 20,
    padding: "4px 12px",
    marginBottom: "1rem",
  },
  title: {
    fontSize: 26,
    fontWeight: 500,
    color: "#111",
    // margin: "0 0 0.5rem",
  },
  sub: {
    fontSize: 14,
    color: "#6b7280",
    margin: "0 auto",
    maxWidth: 400,
    // lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  card: {
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 12,
    padding: "1.25rem",
    transition: "border-color 0.15s",
    cursor: "default",
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 500,
    color: "#111",
    margin: "0 0 6px",
  },
  cardDesc: {
    fontSize: 13,
    color: "#6b7280",
    margin: 0,
    lineHeight: 1.6,
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
  },
  stat: {
    padding: "1.25rem",
    textAlign: "center",
    background: "#fff",
  },
  statNum: {
    fontSize: 22,
    fontWeight: 500,
    color: "#111",
    margin: "0 0 2px",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    margin: 0,
  },
};

const WhyDocpoyent = () => {
  const cards = [
    {
      icon: "ti-shield-check",
      iconBg: "#e1f5ee",
      iconColor: "#0f6e56",
      title: "Verified doctors",
      desc: "Every specialist on our platform is license-verified and peer-reviewed before listing — so you always see a real expert.",
    },
    {
      icon: "ti-calendar-check",
      iconBg: "#eeedfe",
      iconColor: "#534ab7",
      title: "Instant appointment booking",
      desc: "Browse available slots and confirm your appointment in under 60 seconds — no phone calls, no waiting in line.",
    },
    {
      icon: "ti-lock",
      iconBg: "#e6f1fb",
      iconColor: "#185fa5",
      title: "Secure patient data",
      desc: "Your health records are encrypted end-to-end and stored in compliance with HIPAA standards. Your data stays yours.",
    },
    {
      icon: "ti-headset",
      iconBg: "#faeeda",
      iconColor: "#854f0b",
      title: "24/7 support",
      desc: "Our care team is available around the clock to help with bookings, prescriptions, or any question you might have.",
    },
  ];


  return (
    <div className="bg-[#EAF3F3]">
      <section style={s.section} className="w-11/12">
        <div style={s.header}>
          <div style={s.badge} className="mt-4">
            <i
              className="ti ti-rosette-discount-check"
              style={{ fontSize: 13 }}
              aria-hidden="true"
            />
            Trusted platform
          </div>
          <h2 style={s.title}>Why choose DocAppoint?</h2>
          <p style={s.sub}>
            Everything you need to access quality healthcare — fast, safe, and
            hassle-free.
          </p>
        </div>

        <div style={s.grid}>
          {cards.map((card) => (
            <div
              key={card.title}
              style={s.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)")
              }
            >
              <div style={{ ...s.iconWrap, background: card.iconBg }}>
                <i
                  className={`ti ${card.icon}`}
                  style={{ fontSize: 20, color: card.iconColor }}
                  aria-hidden="true"
                />
              </div>
              <p style={s.cardTitle}>{card.title}</p>
              <p style={s.cardDesc}>{card.desc}</p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default WhyDocpoyent;
