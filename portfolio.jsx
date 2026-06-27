import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Education", "Skills", "Projects", "Achievements", "Contact"];

const TYPEWRITER_TEXTS = [
  "Web Developer",
  "AI & ML Enthusiast",
  "Software Developer",
  "Problem Solver",
];

const SKILLS = {
  "Programming Languages": ["Python","Java","C", "JavaScript"],
  Frontend: ["React.js", "Next.js","HTML", "CSS"],
  Backend: ["Node.js","PHP"],
  Database: ["MySQL", "Supabase"],
  // "Machine Learning": ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "HuggingFace"],
  Tools: ["Git", "GitHub", "VS Code"],
};

const SKILL_COLORS = {
  "Programming Languages": ["#3B82F6", "#1D4ED8"],
  Frontend: ["#8B5CF6", "#6D28D9"],
  Backend: ["#06B6D4", "#0891B2"],
  Database: ["#10B981", "#059669"],
  "Machine Learning": ["#F59E0B", "#D97706"],
  Tools: ["#EC4899", "#DB2777"],
};

const PROJECTS = [
  {
    id: 1,
    name: "ClearSight",
    tagline: "AI-powered customs cargo X-ray analysis with explainable risk scores",
    description:
      "AI-powered customs and border security system that analyzes X-ray cargo images using multiple deep learning models to generate explainable shipment risk scores.",
    problem:
      "Manual inspection of X-ray cargo images is slow and prone to human error, creating security vulnerabilities at borders.",
    solution:
      "Developed a multi-model AI pipeline using YOLOv8x, ResNet50, CLIP, and GradCAM to automatically detect suspicious cargo and generate explainable risk scores with visual heat maps.",
    tech: ["Python", "YOLOv8x", "ResNet50", "CLIP", "GradCAM", "OpenCV", "PyTorch"],
    github: "#",
    demo: null,
    emoji: "🔍",
    accent: "#3B82F6",
  },
  {
    id: 2,
    name: "Diploma-Dost",
    tagline: "Full-stack admission guidance platform for diploma students",
    description:
      "Full-stack admission guidance platform that helps diploma students navigate college admissions with data-driven insights.",
    problem:
      "Students struggle to compare colleges, analyze cutoffs, and make informed admission decisions due to fragmented information.",
    solution:
      "Developed a centralized platform with college prediction, personalized shortlisting, cutoff analysis, and step-by-step admission guidance.",
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    github: "#",
    demo: "#",
    emoji: "🎓",
    accent: "#8B5CF6",
  },
  {
    id: 3,
    name: "LexRoBERTa",
    tagline: "Hybrid NLP model for semantic extractive text summarization",
    description:
      "Hybrid NLP model combining LexRank with RoBERTa embeddings for semantic extractive text summarization.",
    problem:
      "Traditional extractive summarization methods fail to capture semantic context, producing incoherent summaries.",
    solution:
      "Integrated LexRank graph ranking with contextual RoBERTa sentence embeddings, evaluated with ROUGE, BLEU, METEOR, and BERTScore metrics.",
    tech: ["Python", "RoBERTa", "LexRank", "PyTorch", "Transformers"],
    github: "#",
    demo: null,
    emoji: "📄",
    accent: "#06B6D4",
  },
  {
    id: 4,
    name: "Inventra",
    tagline: "Web-based inventory management with sales and profit tracking",
    description:
      "Inventory Management System for managing products, inventory, sales, and profit for small businesses.",
    problem:
      "Small businesses struggle with manual inventory management, leading to stock errors and poor financial visibility.",
    solution:
      "Developed a web-based platform with authentication, CRUD operations, sales reports, and profit tracking dashboards.",
    tech: ["HTML", "CSS", "PHP", "MySQL"],
    github: "#",
    demo: null,
    emoji: "📦",
    accent: "#10B981",
  },
  {
    id: 5,
    name: "GoTechJob",
    tagline: "All-in-one career preparation platform for software engineers",
    description:
      "Career preparation platform for aspiring software engineers combining all resources in one place.",
    problem:
      "Students rely on multiple scattered websites for interview preparation, resumes, and career resources.",
    solution:
      "Built a single platform offering resumes, cover letters, interview prep, roadmaps, mock interviews, and curated job links.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
    emoji: "💼",
    accent: "#F59E0B",
  },
];

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "Kaggle ML Competition",
    subtitle: "🥇 First Position",
    desc: "Applied end-to-end machine learning techniques including data preprocessing, data analysis, feature engineering and performance optimization on real-world datasets.",
    color: "#F59E0B",
  },
  {
    icon: "⚡",
    title: "VOIS Innovation Marathon 2.0",
    subtitle: "🏆 Top 30 Finalist",
    desc: "Designed and developed E-Voting 2.0, integrating blockchain and biometric face authentication, and was awarded a ₹2,00,000 cash prize for the innovative solution.",
    color: "#3B82F6",
  },
  {
    icon: "⛸️",
    title: "Roller Skating",
    subtitle: "🌟State-level Representative",
    desc: "Represented Solapur district at the state level, consistently securing first place in district-level roller skating competitions through years of dedication, hard work and passion for the sport.",
    color: "#8B5CF6",
  },
  {
    icon: "🏏",
    title: "Cricket Championships",
    subtitle: "🥈 Intra-College • 🥉 Inter-College",
    desc: "Won Silver at Pentacle 2026 and Gold at Damini 2025–26 at CCOEW college, demonstrating teamwork, discipline, leadership, and excellence under competitive pressure.",
    color: "#10B981",
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useTypewriter(texts, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return displayed;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── ANIMATION WRAPPER ───────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── BACKGROUND ──────────────────────────────────────────────────────────────

function Background() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        top: "-10%", left: "-10%", animation: "drift1 18s ease-in-out infinite alternate",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        bottom: "10%", right: "-5%", animation: "drift2 22s ease-in-out infinite alternate",
      }} />
      <div style={{
        position: "absolute", width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        top: "50%", left: "50%", animation: "drift3 16s ease-in-out infinite alternate",
      }} />
      <style>{`
        @keyframes drift1 { 0%{transform:translate(0,0)} 100%{transform:translate(60px,80px)} }
        @keyframes drift2 { 0%{transform:translate(0,0)} 100%{transform:translate(-50px,60px)} }
        @keyframes drift3 { 0%{transform:translate(-50%,-50%)} 100%{transform:translate(-40%,-60%)} }
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      `}</style>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2rem",
      background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontWeight: 700, fontSize: "125%", background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AP.
        </span>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: activeSection === link.toLowerCase() ? "#3B82F6" : "rgba(255,255,255,0.65)",
                  fontSize: "87.5%", fontWeight: 500, letterSpacing: "0.02em",
                  transition: "color 0.2s", padding: "4px 0",
                  borderBottom: activeSection === link.toLowerCase() ? "1px solid #3B82F6" : "1px solid transparent",
                }}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="hamburger"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "137.5%" }}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)",
          padding: "1.5rem 2rem", borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.8)", fontSize: "100%", padding: "10px 0",
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:640px){
          .desktop-nav{display:none!important}
          .hamburger{display:block!important}
        }
      `}</style>
    </nav>
  );
}

// ─── ABOUT HERO ────────────────────────────────────────────────────────────

function AboutHero() {
  const typed = useTypewriter(TYPEWRITER_TEXTS);
  const TECH_ICONS = ["⚛️","🐍","🤖","🎯","🔥","💡","🛠️","🌐"];

  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "20px 1.25rem 2rem", maxWidth: 1300, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", width: "100%", flexWrap: "wrap" }}>

        {/* Left */}
        <div style={{ flex: "1 1 340px", minWidth: 280 }}>
          <FadeUp delay={0}>
            <p style={{ color: "#3B82F6", fontSize: "87.5%", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>
              👋 Hi, I'm
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 style={{
              fontSize: "clamp(2.4rem,6vw,4rem)", fontWeight: 800, lineHeight: 1.1,
              background: "linear-gradient(135deg,#fff 30%,rgba(255,255,255,0.6))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 4,
            }}>
              Anushkaa Pawar
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "100%", marginBottom: "1rem" }}>
              Computer Engineering Student
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 40, marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "clamp(1.1rem,3vw,1.5rem)", fontWeight: 600, color: "#8B5CF6" }}>{typed}</span>
              <span style={{ fontSize: "clamp(1.2rem,1.7vw,1.5rem)", color: "#3B82F6", animation: "blink 1s step-end infinite" }}>|</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "93.75%", lineHeight: 1.7, marginBottom: "1rem", maxWidth: 840 }}>
             Driven by curiosity to build meaningful AI and ML solutions that solve real-world problems.
            </p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "93.75%", lineHeight: 1.7, marginBottom: "1rem", maxWidth: 840 }}>
             I am a Computer Engineering student with a strong interest in Artificial Intelligence, Machine Learning, and Software Development. I have worked on projects involving web applications, databases, and intelligent systems, with a focus on designing scalable, efficient, and user-centric software solutions.
            </p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "93.75%", lineHeight: 1.7, marginBottom: "1rem", maxWidth: 840 }}>
             Through academic projects, hackathons, and continuous learning, I have strengthened my problem-solving abilities and technical skills while working with modern development technologies. I am committed to creating software that addresses real-world challenges and contributes meaningful value through innovation and technology.            
            </p>
          </FadeUp>
          <FadeUp delay={0.5}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
              <GlowBtn onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                View Projects →
              </GlowBtn>
              <GlowBtn secondary href="#">
                Download Resume ↓
              </GlowBtn>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              {[["GitHub","https://github.com/anushkaa-2006","💻"],["LinkedIn","http://linkedin.com/in/anushkaa3006/","💼"],["Email","mailto:anushkaapawar2006@gmail.com","✉️"]].map(([label,href,icon])=>(
                <a key={label} href={href} style={{ display:"flex",alignItems:"center",gap:6, color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:"81.25%", transition:"color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.color="#3B82F6"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}>
                  {icon} {label}
                </a>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right – avatar */}
        <FadeUp delay={0.3} style={{ flex: "0 0 auto" }}>
          <div style={{ position: "relative", width: 350, height: 350 }}>
            {/* Spinning gradient ring */}
            <div style={{
              position: "absolute", inset: -6, borderRadius: "50%",
              background: "linear-gradient(135deg,#3B82F6,#8B5CF6,#06B6D4,#3B82F6)",
              backgroundSize: "300% 300%", animation: "gradShift 4s ease infinite, spin 10s linear infinite",
              padding: 4,
            }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#0A0A0A" }} />
            </div>
            {/* Avatar */}
            <div style={{
              position: "absolute", inset: 6, borderRadius: "50%",
              background: "linear-gradient(135deg,#1e3a5f,#2d1b69)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(3rem,8vw,5rem)",
            }}>
              👩‍💻
            </div>
            {/* Floating icons */}
            {TECH_ICONS.map((icon, i) => {
              const angle = (i / TECH_ICONS.length) * 2 * Math.PI;
              const r = 195;
              const x = Math.cos(angle) * r + 170 - 20;
              const y = Math.sin(angle) * r + 170 - 20;
              return (
                <div key={i} style={{
                  position: "absolute", left: x, top: y, width: 50, height: 50,
                  borderRadius: "50%", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(0.95rem,1.2vw,1.1rem)",
                  animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}>
                  {icon}
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── GLOW BUTTON ─────────────────────────────────────────────────────────────

function GlowBtn({ children, onClick, secondary, href }) {
  const [hov, setHov] = useState(false);
  const style = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "10px 22px", borderRadius: 10, fontWeight: 600, fontSize: "87.5%",
    cursor: "pointer", textDecoration: "none", transition: "all 0.25s",
    border: secondary ? "1px solid rgba(255,255,255,0.15)" : "none",
    background: secondary
      ? hov ? "rgba(255,255,255,0.08)" : "transparent"
      : hov
        ? "linear-gradient(135deg,#2563EB,#7C3AED)"
        : "linear-gradient(135deg,#3B82F6,#8B5CF6)",
    color: "#fff",
    boxShadow: hov && !secondary ? "0 0 24px rgba(59,130,246,0.45)" : "none",
    transform: hov ? "translateY(-1px)" : "none",
  };
  if (href) return <a href={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>;
  return <button style={style} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</button>;
}

// ─── SECTION HEADING ─────────────────────────────────────────────────────────

function SectionHeading({ tag, title }) {
  return (
    <FadeUp>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p style={{ color: "#3B82F6", fontSize: "75%", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>{tag}</p>
        <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>{title}</h2>
        <div style={{ width: 60, height: 3, background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", borderRadius: 2, margin: "0 auto" }} />
      </div>
    </FadeUp>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return null;
}

function Education() {
  const timeline = [
    { year: "2025–Present", title: "B.Tech in Computer Engineering", marks: "8.6 CGPA", sub: "At MKSSS's Cummins College of Engineering for Women, Pune" },
    { year: "2022–2025", title: "Diploma in Computer Technology", marks: "91.77%", sub: "At Government Polytechnic Solapur" },
    { year: "2021–2022", title: "Secondary Education (SSC)", marks: "90.40%", sub: "Shri Siddheshwar Bal Mandir Madhyamik Shala, Solapur" },
  ];

  return (
    <section id="education" style={{ padding: "3.7rem 1.25rem", maxWidth: 1300, margin: "0 auto", background: "rgba(255,255,255,0.01)", borderRadius: 28 }}>
      <SectionHeading tag="Academic Background" title="Education" />
      <div style={{ position: "relative", marginTop: "2rem", paddingLeft: "3rem" }}>
        <div style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,#3B82F6,#8B5CF6,transparent)" }} />
        {timeline.map((item, i) => (
          <FadeUp key={item.year} delay={i * 0.07}>
            <div style={{ position: "relative", display: "flex", gap: "1.5rem", marginBottom: "1rem", paddingLeft: "1.5rem" }}>
              <div style={{ position: "absolute", left: -11, top: 10, width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", border: "3px solid #0A0A0A", boxShadow: "0 0 14px rgba(59,130,246,0.35)" }} />
              <div style={{ flex: 1, padding: "1.4rem 1.6rem", borderRadius: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "#3B82F6", fontWeight: 700 }}>{item.year}</span>
                  <span style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(59,130,246,0.12)", color: "#93C5FD", fontSize: "0.8rem", fontWeight: 700 }}>{item.marks}</span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.75, margin: 0 }}>{item.sub}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" style={{ padding: "6rem 1.25rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <SectionHeading tag="What I Know" title="Skills" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
          {Object.entries(SKILLS).map(([cat, items], i) => {
            const [from, to] = SKILL_COLORS[cat] || ["#3B82F6", "#8B5CF6"];
            return (
              <FadeUp key={cat} delay={i * 0.08}>
                <SkillCard category={cat} items={items} from={from} to={to} />
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category, items, from, to }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, padding: "1.5rem",
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? `${from}55` : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.3s",
        boxShadow: hov ? `0 0 30px ${from}22` : "none",
        transform: hov ? "translateY(-4px)" : "none",
      }}
    >
      <h3 style={{ fontSize: "81.25%", fontWeight: 700, marginBottom: "1rem", background: `linear-gradient(135deg,${from},${to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {category}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((skill) => (
          <span key={skill} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: "75%", fontWeight: 500,
            background: `${from}18`, border: `1px solid ${from}33`, color: "rgba(255,255,255,0.75)",
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="projects" style={{ padding: "6rem 1.25rem", maxWidth: 1300, margin: "0 auto" }}>
      <SectionHeading tag="What I've Built" title="Projects" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {PROJECTS.map((p, i) => (
          <FadeUp key={p.id} delay={i * 0.07}>
            <ProjectCard
              project={p}
              isExpanded={expanded === p.id}
              onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
            />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, isExpanded, onToggle }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 18, overflow: "hidden",
        border: `1px solid ${hov || isExpanded ? `${p.accent}55` : "rgba(255,255,255,0.08)"}`,
        background: "rgba(255,255,255,0.03)",
        boxShadow: hov || isExpanded ? `0 0 40px ${p.accent}20` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Card header */}
      <div style={{ padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, fontSize: "162.5%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `${p.accent}20`, border: `1px solid ${p.accent}40`,
          }}>
            {p.emoji}
          </div>
          <div>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "112.5%", marginBottom: 2 }}>{p.name}</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "81.25%" }}>{p.tagline}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          style={{
            padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontSize: "81.25%",
            background: isExpanded ? `${p.accent}30` : "transparent",
            border: `1px solid ${p.accent}60`,
            color: p.accent, cursor: "pointer", transition: "all 0.2s",
          }}
        >
          {isExpanded ? "Show Less ↑" : "View More ↓"}
        </button>
      </div>

      {/* Expanded content */}
      <div style={{
        maxHeight: isExpanded ? 1000 : 0,
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: "0 2rem 2rem", borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          {/* Screenshot placeholder */}
          <div style={{
            width: "100%", height: 180, borderRadius: 12, marginBottom: "1.5rem", marginTop: "1.5rem",
            background: `linear-gradient(135deg,${p.accent}20,rgba(255,255,255,0.03))`,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${p.accent}25`, fontSize: "clamp(2.2rem,5vw,4rem)",
          }}>
            {p.emoji}
          </div>

          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "1.2rem", fontSize: "87.5%" }}>
            {p.description}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.2rem", marginBottom: "1.5rem" }}>
            <DetailBox label="🔴 Problem" text={p.problem} accent={p.accent} />
            <DetailBox label="✅ Solution" text={p.solution} accent={p.accent} />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "75%", color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Tech Stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.tech.map((t) => (
                <span key={t} style={{
                  padding: "4px 12px", borderRadius: 6, fontSize: "75%", fontWeight: 600,
                  background: `${p.accent}18`, border: `1px solid ${p.accent}40`, color: p.accent,
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <GlowBtn href={p.github}>GitHub Repo ↗</GlowBtn>
            {p.demo && <GlowBtn href={p.demo} secondary>Live Demo ↗</GlowBtn>}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ label, text, accent }) {
  return (
    <div style={{ padding: "1rem", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <p style={{ fontSize: "75%", color: accent, fontWeight: 700, marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: "81.25%", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{text}</p>
    </div>
  );
}

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────

function Achievements() {
  return (
    <section id="achievements" style={{ padding: "6rem 1.25rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <SectionHeading tag="Milestones" title="Achievements" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }}>
          {ACHIEVEMENTS.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.1}>
              <AchievementCard {...a} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ icon, title, subtitle, desc, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "1.75rem", borderRadius: 16,
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? `${color}55` : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.3s", boxShadow: hov ? `0 0 30px ${color}22` : "none",
        transform: hov ? "translateY(-4px) scale(1.01)" : "none",
      }}
    >
      <div style={{ fontSize: "clamp(2.2rem,4vw,3rem)", marginBottom: "1rem" }}>{icon}</div>
      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "100%", marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: "75%", color: color, fontWeight: 600, marginBottom: 10 }}>{subtitle}</p>
      <p style={{ fontSize: "81.25%", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" style={{ padding: "6rem 1.25rem", maxWidth: 900, margin: "0 auto" }}>
      <SectionHeading tag="Let's Talk" title="Get In Touch" />
      <FadeUp>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "87.5%", lineHeight: 1.7, maxWidth: 660 }}>
            I'm open to internships, full-time roles, collaborations, and interesting project discussions. Don't hesitate to reach out!
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem", width: "100%" }}>
            {[
              ["💻", "GitHub", "github.com/anushkaa-2006", "https://github.com/anushkaa-2006"],
              ["💼", "LinkedIn", "linkedin.com/in/anushkaa3006/", "http://linkedin.com/in/anushkaa3006/"],
              ["✉️", "Email", "anushkaapawar2006@gmail.com", "mailto:anushkaapawar2006@gmail.com"]
            ].map(([icon, label, val, href]) => (
              <a key={label} href={href}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "1rem 1.1rem", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; e.currentTarget.style.background = "rgba(59,130,246,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                <span style={{ fontSize: "137.5%" }}>{icon}</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "87.5%", margin: 0 }}>{label}</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "75%", margin: 0 }}>{val}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      textAlign: "center", padding: "2.5rem 2rem",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      color: "rgba(255,255,255,0.35)", fontSize: "81.25%",
    }}>
      <p>Made with ❤️ using Next.js & React — Anushkaa Pawar © 2025</p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          marginTop: 12, padding: "8px 20px", borderRadius: 8, fontSize: "75%", fontWeight: 600,
          background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
          color: "#60A5FA", cursor: "pointer",
        }}
      >
        ↑ Back to Top
      </button>
    </footer>
  );
}

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div style={{
      position: "fixed", pointerEvents: "none", zIndex: 9999,
      width: 300, height: 300, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
      transform: `translate(${pos.x - 150}px, ${pos.y - 150}px)`,
      transition: "transform 0.1s ease-out",
    }} />
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((n) => n.toLowerCase());
    const handler = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= 100) setActiveSection(id);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif", position: "relative" }}>
      <Background />
      <CursorGlow />
      <Navbar activeSection={activeSection} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <AboutHero />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
