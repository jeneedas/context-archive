import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getCapturePublicUrl,
  getCaptures,
} from "../services/archive";

type ArchiveCapture = {
  id: string;
  file_name: string;
  storage_path: string;
  status: string;
  created_at: string;
  title: string | null;
  context_summary: string | null;
  concepts: string[] | null;
  extracted_text: string | null;
};

export default function Archive() {
  const navigate = useNavigate();

  const [captures, setCaptures] = useState<ArchiveCapture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [archiveError, setArchiveError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCaptures() {
      try {
        setArchiveError(null);

        const storedCaptures = await getCaptures();

        setCaptures(storedCaptures as ArchiveCapture[]);
      } catch (error) {
        console.error("Could not load archive:", error);

        setArchiveError("The archive could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCaptures();
  }, []);

  const captureCount = captures.length;

  return (
    <main className="archive-page">
      <header className="archive-header">
        <button
          className="archive-brand"
          onClick={() => navigate("/")}
        >
          <span>CA</span>
          <sup>°</sup>
        </button>

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

      {isLoading ? (
        <section className="archive-loading-state">
          <span>READING ARCHIVE</span>
        </section>
      ) : archiveError ? (
        <section className="archive-loading-state">
          <span>{archiveError}</span>
        </section>
      ) : captureCount === 0 ? (
        <section className="archive-empty-state">
          <span className="section-index">
            ARCHIVE / 000 CAPTURES
          </span>

          <div
            className="archive-fragment-field"
            aria-hidden="true"
          >
            <span className="archive-fragment archive-fragment-one" />
            <span className="archive-fragment archive-fragment-two" />
            <span className="archive-fragment archive-fragment-three" />
            <span className="archive-fragment archive-fragment-four" />
            <span className="archive-fragment archive-fragment-five" />
            <span className="archive-fragment archive-fragment-six" />

            <span className="archive-signal archive-signal-pink" />
          </div>

          <div className="archive-hero-copy">
            <h1>
              Your research,
              <br />
              with the context intact.
            </h1>

            <p>
              Context Archive discovers relationships between the visual
              fragments you collect.
            </p>

            <button
              className="archive-start-button"
              onClick={() => navigate("/upload")}
            >
              Add research captures
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          <div className="archive-bottom-meta">
            <span>FRAGMENTED INPUT</span>
            <span>CONTEXTUAL STRUCTURE</span>
          </div>
        </section>
      ) : (
        <section className="archive-collection">
          <div className="archive-collection-heading">
            <span className="section-index">
              ARCHIVE / {String(captureCount).padStart(3, "0")} CAPTURES
            </span>

            <h1>
              Collected
              <br />
              fragments.
            </h1>

            <p>
              Visual research stored in your archive. Context discovery has not
              been applied yet.
            </p>
          </div>

          <div className="archive-capture-grid">
            {captures.map((capture, index) => (
  <article
    className="archive-capture"
    key={capture.id}
  >
    <div className="archive-capture-image">
      <img
        src={getCapturePublicUrl(capture.storage_path)}
        alt={capture.title ?? capture.file_name}
      />

      <span
        className={`archive-capture-status archive-capture-status-${capture.status}`}
      >
        {capture.status}
      </span>
    </div>

    <div className="archive-capture-meta">
      <span>
        CA.{String(index + 1).padStart(3, "0")}
      </span>

      <span>
        {new Date(capture.created_at).toLocaleDateString()}
      </span>
    </div>

    <h2>
      {capture.title ?? "Unprocessed fragment"}
    </h2>

    <p className="archive-capture-summary">
      {capture.context_summary ??
        "Context analysis has not been completed for this capture."}
    </p>

    {capture.concepts && capture.concepts.length > 0 && (
      <div className="archive-capture-concepts">
        {capture.concepts.slice(0, 4).map((concept) => (
          <span key={concept}>{concept}</span>
        ))}
      </div>
    )}
  </article>
))}
          </div>
        </section>
      )}
    </main>
  );
}