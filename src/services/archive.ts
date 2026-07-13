import { supabase } from "../lib/supabase";

export async function uploadCapture(file: File) {
  const extension = file.name.split(".").pop() ?? "png";

  const storagePath = `${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("captures")
    .upload(storagePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data, error: databaseError } = await supabase
    .from("captures")
    .insert({
      file_name: file.name,
      storage_path: storagePath,
      mime_type: file.type,
      file_size: file.size,
      status: "uploaded",
    })
    .select()
    .single();

  if (databaseError) {
    throw databaseError;
  }

  return data;
}

export async function getCaptures() {
  const { data, error } = await supabase
    .from("captures")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export function getCapturePublicUrl(storagePath: string) {
  const { data } = supabase.storage
    .from("captures")
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

export async function analyzeCaptures(captureIds: string[]) {
  const { data, error } = await supabase.functions.invoke(
    "analyze-captures",
    {
      body: {
        captureIds,
      },
    }
  );

  if (error) {
    throw error;
  }

  return data;
}