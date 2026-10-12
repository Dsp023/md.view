export type ViewMode = "preview" | "split" | "raw";

export interface DocumentStats {
  wordCount: number;
  charCount: number;
  readTimeMinutes: number;
  formattedSize: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export type SampleKey = "readme" | "technical";
