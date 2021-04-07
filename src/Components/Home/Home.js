import React, { useEffect, useState } from 'react';
import vehicleData from '../../image.json'
import Card from '../Card/Card';
import Header from '../Header/Header';
import './Home.css'

const Home = () => {
    const [vehicle, setVehicle] = useState([]);
    const [selectVehicle,setSelectVehicle]=useState([])

    useEffect(()=>{
        setVehicle(vehicleData);
        
    

    }, []);
    const selectVehicleHandler = (vehicle) => {
        const selectedVehicle={...selectVehicle,vehicle}
        setSelectVehicle(selectedVehicle);
        
    }

    return (
        <div className="home-component">
            <Header></Header>
        <div className='home'>
            
                {vehicle.map(vehicle => <Card
                    
                    vehicle={vehicle}></Card>)}
        
        </div>
       </div>
    );
};

export default Home;