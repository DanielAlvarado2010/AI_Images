import React from "react";
import opKoimage from "../../assets/opko main image.jpg";
import { useNavigate } from "react-router-dom";
import mexico from "../../assets/mexico.jpg";
import argentina from "../../assets/argentina.jpg";
import espana from "../../assets/espana.jpg";
import brasil from "../../assets/brasil.jpg";
import francia from "../../assets/francia.jpg";
import opkoLogo from "../../assets/logo_opko pharma BCO.png";
import eua from "../../assets/eua.jpg";
import portugal from "../../assets/portugal.jpg";
import { useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const flags = [
    { name: "México", image: mexico },
    { name: "Argentina", image: argentina },
    { name: "Francia", image: francia },
    { name: "Brasil", image: brasil },
    { name: "Portugal", image: portugal },
    { name: "España", image: espana },
    { name: "EUA", image: eua },
  ];

  const image = location.state?.image;

  return (
    <div className="faded_background">
      <div className="main_container">
        <div className="picture_image_container">
          <div className="picture_container">
            <div className="select_countries_container">
              <div className="main_title_variant">SELECCIONA A TU EQUIPO</div>
              <div className="flags_grid">
                {flags.map((flag, idx) => {
                  const isLast =
                    idx === flags.length - 1 && flags.length % 3 !== 0;
                  return (
                    <div
                      className={`flag_item${isLast ? " center_last" : ""}`}
                      key={flag.name}
                      onClick={() =>
                        navigate("/generateAIimage", {
                          state: { image, country: flag.name },
                        })
                      }
                    >
                      <img
                        src={flag.image}
                        alt={flag.name}
                        width={64}
                        height={48}
                      />
                    </div>
                  );
                })}
              </div>
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

export default Home;
