import { useState,useEffect } from 'react'
import abi from "./Abi/Abi.json"
import {ethers} from "ethers"
import Items from './components/Items';
import Buy from './components/Buy';
import Walletecon from './Walletecon';


function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  // const [account,setAccount]=useState('Not connected');
  useEffect(()=>{
    const template=async()=>{
   
      const contractAddres="0xa64e3144835aF8781c750ceC432784a68d883266";
      
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try{

        const {ethereum}=window;
       
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          abi,
          signer
        )
        console.log(contract)
      setState({provider,signer,contract});
       
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    <div >
    
      < Walletecon />
   
      < Buy state={state} />
      < Items state={state} />
   
  </div>
  )
}

export default App