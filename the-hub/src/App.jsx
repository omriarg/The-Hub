// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import skyline from "./skyline.png";
import emailjs from "@emailjs/browser";
// --- Services data (title + description) ---
const services = [
    { key: "all-inclusive-contractor-license", title: "All-Inclusive Contractor License Package – $1,000 Flat Fee", desc: "Includes the City’s $232 license fee (paid directly) and OSHA cards ($250 value). Turnkey, fast licensing with no surprises." },
    { key: "permit-filing-only-125", title: "Permit Filing Only – $125 Flat Fee", desc: "Just need filing? We’ll prepare the submittal, file through eCLIPSE, and consult—flat $125." },
    { key: "contractor-licenses", title: "Contractor Licenses", desc: "Assistance with obtaining and renewing Philadelphia contractor licenses." },
    { key: "quick-turnaround", title: "Quick Turnaround Services", desc: "Priority handling and follow-ups to keep projects moving without delay." },
    { key: "building-permits", title: "Building Permits", desc: "For construction, renovations, and structural work." },
    { key: "ez-building-permits", title: "EZ Building Permits", desc: "Simplified permits for eligible small projects (decks, fences, sheds, etc.)." },
    { key: "electrical-permits", title: "Electrical Permits", desc: "For wiring, service upgrades, and panels." },
    { key: "new-electrical-services", title: "New Electrical Services", desc: "Applications, approvals, and coordination for new electrical service installations." },
    { key: "plumbing-permits", title: "Plumbing Permits", desc: "For water, gas, and drainage systems." },
    { key: "hvac-permits", title: "HVAC Permits", desc: "Heating, ventilation, and air conditioning permits." },
    { key: "zoning-permits", title: "Zoning Permits", desc: "Use registration, variances, and zoning approvals." },
    { key: "street-dept-permits", title: "Street Department Permits", desc: "Approvals for street openings, right-of-way, and utility work." },
    { key: "pwd-utility-plans", title: "PWD Utility Plans", desc: "Required plans for new or modified water and sewer connections." },
    { key: "pwd-plans-submittals-pre-permit", title: "PWD Plans Submissions & Approvals / Pre-Permit Obtaining", desc: "We handle plan submittals to PWD, obtain pre-permit clearances, and secure approvals." },
    { key: "new-water-sewer-fire", title: "New Water / Sewer / Fire Suppression Plans", desc: "Design, submission, and approvals for new utility and fire protection service installations." },
    { key: "legalizing-decks", title: "Legalizing Decks & Structures", desc: "Bring unpermitted decks/additions into compliance." },
    { key: "legalizing-work-without-permits", title: "Legalizing Work Without Permits", desc: "If you were caught working without permits, we handle the filings and approvals to legalize the project." },
    { key: "drawings-submittals", title: "Drawings & Submittals", desc: "Affordable, code-compliant plans prepared and filed." },
    { key: "closing-violations", title: "Closing Out Violations", desc: "Resolve existing violations quickly and correctly." },
    { key: "cos", title: "Certificates of Occupancy (COs)", desc: "Secure COs after inspections and approvals." },
    { key: "eclipse-filings", title: "eCLIPSE Portal Filings", desc: "We manage all filings and tracking with L&I." },
    { key: "inspections-code", title: "Inspections & Code Compliance", desc: "Guidance through inspections to meet applicable codes." },
    { key: "expediting", title: "Expediting", desc: "Full-service expediting to move permits through faster." }
];

// Scroll-to-hash helper (used on Home and Services pages)
function useScrollToHash() {
    const { hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const id = hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                const yOffset = -130; // adjust offset for your navbar height
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [hash]);
}
// Active tab highlighter
function NavLink({ to, children }) {
    const location = useLocation();
    const isHashLink = to.startsWith("/#");
    const isActive = isHashLink
        ? location.pathname === "/" && location.hash === to.replace("/", "")
        : location.pathname === to;

    return (
        <Link
            to={to}
            style={{
                ...styles.navLink,
                borderBottom: isActive ? "2px solid #fff" : "2px solid transparent",
                fontWeight: isActive ? "700" : "600",
            }}
        >
            {children}
        </Link>
    );
}

export default function App() {
    return (
        <Router>
            <div style={{ ...styles.page, backgroundImage: `url(${skyline})` }}>
                {/* NAVBAR */}
                <header style={styles.navbar}>
                    <nav style={styles.navContainer}>
                        <div style={styles.logoBlock}>
                            <div style={styles.logo}>The Hub Philadelphia</div>
                            <div style={styles.contactInfo}>
                                <a href="tel:+12678893009" style={styles.contactLink}>267-889-3009</a> |{" "}
                                <a href="mailto:Info@thp215.com" style={styles.contactLink}>Info@thp215.com</a>
                            </div>
                        </div>
                        <ul style={styles.navLinks}>
                            <li><NavLink to="/#about">About</NavLink></li>
                            <li><NavLink to="/services">Services</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* ROUTES */}
                <main style={styles.container}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

// --- Pages (kept inline) ---
function Home() {
    useScrollToHash();
    return (
        <>
            <section style={styles.hero}>
                <h1 style={styles.h1}>One-Stop Shop For All Your Permitting and L&I Needs</h1>
            </section>

            <section id="about" style={styles.section}>
                <h2 style={styles.h2}>About Us</h2>
                <p>
                    We take care of the entire permitting process in Philadelphia from start to finish. Our services include
                    affordable drawings, submittals, obtaining all permits — building, electrical, plumbing, and HVAC — and
                    closing out violations.
                </p>
                <p>
                    We’re known for being actually affordable while still doing things the right way. We work directly with the
                    city to make sure your permits are filed correctly, inspections are passed, and your project stays on
                    schedule.
                </p>
            </section>

            {/* Clickable Services (columns) */}
            <section id="services" style={styles.section}>
                <h2 style={styles.h2}>Services</h2>
                <div style={styles.servicesGrid}>
                    <ul style={styles.servicesColumn}>
                        {services.slice(0, 8).map(s => (
                            <li key={s.key}>
                                <Link to={`/services#${s.key}`} style={styles.serviceLink}>{s.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <ul style={styles.servicesColumn}>
                        {services.slice(8, 15).map(s => (
                            <li key={s.key}>
                                <Link to={`/services#${s.key}`} style={styles.serviceLink}>{s.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <ul style={styles.servicesColumn}>
                        {services.slice(15).map(s => (
                            <li key={s.key}>
                                <Link to={`/services#${s.key}`} style={styles.serviceLink}>{s.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

function ServicesPage() {
    useScrollToHash();

    return (
        <section style={styles.section}>
            {/* Highlight whichever <li> matches the URL hash */}
            <style>{`
        li:target .serviceTitle {
          text-decoration: underline;
          background: rgba(0,0,0,0.06);
          border-left: 4px solid #000;
          padding: 8px 12px;
          border-radius: 4px;
        }
      `}</style>

            <h2 style={styles.h2}>Services</h2>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
                {services.map(s => (
                    <li key={s.key} id={s.key} style={{ marginBottom: 14 }}>
                        <div className="serviceTitle" style={{ fontWeight: 700, marginBottom: 4 }}>
                            {s.title}
                        </div>
                        <div style={{ opacity: 0.9 }}>{s.desc}</div>
                    </li>
                ))}
            </ul>
        </section>
    );
}



function ContactPage() {
    const [name, setName] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState(null); // "ok" | "fail" | null
    const [sending, setSending] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!senderEmail && !phone) {
            setError("Please provide at least an email or a phone number.");
            setStatus(null);
            return;
        }
        setError("");
        setSending(true);
        setStatus(null);

        const serviceId =
            import.meta?.env?.VITE_EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId =
            import.meta?.env?.VITE_EMAILJS_TEMPLATE_ID || process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const publicKey =
            import.meta?.env?.VITE_EMAILJS_PUBLIC_KEY || process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            name: name || "Website Visitor",
            senderEmail: senderEmail || "N/A",
            phone: phone || "N/A",
            message: msg || "",
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, { publicKey });
            setStatus("ok");
            setName("");
            setSenderEmail("");
            setPhone("");
            setMsg("");
        } catch (err) {
            console.error(err);
            setStatus("fail");
        } finally {
            setSending(false);
        }
    };

    return (
        <section style={styles.section}>
            <h2 style={styles.h2}>Contact</h2>
            <p style={{ marginBottom: 8 }}>
                Phone: <a href="tel:+12678893009" style={{ color: "#000" }}>267-889-3009</a>
            </p>
            <p style={{ marginBottom: 20 }}>
                Email: <a href="mailto:Info@thp215.com" style={{ color: "#000" }}>Info@thp215.com</a>
            </p>

            <form onSubmit={handleSend} style={styles.form}>
                <label style={styles.label}>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your name"
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Email
                    <input
                        type="email"
                        value={senderEmail}
                        onChange={e => setSenderEmail(e.target.value)}
                        placeholder="Your email"
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Phone
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Your phone number"
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Message
                    <textarea
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        placeholder="Tell us about your project or what you need"
                        rows={6}
                        style={styles.textarea}
                    />
                </label>

                {error && <p style={{ color: "red", fontWeight: 600 }}>{error}</p>}
                <p style={{ fontSize: 14, color: "#333", margin: "4px 0 12px", fontStyle: "italic" }}>
                    We will never spam you.
                </p>

                <button type="submit" style={styles.button} disabled={sending}>
                    {sending ? "Sending..." : "Send Message"}
                </button>

                {status === "ok" && (
                    <p style={{ color: "green", fontWeight: 600, marginTop: 10 }}>
                        Message sent! We’ll get back to you shortly.
                    </p>
                )}
                {status === "fail" && (
                    <p style={{ color: "red", fontWeight: 600, marginTop: 10 }}>
                        Something went wrong. Please try again, or email us directly at Info@thp215.com.
                    </p>
                )}
            </form>
        </section>
    );
}



// --- Styles ---
const styles = {
    page: {
        fontFamily: "'Trebuchet MS', Arial, sans-serif",
        color: "#000",
        lineHeight: 1.6,

        minHeight: "100vh",
        width: "100vw",

        backgroundImage: `url(${skyline})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
    },
    navbar: {
        backgroundColor: "#000", // solid black
        color: "#fff",
        padding: "30px 24px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
    }
    ,  navContainer: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", maxWidth: "1200px", margin: "0 auto" },
    logoBlock: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
    logo: { fontWeight: "700", fontSize: "28px", marginBottom: "6px" },
    contactInfo: { fontSize: "14px" },
    contactLink: { color: "#fff", textDecoration: "none" },
    navLinks: { display: "flex", listStyle: "none", gap: "32px", margin: 0, padding: 0 },
    navLink: { color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "20px" },

    container: {
        position: "relative",

        width: "100%",
        minHeight: "100vh",

        boxSizing: "border-box",

        backgroundColor: "rgba(255,255,255,0.65)",

        padding: "180px 30px 40px 30px", // top right bottom left
    },
    hero: { minHeight: "20vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", marginBottom: "20px" },
    h1: { fontSize: "40px", marginBottom: "16px" },

    section: { maxWidth: "1000px", margin: "0 auto 40px auto" },
    h2: { fontSize: "26px", marginBottom: "16px" },

    servicesGrid: { display: "flex", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" },
    servicesColumn: { flex: "1", listStyle: "disc", paddingLeft: "20px", margin: 0, minWidth: "260px" },
    serviceLink: { color: "#000", textDecoration: "none" },

    // Contact form
    form: { display: "grid", gap: "12px", maxWidth: "600px" },
    label: { display: "grid", gap: "6px", fontWeight: 600 },
    input: { padding: "10px 12px", border: "1px solid #bbb", borderRadius: 6, fontSize: 16 },
    textarea: { padding: "10px 12px", border: "1px solid #bbb", borderRadius: 6, fontSize: 16, resize: "vertical" },
    button: { marginTop: 8, padding: "12px 16px", fontSize: 16, fontWeight: 700, border: "none", borderRadius: 6, cursor: "pointer", background: "#000", color: "#fff" },
};
