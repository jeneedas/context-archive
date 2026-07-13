export type CaptureStatus =
  | "pending"
  | "processing"
  | "ready"
  | "unassigned";

export type Capture = {
  id: string;
  file: File;
  previewUrl: string;
  fileName: string;
  fileSize: number;
  status: CaptureStatus;
};

export type ResearchContext = {
  id: string;
  title: string;
  description: string;
  captureCount: number;
  keywords: string[];
};