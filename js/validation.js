function checkboxlimit(){
	var checkgroup = document.getElementsByName("checkbox2");
	var limit = 2;
	
	for (var i=0; i<checkgroup.length; i++){
		checkgroup[i].onclick=function(){
		var checkedcount=0
		for (var i=0; i<checkgroup.length; i++)
			checkedcount+=(checkgroup[i].checked)? 1 : 0
		if (checkedcount>limit){
			alert("You can only select a maximum of "+limit+" checkboxes")
			this.checked=false
			}
		}
	}
}

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
