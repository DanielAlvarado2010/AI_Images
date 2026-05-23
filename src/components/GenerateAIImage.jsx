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

  const BACKEND_URL = "http://localhost:4000/api/generate";
  const AIimage = "";

  useEffect(() => {
    const generateImage = async () => {
      if (!country) return;
      setLoading(true);

      const prompt = `Caricature of a person with the flag of ${country} in the background`;

      try {
        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        console.log("Respuesta del backend:", response);

        const imageBlob = await response.blob();
        console.log(imageBlob, "imageBlob");

        const imageUrl = URL.createObjectURL(imageBlob);
        console.log(imageUrl, "imageUrl");
        setOutputImage(imageUrl);
      } catch (e) {
        console.error("Error generando la imagen IA", e);
      }
      setLoading(false);
    };

    generateImage();
  }, [country]);

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
                  <img
                    src={"data:image/jpeg;base64," + outputImage}
                    alt="Imagen IA generada"
                  />
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
