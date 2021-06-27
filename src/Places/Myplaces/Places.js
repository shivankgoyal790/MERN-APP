import React from "react"
import Placeslist from "../Myplaces/Placeslist"
import Logo1 from "../../Shared/images/Sydney_Opera_House_Front_angle (1).jpg"

const Places = () =>{
    const Places = [ 
        {
            id: 'p1',
            building: 'opera house',
            statename: 'Sydney',
            imgUrl:Logo1,
            address: '20 W 34th St,sydney, australia 10001',
            creator: 'u1'

        }]

    return(
       <Placeslist items = {Places} />
    );
}

export default Places