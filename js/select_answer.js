$(document).ready(function(){
	$(".answer_box").click(function(evt){
		var target = $(evt.target);
		if(target.children().is('input:radio')) 
			$(evt.target).find('input:radio')[0].checked = true; 
		else if(target.children().is('input:checkbox'))
			$(evt.target).find('input:checkbox')[0].checked = true; 

	});
});
