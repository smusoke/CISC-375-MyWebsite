

function populate()
{
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			result = JSON.parse(req.responseText);
			items = [];

			for(i = 0; i < result.items.length; i++)
			{
				//Create element
				image = document.createElement("img");
				image.src = result.items[i].image;
				image.width = "100";
				image.style.display = "block";
				image.style.marginLeft = "auto";
				image.style.marginRight = "auto";

				//Create text
				text = document.createElement("p");
				text.innerHTML = result.items[i].description;
				text.style.fontSize = ".7rem";


				newItem = document.createElement("li");
				newItem.style.textAlign = "center";
				newItem.appendChild(image);
				newItem.appendChild(text);
				
				document.getElementById("items").appendChild(newItem);

			}
		}

		else
		{
			console.log(req);
		}
	}

	req.open("GET","/CISC-375-MyWebsite/news.json", true);
	req.send();	
}


function populateProjects(){
  
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			result = JSON.parse(req.responseText);
			items = [];

			for(i = 0; i < result.items.length; i++)
			{
				//Create li
				newItem = document.createElement("li");
				newItem.style.textAlign = "center";
				newItem.style.maxWidth = "200px";

				//Create text
				text = document.createElement("p");
				text.innerHTML = result.items[i].title;
				text.style.fontSize = ".9rem";
				text.style.maxWidth = "100px";
				text.style.display = "inline-block";


				//Create img element
				image = document.createElement("img");
				image.src = result.items[i].images[0].replace(".", "_thumb.");
				image.style.width = "100%";
				image.style.maxWidth = "150px";
				image.alt = result.items[i].title;


				//Create <a> elements
				for(x = 0; x < result.items[i].images.length; x++){
					a = document.createElement("a");
					a.href = result.items[i].images[x];
					a.setAttribute("data-lightbox","project" + i);
					a.style.display = "block";


					a.setAttribute("data-title", result.items[i].description);
					a.setAttribute("data-alt",result.items[i].title);

					if( x == 0 ){
						a.appendChild(image);
					}

					newItem.appendChild(a);
				}


				newItem.appendChild(text);
				
				document.getElementById("projects").appendChild(newItem);

			}
		}

		else
		{
			console.log(req);
		}
	}

	req.open("GET","/CISC-375-MyWebsite/projects.json", true);
	req.send();	
}



function sendAlert(){
	console.log("yay");
}






