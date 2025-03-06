"use client";

import {Card, CardFooter, Image, Button, Skeleton} from "@heroui/react";
import { useEffect, useState } from "react";
import LikeDropdown from "./dropdown";

interface PredictCardProps {
    file: File | null;
    prediction?: string | null;
    loading?: boolean;
  }

  const PredictCard: React.FC<PredictCardProps> = ({
    file,
    prediction,
    loading,
  }) => {
    const imageUrl = file
      ? URL.createObjectURL(file)
      : "https://www.e7health.com/files/blogs/chest-x-ray-29.jpg";
  
    const [textPrediction, setTextPrediction] = useState<string | null>(null);
  
    useEffect(() => {
      const numericPrediction = parseFloat(prediction ?? "NaN");
  
      if (!isNaN(numericPrediction)) {
        const threshold = parseFloat(process.env.NEXT_PUBLIC_THRESHOLD ?? "0");
  
        if (numericPrediction > threshold) {
          setTextPrediction("Phổi bình thường");
        } else {
          setTextPrediction("Viêm phổi");
        }
      } else {
        setTextPrediction("Dữ liệu không hợp lệ");
      }
    }, [prediction]);

    return (
        <Card isFooterBlurred className="border-none" radius="lg">
      {loading ? (
        <Skeleton className="rounded-lg" isLoaded={loading}>
          <Image
            alt="Woman listing to music"
            className="object-cover blur-3xl"
            src={imageUrl}
            style={{ width: "500px", height: "500px" }}
          />
        </Skeleton>
      ) : (
        <Image
          alt="Woman listing to music"
          className="object-cover"
          src={imageUrl}
          style={{ width: "500px", height: "500px" }}
        />
      )}
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-2xl ml-1 z-10 backdrop-blur-lg">
        <p className="text-lg text-cyan-800 font-bold">
          {prediction ? textPrediction : "Loading..."}
        </p>
        {/* <Button
                    className="text-tiny text-white bg-black/20"
                    color="default"
                    radius="lg"
                    size="sm"
                    variant="flat"
                >
                    Notify me
                </Button> */}
        <LikeDropdown />
      </CardFooter>
    </Card>
    );
};
export default PredictCard;
