//This function is returned by onclick()
function check(){
	var valid = true;
	
	//Disables hover effect
	$( ".answer" ).unbind(); 
	
	//Remove warnings before possibly adding them again
	$(".warning").remove();
	
	valid = validateRadio(document.getElementsByName("radio"), "#Q1");
	valid = validateCheckbox(document.getElementsByName("checkbox"), "#Q2", 0);
	valid = validateCheckbox(document.getElementsByName("checkbox2"), "#Q3", 2);
	
	if(valid){
		//Validate answers
		attachFeedback();
		
		//Disable submit button
		document.getElementById("submit_button").disabled = true;
	}else
		alert("You have not answer all the questions");
}

//Check given radio button
function validateRadio(radio_button,qNo){
	var answer = radio_button;
	var len = answer.length;

	for(i=0;i<len;i++){
		if(answer[i].checked)
			return true;		
	}
	
	$(qNo).append("<p class='warning'>*You did not answer this question</p>");
	
	return false;
}

//Check given checkbox
function validateCheckbox(checkgroup,qNo,limit){
	var answer = checkgroup;
	var len = answer.length;
	
	var counter = 0;
	
	for(i=0;i<len;i++){
		if(answer[i].checked){
			if(limit != 0)
				counter++;
			else 
				return true;
		}
	}
	
	if(counter==limit && limit!=0)
		return true
		
	if(limit != 0)
		$(qNo).append("<p class='warning'>*You need to select " + limit + " answers</p>");
	else 
		$(qNo).append("<p class='warning'>*You did not answer this question</p>");

	return false;
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

function attachFeedback(){
	//console.log($(".answer").attr("value"));
	
	$( ".answer" ).each(function() {
		console.log($( this ).attr("value"));
		var value = $(this).attr("value");
		
		if (value == "correct"){
			if($(this).is(':checked')) {
				$(this).parent(".answer_box").append("<p class='correct'>Correct<p>");
			} else {
				$(this).parent(".answer_box").append("<p class='correction'>This is the correct answer!<p>");
			}
		} else if (value == "wrong"){
			if($(this).is(':checked')) {
				$(this).parent(".answer_box").append("<p class='wrong'>This is not the correct answer<p>");
			} else {
				$(this).parent(".answer_box").append("<p class='correct'> This answer is indeed incorrect<p>");
			}		
		} else{
			$(this).parent(".answer_boxcd").append("<p class='wrong'>ERROR<p>");
		}
		
	});
}