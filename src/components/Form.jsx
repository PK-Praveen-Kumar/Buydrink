import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'
import { BUY_DRINK } from '../Configration';

import { ethers } from 'ethers';
function Form() {
  const [name , setname] =useState('');

  const [message ,setmessage] = useState('');
  const [maney , setmaney] = useState('');

  const handlename =(e) =>{
      setname(e.target.value);
  }
  const handlemessage =(e) =>{
    setmessage(e.target.value);
  }
  const handlemaney =(e) =>{
    setmaney(e.target.value);
  }

  const BuyDrink = async() =>{
    const _cost = ethers.utils.parseEther(maney).toString();
    const tokenId = await BUY_DRINK({ name, message,_cost }); 
    console.log(tokenId);
  }
  return (
    <div>
    
          < input type="text"  placeholder="Name" name='Name' onChange={handlename} value={name}/>
          < Input type="text" placeholder="Message" name="message" onChange={handlemessage} value={message} />
          < input type="text" name="many" placeholder='maney' onChange={handlemaney} value={maney}/>
          <button type='submit' onSubmit={BuyDrink} >Submit</button>
      
          
    </div>
  )
}

export default Form