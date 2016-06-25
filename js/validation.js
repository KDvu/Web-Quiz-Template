//This function is returned by onclick()
function check(){
	validateRadio(document.getElementsByName("radio"));
	validateCheckbox(document.getElementsByName("checkbox"));
}

function validateRadio(radio_button){
	var answer = radio_button;
	var len = answer.length;
	
	for(i=0;i<len;i++){
		if(answer[i].checked){
			//alert("You chose " + answer[i].value);
			checkAnswer(answer[i].value, "radio");
		}
	}	
}

function validateCheckbox(checkgroup){
	var answer = checkgroup;
	var len = answer.length;
	
	var array = new Array();
	/*array.push("11");
	array.push("22");
	alert(array);*/
	
	for(i=0;i<len;i++){
		if(answer[i].checked)
			//alert("You chose " + answer[i].value);
			array.push(answer[i]);	
	}
	checkAnswer(array,"checkbox");	
}

function checkboxLimit(checkgroup,limit){
	//var checkgroup = document.getElementsByName("checkbox2");
	//var limit = 2;
	
	var checkgroup = checkgroup;
	var limit = limit;
	
	for (var i=0; i<checkgroup.length; i++){
		checkgroup[i].onclick=function(){
		var checkedcount=0;
		
		for (var i=0; i<checkgroup.length; i++)
			checkedcount+=(checkgroup[i].checked)? 1 : 0
		if (checkedcount>limit){
			alert("You can only select a maximum of "+limit+" checkboxes");
			this.checked=false;
			}
		}
	}
}

function checkAnswer(answer,type){
	if(type == "radio"){
		alert("Checking radio");
		if(answer === "correct")
			alert("You are correct");
		else{
			alert("You are wrong");
		}
	}
	else if(type == "checkbox"){
		alert("Checking checkbox");
		for(i=0;i<answer.length;i++){
			if(answer[i].value === "correct")
				alert("You are correct");
			else{
				alert("You are wrong");
			}		
		}	
	}else {
		alert("ERROR");
	}
}
