

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
					a.setAttribute("data","project" + i);
					a.setAttribute("onclick","lightboxImage('"+result.items[i].images[0]+"', '"+result.items[i].description+"');");
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


function populateResume(){
  
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			result = JSON.parse(req.responseText);
			items = [];

			for(i = 0; i < result.items.length; i++)
			{
				//Create li
				category = document.createElement("div");
				category.innerHTML = result.items[i].title;
				category.className = "category";

				//add
				document.getElementById("resume").appendChild(category);


				//Create category div
				categoryBorder = document.createElement("div");
				categoryBorder.className = "categoryBorder";

				//create ul
				categoryText = document.createElement("ul")
				categoryText.className = "categoryText"
				categoryText.textAlign = "center";
				categoryText.style.listStyleType = "list-style-type : square;";

				//Create each entry
				for( var key in result.items[i].description ){

					//create li
					li = document.createElement("li");
					li.innerHTML = key;

					categoryText.appendChild(li);

					//create p
					p = document.createElement("p");
					p.innerHTML = result.items[i].description[key];

					categoryText.appendChild(p);
				}

			


				categoryBorder.appendChild(categoryText);
				
				document.getElementById("resume").appendChild(categoryBorder);

			}
		}

		else
		{
			console.log(req);
		}
	}

	req.open("GET","/CISC-375-MyWebsite/resume.json", true);
	req.send();	
}


function populateLanguages(){
	var req = new XMLHttpRequest();

	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			result = JSON.parse(req.responseText);
			holder = document.getElementById("myDropdown");
			
			//loop through langs
			for(var key in result.langs){
				opt = document.createElement("a");
				opt.id = key;
				opt.textContent = result.langs[key];
				opt.setAttribute('onclick','translatePage(this.id);');

				holder.appendChild(opt);

			}
			console.log(result.langs);
		}
		

		else
		{
			console.log(req.responseText);
		}
	}

	req.open("GET","https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20190313T195804Z.93846cdb1aef210b.822b60f0efbb58a7926f3edd2c9fb6b167235563", true);
	req.send();	
}


function translatePage(language){


	var elements = document.getElementsByTagName("p");

	for (var i = 0; i < elements.length; i++) {
	    if(elements[i].textContent != undefined && elements[i].textContent != ""){
	    	translate( elements[i].textContent, language, elements[i]);
	    }
	}

	var elements = document.getElementsByTagName("a");

	for (var i = 0; i < elements.length; i++) {
	    if(elements[i].textContent != undefined && elements[i].textContent != ""){
	    	translate( elements[i].textContent, language, elements[i]);
	    }
	}
}



function translate(words, language, element){
	var req = new XMLHttpRequest();

	parser = new DOMParser();


	req.onreadystatechange = function(){
		errors = [401,402,404,413,422,501];

		if (req.readyState == 4 && req.status == 200){
			
			xml = parser.parseFromString(req.responseText,"text/xml");


			var hold = "" + xml.getElementsByTagName("text")[0].childNodes[0].nodeValue;

			element.innerHTML = hold;

			}
		

		else if ( errors.includes(req.status) )
		{
			alert(req.status);
		}

	}


	req.open("POST","https://translate.yandex.net/api/v1.5/tr/translate?lang="+language+"&key=trnsl.1.1.20190313T195804Z.93846cdb1aef210b.822b60f0efbb58a7926f3edd2c9fb6b167235563&text="+words, true);
	req.send();	
}


function lightboxImage(source,description){
	hold = document.getElementById("lightbox");
	if (hold.style.display === "none") {
	    hold.style.display = "block";
	  } else {
	    hold.style.display = "none";
	  }

	document.getElementById("lightImage").src = source;
	document.getElementById("description").innerHTML = description;
}


function drop() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function sendAlert(){
	console.log("yay");
}






