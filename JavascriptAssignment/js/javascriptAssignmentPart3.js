const readline = require('readline');
const fs = require('fs');
var jsonData=[];
var tempData={};
var insidequotes=false;
var temprow="";
var counter=false;
var country=[];
var value=[];
var count=0;
var flag=0;
const rl = readline.createInterface({
 input: fs.createReadStream('Indicators.csv')
});
rl.on('line', function(line) {

    for (var i = 0; i <= line.length; i++) {
        if(line.charAt(i) == "\""){
            if(insidequotes){
                insidequotes = false;
            }else{
                insidequotes = true;
            }
        }

        if ((line.charAt(i) == ",") && (insidequotes==true)){
            temprow=temprow+"$";
        }else{
			
            temprow=temprow+line.charAt(i);
        }
    }
    line = temprow;
	
    var lineRecords= line.trim().split(',');
	var temp=-1;
	for(var i=0;i<lineRecords.length;i++)
		{

	         	lineRecords[i] = lineRecords[i].replace("$",",");

		}
	if(lineRecords[2]=='"Life expectancy at birth, total (years)"')
	{
		if(temp!=(country.indexOf(lineRecords[0])))
		{
			var k = country.indexOf(lineRecords[0]);
			value[k]=value[k]+parseFloat(lineRecords[5],10);
		}
		else
		{
			value[count]=0;
			country[count]=lineRecords[0];
			value[count]=value[count]+parseFloat(lineRecords[5],10);
			count++;
		}
		flag=1;
	}//end of life loop

	if(flag==1)
	{
	for(var i=0;i<value.length;i++)
	{

		for(var j=i;j<value.length - 1;j++)
		{

			if(value[i]<value[j+1])
			{
				
				var temp1 = value[i]
				value[i]=value[j+1];
				value[j+1]=temp1
				
				
				var temp2 = country[i];
				country[i]=country[j+1];
				country[j+1]=temp2;
			}//end of if statement
		}// end of j loop
	}// end of i loop
	}// end of flag

	
	if(flag==1)
	{
		var result=[];
	for (var n = 0; n < 5; n++)
	{
		
		 tempData={};
		tempData["Country"]=country[n];
		
		tempData["Life expectancy at birth, total (years)"]=(value[n]);
		
		//	console.log(tempData);
		        counter=true;
				result.push(tempData);
		//console.log(result);		
	}// end of n loop
	}//end of flag

	if(counter)
 	{
 		
		jsonData=result;
 		fs.writeFileSync("../json/AssignmentPart3.json",JSON.stringify(jsonData),encoding="utf8");
 	}

	temprow="";
	
	 tempData={};
	 counter=false;
	flag=0;
});