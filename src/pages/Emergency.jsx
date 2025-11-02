import React, { useState } from "react";
import "./Emergency.css";

const emergencyData = [
  {
    type: "Police & Legal Aid",
    info: [
      { title: "Filing FIR", description: "If you are a victim of a crime, immediately approach the nearest police station to file an FIR." },
      { title: "Legal Helpline", description: "Call the national legal helpline (1800-xxx-xxxx) for free legal advice in emergencies." },
      { title: "Arrest Rights", description: "Know your rights when arrested: right to know charges, right to legal counsel, and protection against unlawful detention." },
    ],
  },
  {
    type: "Workplace Emergencies",
    info: [
      { title: "Sexual Harassment", description: "Report to HR or Internal Complaints Committee immediately. You have the right to a safe workplace." },
      { title: "Unpaid Wages", description: "File a complaint with labor authorities or consult a lawyer to claim unpaid wages." },
      { title: "Discrimination", description: "You can approach the Equal Employment Opportunity authority or legal aid for action against workplace discrimination." },
    ],
  },
  {
    type: "Consumer & Financial Rights",
    info: [
      { title: "Fraudulent Transactions", description: "Immediately report to bank and consumer forum. You are protected under the Consumer Protection Act." },
      { title: "Defective Products", description: "File a complaint with consumer court or seller. You have the right to refund/replacement." },
      { title: "Insurance Claims", description: "Know your rights regarding prompt claim settlement and grievance redressal." },
    ],
  },
  {
    type: "Domestic & Family Emergencies",
    info: [
      { title: "Domestic Violence", description: "Call police or women helpline (1091) immediately. Protection orders and legal aid are available." },
      { title: "Child Rights Violation", description: "Report child abuse or labor issues to Child Welfare Committee or local authorities." },
      { title: "Property Disputes", description: "Seek legal advice immediately to prevent unlawful encroachment or property damage." },
    ],
  },
  {
    type: "Cyber & Online Legal Emergencies",
    info: [
      { title: "Cybercrime", description: "Report hacking, phishing, or online fraud to cybercrime authorities or file an FIR." },
      { title: "Online Defamation", description: "You have the right to file complaints under IT Act and approach court for defamation." },
      { title: "Data Breach", description: "Consult legal counsel and report violations of data privacy rights." },
    ],
  },
  {
    type: "Immediate Helplines",
    info: [
      { title: "Emergency Police", description: "100 / 112" },
      { title: "Women Helpline", description: "1091" },
      { title: "Child Helpline", description: "1098" },
      { title: "National Legal Services Authority", description: "1800-xxxx-xxxx" },
      { title: "Labor Department Helpline", description: "1800-xxx-xxxx" },
      { title: "Consumer Helpline", description: "1800-11-4000" },
      { title: "Cybercrime Reporting Portal", description: "https://cybercrime.gov.in/" },
    ],
  },
];

const Emergency = () => {
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        
        <h1>
          <span>Emergency Guide</span>
        </h1>
        <p className="hero-text">
          Get immediate guidance on legal emergencies. Access your rights,
          procedures, and emergency contacts in critical situations.
        </p>
        
      </section>

      {/* ================= CARDS SECTION ================= */}
      <div className="emergency-container">
        <h1>Explore Legal Emergencies</h1>
        <p>Click a card to see your legal options and emergency procedures.</p>

        <div className="emergency-grid">
          {emergencyData.map((item, index) => (
            <div
              key={index}
              className={`emergency-card ${item.type === "Immediate Helplines" ? "helpline" : ""}`}
              onClick={() => setSelectedEmergency(item)}
            >
              <h2>{item.type}</h2>
              <p className="situations">{item.info.length} situations</p>
            </div>
          ))}
        </div>

        {/* ================= MODAL / HELPLINES ================= */}
        {selectedEmergency && selectedEmergency.type === "Immediate Helplines" ? (
          <div className="helpline-section">
            <h2>{selectedEmergency.type}</h2>
            <div className="helpline-list">
              {selectedEmergency.info.map((info, i) => (
                <div key={i} className="helpline-item">
                  <span className="helpline-title">{info.title}</span>
                  <span className="helpline-number">{info.description}</span>
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={() => setSelectedEmergency(null)}>
              Close
            </button>
          </div>
        ) : (
          selectedEmergency && (
            <div className="modal-overlay" onClick={() => setSelectedEmergency(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{selectedEmergency.type}</h2>
                <ul>
                  {selectedEmergency.info.map((info, i) => (
                    <li key={i}>
                      <strong>{info.title}:</strong> {info.description}
                    </li>
                  ))}
                </ul>
                <button className="close-btn" onClick={() => setSelectedEmergency(null)}>
                  Close
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Emergency;
