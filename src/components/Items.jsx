import { useState,useEffect } from "react";

const Items=({state})=>{
    const [Items,setItems]=useState([]);
    const {contract}=state;
    useEffect(()=>{
        const ItemsMessage = async()=>{
          const memos = await contract.Getitems();
          setItems(memos)
          
        }
        contract && ItemsMessage()
    },[contract])
   
   
    return (
        <div className="container-fluid">
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>Messages</h3>           
                <table>
                <tbody >
          {Items.map((Item , index) => {
            return (
                    <tr key={index} >
                      <td>
                        {Item.name}
                      </td>
                      <td>
                        
                        {new Date(Item.timestamp * 1000).toLocaleString()}
                        
                      </ td>
                      <td >
                        {Item.message}
                      </td>
                      <td  className="container-fluid" >
                        {Item.from}
                      </td>
                    </tr>
             
            );
          })}
               </tbody>
                </table>
        </div>
      );
}
export default Items;