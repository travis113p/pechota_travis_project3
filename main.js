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
		if($("green peppers").checked){
			gpValue = ("green peppers").value;
		}else{
			gpValue = "No";
		};
	};
	function getBPValue(){
		if($("banana peppers").checked){
			bpValue = ("banana peppers").value;
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
		if($("feta cheese").checked){
			fcValue = ("feta cheese").value;
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
	function storeData(){
		var id 				= Math.floor(Math.random()*100000001);
		getPepperoniValue();
		getSausageValue();
		getHamValue();
		getGPValue();
		getBPValue();
		getBaconValue();
		getFCValue();
		var item 			= {};
			item.pizzasize  = ["Size: ", $("sizes").value];
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
			};
		};
	};

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

	//variable defaults
	var pizzaSizes = ["--Choose A Size--", "Small ($5.00)", "Medium ($7.50)", "Large ($10.00"],
		pizzaStyles = ["--Choose A Style--", "Deep Dish", "Classic", "Thin Crust"],
		pepperoniValue = "No",
		sausageValue = "No",
		hamValue = "No",
		gpValue = "No",
		bpValue = "No",
		baconValue = "No",
		fcValue = "No"
	;
	pizzaSize();
	pizzaStyle();

	//nav links
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);

});