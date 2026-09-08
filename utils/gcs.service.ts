import { Storage } from "@google-cloud/storage";
import path from "path";
import fs from "fs";
import { Readable } from "stream";

let storageInstance: Storage | null = null;

function getStorageClient(): Storage {
  if (storageInstance) {
    return storageInstance;
  }

  if (process.env.GCP_SERVICE_ACCOUNT_BASE64) {
    try {
      const decoded = Buffer.from(
        process.env.GCP_SERVICE_ACCOUNT_BASE64,
        "base64"
      ).toString("utf-8");
      const credentials = JSON.parse(decoded);
      storageInstance = new Storage({ credentials });
      return storageInstance;
    } catch (err) {
      console.error("Failed to parse GCP_SERVICE_ACCOUNT_BASE64:", err);
    }
  }

  const keyPath = path.join(
    process.cwd(),
    "utils/gps-attendence-system-a290280df6ad.json"
  );
  if (fs.existsSync(keyPath)) {
    storageInstance = new Storage({ keyFilename: keyPath });
    return storageInstance;
  }

  storageInstance = new Storage();
  return storageInstance;
}

const getBucketName = () => process.env.GCS_BUCKET_NAME || "geopunch";

/**
 * Upload a local file to GCS bucket.
 * @param localFilePath - Local path to file on disk
 * @param destFileName - Path (and name) to save as in GCS (e.g., "folder/myfile.jpg")
 * @returns Public URL of uploaded file
 */
export const uploadFile = async (
  localFilePath: string,
  destFileName: string
): Promise<string> => {
  const bucket = getBucketName();
  await getStorageClient().bucket(bucket).upload(localFilePath, {
    destination: destFileName,
    resumable: false,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  return `https://storage.googleapis.com/${bucket}/${destFileName}`;
};

/**
 * Download a file from GCS to local storage.
 * @param srcFileName - File name in GCS
 * @param destLocalPath - Local path to save file
 * @returns Path to downloaded file
 */
export const downloadFile = async (
  srcFileName: string,
  destLocalPath: string
): Promise<string> => {
  const options = { destination: destLocalPath };
  await getStorageClient().bucket(getBucketName()).file(srcFileName).download(options);
  return destLocalPath;
};

/**
 * Delete a file from GCS bucket.
 * @param fileName - File path/name in GCS
 * @returns Confirmation message
 */
export const deleteFile = async (fileName: string): Promise<string> => {
  await getStorageClient().bucket(getBucketName()).file(fileName).delete();
  return `${fileName} deleted.`;
};

/**
 * Replace an existing file with a new local file in the same GCS location.
 * @param oldFileName - File in GCS to overwrite
 * @param newLocalPath - Local file to upload
 * @returns Public URL of the updated file
 */
export const updateFile = async (
  oldFileName: string,
  newLocalPath: string
): Promise<string> => {
  await deleteFile(oldFileName);
  return await uploadFile(newLocalPath, oldFileName);
};

/**
 * Upload a file buffer directly to GCS bucket using stream.
 * @param buffer - File buffer to upload
 * @param destFileName - Path (and name) to save as in GCS (e.g., "folder/myfile.jpg")
 * @param contentType - MIME type of the file
 * @returns Public URL of uploaded file
 */
export const uploadFileFromBuffer = async (
  buffer: Buffer,
  destFileName: string,
  contentType: string
): Promise<string> => {
  const bucket = getBucketName();
  const file = getStorageClient().bucket(bucket).file(destFileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType,
      cacheControl: "public, max-age=31536000",
    },
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    const readable = Readable.from(buffer);

    readable
      .pipe(stream)
      .on("error", reject)
      .on("finish", () => {
        resolve(`https://storage.googleapis.com/${bucket}/${destFileName}`);
      });
  });
};
