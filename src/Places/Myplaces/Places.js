import React from "react"
import {useParams} from "react-router-dom"
import Placeslist from "../Myplaces/Placeslist"
import Logo1 from "../../Shared/images/Sydney_Opera_House_Front_angle (1).jpg"
import Logo2 from "../../Shared/images/taj.jpg";

const Places = () =>{
    const DummyPlaces = [ 
        {
            id: 'p1',
            building: 'opera house',
            statename: 'Sydney',
            imgUrl:Logo1,
            address: '20 W 34th St,sydney, australia 10001',
            creator: 'u1'

        },
        {
            id: 'p2',
            building: 'TAJ MAHAL',
            statename: 'INDIA',
            imgUrl:Logo2,
            address: 'TAJ NAGRI, AGRA 282001',
            creator: 'u2'

        }
    ];
    const userid = useParams().userid;
    const loadedplaces = DummyPlaces.filter(curr => curr.creator === userid);
    return(
     
       <Placeslist items = {loadedplaces} />
    );
}

export default Places;