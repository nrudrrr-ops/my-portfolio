import React from "react";
import "./AdityaBirlaInternship.css";

export default function AdityaBirlaInternship() {
  return (
    <section className="abi-wrap">
      <div className="abi-tri-field">
        <div className="abi-tri abi-tri-1"></div>
        <div className="abi-tri abi-tri-2"></div>
        <div className="abi-tri abi-tri-3"></div>
        <div className="abi-tri abi-tri-4"></div>
      </div>

      <div className="abi-container">
        <div className="abi-header">
          <div className="abi-logo-corner">
            <div className="abi-logo-mark">
              <div></div><div></div><div></div><div></div>
            </div>
            <div className="abi-logo-caption">ADITYA BIRLA GROUP</div>
          </div>
          <span className="abi-pill">
            <span className="abi-dot"></span> INTERNSHIP EXPERIENCE
          </span>
          <h1 className="abi-title">
            Inside <span className="abi-accent">Aditya Birla</span>
          </h1>
          <p className="abi-subtitle">Learning. Analyzing. Improving.</p>
        </div>

        <div className="abi-main-row">
          {/* Laptop mockup */}
          <div className="abi-laptop">
            <div className="abi-screen">
              <div className="abi-screen-inner">
                <div className="abi-sap-topbar">
                  <span className="abi-sap-badge">SAP</span>
                  <span className="abi-sap-title">Display Document: General Ledger View</span>
                </div>
                <div className="abi-sap-icons">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="abi-ledger-grid">
                  <div className="abi-ledger-table">
                    <div className="abi-ledger-row"><span>Document Number</span><span>Line</span><span>Account</span></div>
                    <div className="abi-ledger-row"><span>1200236</span><span>10</span><span>Travel Expense</span></div>
                    <div className="abi-ledger-row"><span>1200235</span><span>20</span><span>Vendor Payable</span></div>
                    <div className="abi-ledger-row"><span>2200890</span><span>10</span><span>Fuel Charges</span></div>
                    <div className="abi-ledger-row"><span>3300123</span><span>30</span><span>Freight Inward</span></div>
                    <div className="abi-ledger-row"><span>2200109</span><span>10</span><span>Repairs Maint.</span></div>
                    <div className="abi-ledger-row"><span>2200820</span><span>10</span><span>Consumables</span></div>
                    <div className="abi-ledger-row"><span>2200560</span><span>20</span><span>Cement Sales</span></div>
                  </div>
                  <div>
                    <div className="abi-chart-box" style={{ marginBottom: 6 }}>
                      <div className="abi-chart-label">Monthly Spend Analysis</div>
                      <div className="abi-donut"></div>
                    </div>
                    <div className="abi-chart-box">
                      <div className="abi-chart-label">Spend by Vendor</div>
                      <div className="abi-bars">
                        <i style={{ height: "70%", background: "#2fa8e0" }}></i>
                        <i style={{ height: "45%", background: "#6be0a8" }}></i>
                        <i style={{ height: "90%", background: "#f0a03c" }}></i>
                        <i style={{ height: "30%", background: "#c9c9d8" }}></i>
                        <i style={{ height: "55%", background: "#c81e1e" }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="abi-keyboard-base"></div>
          </div>

          {/* Info */}
          <div className="abi-info-col">
            <span className="abi-role-pill">💼 Finance Intern</span>
            <div className="abi-company">Aditya Birla Group</div>
            <p className="abi-desc">
              Working closely with the finance team to support daily operations,
              analysis, and reporting using SAP, Excel and other digital tools.
            </p>
            <div className="abi-meta-box">
              <div className="abi-row">📅 May 2026 – July 2026</div>
              <div className="abi-row">📍 Cement Division</div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="abi-feature-grid">
            <div className="abi-feature-card">
              <div className="abi-feature-icon">📄</div>
              <h4>GST Reconciliation</h4>
              <p>3-way match, GSTR-1 vs 2B validation</p>
            </div>
            <div className="abi-feature-card">
              <div className="abi-feature-icon">SAP</div>
              <h4>SAP S/4HANA</h4>
              <p>Daily reports, FBL51, GR/IR tracking</p>
            </div>
            <div className="abi-feature-card">
              <div className="abi-feature-icon">📊</div>
              <h4>Excel Analytics</h4>
              <p>Pivot dashboards, variance analysis</p>
            </div>
            <div className="abi-feature-card">
              <div className="abi-feature-icon">🏭</div>
              <h4>Cement Operations</h4>
              <p>Fuel reports, cost analysis, tracking</p>
            </div>
          </div>
        </div>

        {/* Projects section */}
        <div className="abi-projects-section">
          <div className="abi-projects-heading">
            <h2>Key Projects &amp; Tasks</h2>
            <span className="abi-view-all">View All →</span>
          </div>
          <div className="abi-projects-grid">
            <div className="abi-project-card">
              <div className="abi-top">
                <span className="abi-project-icon">📄</span>
                <h4>GST Reconciliation</h4>
              </div>
              <p>Reconciled vendor data with GSTR-1 and GSTR-2B. Identified mismatches and resolved filing issues.</p>
              <div className="abi-thumb abi-chart-thumb">
                <i style={{ height: "40%", background: "#c81e1e" }}></i>
                <i style={{ height: "70%", background: "#f0a03c" }}></i>
                <i style={{ height: "55%", background: "#2fa8e0" }}></i>
                <i style={{ height: "85%", background: "#6be0a8" }}></i>
                <i style={{ height: "30%", background: "#c9c9d8" }}></i>
              </div>
            </div>

            <div className="abi-project-card">
              <div className="abi-top">
                <span className="abi-project-icon">📈</span>
                <h4>Fuel Cost Analytics</h4>
              </div>
              <p>Prepared daily fuel reports for TPP. Analyzed cost variance and created pivot dashboards for insights.</p>
              <div className="abi-thumb abi-chart-thumb">
                <i style={{ height: "60%", background: "#2fa8e0" }}></i>
                <i style={{ height: "80%", background: "#c81e1e" }}></i>
                <i style={{ height: "40%", background: "#f0a03c" }}></i>
                <i style={{ height: "65%", background: "#6be0a8" }}></i>
                <i style={{ height: "50%", background: "#c9c9d8" }}></i>
              </div>
            </div>

            <div className="abi-project-card">
              <div className="abi-top">
                <span className="abi-project-icon">👥</span>
                <h4>Vendor Reports</h4>
              </div>
              <p>Generated vendor-wise reports using SAP (FBL51) and analyzed outstanding &amp; payment status.</p>
              <div className="abi-thumb abi-people-thumb">
                <span></span><span></span><span></span>
              </div>
            </div>

            <div className="abi-project-card">
              <div className="abi-top">
                <span className="abi-project-icon">📋</span>
                <h4>Process Tracking</h4>
              </div>
              <p>Tracked procurement to payment process. Ensured timely GRN, invoice &amp; payment closure.</p>
              <div className="abi-thumb abi-flow-thumb"></div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="abi-stats-bar">
          <div className="abi-stat">
            <div className="abi-stat-icon">📅</div>
            <div>
              <strong><span className="abi-num-accent">30+</span></strong>
              <span>Days Of Internship</span>
            </div>
          </div>
          <div className="abi-stat">
            <div className="abi-stat-icon">📋</div>
            <div>
              <strong><span className="abi-num-accent">15+</span></strong>
              <span>SAP Reports Generated</span>
            </div>
          </div>
          <div className="abi-stat">
            <div className="abi-stat-icon">✅</div>
            <div>
              <strong><span className="abi-num-accent">20+</span></strong>
              <span>GST Checks Completed</span>
            </div>
          </div>
          <div className="abi-stat">
            <div className="abi-stat-icon">⏱️</div>
            <div>
              <strong><span className="abi-num-accent">100+</span></strong>
              <span>Hours Hands-on Learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
