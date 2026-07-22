type CaptureDetailProps = {
  capture: {
    title: string | null;
    context_summary: string | null;
    concepts: string[] | null;
    extracted_text: string | null;
  };
  onClose: () => void;
};

export default function CaptureDetail({
  capture,
  onClose,
}: CaptureDetailProps) {
 
    return (
  <div
  className="capture-detail-overlay"
  onClick={onClose}
>
    <section
  className="capture-detail"
  onClick={(e) => e.stopPropagation()}
>

        <button
  className="capture-detail-close"
  onClick={onClose}
>
  ✕
</button>
      <h2>{capture.title ?? "Untitled Capture"}</h2>

      <h3>Summary</h3>
      <p>{capture.context_summary}</p>

      <h3>Concepts</h3>

      <div className="capture-detail-concepts">
        {capture.concepts?.map((concept) => (
          <span key={concept}>{concept}</span>
        ))}
      </div>

      <h3>Extracted Text</h3>

      <p>{capture.extracted_text}</p>
    </section>
  </div>
);
}