"use client";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QrScanner() {
  const [data, setData] = useState<string>("No result");

  return (
    <>
      <div className="flex flex-col gap-6">
        <QrReader
          scanDelay={600}
          constraints={{ aspectRatio: 1, facingMode: { ideal: "environment" } }}
          onResult={(result: any, error: any) => {
            if (result) {
              setData(result?.text);
            }
            if (error) {
              console.error(error);
            }
          }}
        />
        <p className="text-center">Result: {data}</p>
      </div>
    </>
  );
}
