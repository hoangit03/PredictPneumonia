import { useState } from "react";
import loadImage from "blueimp-load-image";

import { postformDataAxios } from "@/utils/axios";

interface PredictResponse {
  message: string;
  data: {
    predict: Record<string, number>;
  };
}

const usePredictService = (
  file: File | null,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
) => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return alert("Vui lòng chọn một ảnh!");

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return alert("Vui lòng chọn một tệp hình ảnh!");
    }

    // Resize image to 150x150
    const image = await loadImage(file, {
      maxWidth: 150,
      maxHeight: 150,
      canvas: true,
    });

    if (!(image.image instanceof HTMLCanvasElement)) {
      return alert("Không thể tải hình ảnh!");
    }

    const canvas = image.image as HTMLCanvasElement;

    // Convert canvas to Blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), file.type);
    });

    if (!blob) {
      return alert("Không thể chuyển đổi hình ảnh!");
    }

    // Create a new File object from the Blob
    const resizedFile = new File([blob], file.name, { type: file.type });

    const formData = new FormData();

    formData.append("image", resizedFile);

    setLoading(true);

    const upload = async () => {
      try {
        const response = await postformDataAxios<PredictResponse>(
          `bot/predict`,
          formData,
        );
        const predictionValue = response.data?.data?.predict?.[0] ?? "N/A";

        setPrediction(predictionValue.toString());
      } catch {
        setPrediction("Dự đoán thất bại");
      } finally {
        setLoading(false);
      }
    };

    await upload();
  };

  return {
    loading,
    prediction,
    handleFileChange,
    handleUpload,
  };
};

export default usePredictService;
