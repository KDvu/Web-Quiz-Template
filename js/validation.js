function check(){
	var answer = document.getElementsByName("radio");
	var len = answer.length;
	
	for(i=0;i<len;i++){
		if(answer[i].checked)
			alert("You chose " + answer[i].value);
	}
}