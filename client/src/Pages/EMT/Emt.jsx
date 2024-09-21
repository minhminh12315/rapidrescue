import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import HostContext from '../../Context/HostContext'
const Emt = () => {
  const { host } = useContext(HostContext);
  const [emt, setEmt] = useState(JSON.parse(localStorage.getItem("user")));
  const [emtData, setEmtData] = useState(null);
  const [emergencyRequests, setemergencyRequests] = useState(null);
  console.log(emt);

  useEffect(() => {
    axios.get(`${host}api/get-emt/${emt.id}`)
    .then(response => {
      console.log(response.data);
      setEmtData(response.data.emt);
      setemergencyRequests(response.data.emergencyRequests);

    })
    .catch(error => {
      console.error(error);
    })
  },[])
  return (
    <div>
      {emergencyRequests ? (
        <div>
          <h1>Yêu cầu cấp cứu</h1>
          {emergencyRequests.map((request, index) => {
            return (
              <div key={index} className='d-flex'>
                <h3>{request.phone}</h3>
                <h3>{request.textarea_value}</h3>
              </div>
            )
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Emt