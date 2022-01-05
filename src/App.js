//VIEW
import { useState } from 'react/cjs/react.development';
import './App.css';
import Title from './Title';
function App() {
  const [loader, setloader] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState(null);
  const [recent, setrecent] = useState([])
  let [rdata, setrdata] = useState();
  const handleClick = () => {
    setClicked(true);
    setloader(true)
    setrdata();
    console.log(rdata);
    fetch("https://scrapperbackend-heroku.herokuapp.com/sendData", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: `${data}`
      })
    })
    fetch("https://scrapperbackend-heroku.herokuapp.com/getData",{
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>res.json())
      .then(data => {
        console.log(data);
        let newData = [];
        setrecent(data.rtab);
        for (let index = 0; index < data.links.length; index++) {
          newData.push({ title: data.title[index], creator: data.creator[index], blog: data.blog[index], links: data.links[index], tags: data.tags[index], upload: data.upload[index], time: data.time[index] });
        }
        setrdata(newData);
        setloader(false);
      })
      .catch(err=>console.log(err))
  }
  const getData = (e) => {
    setData(e.target.value);
  }
  return (
    <div className="App">
      <h1>
        Medium <span>Scrapper</span>
      </h1>
      <div className="parent">
        <input type="text" onChange={getData} />
        <button onClick={handleClick}>Search</button>
      </div>
      {
        recent ? <div className='recentSearches'>
          History
          {
            <div className='recentschild'>
              {
                recent.map(each => 
                {
                  return <a href={`https://medium.com/tag/${each.recent}/latest`} target={'_blank'} rel="noreferrer" className='recents'>{each.recent}</a>
                }
                )
              }
            </div>
          }</div> : console.log("nothing in recent")
      }
      <div className="displayer">
        {loader ? <div className='pending'>Loading...</div> : null}
        {rdata ? <Title rdata={rdata} clicked={clicked}></Title> : console.log("no items")}
      </div>
    </div>
  );
}

export default App;
