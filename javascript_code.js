$(document).ready(function(){
	getLocation();
})
	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPlaces);
	    }
	}

	function showPlaces(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var url = "http://codingchallenge.datasphere.com:8084/getbusinesses/?location="+latitude+","+longitude+"&pg=1&pz=10&callback=?";
	    $.getJSON(url, function(result){
		   for(i=0;i<result.businesses.length;i++){
		   	var pin = '<div class="inside_box_title"> <img src="pictures/pin.png">';
		   	var location = "<p class='title_text'>" + result.businesses[i].city +"," + result.businesses[i].state + "</p>";
		   	var distance = "<p class='distance'>" + result.businesses[i].distance + "</p> </div>";
		   	var background_picture = '<div class="background_image"> <img src="pictures/tile1-main.jpg" style="width:690px;height:323px;"></div>';
		   	var picture_icon = '<div class="white_space"> <div class="picture_icon"> <img src="pictures/tile1-logo.jpg"> </div> </div>';
		   	var category = '<h4>' + result.businesses[i].category + '</h4>';
		   	var buisness_name = '<div class="result_name"> <div class="blue_box"> <h3>'+ result.businesses[i].businessname +'</h3> </div>';
		   	var coupons = [];
		   	for(x in result.businesses[i].coupons){
		   		coupons.push(result.businesses[i].coupons[x].title)
		   	}
		   	$("#container").append("<div class='box_of_stuff'>" + pin + location + distance + background_picture + picture_icon + category + buisness_name + "<p class='list_start'></p>");

		   		for(k=0;k<coupons.length;k++){
		   			$(".result_name:last").append('<div class="list"> <p>'+ coupons[k] + '</p> <i class="fa fa-arrow-right fa-5x"></i> </div>')
		   		}
		   }
		});
	}