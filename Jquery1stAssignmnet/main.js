$(function(){
 $("#movies").hide();

$(".searchButton").click(function ()
{
	$("#imgHide").hide();
	var k=1;
	console.log("hello");
	var $movies = $('#movies');
	var tbody = $movies.find("tbody");
	// tbody.empty();
	var $moviesName = $('#moviesTitle').val(); 
	 $("#movies").find("tr:not(:first)").remove();
	$.ajax({
		url: 'http://www.omdbapi.com/?s='+$moviesName,
		type: 'GET',
		dataType: 'JSON',
		success: function(data)
		{
			 // $("#movies").hide();
			
			// var imgSize = $('#imgSize');
			if(data.Response=="True")
			{
				var data = data.Search;
			$(data).each(function(i,movie)
			{
				
				 if(k!=data.length)
				 {
				 	
				var table = document.getElementById("movies");
				console.log(table);
				  $("#movies").show();
				var row = table.insertRow(k);

				var c1 = row.insertCell(0);
				// console.log(cell1);
                var c2 = row.insertCell(1);
                
                            
               				c1.innerHTML = "<img src="+data[k].Poster+"class=img-responsive"+"width=10px"+">";
                			c2.innerHTML = "<tr> Title : "+data[k].Title+"<br></tr>"+"<tr> Year : "+data[k].Year+"<br></tr>"+"<tr> imdbID : "+data[k].imdbID+"<br></tr>"+"<tr> Type : "+data[k].Type+"<br></tr>"
                k=k+1;
				}
		
			});
		}
		else
		{
			alert('no results found');

		}
		},
		error:function(err)
		{
			alert('no results found');
		}
	});
});
});