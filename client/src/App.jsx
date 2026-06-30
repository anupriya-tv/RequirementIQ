import { useState } from "react";

const API_URL = "https://effective-succotash-r4w7j7x64xwjf67p-5000.app.github.dev//analyze";

const FONT_IMPORT = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError("Paste some notes first.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch {
      setError("Couldn't reach the server. Make sure Flask is running.");
    } finally {
      setLoading(false);
    }
  };

  const sample =
    "Sarah said the dashboard needs to show sales data. Priya wants export to Excel. Login takes 4-5 seconds, needs to be faster. Password reset is broken, users wait 2 days for IT.";

  return (
    <div style={S.page}>
      <link href={FONT_IMPORT} rel="stylesheet" />

      {/* ===== Top nav strip ===== */}
      <nav style={S.nav}>
        <span style={S.navMark}>RequirementIQ</span>
        <span style={S.navMeta}>AI requirements analysis</span>
      </nav>

      <div style={S.split}>
        {/* ===== Left: editorial intro + input ===== */}
        <div style={S.leftCol}>
          <p style={S.eyebrow}>Business analysis, automated</p>
          <h1 style={S.h1}>
            Turn scattered notes into a <em style={S.italic}>structured</em> requirements doc
          </h1>
          <p style={S.lede}>
            Paste stakeholder notes, emails, or transcripts. RequirementIQ extracts
            functional requirements, user stories, and the ambiguities your team
            still needs to resolve.
          </p>

          <div style={S.inputBlock}>
            <textarea
              style={S.textarea}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste raw meeting notes here..."
            />
            <div style={S.inputFooter}>
              <button style={S.linkBtn} onClick={() => setInputText(sample)}>
                Try an example
              </button>
              <button style={S.primaryBtn} onClick={handleAnalyze} disabled={loading}>
                {loading ? "Analyzing…" : "Analyze"}
              </button>
            </div>
            {error && <p style={S.errorText}>{error}</p>}
          </div>
        </div>

        {/* ===== Right: results ===== */}
        <div style={S.rightCol}>
          {!result && !loading && (
            <div style={S.emptyState}>
              <span style={S.emptyNumber}>01</span>
              <p style={S.emptyText}>Functional requirements</p>
              <span style={S.emptyNumber}>02</span>
              <p style={S.emptyText}>User stories</p>
              <span style={S.emptyNumber}>03</span>
              <p style={S.emptyText}>Flagged ambiguities</p>
              <p style={S.emptyFootnote}>Results appear here once you analyze your notes.</p>
            </div>
          )}

          {loading && (
            <div style={S.emptyState}>
              <p style={S.emptyFootnote}>Reading through the notes…</p>
            </div>
          )}

          {result && (
            <div style={S.results}>
              <ResultSection
                index="01"
                title="Functional requirements"
                count={result.functional_requirements?.length}
              >
                {result.functional_requirements?.map((r) => (
                  <div key={r.id} style={S.reqLine}>
                    <span style={S.reqTag}>{r.id}</span>
                    <div>
                      <p style={S.reqText}>{r.requirement}</p>
                      <p style={S.reqSub}>
                        {r.priority} priority · raised by {r.source}
                      </p>
                    </div>
                  </div>
                ))}
              </ResultSection>

              {result.non_functional_requirements?.length > 0 && (
                <ResultSection
                  index="02"
                  title="Non-functional requirements"
                  count={result.non_functional_requirements.length}
                >
                  {result.non_functional_requirements.map((r) => (
                    <div key={r.id} style={S.reqLine}>
                      <span style={S.reqTag}>{r.id}</span>
                      <div>
                        <p style={S.reqText}>{r.requirement}</p>
                        <p style={S.reqSub}>{r.metric}</p>
                      </div>
                    </div>
                  ))}
                </ResultSection>
              )}

              <ResultSection
                index="03"
                title="User stories"
                count={result.user_stories?.length}
              >
                {result.user_stories?.map((s, i) => (
                  <p key={i} style={S.storyLine}>
                    {s.story}
                  </p>
                ))}
              </ResultSection>

              {result.ambiguities?.length > 0 && (
                <ResultSection
                  index="04"
                  title="Needs clarification"
                  count={result.ambiguities.length}
                  accent
                >
                  {result.ambiguities.map((a) => (
                    <div key={a.id} style={S.ambigLine}>
                      <p style={S.ambigText}>{a.issue}</p>
                      <p style={S.reqSub}>
                        Consult {a.stakeholders_to_consult} — {a.impact}
                      </p>
                    </div>
                  ))}
                </ResultSection>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultSection({ index, title, count, accent, children }) {
  return (
    <div style={S.section}>
      <div style={S.sectionHead}>
        <span style={{ ...S.sectionIndex, ...(accent ? S.sectionIndexAccent : {}) }}>
          {index}
        </span>
        <h3 style={S.sectionTitle}>{title}</h3>
        <span style={S.sectionCount}>{count}</span>
      </div>
      <div style={S.sectionBody}>{children}</div>
    </div>
  );
}

const ROSE = "#D9A5A0";
const ROSE_SOFT = "#E8C4C0";
const INK = "#0d1421";
const PAPER = "#0a0f1a";
const LINE = "#1c2538";
const TEXT_DIM = "#8089a0";
const TEXT_FAINT = "#4d5670";

const S = {
  page: {
    minHeight: "100vh",
    background: PAPER,
    fontFamily: "'Inter', sans-serif",
    color: "#eceef3",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "28px 48px",
    borderBottom: `1px solid ${LINE}`,
  },
  navMark: { fontFamily: "'Fraunces', serif", fontSize: "19px", fontWeight: 600, letterSpacing: "0.2px" },
  navMeta: { fontSize: "12px", color: TEXT_FAINT, letterSpacing: "0.4px", textTransform: "uppercase" },

  split: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    gap: "0",
    minHeight: "calc(100vh - 78px)",
  },

  leftCol: {
    padding: "64px 56px",
    borderRight: `1px solid ${LINE}`,
  },
  eyebrow: {
    fontSize: "12px",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    color: ROSE,
    marginBottom: "18px",
    fontWeight: 500,
  },
  h1: {
    fontFamily: "'Fraunces', serif",
    fontSize: "38px",
    fontWeight: 500,
    lineHeight: "1.2",
    color: "#f5f1ee",
    margin: "0 0 22px",
    maxWidth: "480px",
  },
  italic: { fontStyle: "italic", color: ROSE_SOFT },
  lede: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: TEXT_DIM,
    maxWidth: "440px",
    marginBottom: "44px",
  },

  inputBlock: { maxWidth: "460px" },
  textarea: {
    width: "100%",
    minHeight: "170px",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${LINE}`,
    color: "#eceef3",
    fontSize: "15px",
    lineHeight: "1.7",
    padding: "0 0 16px",
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
  },
  inputFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: TEXT_DIM,
    fontSize: "13px",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    padding: 0,
  },
  primaryBtn: {
    background: "transparent",
    color: ROSE_SOFT,
    border: `1px solid ${ROSE}`,
    padding: "10px 24px",
    borderRadius: "2px",
    fontSize: "13px",
    letterSpacing: "0.4px",
    cursor: "pointer",
  },
  errorText: { color: "#d98b8b", fontSize: "13px", marginTop: "12px" },

  rightCol: { padding: "64px 56px", background: INK },

  emptyState: { display: "flex", flexDirection: "column", gap: "6px", paddingTop: "8px" },
  emptyNumber: { fontFamily: "'Fraunces', serif", fontSize: "13px", color: TEXT_FAINT, marginTop: "20px" },
  emptyText: { fontSize: "14px", color: TEXT_DIM, margin: "2px 0 0" },
  emptyFootnote: { fontSize: "13px", color: TEXT_FAINT, marginTop: "32px", fontStyle: "italic" },

  results: { display: "flex", flexDirection: "column", gap: "40px" },
  section: {},
  sectionHead: {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "18px",
    paddingBottom: "10px",
    borderBottom: `1px solid ${LINE}`,
  },
  sectionIndex: { fontFamily: "'Fraunces', serif", fontSize: "13px", color: TEXT_FAINT },
  sectionIndexAccent: { color: ROSE },
  sectionTitle: { fontSize: "13px", fontWeight: 500, letterSpacing: "0.3px", color: "#dfe2ea", margin: 0, flex: 1 },
  sectionCount: { fontSize: "12px", color: TEXT_FAINT },
  sectionBody: { display: "flex", flexDirection: "column", gap: "16px" },

  reqLine: { display: "flex", gap: "14px" },
  reqTag: { fontSize: "11px", color: TEXT_FAINT, fontFamily: "'Fraunces', serif", paddingTop: "2px", minWidth: "32px" },
  reqText: { fontSize: "14.5px", lineHeight: "1.55", color: "#eceef3", margin: 0 },
  reqSub: { fontSize: "12px", color: TEXT_FAINT, margin: "4px 0 0" },

  storyLine: {
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#d6d0cb",
    fontFamily: "'Fraunces', serif",
    fontStyle: "italic",
    margin: 0,
    paddingLeft: "14px",
    borderLeft: `1px solid ${LINE}`,
  },

  ambigLine: { borderLeft: `2px solid ${ROSE}`, paddingLeft: "14px" },
  ambigText: { fontSize: "14px", lineHeight: "1.55", color: "#f0e4e3", margin: 0 },
};