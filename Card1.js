import React,{useState,useEffect} from 'react'
import axios from 'axios'

const baseURL="https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences"
function Card1() {
  const [conference, setConference] = useState([]);
  const [showEvents, setShowEvents] = useState([]);
  const[searchterm, setsearchterm] = useState("");
  // const[category, selectCategory] = useState('')
  useEffect(() => {
    axios.get(baseURL)
    .then((response) => response.data)
      .then((response) => {
        const { free, paid } = response;
        const events=[...free, ...paid];
        setConference(response);
        setShowEvents(events);
      },[]);

    })
    
  return(
 
  <div className="row m-0">
    <form className="form-inline my-2">
                          <input
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e)=>{setsearchterm(e.target.value)}}
                            value={searchterm}
                          />&nbsp;&nbsp;
                          </form>
    {showEvents.filter((value)=>{
      if(searchterm===""){
       return value;
      }
      else if(value.confName.toLowerCase().includes(searchterm.toLocaleLowerCase())){
        return value;
      }
      else if(value.city.toLowerCase().includes(searchterm.toLocaleLowerCase())){
        return value;
      }
      else if(value.entryType.toLowerCase().includes(searchterm.toLocaleLowerCase())){
        return value;
     }
     }).map((P,key) => {
         return(
    <div  className="col-lg-6 col-12 m-0">
    
    <div className="card" key={P.confName} style={{margin:"12px 8px",border:"1px solid black"}} >
      {/* <img src={P.imageURL} className="d-block w-100" alt=""/> */}
      <h5>Venue:{P.venue}</h5>
      <h5>City:{P.city}</h5>
      <h5>Conference name:{P.confName}</h5>
      <p>Conference URL:<span><a href={P.confUrl}>{P.confUrl}</a></span></p>
      <h5>Conference Start Date:{P.confStartDate}</h5>
      <h5>Conference End Date:{P.confEndDate}</h5>
      <h5>Entry type:{P.entryType}</h5>
    </div>

          </div>
          )})}
          </div>
  )}
  export default Card1;