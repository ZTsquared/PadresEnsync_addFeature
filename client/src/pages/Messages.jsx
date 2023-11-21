import {useState, useEffect} from 'react';
import { Outlet, Navigate, useNavigate } from "react-router-dom";

function Messages({loggedIn}) {

    if (!loggedIn) {
        return <Navigate to="/" replace />;
      }

    //i should probably use context for this otherwise it seems like if i were to navigate to an individual
    //chat without going through this page the [partners] would be nothing and the partnerName would be ungettable in the sub component
    // either that or i can save the partnerName in state when i click on it and then pass it along in a prop to the subcomponent (which is what i will do for now)
    const [partners, setPartners] = useState([])
    const [partnerName, setPartnerName] = useState("")
    const [partnerID, setPartnerID] = useState("")

    const nav = useNavigate();

    // useEffect(() => {console.log(partners)}, [partners]);
    useEffect(() => {getPartners()}, []);
    useEffect(() => {nav(`/Messages/${partnerID}`)}, [partnerID])

    
    async function getPartners () {
        try {
            const resultObject = await fetch(`/api/users`);
            // console.log(resultObject)
            if (resultObject.ok) {
                const results = await resultObject.json();
                setPartners(results);
            } else {
                console.log(`Server error: ${resultObject.status} : ${resultObject.statusText}`);
            }
        } catch (err) {
            console.log("error fetching chat partners:")
            console.log(err)
        }
    }

    function handelClick (clickedPartner) {
        // console.log("pre-click partnerName")
        // console.log(partnerName)
        setPartnerName(clickedPartner.userName)
        setPartnerID(clickedPartner.id)
    }


    // need to make the active button obvious,  see toggle in https://getbootstrap.com/docs/5.3/components/buttons/#base-class
    return (
        <div className="text-start">
            <div className="row ms-0" >
                <div className="col-3 border border-2 rounded-3 p-2 mt-2">
                    {partners.map(
                        (partner, i) => 
                            (!(partner.userName === localStorage.getItem("userName")) && <div key = {i} >
                                <button 
                                    onClick = {() => handelClick(partner)} 
                                    className={ (partner.id===partnerID) ? "btn btn-outline-dark mt-2" : "btn btn-light active mt-2"} 
                                > 
                                    {partner.userName} 
                                </button>
                            </div>)
                    )}
                </div>
                <div className="col-9">
                    <Outlet context = {partnerName}/>
                </div>
            </div>
        </div>
    )
}

export default Messages