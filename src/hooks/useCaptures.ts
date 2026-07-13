import { useState } from "react";
import type { Capture } from "../types";

export function useCaptures() {
  const [captures, setCaptures] = useState<Capture[]>([]);

  const addCaptures = (files: File[]) => {
    const newCaptures: Capture[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: file.size,
      status: "pending",
    }));

    setCaptures((currentCaptures) => [
      ...currentCaptures,
      ...newCaptures,
    ]);
  };

  const removeCapture = (id: string) => {
    setCaptures((currentCaptures) => {
      const capture = currentCaptures.find(
        (item) => item.id === id
      );

      if (capture) {
        URL.revokeObjectURL(capture.previewUrl);
      }

      return currentCaptures.filter(
        (item) => item.id !== id
      );
    });
  };

  const clearCaptures = () => {
    captures.forEach((capture) => {
      URL.revokeObjectURL(capture.previewUrl);
    });

    setCaptures([]);
  };

  return {
    captures,
    addCaptures,
    removeCapture,
    clearCaptures,
  };
}