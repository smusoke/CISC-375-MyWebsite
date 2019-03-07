//convert degrees (lat long) to radians


function sendAlert(){
	console.log("yay");
}

function calculateDistance(location1,location2) {

	var location2;
	//First request
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			passCoords(req,location2);
		}
	}

	req.open("GET","https://nominatim.openstreetmap.org/search?q="+location1+"&format=json&accept-language-en", true);
	req.send();

}



function passCoords(req,location2) {

	var result1 = JSON.parse(req.responseText);
	//

	var lat1 = result1[0].lat;
	var long1 = result1[0].lon;

	//Second request
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			result2 = JSON.parse(req.responseText);
			lat2 = result2[0].lat;
			long2 = result2[0].lon;

			appendInfo(result1,result2);
		}
	}

	req.open("GET","https://nominatim.openstreetmap.org/search?q="+location2+"&format=json&accept-language-en", true);
	req.send();
}


function appendInfo(result1,result2){
	
	lat1 = result1[0].lat;
	lon1 = result1[0].lon;
	lat2 = result2[0].lat;
	lon2 = result2[0].lon;
	//console.log(lat1,lon1,lat2,lon2);

	var R = 6371; // km 

    var dLat = (lat2-lat1) * Math.PI / 180;  
    var dLon = (lon2-lon1) * Math.PI / 180;

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos( lat1 * Math.PI / 180 ) * Math.cos( lat2 * Math.PI / 180 ) * 
                    	Math.sin(dLon/2) * Math.sin(dLon/2);  

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 

	//calculate distance
	location1Name = result1[0].display_name.slice( 0, result1[0].display_name.lastIndexOf(",") );
	location2Name = result2[0].display_name.slice( 0, result2[0].display_name.lastIndexOf(",") );

	rawMiles = d * 0.62137;
	miles = rawMiles.toString().slice( 0, rawMiles.toString().indexOf(".")+2 ) + " miles";

	document.getElementById("response").innerHTML = location1Name + " is " + miles + " away from " + location2Name;
}




