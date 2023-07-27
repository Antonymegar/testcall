import React, { useState, useEffect } from 'react';
import Africastalking from 'africastalking-client';

const Phone=()=>{

     const [phoneNumber, setPhoneNumber] = useState('');
     const [client, setClient] = useState(null);
     var appURL = window.location.origin;
         useEffect(() => {
              async function initializeClient() {
                try {
                  // const token = await getCallToken(); // Call the function to generate the token
                  const token = "ATCAPtkn_83de196b4ee5ccf5b613dcebb39321c92718d72f23a8a8263830aaed9851ff05"
          
                  const params = {
                    sounds: {
                        dialing: `${appURL}/sounds/dial.mp3`,
                        ringing: `${appURL}/sounds/ring.mp3`,
                    },
                  };
          
                 
          
                  // Mount the client and handle events
                  
                  const client = new Africastalking.Client(token,params);
                  setClient(client); // Store the client instance in the state variable
                  console.log(client)
                  // Mount the client and handle events
                  client.on('ready', function () {
                    console.log("ready to make a call");
                  });
        
                 client.on('incomingcall', function (params) {
                    alert(`${params.from} is calling you`);
                  });
          
                  client.on('hangup', function (hangupCause) {
                    alert(`Call hung up (${hangupCause.code} - ${hangupCause.reason})`);
                  });
                } catch (error) {
                  console.error(error);
                }
              }
          
              initializeClient();
            }, [appURL]);
        
        
          function handlePhoneNumberChange(event) {
              setPhoneNumber(event.target.value);
            }
          
            async function makeCall() {
              try {
                // Perform validation on the phoneNumber if needed
        
                if (client) {
                  client.call(phoneNumber);
                }
              } catch (error) {
                console.error(error);
              }
            }
          
            return (
              <div>
                <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
                <button onClick={makeCall}>Call</button>
              </div>
            );


}
export default Phone