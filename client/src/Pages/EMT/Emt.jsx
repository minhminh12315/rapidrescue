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
  }, [])
  return (
    <div style={{ marginBlock: '8rem' }}>
      {emergencyRequests ? (
        <div className='container'>
          <div className="d-flex flex-column align-items-center justify-content-between">
            <div className='card card-emt'>
              <div className="card-header">
                <h3 className='text-center text-white'>Request Emergency Treatment</h3>
              </div>
              <div className="card-body overflow-hidden">
                {emergencyRequests.map((request, index) => {
                  return (
                    <div key={index} className='row row-cols-md-2 row-cols-1 g-5'>
                      <div className='col d-flex flex-row align-items-center gap-3'>
                        <h5 className='m-0'>Phone:</h5> <h4 className='m-0'>{request.phone}</h4>
                      </div>
                      <div className='col d-flex flex-row align-items-center gap-3'>
                        <h5 className='m-0'>Request:</h5> <h4 className='m-0 text-break'>adkafnasjlfasnbflkasjfnbaasdfasfasfasfasfsaasdfasfasslkfasnblkfsajdnb</h4>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Emt