'use client'
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import PredictCard from "@/components/card"
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { FcAddImage } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import usePredictService from "@/service/predictservice";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { prediction, loading, handleFileChange, handleUpload } =
    usePredictService(file, setFile);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFileChange(event);
  };

  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>AI-powered&nbsp;</span>
        <span className={title({ color: "violet" })}>Pneumonia&nbsp;</span>
        <br />
        <span className={title()} style={{fontSize: 45}}>
          Detection from Chest X-ray.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Accurate, fast, and reliable deep learning-based diagnosis.
        </div>
      </div>
      <div>
        <PredictCard/>
      </div>

      <div className="flex gap-3">
        <Button
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          radius="full"
          size="lg"
          startContent= {<FcAddImage size={25}/>}
          onPress={handleButtonClick}
        >
          Upload your X-ray image
        </Button>
      </div>
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileInputChange}
      />
    </section>
  );
}
