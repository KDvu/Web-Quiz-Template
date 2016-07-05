//This function is returned by onclick()
function check(){
	var valid = true;
	
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
		
		//Disables all inputs
		$('.answer').prop('disabled', true);
	
		//Disables hover effect
		$(".answer_box").unbind(); 		
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
	var checkbox_points = new Array();
	var totat_points = getTotalPoints(checkbox_points);
	var points = 0;
	
	points = checkAnswers(checkbox_points);
}

function getTotalPoints(checkbox_points){
	var total_points = 0;
	var counter = 1;
	var name = "radio" + counter;
	//var element_name = $("[name=" + string + "]");
	var element_name = document.getElementsByName(name);
	
	while(element_name.length>0){
		counter++		
		total_points++;
		name = "radio" + counter;		
		//element_name = $("[name=" + string + "]");
		element_name = document.getElementsByName(name);
	}
	
	counter = 1;
	name = "checkbox" + counter;
	element_name = document.getElementsByName(name);
		
	while(element_name.length>0){
		//alert("Length: " + element_name.length);
		counter++		
		total_points++;
		
		calculatePointDistribution(name, checkbox_points);
		
		name = "checkbox" + counter;
		element_name = document.getElementsByName(name);
	}
	
	/*for(i=0; i<checkbox_points.length;i++){
			alert(checkbox_points[i]);
	}*/
	
	//alert("Total points: " + total_points);
}

function calculatePointDistribution(name, checkbox_points){
	var no_of_correct_answers = 0;
	var element_name = $("[name=" + name + " ]");
	var value; 
		
	element_name.each(function(){
		value = $(this).attr("value");
		
		if(value == "correct")
			no_of_correct_answers++;
	});
	
	checkbox_points.push( 1 / (no_of_correct_answers));
}

function checkAnswers(checkbox_points){
	var points = 0;
	var counter = 1;
	var name = "radio" + counter;
	var element_name = document.getElementsByName(name); 
 	var appended = ".answer_box";
	var value;
	var points_for_question = 0;
	
	while(element_name.length>0){
	
		$("input[name=" + name +"]").each(function(){
			value = $(this).attr("value");
			
			if(value == "correct"){
				if($(this).is(":checked")){
					points++;
					points_for_question++;
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
		$("input[name=" + name +"]").first().parent(appended).prepend("<div class='points'> "+ Number(points_for_question).toFixed(2) +"/1 Points</div>");
		points_for_question = 0;
		
		counter++;
		name = "radio" + counter;
		element_name = document.getElementsByName(name); 		
	}
	
	counter = 1;
	var index = 0;
	name = "checkbox" + counter;
	element_name = document.getElementsByName(name);
	
	while(element_name.length>0){
		$("input[name=" + name +"]").each(function(){
			value = $(this).attr("value");
			
			if(value == "correct"){
				if($(this).is(":checked")){
					points += checkbox_points[index];
					points_for_question += checkbox_points[index];	
					
					$(this).parent(appended).append("<p class='correct'>Correct<p>");
				} else
					$(this).parent(appended).append("<p class='correction'>This is the right answer<p>");
			} else {
				if($(this).is(":checked")){
					points -= checkbox_points[index];
					points_for_question -= checkbox_points[index];					
					$(this).parent(appended).append("<p class='wrong'>This is the wrong answer<p>");
				} else
					$(this).parent(appended).append("<p class='correct'>This is indeed wrong<p>");
			}
		});
		
		$("input[name=" + name +"]").first().parent(appended).prepend("<div class='points'> "+ Number(points_for_question).toFixed(2) +"/1 Points</div>");
		points_for_question = 0;
	
		counter++;
		index++;
		name = "checkbox" + counter;
		element_name = document.getElementsByName(name); 			
	}
}