//This function is returned by onclick()
function check(){
	//Disables hover effect
	$( ".answer" ).unbind(); 
	
	//Validate answers
	validateRadio(document.getElementsByName("radio"));
	validateCheckbox(document.getElementsByName("checkbox"));
	validateCheckbox(document.getElementsByName("checkbox2"));
}

//Check given radio button
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

//Check given checkbox
function validateCheckbox(checkgroup){
	var answer = checkgroup;
	var len = answer.length;
	
	var array = new Array();
	
	for(i=0;i<len;i++){
		if(answer[i].checked)
			//alert("You chose " + answer[i].value);
			array.push(answer[i]);	
	}
	checkAnswer(array,"checkbox");	
} 

//Check if the limit on the number of boxes that can be checked is not exceeded
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

//Check the answer and prints the appropriate message
function checkAnswer(answer,type){
	if(type == "radio"){
		//alert("Checking radio");
		if(answer === "correct")
			alert("You are correct");
		else{
			alert("You are wrong");
		}
	}
	else if(type == "checkbox"){
		//alert("Checking checkbox");
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

function attachFeedback2(){
	//console.log($(".answer").attr("value"));
	var total_points = 0;
	var points = 0;
	var value;
	var	isRadio = false;
	var obj;
	var appended = ".answer_box";
	
	$( ".answer" ).each(function() {
		//console.log($( this ).attr("value"));
		value = $(this).attr("value");
		obj = $(this);
		
		if(obj.is('input:radio'))
			isRadio=true;
		else
			isRadio=false;
		
		if (value == "correct"){
			if(obj.is(':checked')) {
				//Increment score
				points++;
				alert("Correct +1 point: " + points);
				total_points++;				
				obj.parent(appended).append("<p class='correct'>Correct<p>");
			} else {
				total_points++;
				obj.parent(appended).append("<p class='correction'>This is the correct answer!<p>");
			}
		} else if (value == "wrong"){
			if(obj.is(':checked')) {
				if(!isRadio){
					points--;	
					alert("Wrong -1 point: " + points);
				}	
				obj.parent(appended).append("<p class='wrong'>This is not the correct answer<p>");
			} else {
				obj.parent(appended).append("<p class='correct'> This answer is indeed incorrect<p>");
			}		
		} else{
			obj.parent(appended).append("<p class='wrong'>ERROR<p>");
		}
		
	});
	alert("You got " + points + " out of " + total_points);
}