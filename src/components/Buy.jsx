import {ethers} from "ethers"

const Buy=({state})=>{

    const buyItems = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = document.querySelector("#name").value;
      const message = document.querySelector("#message").value;
      //const amount = document.querySelector("#amount").value;
      const amount = {value:ethers.utils.parseEther("0.001")}
      const transaction = await contract.Buy(name,message,amount)
      await transaction.wait();
      alert("Transaction is successul");
      window.location.reload();
    }
    return  (
      <div className="center">
       
        <form onSubmit={buyItems}>
          <div className="inputbox">
            <input type="text" required="required" id="name" />
            <span className="bg-red-300 text-7xl">Name</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="message" />
            <span>Message</span>
          </div>
          <div className="inputbox">
            <input type="submit" value="Pay"  disabled={!state.contract}/>
          </div>
        </form>
          
        </div>
      );
}
export default Buy;