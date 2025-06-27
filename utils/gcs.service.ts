import { Storage } from "@google-cloud/storage";
import path from "path";

const keyPath = path.join(
  process.cwd(),
  "utils/gps-attendence-system-a290280df6ad.json"
);

const storage = new Storage({ keyFilename: keyPath });

const bucketName = "geopunch";

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
  await storage.bucket(bucketName).upload(localFilePath, {
    destination: destFileName,
    resumable: false,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  return `https://storage.googleapis.com/${bucketName}/${destFileName}`;
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
  await storage.bucket(bucketName).file(srcFileName).download(options);
  return destLocalPath;
};

/**
 * Delete a file from GCS bucket.
 * @param fileName - File path/name in GCS
 * @returns Confirmation message
 */
export const deleteFile = async (fileName: string): Promise<string> => {
  await storage.bucket(bucketName).file(fileName).delete();
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
