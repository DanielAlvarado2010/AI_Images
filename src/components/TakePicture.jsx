import React, { useRef, useState, useEffect } from "react";
import opKoimage from "../../assets/opko main image.jpg";
import opkoLogo from "../../assets/logo_opko pharma BCO.png";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const TakePicture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [count, setCount] = useState(8);
  const [continueCount, setContinueCount] = useState(8);

  const navigate = useNavigate();

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
  };

  useEffect(() => {
    let timer;
    if (!image && count > 0) {
      timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    } else if (!image && count === 0) {
      capture();
    }
    return () => clearInterval(timer);
  }, [count, image]);

  useEffect(() => {
    if (image) setCount(8);
  }, [image]);

  useEffect(() => {
    let continueTimer;
    if (image && continueCount > 0) {
      continueTimer = setInterval(() => {
        setContinueCount((prev) => prev - 1);
      }, 1000);
    } else if (image && continueCount === 0) {
      navigate("/select-country");
    }
    return () => clearInterval(continueTimer);
  }, [image, continueCount, navigate]);

  useEffect(() => {
    if (image) setContinueCount(8);
  }, [image]);

  return (
    <div className="faded_background">
      <div className="main_container">
        <div className="picture_image_container">
          <div className="main_title_variant">
            {!image
              ? `PREPÁRATE...${count}`
              : `CONTINUANDO EN ${continueCount}...`}
          </div>
          <div className="picture_container">
            <div className="opkoimage">
              {!image ? (
                <>
                  <Webcam
                    width="100%"
                    height="100%"
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                  />
                </>
              ) : (
                <>
                  <div className="taken_picture_container">
                    <img src={image} alt="captura" />
                  </div>
                  <div className="buttons_container">
                    <Button
                      variant="contained"
                      sx={{ fontWeight: "bold" }}
                      onClick={() => setImage(null)}
                    >
                      VOLVER A TOMAR
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ fontWeight: "bold" }}
                      style={{ padding: "1.2rem" }}
                      onClick={() =>
                        navigate("/select-country", { state: { image } })
                      }
                    >
                      CONTINUAR
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <img
        src={opkoLogo}
        alt="OPKO Logo"
        className="logo_corner"
        height="auto"
      />
    </div>
  );
};

export default TakePicture;
