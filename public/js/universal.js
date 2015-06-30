$(function(){
	$("#mainheader").css('background','#1E8FB1');
	$("#secondary_header").css('background','#1E8FB1');

/*	$("#submit_rep").on('click',function(event){
		console.log('click');
		var url_rep = $('#url_rep').val();
		var text_rep = $('#text_rep').val();
		if(url_rep != "" && text_rep != ""){
			window.alert("You can only choose either one of the options");
		}
		else{
			if(url_rep != ""){
				var feed_to_watson = url_rep;
				console.log(url_rep);
			}
			if(text_rep != ""){
				var feed_to_watson = text_rep;
				console.log(text_rep);
			}
    		$.ajax({
				url : "/get-nutrient-fact", 
				type : "post",
				data : {"feed_to_watson" : feed_to_watson},
				success : function(data){
						$('#body_wrapper').fadeOut("slow",function(){
						$('#body_wrapper').html(data);
						$('#body_wrapper').fadeIn("slow",function(){});
					});				
				},
				error : function(xhr, desc, err){
					console.log(xhr);
					console.log(desc);
					console.log(err);
				}
			});
		}
		event.stopPropagation();
	});*/

	//load tab1 html
	$('#tab1').on('click', function(event){
		$("#mainheader").css('background','#1E8FB1');
		$("#secondary_header").css('background','#1E8FB1');
		$.ajax({
			url : "/",
			type : "get",
			data : {},
			success : function(data){
				$('#body_wrapper').fadeOut("slow",function(){
					$('#body_wrapper').html(data);
					$('#body_wrapper').fadeIn("slow",function(){});
				});
			},
			error : function(xhr, desc, err){
				console.log(xhr);
				console.log(desc);
				console.log(err);
			}
		});

		event.stopPropagation();
	});
	//load tab2 html
	$('#tab2').on('click', function(event){
		$("#mainheader").css('background','#BCD53C');
		$("#secondary_header").css('background','#BCD53C');
		$.ajax({
			url : "/recipes",
			type : "get",
			data : {},
			success : function(data){
				$('#body_wrapper').fadeOut("slow",function(){
					$('#body_wrapper').html(data);
					$('#body_wrapper').fadeIn("slow",function(){});
				});
			},
			error : function(xhr, desc, err){
				console.log(xhr);
				console.log(desc);
				console.log(err);
			}
		});
		event.stopPropagation();
	});

	//load tab3 html 
	$('#tab3').on('click', function(){
		$("#mainheader").css('background','#F0C72D');
		$("#secondary_header").css('background','#F0C72D');
		$.ajax({
			url : "/news_feed",
			type : "get",
			data : {},
			success : function(data){
				$('#body_wrapper').fadeOut("slow",function(){
					$('#body_wrapper').html(data);
					$('#body_wrapper').fadeIn("slow",function(){});
				});
			},
			error : function(xhr, desc, err){
				console.log(xhr);
				console.log(desc);
				console.log(err);
			}
		});
		event.stopPropagation();
	});

});
