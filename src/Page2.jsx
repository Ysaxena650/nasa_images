import React from "react";
import { useLocation } from "react-router-dom";
import "./Page2.css";

function Page2() {
  const location = useLocation();
  console.log(location);
  
  const {image}  = location.state;

  return (
    <div className="container">
      <div className="mainimage">
        <img src={image.links[0].href} alt={image.data[0].title} />
      </div>
      <div className="infopart">
        <h1>{image.data[0].title}</h1>
        <p>{image.data[0].description}</p> <br />
        <p>
          <strong>Date Created:</strong> {image.data[0].date_created}
        </p>{" "}
        <br />
        <p>
          <strong>NASA ID:</strong> {image.data[0].nasa_id}
        </p>
      </div>
    </div>
  );
}

export default Page2;
