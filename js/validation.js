//This function is returned by onclick()
function check(){
	var valid = true;
	
	//Disables hover effect
	$( ".answer" ).unbind(); 
	
	//Remove warnings before possibly adding them again
	$(".warning").remove();
	
	valid = validateRadio(document.getElementsByName("radio1"), "#Q1");
	valid = validateCheckbox(document.getElementsByName("checkbox1"), "#Q2", 0);
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

function attachFeedback2s(){
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

function attachFeedback(){
	var checkbox_points = new Array();
	var totat_points = getTotalPoints(checkbox_points);
	var points = 0;
	
	points = checkAnswers(checkbox_points);
}

function getTotalPoints(checkbox_points){
	var total_points = 0;
	var counter = 1;
	var string = "radio" + counter;
	//var test = $("[name=" + string + "]");
	var test = document.getElementsByName(string);
	
	while(test.length>0){
		counter++		
		total_points++;
		string = "radio" + counter;		
		//test = $("[name=" + string + "]");
		test = document.getElementsByName(string);
	}
	
	counter = 1;
	string = "checkbox" + counter;
	test = document.getElementsByName(string);
		
	while(test.length>0){
		//alert("Length: " + test.length);
		counter++		
		total_points++;
		
		calculatePointDistribution(string, checkbox_points);
		
		string = "checkbox" + counter;
		test = document.getElementsByName(string);
	}
	
	/*for(i=0; i<checkbox_points.length;i++){
			alert(checkbox_points[i]);
	}*/
	
	//alert("Total points: " + total_points);
}

function calculatePointDistribution(string, checkbox_points){
	var no_of_correct_answers = 0;
	var selector = $("[name=" + string + " ]");
	var value; 
		
	selector.each(function(){
		value = $(this).attr("value");
		
		if(value == "correct")
			no_of_correct_answers++;
	});
	
	checkbox_points.push( 1 / (no_of_correct_answers));
}

function checkAnswers(checkbox_points){
	var points = 0;
	var counter = 1;
	var string = "radio" + counter;
	var test = document.getElementsByName(string); 
 	var appended = ".answer_box";
	var value;
	var test2;
	
	while(test.length>0){
		/*value = document.querySelector("input[name=" + string + "]:checked").value;		
		//alert(value);
	
		if(value == "correct")
			points++;*/
	
		$("input[name=" + string +"]").each(function(){
			value = $(this).attr("value");
			
			if(value == "correct"){
				if($(this).is(":checked")){
					points++;
					$(this).parent(appended).append("<p class='correct'>Correct<p>");
				} else
					$(this).parent(appended).append("<p class='correction'>This is the right answer<p>");
			} else {
				if($(this).is(":checked")){
					$(this).parent(appended).append("<p class='wrong'>This is the wrong answer<p>");
				} else
					$(this).parent(appended).append("<p class='correct'>This is indeed wrong<p>");
			}			
		});

	
		counter++;
		string = "radio" + counter;
		test = document.getElementsByName(string); 		
	}
	
	counter = 1;
	var index = 0;
	string = "checkbox" + counter;
	test = document.getElementsByName(string);
	
	while(test.length>0){
		$("input[name=" + string +"]").each(function(){
			value = $(this).attr("value");
			
			if(value == "correct"){
				if($(this).is(":checked")){
					points += checkbox_points[index];
					$(this).parent(appended).append("<p class='correct'>Correct<p>");
				} else
					$(this).parent(appended).append("<p class='correction'>This is the right answer<p>");
			} else {
				if($(this).is(":checked")){
					points -= checkbox_points[index];
					$(this).parent(appended).append("<p class='wrong'>This is the wrong answer<p>");
				} else
					$(this).parent(appended).append("<p class='correct'>This is indeed wrong<p>");
			}
				
			alert(points);
		});
	
		counter++;
		index++;
		string = "checkbox" + counter;
		test = document.getElementsByName(string); 			
	}
}