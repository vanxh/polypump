"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { pinata } from "@/server/pinata";

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image");
      return;
    }

    setUploading(true);
    try {
      const keyRequest = await fetch("/api/pinata");
      const keyData = (await keyRequest.json()) as { JWT: string };
      const upload = await pinata.upload.file(file).key(keyData.JWT);
      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);
      console.log("Uploaded to IPFS:", ipfsUrl);
      setUploading(false);
      // TODO: Handle successful upload (e.g., save ipfsUrl to form state)
    } catch (e) {
      console.error(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  return (
    <main className="flex h-screen w-full flex-col gap-y-6 overflow-y-auto px-4 py-6">
      <h1 className="mr-auto text-2xl font-bold">Create Coin</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="coin-image">Image</label>
          <div
            {...getRootProps()}
            className={`mt-2 h-48 w-48 overflow-hidden rounded-lg ${
              previewUrl
                ? ""
                : "flex cursor-pointer items-center justify-center border-2 border-dashed border-gray-300"
            } ${isDragActive ? "bg-gray-100" : ""}`}
          >
            <input {...getInputProps()} />
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-cover"
                objectFit="cover"
                width={192}
                height={192}
              />
            ) : (
              <p className="text-center text-gray-500">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag 'n' drop an image here, or click to select"}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="coin-name">Coin Name</label>
          <Input
            variant="primary"
            placeholder="Coin Name"
            className="w-full lg:w-1/2"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="coin-ticker">Coin Ticker</label>
          <Input
            variant="primary"
            placeholder="$Coin Ticker"
            className="w-full lg:w-1/2"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="coin-description">Coin Description</label>
          <TextArea
            variant="primary"
            placeholder="Coin Description"
            className="h-[200px] w-full resize-none lg:w-3/4"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="website-link">Website Link</label>
          <Input
            variant="primary"
            placeholder="https://example.com"
            className="w-full lg:w-1/2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-3/4">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="twitter-link">Twitter Link</label>
            <Input
              variant="primary"
              placeholder="https://twitter.com/username"
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="telegram-link">Telegram Link</label>
            <Input
              variant="primary"
              placeholder="https://t.me/username"
              className="w-full"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={uploading}
          className="mt-2 w-max"
        >
          {uploading ? "Creating Coin..." : "Create Coin"}
        </Button>
      </form>
    </main>
  );
}