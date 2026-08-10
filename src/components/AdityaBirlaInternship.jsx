import React, { useState } from "react";
import "./AdityaBirlaInternship.css";

const AdityaBirlaInternship = () => {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <section className="internship-page">

      {/* ================= HERO ================= */}
      <div className="internship-hero">

        <div className="hero-left">

          <div className="experience-badge">
            💼 &nbsp; INTERNSHIP EXPERIENCE
          </div>

          <h1>ADITYA BIRLA GROUP</h1>

          <div className="hero-line"></div>

          <h3>Operations & Finance Department</h3>

          <p>
            Gained hands-on exposure to real-time business operations,
            financial reporting, GST reconciliation, and process workflows
            in a large-scale manufacturing environment.
          </p>

        </div>


        {/* LOGO */}
        <div className="hero-logo">
          <div className="logo-box">
            {!logoFailed ? (
              <img
                src={process.env.PUBLIC_URL + "/images/aditya-birla-logo.png"}
                alt="Aditya Birla Group"
                className="aditya-birla-logo"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div className="logo-fallback">
                <span>ADITYA BIRLA</span>
              </div>
            )}
          </div>
        </div>


        {/* HERO DETAILS */}
        <div className="hero-details">

          <div className="detail-item">
            <div className="detail-icon">▣</div>

            <div>
              <strong>Internship Duration</strong>
              <span>June 2025 – July 2025 (2 Months)</span>
            </div>
          </div>


          <div className="detail-item">
            <div className="detail-icon">⌖</div>

            <div>
              <strong>Location</strong>
              <span>Aditya Birla Group (Manufacturing Unit)</span>
            </div>
          </div>


          <div className="detail-item">
            <div className="detail-icon">♧</div>

            <div>
              <strong>Department</strong>
              <span>Finance & Operations</span>
            </div>
          </div>


          <div className="detail-item">
            <div className="detail-icon">♙</div>

            <div>
              <strong>Role</strong>
              <span>Account Intern</span>
            </div>
          </div>

        </div>

      </div>


      {/* ================= MAIN CONTENT ================= */}
      <div className="internship-content">


        {/* ABOUT */}
        <div className="content-column about-column">

          <h2>ABOUT ADITYA BIRLA GROUP</h2>

          <div className="section-line"></div>

          <div className="about-intro">

            <div className="about-icon">
              ▦
            </div>

            <p>
              Aditya Birla Group is a global conglomerate with a strong
              presence in 36 countries across diverse industries including
              cement, metals, telecom, financial services, and more.
            </p>

          </div>

          <p className="about-text">
            I had the opportunity to intern in the{" "}
            <strong>Finance & Operations</strong> department, where I
            observed end-to-end business processes and contributed to key
            financial and operational activities.
          </p>

        </div>


        {/* RESPONSIBILITIES */}
        <div className="content-column responsibilities-column">

          <h2>MY KEY RESPONSIBILITIES</h2>

          <div className="section-line"></div>

          <ul className="responsibility-list">

            <li>
              <span className="check">✓</span>
              <span>
                Prepared daily TPP Fuel reports and performed cost analytics
              </span>
            </li>

            <li>
              <span className="check">✓</span>
              <span>
                Assisted in GST reconciliation (GSTR-1 vs 2B)
              </span>
            </li>

            <li>
              <span className="check">✓</span>
              <span>
                Verified vendor details, GSTIN & filing dates
              </span>
            </li>

            <li>
              <span className="check">✓</span>
              <span>
                Worked on SAP (FBL51, GRN, GR/IR) & Excel reports
              </span>
            </li>

            <li>
              <span className="check">✓</span>
              <span>
                Observed PR to PO to GRN to Invoice workflow
              </span>
            </li>

            <li>
              <span className="check">✓</span>
              <span>
                Supported in payment request (PRCV) processing
              </span>
            </li>

          </ul>

        </div>


        {/* TOOLS + LEARNINGS */}
        <div className="content-column tools-column">

          <h2>TOOLS & SYSTEMS USED</h2>

          <div className="section-line"></div>

          <div className="tools-grid">

            <div className="tool-card">
              <div className="tool-logo sap-logo">SAP</div>
              <strong>SAP S/4HANA</strong>
            </div>

            <div className="tool-card">
              <div className="tool-logo excel-logo">X</div>
              <strong>Microsoft Excel</strong>
            </div>

            <div className="tool-card">
              <div className="tool-logo gmail-logo">M</div>
              <strong>Gmail</strong>
            </div>

            <div className="tool-card">
              <div className="tool-logo baw-logo">▣</div>
              <strong>BAW Portal</strong>
            </div>

          </div>


          <h2 className="learning-heading">
            KEY LEARNINGS
          </h2>

          <div className="section-line"></div>

          <div className="learning-grid">

            <div className="learning-card">
              <span>⌁</span>
              <p>
                Understanding real-time
                business processes
              </p>
            </div>

            <div className="learning-card">
              <span>▤</span>
              <p>
                Importance of accuracy
                in financial data
              </p>
            </div>

            <div className="learning-card">
              <span>▣</span>
              <p>
                Exposure to ERP
                systems (SAP)
              </p>
            </div>

            <div className="learning-card">
              <span>♧</span>
              <p>
                Team collaboration in a
                corporate setup
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* ================= PROJECTS ================= */}
      <div className="ab-projects-section">

        <div className="ab-projects-left">

          <h2>PROJECTS & WORK HIGHLIGHTS</h2>

          <div className="section-line"></div>

          <div className="ab-projects-grid">

            <div className="ab-project-card">

              <div className="ab-project-icon">▧</div>

              <h3>TPP Fuel Cost Analytics</h3>

              <p>
                Prepared daily fuel consumption reports
                and analyzed cost variances.
              </p>

            </div>


            <div className="ab-project-card">

              <div className="ab-project-icon">▤</div>

              <h3>GST Reconciliation</h3>

              <p>
                Reconciled GSTR-1 data with
                GSTR-1 vs 2B and resolved mismatches.
              </p>

            </div>


            <div className="ab-project-card">

              <div className="ab-project-icon blue">▱</div>

              <h3>Procurement Workflow</h3>

              <p>
                Observed complete flow from
                PR → PO → GRN → Invoice → Payment.
              </p>

            </div>


            <div className="ab-project-card">

              <div className="ab-project-icon">▥</div>

              <h3>Vendor Verification</h3>

              <p>
                Verified vendor GSTIN, filing
                status and maintained compliance.
              </p>

            </div>


            <div className="ab-project-card">

              <div className="ab-project-icon">▣</div>

              <h3>Payment Request (PRCV)</h3>

              <p>
                Understood and observed
                Payment Request Cum Voucher process.
              </p>

            </div>

          </div>

        </div>


        {/* TAKEAWAY */}
        <div className="takeaway-card">

          <div className="takeaway-title">

            <div className="star">
              ★
            </div>

            <h2>
              INTERNSHIP TAKEAWAY
            </h2>

          </div>

          <p>
            This internship provided me with invaluable exposure to
            corporate operations, financial processes, and ERP systems.
            It enhanced my analytical thinking, attention to detail,
            and professional communication.
          </p>

          <div className="takeaway-divider"></div>

          <strong>
            Grateful for the opportunity to learn
            and grow with Aditya Birla Group.
          </strong>

          <span className="heart">
            ♥
          </span>

        </div>

      </div>


      {/* ================= FOOTER ================= */}
      <div className="internship-footer">

        <div className="quote">
          <span>"</span>
          Learning never exhausts the mind.
        </div>

        <div className="copyright">
          © 2025 Nitesh Singh. All Rights Reserved.
        </div>

      </div>

    </section>
  );
};

export default AdityaBirlaInternship;
