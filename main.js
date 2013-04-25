/*
Travis Pechota
Project 3
VFW 1304
*/

window.addEventListener("DOMContentLoaded", function(){

	//getElementById Function
	function $(x){
		var getElement = document.getElementById(x);
		return getElement;
	};

	//create size selector
	function pizzaSize(){
		var form = document.getElementsByTagName("form"),
			sizeLi = $("size"),
			sizeSelect = document.createElement("select");
			sizeSelect.setAttribute("id", "sizes");
		for(var i=0, j=pizzaSizes.length; i<j; i++){
			var makeOption = document.createElement("option");
				optText = pizzaSizes[i];
				makeOption.setAttribute("value", optText);
				makeOption.innerHTML = optText;
				sizeSelect.appendChild(makeOption);
		};
		sizeLi.appendChild(sizeSelect);
	};

	//create style selector
	function pizzaStyle(){
		var formStyle = document.getElementsByTagName("form"),
			styleLi = $("style"),
			styleSelect = document.createElement("select");
			styleSelect.setAttribute("id", "styles");
		for(var i=0, j=pizzaStyles.length; i<j; i++){
			var styleOption = document.createElement("option");
				styleText = pizzaStyles[i];
				styleOption.setAttribute("value", styleText);
				styleOption.innerHTML = styleText;
				styleSelect.appendChild(styleOption);
		};
		styleLi.appendChild(styleSelect);
	};

	//checkbox values
	function getPepperoniValue(){
		if($("pepperoni").checked){
			pepperoniValue = ("pepperoni").value;
		}else{
			pepperoniValue = "No";
		};
	};
	function getSausageValue(){
		if($("sausage").checked){
			sausageValue = ("sausage").value;
		}else{
			sausageValue = "No";
		};
	};
	function getHamValue(){
		if($("ham").checked){
			hamValue = ("ham").value;
		}else{
			hamValue = "No";
		};
	};
	function getGPValue(){
		if($("greenpeppers").checked){
			gpValue = ("greenpeppers").value;
		}else{
			gpValue = "No";
		};
	};
	function getBPValue(){
		if($("bananapeppers").checked){
			bpValue = ("bananapeppers").value;
		}else{
			bpValue = "No";
		};
	};
	function getBaconValue(){
		if($("bacon").checked){
			baconValue = ("bacon").value;
		}else{
			baconValue = "No";
		};
	};
	function getFCValue(){
		if($("fetacheese").checked){
			fcValue = ("fetacheese").value;
		}else{
			fcValue = "No";
		};
	};

	//toggle controls
	function toggleControls(n){
		switch(n){
			case "on":
				$("customPizza").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("customPizza").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		};
	};

	//store data
	function storeData(key){
		if(!key){
			var id 				= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getPepperoniValue();
		getSausageValue();
		getHamValue();
		getGPValue();
		getBPValue();
		getBaconValue();
		getFCValue();
		var item 			= {};
			item.pizzasize  = ["Size: ", $("sizes").value];
			item.pizzastyle = ["Style: ", $("styles").value]
			item.pepperoni	= ["Pepperoni: ", pepperoniValue];
			item.sausage	= ["Sausage: ", sausageValue];
			item.ham		= ["Ham: ", hamValue];
			item.gp			= ["Green Peppers: ", gpValue];
			item.bp			= ["Banana Peppers: ", bpValue];
			item.bacon		= ["Bacon: ", baconValue];
			item.fc			= ["Feta Cheese: ", fcValue];
			item.sauce		= ["Sauce: ", $("sauce").value];
			item.date		= ["Delivery Date: ", $("date").value];
			item.comments	= ["Additional Comments: ", $("comments").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Pizza Saved!");
	};

	//write data from local storage to browser
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage.");
		};
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			for (var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubli.appendChild(linksLi);
			};
			makeItemLinks(localStorage.key(i), linksLi);
		};
	};

	//make item links
	//create the edit and delete links for eachstored item when displayed
	function makeItemLinks(key, linksLi){ //using var key from above
		//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Pizza";
		editLink.addEventListener("click", editItem); //creates editItem fxn
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		//add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Pizza";
		deleteLink.addEventListener("click", deleteItem); //create deleteItem fxn
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	//create editItem function (from above)
	function editItem(){
		//grab the data from our item from Local storage
		var value = localStorage.getItem(this.key); //this.key grabs value of item in local storage.
		var item = JSON.parse(value)

		//hides displayed items and shows form
		toggleControls("off"); 

		//populate the form fields with current localStorage values.
		$("sizes").value = item.pizzasize[1];
		$("styles").value = item.pizzastyle[1];
		if(item.pepperoni[1] == "Yes"){
			$("pepperoni").setAttribute("checked", "checked");
		}
		if(item.sausage[1] == "Yes"){
			$("sausage").setAttribute("checked", "checked");
		}
		if(item.ham[1] == "Yes"){
			$("ham").setAttribute("checked", "checked");
		}
		if(item.gp[1] == "Yes"){
			$("greenpeppers").setAttribute("checked", "checked");
		}
		if(item.bp[1] == "Yes"){
			$("bananapeppers").setAttribute("checked", "checked");
		}
		if(item.bacon[1] == "Yes"){
			$("bacon").setAttribute("checked", "checked");
		}
		if(item.fc[1] == "Yes"){
			$("fetacheese").setAttribute("checked", "checked");
		}
		$("sauce").value = item.sauce[1];
		$("date").value = item.date[1];
		$("comments").value = item.comments[1];

		//remove the initial listener from the input "save contact" button
		save.removeEventListener("click", storeData);
		//change submit button value to edit button
		$("submit").value = "Edit Pizza";
		var editSubmit = $("submit");
		//save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}

	//creating deleteItem function
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this pizza?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("A pizza was removed from your order!");
			window.location.reload();
		}else{
			alert("Pizza was not deleted.");
		}
	}


	//clear local storage
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There are no pizzas to clear.")
		}else{
			localStorage.clear();
			alert("All pizzas are deleted.");
			window.location.reload();
			return false;
		};
	};

	//set up validate function
	function validate(e){
	//define the elements we want to check		
	var getSize = $("size");
	var getStyle = $("style");
	
		//reset error messages
		errMsg.innerHTML = "";
			//reset borders
			getSize.style.border = "1px solid black";
			getStyle.style.border = "1px solid black";

		//get error messages
		var messageAry = [];
		//group validation
		if(getSize.value === "--Choose A Size--"){
			var sizeError = "Please select a pizza size.";
			getSize.style.border = "1px solid red";
			messageAry.push(sizeError);
		}

		if(getStyle.value === "--Choose A Style--"){
			var styleError = "Please select a pizza style.";
			getStyle.style.border = "1px solid red";
			messageAry.push(styleError);
		}

		//if there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i =0, j=messageAry.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//if all is okay, save our data.  send the key value (which came from the editData function).
			//remember this key value was passed through the editSubmit event listener as a property.
			storeData(this.key);
		}
	}



	//variable defaults
	var pizzaSizes = ["--Choose A Size--", "Small ($5.00)", "Medium ($7.50)", "Large ($10.00)"],
		pizzaStyles = ["--Choose A Style--", "Deep Dish", "Classic", "Thin Crust"],
		pepperoniValue = "No",
		sausageValue = "No",
		hamValue = "No",
		gpValue = "No",
		bpValue = "No",
		baconValue = "No",
		fcValue = "No",
		errMsg = $("errors")
	;
	pizzaSize();
	pizzaStyle();

	//nav links
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", validate);

});