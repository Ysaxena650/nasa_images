import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Page2 from './Page2';
import './App.css';

function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const url = "https://images-api.nasa.gov/search?media_type=image";

  const getdata = async () => {
    setLoading(true);
    try {
      let data = await fetch(url);
      let json = await data.json();
      let dataarray = json.collection.items;
      setImages(dataarray);
    } catch (error) {
      document.querySelector(".imagepart").innerHTML = "SERVER IS BUSY";
      console.error("Error fetching data: ", error);
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
    
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleImageClick = (item) => {
    navigate(`/page2`, { state: { image: item } });
  };

  return (
    <div className="container">
      <header>NASA</header>
      <div className="box">
        <div className="innerbox">
          <div className="searchpart">
            <div className="search">
              <input type="text" value={searchTerm} onChange={handleSearch} />
              <button className='srch' onClick={getdata}>Search</button>
            </div>
          </div>
          <div className="imagepart">
            {loading ? (
              <div>Loading...</div>
            ) : (
              images.map((item, index) => (
                <div 
                  onMouseEnter={() => handleMouseEnter(index)} 
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleImageClick(item)}
                  key={index} 
                  className={`image image${index}`} 
                  style={{ backgroundImage: `url(${item.links[0].href})`, backgroundSize: "cover" , color:"white"}}>
                  {hoveredIndex === index && (
                    <div className="image-title">
                      {item.data[0].title}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="opacitybox"></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </Router>
  );
}

export default App;
