import React, { useState, useEffect } from "react";
import opkoLogo from "../../assets/logo_opko pharma BCO.png";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation } from "react-router-dom";

const GenerateAIImage = () => {
  const location = useLocation();
  const image = location.state?.image;
  const country = location.state?.country;
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "";
  console.log(API_KEY);
  console.log("Imagen recibida:", image);
  console.log("País seleccionado:", country);

  const AIimage = "";

  useEffect(() => {
    const generateImage = async () => {
      if (!image || !country) return;
      setLoading(true);

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-image",
      });

      // Convierte la imagen a base64 si es un File/Blob
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            // Elimina cualquier prefijo "data:image/xxx;base64,"
            const base64 = reader.result.split(",")[1];
            resolve(base64);
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });

      // Uso en tu función:
      let imageBase64 = image;
      if (image instanceof File || image instanceof Blob) {
        imageBase64 = await toBase64(image);
      }
      if (
        typeof imageBase64 === "string" &&
        imageBase64.startsWith("data:image")
      ) {
        imageBase64 = imageBase64.split(",")[1];
      }

      const prompt = `Create a caricature of this person with the flag of ${country} in the background.`;

      try {
        const result = await model.generateContent([
          prompt,
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64,
            },
          },
        ]);
        const response = await result.response;
        const generated =
          response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        setOutputImage(`data:image/png;base64,${generated}`);
      } catch (e) {
        alert("Error generando la imagen IA");
      }
      setLoading(false);
    };

    generateImage();
  }, [image, country]);

  return (
    <div className="faded_background">
      <div className="main_container">
        {!AIimage ? (
          <div className="picture_image_container">
            <div className="picture_container_variant">
              <div className="main_title_variant_loading">
                ESPERA UN MOMENTO
              </div>
              <div className="loadingAI_container" />
            </div>
            <img src={opkoLogo} alt="OPKO Logo" className="logo_below_image" />
          </div>
        ) : (
          <div className="caricature_container">
            {
              <div>
                {loading && <div>Generando imagen IA...</div>}
                {outputImage && (
                  <img src={outputImage} alt="Imagen IA generada" />
                )}
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateAIImage;
