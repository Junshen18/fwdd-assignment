"use client";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

interface QrScannerProps {
  onScan: (data: string | null) => void;
}

export default function QrScanner({ onScan }: QrScannerProps) {
  const [data, setData] = useState<string>("No result");

  return (
    <>
      <div className="flex flex-col gap-6">
        <QrReader
          className="border-4 border-dashed p-3"
          scanDelay={600}
          constraints={{ aspectRatio: 1, facingMode: { ideal: "environment" } }}
          onResult={(result: any, error: any) => {
            if (result) {
              setData(result?.text);
              onScan(result?.text);
            }
            if (error) {
              console.error(error);
              onScan(null);
            }
          }}
        />
      </div>
    </>
  );
}
