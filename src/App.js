import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [pending, setPending] = useState([])
  const [loading, set_loading] = useState(true)
  useEffect(() => {
    fetchAll().then(res => {
      if (res !== 'error') {
        set_loading(false)
        setPending(res)
      } else {
        set_loading(false)
      }
    }).catch(err => {
      console.log(err)
    })
  }, [pending])

  if (loading) {
    <div className='App'>
      <h1>Loading</h1>
    </div>
  } else {
    return (
      <div className="App">
        <div className='all-organizations'>
          <div className='organization'>
            <p id='name'>Name</p>
            <p id='email'>Email</p>
            <p id='address'>Address</p>
            <p id='mission'>Mission</p>
            <p id='country'>Country</p>
            <p id='country'>Continent</p>
            <p id='language'>Language</p>
            <p id='durl'>Dontation</p>
            <p id='wurl'>Website</p>
            <button id='approve-x'></button>
            <button id='delete-x'></button>
          </div>
          {
            pending.map((item, index) => {
              return (
                <div className='organization' key={index}>
                  <p id='name'>{item.name}</p>
                  <p id='email'>{item.email}</p>
                  <p id='address'>{item.address}</p>
                  <p id='mission'>{item.mission}</p>
                  <p id='country'>{item.country}</p>
                  <p id='country'>{item.continent}</p>
                  <p id='language'>{item.language}</p>
                  <a target="_blank" rel="noopener noreferrer" href={item.donationurl} id='durl'>Dontation</a>
                  <a target="_blank" rel="noopener noreferrer" href={item.website} id='wurl'>Website</a>
                  <button id='approve' onClick={() => {
                    set_loading(true)
                    saveOrg(item).then(res => {
                      fetchAll().then(org => {
                        setPending(org)
                        set_loading(false)
                      })
                    })
                  }}>Approve</button>
                  <button id='delete' onClick={() => {
                    set_loading(true)
                    deleteOrg(item).then(res => {
                      fetchAll().then(org => {
                        setPending(org)
                        set_loading(false)
                      })
                    })
                  }}>Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;


//fetch all function
const fetchAll = async () => {
  let data = await axios({
    method: 'get',
    url: 'https://apimarketica.org/all-pending',
    responseType: 'json',
  }).then((response) => {
    return response.data
  })
    .catch(err => {
      console.log(err)
      return 'error'
    })
  return data
}
//save an organization
const saveOrg = async (data) => {
  let x = await fetch('https://apimarketica.org/save-by-admin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  }).then(async (res) => {
    console.log(res)
    return res
  }).catch(err => {
    console.log(err)
  })

}
//delete a pending
const deleteOrg = async (data) => {
  let x = await fetch('https://apimarketica.org/delete-by-admin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  }).then(async (res) => {
    console.log(res)
    return res
  }).catch(err => {
    console.log(err)
  })
}