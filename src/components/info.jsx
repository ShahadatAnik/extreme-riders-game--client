import React, { useEffect, useState } from 'react'; 
import Axios from 'axios';

export default function Info() {
  const [transferFrom, setTransferFrom] = useState();
  const [transferTo, setTransferTo] = useState();
  const [transferAmount, setTransferAmount] = useState(0);
  
  const transfer_coin = () => {
    if(transferFrom == 1 && transferTo == 2){
      Axios.post('http://localhost:3001/api/transfer_coin_from_player1', {
        transfer_amount: transferAmount
      }).then((response) => {
        console.log(response);
      });
      alert('Transfer Successful');
    }
    else if(transferFrom == 2 && transferTo == 1){
      Axios.post('http://localhost:3001/api/transfer_coin_from_player2', {
        transfer_amount: transferAmount
      }).then((response) => {
        console.log(response);
      });
      alert('Transfer Successful');
    }
    else{
      console.log('Invalid Transfer');
      alert('Transfer Failed');
    }
    
  };

  return <div>
    <div>
    Transfer From:
    <select name="from" onChange={(e)=>{
                  setTransferFrom(e.target.value)}}>
      <option value="0">Select From</option>
      <option value="1">Player 1</option>
      <option value="2">Player 2</option>
    </select> 
    </div>
    <div>
    Transfer To: <select name="to" onChange={(e)=>{
                  setTransferTo(e.target.value)}}>
      <option value="0">Select From</option>
      <option value="1">Player 1</option>
      <option value="2">Player 2</option>
    </select> 
    </div>
    <div>
    Transfer Amount: <input type='number' onChange={(e)=>{
                  setTransferAmount(e.target.value)
                }}></input>
    </div>

    <button onClick={()=>{
      transfer_coin()}}>Transfer</button>

    
    </div>;
}
