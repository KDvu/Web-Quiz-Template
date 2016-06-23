function check(){
	var answer = document.getElementsByName("radio");
	var len = answer.length;
	
	for(i=0;i<len;i++){
		if(answer[i].checked)
			alert("You chose " + answer[i].value);
	}	
	
	var answer2 = document.getElementsByName("checkbox");
	var len2 = answer2.length;
	
	for(i=0;i<len2;i++){
		if(answer2[i].checked)
			alert("You chose " + answer2[i].value);
	}	
}


