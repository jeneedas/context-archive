import {
  analyzeCaptures,
  uploadCapture,
} from "../services/archive";
import {
  ArrowLeft,
  ArrowRight,
  FileImage,
  Plus,
  X,
} from "lucide-react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { useCaptures } from "../hooks/useCaptures";

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    captures,
    addCaptures,
    removeCapture,
    clearCaptures,
  } = useCaptures();

  const acceptFiles = (files: File[]) => {
    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    addCaptures(imageFiles);
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);

    acceptFiles(files);

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);

    acceptFiles(files);
  };

  const handleStartProcessing = async () => {
  if (captures.length === 0 || isProcessing) {
    return;
  }

  setIsProcessing(true);
  setUploadedCount(0);
  setUploadError(null);

  try {
    const uploadedCaptureIds: string[] = [];

    for (const capture of captures) {
      const uploadedCapture = await uploadCapture(capture.file);

      uploadedCaptureIds.push(uploadedCapture.id);

      setUploadedCount((currentCount) => currentCount + 1);
    }

    await analyzeCaptures(uploadedCaptureIds);

    clearCaptures();
    navigate("/");
  } catch (error) {
    console.error("Capture processing failed:", error);

    setUploadError(
      error instanceof Error
        ? error.message
        : "The capture batch could not be processed."
    );
  } finally {
    setIsProcessing(false);
  }
};
  return (
    <main className="upload-page">
      <header className="archive-header">
        <button
          className="archive-brand"
          onClick={() => navigate("/")}
        >
          CA°
        </button>

        <div className="archive-header-meta">
          <span>CONTEXT ARCHIVE</span>
          <span>CAPTURE INTAKE</span>
        </div>

        <button
          className="archive-close-button"
          onClick={() => navigate("/")}
          aria-label="Return to archive"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </header>

      <section className="upload-intro">
        <button
          className="text-back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={15} strokeWidth={1.5} />
          Archive
        </button>

        <div className="upload-heading-row">
          <div>
            <span className="section-index">
              01 / CAPTURE INTAKE
            </span>

            <h1>
              Add your
              <br />
              research fragments.
            </h1>
          </div>

          <p className="upload-intro-copy">
            Add screenshots, diagrams and visual references.
            Context Archive will examine the batch and discover
            relationships between what you collected.
          </p>
        </div>
      </section>

      <section className="upload-workspace">
        <input
          ref={fileInputRef}
          className="capture-file-input"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          onChange={handleFileChange}
        />

        {captures.length === 0 ? (
          <div
            className={`capture-dropzone ${
              isDragging ? "capture-dropzone-active" : ""
            }`}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="dropzone-orbit">
              <span className="fragment fragment-one" />
              <span className="fragment fragment-two" />
              <span className="fragment fragment-three" />
              <span className="fragment fragment-four" />

              <button
                className="dropzone-add-button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus size={24} strokeWidth={1.3} />
              </button>
            </div>

            <div className="dropzone-copy">
              <h2>Drop your research here.</h2>

              <p>
                One capture or an entire research dump.
                <br />
                PNG, JPG and WEBP.
              </p>

              <button
                className="choose-captures-button"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose captures
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            </div>

            <span className="dropzone-coordinate dropzone-coordinate-left">
              00 / UNSTRUCTURED
            </span>

            <span className="dropzone-coordinate dropzone-coordinate-right">
              AWAITING CAPTURES
            </span>
          </div>
        ) : (
          <div className="capture-selection">
            <div className="capture-selection-header">
              <div>
                <span className="section-index">
                  BATCH / {String(captures.length).padStart(3, "0")}
                </span>

                <h2>
                  {captures.length}{" "}
                  {captures.length === 1
                    ? "fragment"
                    : "fragments"}{" "}
                  selected.
                </h2>
              </div>

              <div className="capture-selection-actions">
                <button
                  className="selection-text-button"
                  onClick={clearCaptures}
                >
                  Clear batch
                </button>

                <button
                  className="selection-add-button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus size={15} strokeWidth={1.5} />
                  Add more
                </button>
              </div>
            </div>

            <div className="capture-fragment-field">
              {captures.map((capture, index) => (
                <article
                  className="capture-fragment"
                  key={capture.id}
                >
                  <div className="capture-fragment-image">
                    <img
                      src={capture.previewUrl}
                      alt={capture.fileName}
                    />

                    <button
                      className="capture-remove-button"
                      onClick={() => removeCapture(capture.id)}
                      aria-label={`Remove ${capture.fileName}`}
                    >
                      <X size={14} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="capture-fragment-meta">
                    <span>
                      CA.PENDING.
                      {String(index + 1).padStart(3, "0")}
                    </span>

                    <span>{capture.fileName}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="capture-processing-action">
              <div>
                <FileImage size={18} strokeWidth={1.4} />

                <p>
                  <strong>{captures.length} captures ready.</strong>
                  <span>
                    Context discovery begins after processing.
                  </span>
                </p>
              </div>


              {uploadError && (
  <p className="capture-upload-error">
    {uploadError}
  </p>
)}
              <button
  className="process-captures-button"
  onClick={handleStartProcessing}
  disabled={isProcessing}
>
  {isProcessing
    ? `Archiving ${uploadedCount} / ${captures.length}`
    : "Process batch"}

  <ArrowRight size={16} strokeWidth={1.5} />
</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}