const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export interface CropInput {
  temperature: number;
  rainfall: number;
  humidity: number;
  soilType: string;
  ph: number;
}

export interface CropPrediction {
  crop: string;
  confidence: number;
  description?: string;
  tips?: string[];
}

export const soilTypes = [
  "Loamy",
  "Black",
  "Sandy",
  "Clay",
];

export const supportedCrops = [
  "Wheat",
  "Rice",
  "Corn",
  "Soybean",
  "Cotton",
  "Sugarcane",
  "Potato",
  "Tomato",
  "Maize",
  "Barley",
  "Chili",
  "Banana",
];

export function getSoilTypes() {
  return soilTypes;
}

export function getSupportedCrops() {
  return supportedCrops;
}

export async function predictCrop(
  input: CropInput
): Promise<CropPrediction> {
  try {
    const res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temperature: input.temperature,
        rainfall: input.rainfall,
        humidity: input.humidity,
        soil: input.soilType,
        ph: input.ph,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Prediction failed: ${res.status} ${errorBody}`);
    }

    const data = await res.json();

    return {
      crop: data.crop,
      confidence: data.confidence ?? 0,
      description: data.description ?? "",
      tips: Array.isArray(data.tips) ? data.tips : [],
    };
  } catch (err) {
    console.error("Prediction Error:", err);
    throw err;
  }
}