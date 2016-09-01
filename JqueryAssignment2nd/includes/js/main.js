$(function(){

	var $id;
	var $saveButton=$('.saveButton');
	var $addSubmit=$('.addSubmit');
	var $tr;
	var $details = $('#details');
	var $name = $('#name');
	var $age = $('#age');
	var $gender = $('#gender');
	var $company = $('#company');

	//global function used in add details and save details
	function addEmployees(employeeDetails)
	{
		$details.append('<tr>'+'<td>'+employeeDetails.id+'</td>'+'<td>'+employeeDetails.name+'</td>'+'<td>'+employeeDetails.age+'</td>'+'<td>'+employeeDetails.gender+'</td>'+'<td>'+employeeDetails.company+'</td>'+'<td> <button type="delete"><span class="glyphicon glyphicon-trash" data-id="'+employeeDetails.id+'"></span>'+
            '</button> <a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+employeeDetails.id+'"></span></a>'+'</td>'+'</tr>');
	}
	$.ajax({
	type: 'GET',
	url: 'http://localhost:8080/data?_start=0&_end=20',
	dataType: 'JSON',
	success: function(details)
	{

		$(details).each(function(i,empDetails)
		{
			// $id=empDetails.id;
			 $details.append('<tr>'+'<td>'+empDetails.id+'</td>'+'<td>'+empDetails.name+'</td>'+'<td>'+empDetails.age+'</td>'+'<td>'+empDetails.gender+'</td>'+'<td>'+empDetails.company+'</td>'+'<td> <button type="delete"><span class="glyphicon glyphicon-trash" data-id="'+empDetails.id+'"></span>'+
            '</button> <a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+empDetails.id+'"></span></a>'+'</td>'+'</tr>');	
		});//end each
	},//end success
	error: function()
	{
		alert('page not found');
	}//end error
	});//end ajax for load

	// for searching

	$(".searchButton").click(function ()
	{
	start=0;
	end=20;
	var $details = $('#details');
	var $searchID = $('#searchID').val();
	// $("#details").find("tr:not(:first)").remove();
	if( $searchID ==='' || $searchID === undefined)
	{
		alert('please enter user id to search a record');
	}
	else
	{

		$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/data/'+$searchID,
		dataType: 'JSON',
		success: function(details)
		{
			$("#details").find("tr:not(:first)").remove();
			$(details).each(function(i,empDetails)
			{
				
				 $details.append('<tr>'+'<td>'+empDetails.id+'</td>'+'<td>'+empDetails.name+'</td>'+'<td>'+empDetails.age+'</td>'+'<td>'+empDetails.gender+'</td>'+'<td>'+empDetails.company+'</td>'+'<td> <button type="delete"><span class="glyphicon glyphicon-trash" data-id="'+empDetails.id+'"></span>'+
	            '</button> <a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+empDetails.id+'"></span></a>'+'</td>'+'</tr>');
			
				
			});//end each
		},//end success
		error: function()
		{
			alert('Invalid entry');
		}//end error
		});//end ajax for search
	}//end else
	});//end searchButton

	// for view all button click

	$(".viewButton").click(function ()
	{
		$('#searchID').val(" ");
		$("#details").find("tr:not(:first)").remove();
		var $details = $('#details');
	

	$.ajax({
	type: 'GET',
	url: 'http://localhost:8080/data?_start=0&_end=20',
	dataType: 'JSON',
	success: function(details)
	{

		$(details).each(function(i,empDetails)
		{
			
			 $details.append('<tr>'+'<td>'+empDetails.id+'</td>'+'<td>'+empDetails.name+'</td>'+'<td>'+empDetails.age+'</td>'+'<td>'+empDetails.gender+'</td>'+'<td>'+empDetails.company+'</td>'+'<td> <button type="delete"><span data-id="'+empDetails.id+'" class="glyphicon glyphicon-trash"></span>'+
            '</button> <a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+empDetails.id+'"></span></a>'+'</td>'+'</tr>');		 	
		});//end each
	},//end success of view button
	error: function()
	{
		alert('data not found');
	}//end error
	});//end ajax for search

	});//end ViewButton

	//add button a href
	$(".btn-warning").click(function ()
	{
		$saveButton.hide();
		$addSubmit.show();
		$('#name').val(" ");
		$('#age').val(" ");
		$('#gender').val(" ");
		$('#company').val(" ");
	});
	//add button function
	
	$(".addSubmit").click(function ()
	{
	
		var employeeDetails={

		name: $name.val(),

		age: $age.val(),
		gender: $gender.val(),
		company: $company.val()
		};//end var employeeDetails
		var str1 = ($.trim(employeeDetails.gender).toLowerCase());
		var str2 = "male";
		var str3 = "female";
		var n = str1.localeCompare(str2);
		var j = str1.localeCompare(str3);
		
 		if(employeeDetails.name.length==0 || employeeDetails.age.length==0 || employeeDetails.gender.length==0 || employeeDetails.company.length==0)
     	{
     		alert("mandatory to fill all details")
     	}
		else if(!$.trim($("#name").val()).match(/^[a-zA-Z ]+$/))
     	{
      		 alert("invalid name ");
      	}
 		else if(employeeDetails.age > 100 || employeeDetails.age < 0)
    	{
     		alert("enter valid age");
    	}
		else if(!((n==0) ||  (j==0)) )
		{
  			alert("write the valid gender");
		}
		else if(!((n==0) ||  (j==0)) )
		{
  			alert("write the valid gender");
		}
		else if((!(isNaN(employeeDetails.company))))
		{
  			alert("write the valid company");
		}
		else
		{
			alert("submit successfully");
			$.ajax({
			url: 'http://localhost:8080/data',
			type: 'POST',
			data: employeeDetails,
			success: function(newDetails)
			{
				$("#details").find("tr:not(:first)").remove();
					addEmployees(newDetails);
			},//end success
			error: function()
			{
				alert('error in submission');
			}
			});//end ajax
		}//end else	

	});//end submit
	
	//delete button

	$details.delegate(".glyphicon-trash",'click',function ()
	{
		var $tr = $(this).closest('tr');
		var statusFlag = confirm("Do you really want to delete");
		if(statusFlag)
		{
			$.ajax({
				type: 'DELETE',
				url: 'http://localhost:8080/data/'+$(this).attr('data-id'),
				success: function()
				{
					$tr.remove();
				},
				error: function()
				{
					alert('not deleted');
				}

			});//end ajax delete
		}//end if
	});//  end glyphicon-trash delete


	//glyphicon-pencil edit
	$details.delegate(".glyphicon-pencil",'click',function ()
	{
		$id = $(this).attr('data-id');
		
		$saveButton.show();
		$addSubmit.hide();
		
		$.ajax({
			type: 'GET',
			url: 'http://localhost:8080/data/'+$(this).attr('data-id'),
			dataType: 'JSON',
			success: function(searchData)
			{
				$('#name').val(searchData.name),
				$('#age').val(searchData.age),
				$('#gender').val(searchData.gender),
				$('#company').val(searchData.company)
			},
			error: function()
			{
				alert('data not found');
			}
		});//end ajax edit
	
	});//end glyphicon-pencil edit

	//save button
	$(".saveButton").click(function ()
	{
		var employees={
		name: $name.val(),
		age: $age.val(),
		gender: $gender.val(),
		company: $company.val()
		};//end var employees
		var str1 = ($.trim(employees.gender).toLowerCase());
		var str2 = "male";
		var str3 = "female";
		
		var n = str1.localeCompare(str2);
		var j = str1.localeCompare(str3);
		if(employees.name.length==0 || employees.age.length==0 || employees.gender.length==0 || employees.company.length==0)
     	{
     		alert("mandatory to fill all details")
     	}
		else if(!$.trim($("#name").val()).match(/^[a-zA-Z ]+$/))
    	{
     		alert("invalid name ");
      	}
		else if(employees.age > 100 || employees.age < 0)
     	{
     		alert("enter valid age");
     	}
		else if(!((n==0) ||  (j==0)) )
		{
			alert("write the valid gender");
		}
		else if(!((n==0) ||  (j==0)) )
		{
  			alert("write the valid gender");
		}
		else if((!(isNaN(employees.company))))
		{
			alert("write the valid company");
		}		
		else
		{

			$.ajax({
				url: 'http://localhost:8080/data/'+$id,
				type: 'PUT',	
				data: employees,
				success: function(empDetails)
				{
					alert("save successfully")
					$("#details").find("tr:not(:first)").remove();
					addEmployees(empDetails);	
				},
				error: function()
				{
					alert('data not found');
				}//end error
				});//end ajax edit
		}//end else

	});//end save button

		//pagination
	var start=0;
	var end =20;
	$(window).scroll(function()
	{
  		if($(window).scrollTop() == $(document).height() - $(window).height())
  		{
  			start = start+20;
        	end = end+20;
      		$('div#loadmoreajaxloader').show();
      		$.ajax({
       				url: 'http://localhost:8080/data?_start='+(start)+'&_end='+(end),
      		success: function(html)
      		{
       		    if(html)
          		{
	            	$("#postswrapper").append(html);
	            	$(html).each(function(index,html)
            		{
                		$details.append('<tr>'+'<td>'+html.id+'</td>'+'<td>'+html.name+'</td>'+'<td>'+html.age+'</td>'+'<td>'+html.gender+'</td>'+'<td>'+html.company+'</td>'+'<td> <button type="delete"><span class="glyphicon glyphicon-trash data-id="'+html.id+'""></span>'+
                		'</button> <a href="#myModal" role="button" class="btn" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id="'+html.id+'"></span></a>'+'</td>'+'</tr>');
              		});//end each loop
            		$('div#loadmoreajaxloader').hide();
          		}//end if
          		else
          		{
            		$('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
            	}//end else
     		},//end success
        	error: function()
			{
				alert('data not found');
			}//end error
        	});//end ajax
  		}//end if 
	});//end window scroll fxn
});//end function
