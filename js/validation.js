//This function is returned by onclick()
function check(){
	//Disables hover effect
	$( ".answer" ).unbind(); 
	
	//Validate answers
	attachFeedback();
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