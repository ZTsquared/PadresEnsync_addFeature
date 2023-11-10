import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function EachGastos() {

    const [gastosData, setGastosData] = useState([]);
    const [error, setError] = useState("");
    const { id } = useParams();
   
    useEffect(() => {
        getEachGastosData();
      }, [id]);
 
    const getEachGastosData = async (id) => {
        try {
          const response = await fetch(`/api/gastos/${id}`, {
            method: "GET",
          });
      
          if (response.ok) {
            const gastoData = await response.json(); 
            setGastosData(gastoData);
            setError("");
          } else {
            console.log(`Error del servidor: ${response.status} : ${response.statusText}`);
            throw new Error(`Error del servidor: ${response.status} : ${response.statusText}`);
          }
        } catch (err) {
          setError(err.message);
        }
      };

    
return (
    <>
    

        <div className="list-group mt-4 shadow">
        {gastosData.map((g) => (
            <div >
                    <p>Fecha = {gastosData.dateExpense}</p>
                    <p>Descripción = {gastosData.description}</p>
                    <p>Total = {gastosData.total}</p>
                    <p>Responsable pago  = {gastosData.userId}</p>
                    <p>Aprovado 
                                {/* {gastosData.approved} */}
                            <input
                                    type="checkbox"
                                
                            />
                    </p>
            </div>
        ))} 

         </div>
 
    </>

  
);
};




 // const [showGastosData, setshowGastosData] = useState({
    //     dateExpense: "",
    //     description: "",
    //     total: 0,
    //     userId: 1,
    //     approved: false
    // });
