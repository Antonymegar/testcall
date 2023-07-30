import React, { useState, useEffect } from 'react';
import Africastalking from 'africastalking-client';
import axios from 'axios';

const Phone=()=>{

     const [phoneNumber, setPhoneNumber] = useState('');
     const [client, setClient] = useState(null);
     var appURL = window.location.origin;
         useEffect(() => {
              async function initializeClient() {
                try {
                  // const token = // Call the function to generate the token
                
          
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
                    alert("you are ready to make a call");
                  });

                  client.on('calling', function (params) {
                    alert(`You are calling ${phoneNumber}`);
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
            async function getCallToken() {
                // try {
                //   const response = await axios.post('http://localhost:8080/api/make-call');
            
                //   if (response.data && response.data.token) {
                //     return response.data.token;
                //   } else {
                //     throw new Error('Failed to get token');
                //   }
                // } catch (error) {
                //   throw new Error('Error generating token: ' + error.message);
                // }
              }
        
        
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