//import from Local storage
var objTask = JSON.parse(localStorage.getItem("objTask")) || [];
// getStoredData("objTask");


//add to DOM
var parentItems = document.getElementById("TaskList");

for(var i=0; i<objTask.length; i++){
	addToNewDOM(objTask[i]);	
}

//find productID
var productId = 1;
if(objTask.length != 0){
	var lastId = objTask.length - 1;
	//console.log(lastId);
	productId = objTask[lastId].id + 1;

}

//console.log(productId);

var ip = document.getElementById("ip");

var btnDone = document.getElementById("btnDone");

var saveBtn = document.getElementById("saveBtn");

//   INPUT DATA TO ARRAY 

// add event listener to add task to array on button click
btnDone.addEventListener("click", addToArray);

function addToArray(event) {
	var val = ip.value;

	if(val){

		//create object to store info about each task
		var tasks = new Object();

		tasks.id = productId;
		tasks.value = val;

		ip.value = "";

		//push obj to array
		objTask.push(tasks);

		//add array to DOM
		addToDOM(tasks);
		productId++;	

		saveBtn.addEventListener("click", storeData);


	}
	
}

function addToNewDOM(tasks){
	
	//create a div inside TaskList to store Task ansd set attributes
	var item = document.createElement("div");

	item.setAttribute("id", objTask[i].id);
	item.style.width = "300px";
	item.style.height = "20px";
	item.style.marginBottom = "5px";
	item.style.backgroundColor = "white";


	//create components of this div

	//task name label
	var Tasklabel = document.createElement("label");
	Tasklabel.innerHTML = tasks.value;
	Tasklabel.style.marginRight = "60px";
	item.appendChild(Tasklabel);

	//complete button
	var check = document.createElement("button");
	check.setAttribute("id", "completed");
	check.innerHTML = "completed";
	check.style.marginRight = "10px";
	item.appendChild(check);

	//event listener for complete button to make label text strike-through
	check.addEventListener("click", strikeLabel);
	function strikeLabel(event){
		var res = tasks.value.strike();
		Tasklabel.innerHTML = res;
	}

	//create cancel button to delete task
	var cancel = document.createElement("a");
	cancel.setAttribute("href", "#");
	cancel.innerHTML = "X";
	item.appendChild(cancel);

	cancel.addEventListener("click", function(event){
										// fetch product index from the array after traversing and convert id to INT
										var selectedProductIndex = getProductIndex(parseInt(item.id));
										//delete product from array
										removeFromProductsArray(selectedProductIndex);
										//save data	
										saveBtn.addEventListener("click", storeData);									
										//remove child
										item.parentNode.removeChild(item);										
									}
	);

	//add to DOM tree under TaskList
	parentItems.appendChild(item);

	//insert blank line by creating br element
	insertBlankLine(item);

	
}

//adding array to DOM
function addToDOM(tasks){
	
	//create a div inside TaskList to store Task ansd set attributes
	var item = document.createElement("div");

	item.setAttribute("id", productId);
	item.style.width = "300px";
	item.style.height = "20px";
	item.style.marginBottom = "5px";
	item.style.backgroundColor = "white";


	//create components of this div

	//task name label
	var Tasklabel = document.createElement("label");
	Tasklabel.innerHTML = tasks.value;
	Tasklabel.style.marginRight = "60px";
	item.appendChild(Tasklabel);

	//complete button
	var check = document.createElement("button");
	check.setAttribute("id", "completed");
	check.innerHTML = "completed";
	check.style.marginRight = "10px";
	item.appendChild(check);

	//event listener for complete button to make label text strike-through
	check.addEventListener("click", strikeLabel);
	function strikeLabel(event){
		var res = tasks.value.strike();
		Tasklabel.innerHTML = res;
	}

	//create cancel button to delete task
	var cancel = document.createElement("a");
	cancel.setAttribute("href", "#");
	cancel.innerHTML = "X";
	item.appendChild(cancel);

	cancel.addEventListener("click", function(event){
										// fetch product index from the array after traversing and convert id to INT
										var selectedProductIndex = getProductIndex(parseInt(item.id));
										//delete product from array
										removeFromProductsArray(selectedProductIndex);
										//save data	
										saveBtn.addEventListener("click", storeData);									
										//remove child
										item.parentNode.removeChild(item);										
									}
	);

	//add to DOM tree under TaskList
	parentItems.appendChild(item);

	//insert blank line by creating br element
	insertBlankLine(item);

	
}

function getProductIndex(id) {
    for (var i = 0; i < objTask.length; i++) 
	{
		console.log("yes");
        if (objTask[i].id === id){ 
        	console.log(i);
			return i;
		}
    }
} 

function removeFromProductsArray(selectedProductIndex)
{
	objTask.splice(selectedProductIndex,1);
	//console.log(objTask);
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}



//retrieve data array from LS
function getStoredData(objTask){
	if(!localStorage.objTask){
		//default emty array
		localStorage.objTask = JSON.stringify([]);
	}
	return JSON.parse(localStorage.objTask);
}

function storeData(){
	localStorage.objTask = JSON.stringify(objTask);
}