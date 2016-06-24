//This function is returned by onclick()
function check(){
	validateRadio(document.getElementsByName("radio"));
	validateCheckbox(document.getElementsByName("checkbox"));
}

function validateRadio(key){
	var answer = key;
	var len = answer.length;
	
	for(i=0;i<len;i++){
		if(answer[i].checked){
			//alert("You chose " + answer[i].value);
			checkAnswer(answer[i].value);
		}
	}	
}

function validateCheckbox(checkgroup){
	var answer2 = checkgroup;
	var len2 = answer2.length;
	
	for(i=0;i<len2;i++){
		if(answer2[i].checked)
			alert("You chose " + answer2[i].value);
	}	
}

function validateCheckboxLimit(checkgroup,limit){
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

function checkAnswer(answer){
	if(answer === "correct")
		alert("You are correct");
	else{
		alert("You are wrong");
	}	
}