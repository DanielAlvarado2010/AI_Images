import React from "react";
import opKoimage from "../../assets/opko main image.jpg";
import opkoLogo from "../../assets/logo_opko pharma BCO.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="faded_background" onClick={() => navigate("/take-picture")}>
      <div className="main_container">
        <div className="main_title">TOCA LA PANTALLA PARA INICIAR</div>
        <div className="main_image_container">
          <img
            className="main_image"
            height="100%"
            src={opKoimage}
            alt="Imagen de fondo"
          />
        </div>
        <div className="main_logo_container">
          <img
            className="main_image"
            height="100%"
            src={opkoLogo}
            alt="Imagen de fondo"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
