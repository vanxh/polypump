"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useWalletClient } from "wagmi";
import { toast } from "sonner";
import { verifyMessage } from "viem";

import { pinata } from "@/server/pinata";
import { api } from "@/trpc/react";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  websiteUrl: z.string(),
  telegramUrl: z.string(),
  twitterUrl: z.string(),
});

export default function Page() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      imageUrl: "",
      websiteUrl: "",
      telegramUrl: "",
      twitterUrl: "",
    },
  });

  const { data: walletClient } = useWalletClient();

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

  const { mutateAsync: createCoin, isPending } = api.coin.create.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    if (!walletClient?.account) {
      toast.error("Please connect your wallet");
      return;
    }

    const message = `I am creating a coin with the name ${form.getValues().name}`;

    const signature = await walletClient?.signMessage({
      account: walletClient?.account,
      message,
    });

    if (!signature) {
      toast.error("Please sign the message to confirm creation of coin");
      return;
    }

    const verify = await verifyMessage({
      address: walletClient.account.address,
      message,
      signature,
    });

    if (!verify) {
      toast.error("Invalid signature");
      return;
    }

    setUploading(true);
    try {
      const keyRequest = await fetch("/api/pinata");
      const keyData = (await keyRequest.json()) as { JWT: string };
      const upload = await pinata.upload.file(file).key(keyData.JWT);
      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);
      setUploading(false);

      await createCoin({
        ...form.getValues(),
        imageUrl: ipfsUrl,
      });
      toast.success("Coin created successfully");

      form.reset();
      setPreviewUrl(null);
      setFile(null);

      void router.push("/");
    } catch (e) {
      console.error(e);
      setUploading(false);
      toast.error("Error creating coin");
    }
  };

  return (
    <main className="flex h-screen w-full flex-col gap-y-6 overflow-y-auto px-4 py-6">
      <h1 className="mr-auto text-2xl font-bold">Create Coin</h1>

      <Form {...form}>
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <label htmlFor="coin-name">Coin Name</label>
                <Input
                  {...field}
                  variant="primary"
                  placeholder="Coin Name"
                  className="w-full lg:w-1/2"
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <label htmlFor="coin-ticker">Coin Ticker</label>
                <Input
                  {...field}
                  variant="primary"
                  placeholder="$Coin Ticker"
                  className="w-full lg:w-1/2"
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <label htmlFor="coin-description">Coin Description</label>
                <TextArea
                  {...field}
                  variant="primary"
                  placeholder="Coin Description"
                  className="h-[200px] w-full resize-none lg:w-3/4"
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <label htmlFor="website-link">Website Link</label>
                <Input
                  {...field}
                  variant="primary"
                  placeholder="https://example.com"
                  className="w-full lg:w-1/2"
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <label htmlFor="twitter-link">Twitter Link</label>
                <Input
                  {...field}
                  variant="primary"
                  placeholder="https://twitter.com/username"
                  className="w-full"
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="telegramUrl"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <label htmlFor="telegram-link">Telegram Link</label>
                <Input
                  {...field}
                  variant="primary"
                  placeholder="https://t.me/username"
                  className="w-full"
                />
              </div>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={uploading || isPending}
            className="mt-2 w-max"
          >
            {uploading ? "Creating Coin..." : "Create Coin"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
