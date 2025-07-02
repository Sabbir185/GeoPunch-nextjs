import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/utils/gcs.service";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";

// Helper function to generate datetime-based filename
function generateDateTimeFileName(originalName: string): string {
  const timestamp = Date.now();
  const fileExtension = originalName.split(".").pop();
  const baseName = originalName.replace(/\.[^/.]+$/, ""); // Remove extension
  return `${baseName}${timestamp}.${fileExtension}`;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file
    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty" }, { status: 400 });
    }

    // Optional: Add file size and type validation
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "image/jpg",
    ];

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed. Allowed types: JPEG, PNG, GIF, PDF" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create temporary file path with datetime
    const tempDir = join(process.cwd(), "tmp");
    const tempFileName = generateDateTimeFileName(file.name);
    const tempFilePath = join(tempDir, tempFileName);

    // Ensure tmp directory exists
    try {
      await writeFile(tempFilePath, buffer);
    } catch (error) {
      // If tmp directory doesn't exist, create it
      const { mkdir } = await import("fs/promises");
      await mkdir(tempDir, { recursive: true });
      await writeFile(tempFilePath, buffer);
    }

    try {
      // Upload to GCS with datetime-based filename
      const gcsFileName = `uploads/${generateDateTimeFileName(file.name)}`;
      const publicUrl = await uploadFile(tempFilePath, gcsFileName);

      // Clean up temporary file
      await unlink(tempFilePath);

      return NextResponse.json({
        message: "File uploaded successfully",
        url: publicUrl,
        originalFileName: file.name,
        uploadedFileName: gcsFileName,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      });
    } catch (uploadError) {
      // Clean up temporary file even if upload fails
      try {
        await unlink(tempFilePath);
      } catch (cleanupError) {
        console.error("Failed to cleanup temp file:", cleanupError);
      }
      throw uploadError;
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
        details: error instanceof Error ? error : "Unknown error",
      },
      { status: 500 }
    );
  }
}
