import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Archive() {
  const navigate = useNavigate();

  return (
    <main className="archive-page">
      <header className="archive-header">
        <button className="archive-brand">CA°</button>

        <div className="archive-header-meta">
          <span>CONTEXT ARCHIVE</span>
          <span>VISUAL RESEARCH MEMORY</span>
        </div>

        <button
          className="archive-add-button"
          onClick={() => navigate("/upload")}
        >
          Add captures
          <ArrowRight size={15} strokeWidth={1.5} />
        </button>
      </header>

      <section className="archive-empty-state">
        <span className="section-index">
          ARCHIVE / 000 CAPTURES
        </span>

        <h1>
          Your research,
          <br />
          with the context intact.
        </h1>

        <p>
          Context Archive discovers relationships between the
          visual fragments you collect.
        </p>

        <button
          className="archive-start-button"
          onClick={() => navigate("/upload")}
        >
          Add research captures
          <ArrowRight size={16} strokeWidth={1.5} />
        </button>
      </section>
    </main>
  );
}