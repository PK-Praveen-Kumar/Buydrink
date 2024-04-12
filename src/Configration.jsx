import abi from './Abi/Abi.json';
import web3 from "web3";
import { ethers } from 'ethers';



const BUY_DRINK = 0xddaAd340b0f1Ef65169Ae5E41A8b10776a75482d ;

const isBrowser = () => typeof window !== "undefined";
const { ethereum } = isBrowser();

if(ethers) {
    isBrowser().web3 = new web3(ethereum); 
    isBrowser().web3 = new web3(isBrowser().web3.currentProvider);
}
export const GETITEMS = async() =>{
          try {
              const provider = window.ethereum != null
              ? new ethers.providers.web3Provider(window.ethereum)
              : ethers.providers.getDefaultProvider();
        
          
                    const signer = provider.getsinger();
                    const Role = new ethers.Contract(BUY_DRINK, abi, signer);
                    const answer = await Role.Getitems();
                    return answer;
          } 
          catch (error) {
                    console.error(error, "errors");
          }
      }
export const BUYDRINK = async ({ name, message, _cost }) => {
          try {
            const provider =
              window.ethereum != null
                ? new ethers.providers.web3.provider(window.ethereum)
                : ethers.providers.getDefaultProvider();
        
            const signer = provider.getSigner();
            const Role = new ethers.Contract(BUY_DRINK, abi, signer);
            const tokenId = await Role.Buy(name, message, { value: _cost });
            alert('Coffee bought successfully!');
            return tokenId;
          } catch (error) {
            console.error('Error buying memo:', error);
          }
}