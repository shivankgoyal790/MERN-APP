import React from "react"
import { useState } from "react"
import {useEffect} from "react"
import {useParams} from "react-router-dom"
import Placeslist from "../Myplaces/Placeslist"
import Loadingscreen from "../../Shared/Components/Loadingscreen"
// import Logo1 from "../../Shared/images/Sydney_Opera_House_Front_angle (1).jpg"
// import Logo2 from "../../Shared/images/taj.jpg";

const Places = () =>{
    const userid = useParams().userid;
    const [loadedplaces ,setloadedplaces] = useState();
    const [isLoading,setisLoading] = useState(false);
    useEffect( () =>{ 
        const fetchplaces = async () =>{
            try{
                setisLoading(true);
                const response = await fetch(`http://localhost:5000/api/places/users/${userid}`);
                const responsedata= await response.json();  
                   
                if(!response.ok){
                    throw new Error("cannot load places");
                  
                }   
                setloadedplaces(responsedata.places);
                setisLoading(false);
                }catch(err){
                    setisLoading(false);
                    console.log(err);
                    console.log("cannot laod places")
                }
            };
            fetchplaces();
        },[userid]);
        
    const deleteplacehandler = (deleteplaceid) =>{
        setisLoading(true);
        setloadedplaces(prevplaces => prevplaces.filter(place => place.id !== deleteplaceid  ));
        setisLoading(false);
    };
    // const loadedplaces = DummyPlaces.filter(curr => curr.creator === userid);
    
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
    return(
        <>
        {isLoading && ( <div style={{width:"100px" ,margin: "auto auto"}}><Loadingscreen /></div>)}
       {loadedplaces && <Placeslist items = {loadedplaces} ondeleteplace = {deleteplacehandler}/>}
       </>
    );
}

export default Places;