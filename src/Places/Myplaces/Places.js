import React from "react"
import { useState } from "react"
import {useParams} from "react-router-dom"
import Placeslist from "../Myplaces/Placeslist"
import Logo1 from "../../Shared/images/Sydney_Opera_House_Front_angle (1).jpg"
import Logo2 from "../../Shared/images/taj.jpg";

const Places = async () =>{
    // const DummyPlaces = [ 
    //     {
    //         id: 'p1',
    //         building: 'opera house',
    //         statename: 'Sydney',
    //         imgUrl:Logo1,
    //         address: '20 W 34th St,sydney, australia 10001',
    //         creator: 'u1'

    //     },
    //     {
    //         id: 'p2',
    //         building: 'TAJ MAHAL',
    //         statename: 'INDIA',
    //         imgUrl:Logo2,
    //         address: 'TAJ NAGRI, AGRA 282001',
    //         creator: 'u2'

    //     }
    // ];
    const userid = useParams().userid;
    const [loadedplaces ,setloadedplaces] = useState();
    // const loadedplaces = DummyPlaces.filter(curr => curr.creator === userid);
    try{
    const response = await fetch(`http://localhost:5000/api/places/users/${userid}`);
    const responsedata= response.json();
    if(!response.ok){
        throw new Error("cannot load places");
    }   
    setloadedplaces(responsedata.answer);
    }catch(err){
        console.log("cannot laod places")
    }
    return(
     
       <Placeslist items = {loadedplaces} />
    );
}

export default Places;