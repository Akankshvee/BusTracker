
  
  // TODO: add your own access token
  mapboxgl.accessToken = 'pk.eyJ1IjoidmVlbmFicCIsImEiOiJja3YwbTRpMDg3b29sMnZuejU2YWkzaDUxIn0.1Y9W0k94t7GBtX4Vwfo56Q';
  
  // This is the map instance
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 10,
  });
  
 
  const busLocations = [];
  async function run(){
    // get bus data    
    busLocations.splice(0, busLocations.length) 
	const locations = await getBusLocations();
	console.log(new Date());
	//console.log(locations);
  //console.log(Object.keys(locations).length)
  for(let i = 0; i < locations.length; i++){
    let marker = new mapboxgl.Marker()
    .setLngLat([locations[i]['attributes']['longitude'],locations[i]['attributes']['latitude']])
    .addTo(map);
    busLocations.push(marker);  
  }

	// timer
	setTimeout(run, 15000);
}


// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();
  