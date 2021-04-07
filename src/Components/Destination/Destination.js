import React, { useEffect, useState } from "react";
import "./Destination.css";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";




const Destination = (props) => {
  const [selected, setSelected] = useState({});
  const [pickFrom, setPickFrom] = useState("");
    const [destination, setDestination] = useState("");
    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    
    

    

    
    // const select = selVehicle.find(vehicle =>selVehicle.id === id);
    // console.log(select);
    
   
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };
  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 41.3954,
        lng: 2.162,
      },
    },
    {
      name: "Location 2",
      location: {
        lat: 41.3917,
        lng: 2.1649,
      },
    },
    {
      name: "Location 3",
      location: {
        lat: 41.3773,
        lng: 2.1585,
      },
    },
    {
      name: "Location 4",
      location: {
        lat: 41.3797,
        lng: 2.1682,
      },
    },
    {
      name: "Location 5",
      location: {
        lat: 41.4055,
        lng: 2.1915,
      },
    },
  ];

  const onSelect = (item) => {
    setSelected(item);
  };
  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };
  let pickingPlace, destinationPlace;

  const handleBlur = (e) => {
    if (e.target.name === "from") {
        pickingPlace = e.target.value;
        setPickFrom(pickingPlace)
        
        
    }
      if (e.target.name === "to") {
          destinationPlace = e.target.value;
          setDestination(destinationPlace);
          
      }
        
  };
      const handleSubmit = (e) => {
          const pick = { ...pickFrom };
          setPickFrom(pick);
          const desPlace = { ...destination };
          setDestination(desPlace);
        
    
    
      console.log(pickFrom);
          
    e.preventDefault();
  };

  return (
    <div className="destination">
      <div className="search-field">
        {pickFrom && destination ? (
          <div className="places">
            <h3 className="text-style">picking place: {pickFrom}</h3>
            <h3 className="text-style">Destination:{destination}</h3>
          </div>
        ) : (
          <form action="">
            <label htmlFor="pickFrom">Pick from</label>
            <br />
            <input onBlur={handleBlur} name="from" type="text" />
            <br />
            <label  htmlFor="pickTo">Pick to</label>
            <br />
            <input onBlur={handleBlur} name="to" type="text" />
            <br />
            <input onClick={handleSubmit} type="submit" value="search" />
          </form>
              )}
               <div>
            <h3 className="text-style"> Time : {date.toLocaleTimeString()}</h3>
            <h3 className="text-style"> Date : {date.toLocaleDateString()}</h3>

        </div>
             
      </div>
      <div className="map-field">
        <LoadScript googleMapsApiKey="AIzaSyDaUgh8DiOIA5JuLf0YApiIA1-AKCWyYno ">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            {locations.map((item) => {
              return (
                <Marker
                  key={item.name}
                  position={item.location}
                  onClick={() => onSelect(item)}
                />
              );
            })}
            {selected.location && (
              <InfoWindow
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
              >
                <p>{selected.name}</p>
              </InfoWindow>
            )}
            {currentPosition.lat && <Marker position={currentPosition} />}
            {currentPosition.lat ? (
              <Marker
                position={currentPosition}
                onDragEnd={(e) => onMarkerDragEnd(e)}
                draggable={true}
              />
            ) : null}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Destination;
