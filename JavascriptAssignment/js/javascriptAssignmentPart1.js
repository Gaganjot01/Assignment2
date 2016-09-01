const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData={};

var isHeader=true;
var insidequotes=false;
var temprow="";
var obj={};
var counter=false;
var flag=0;
var flag1=0;
var country=["afghanistan","armenia","azerbaijan","bahrain","bangladesh","bhutan","brunei","cambodia","china","cyprus","georgia","india","indonesia","iran","iraq","israel","japan","jordan","kazakhstan","kuwait","kyrgyzstan","laos","lebanon","malaysia","maldives","mongolia","myanmar","nepal","north Korea","oman","pakistan","palestine","philippines","qatar","russia","saudi Arabia","singapore","south Korea","sri Lanka","syria","taiwan","tajikistan","thailand","timor Leste","turkey","turkmenistan","united arab emirates","uzbekistan","vietnam","yemen"];
var MaleValueByYear=[];
var FemaleValueByYear=[];
var AsiaCountries=[];

for(var j=0;j<=55;j++){
	MaleValueByYear[j]=0;
	FemaleValueByYear[j]=0;
	AsiaCountries[j]=0;
}

// console.log(country.indexOf("afghanistan")); 
 for(var k=0;k<country.length;k++)
 {
 	obj[country[k]]=true;
 }

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
			//flag=true;
            temprow=temprow+line.charAt(i);
        }
    }

    //console.log(temprow);
    line = temprow;
	
    var lineRecords= line.trim().split(',');

	// console.log(lineRecords);
	var temp=-1;
	if(isHeader)
	{
		for(var i=0;i<lineRecords.length;i++)
		{
			header[i]=lineRecords[i];
			// console.log("inside if");
		}
	}
	if(temp!=(country.indexOf(lineRecords[0].toLowerCase())))
	{
// console.log(country.indexOf(lineRecords[0].toLowerCase()));
	 			flag=1;
	}//end of if temp st
	 if(flag==1)
	 {
	 	var count=0;
		for(var i=0;i<lineRecords.length;i++)
		{
	         	lineRecords[i] = lineRecords[i].replace("$",",");
		}
		// console.log("------ "+lineRecords[2]+" ------");
		if(lineRecords[2]=='"Life expectancy at birth, female (years)"')
		{
			
			count=1;
			flag1=1;
			FemaleValueByYear[parseInt(lineRecords[4],10)-1960] = FemaleValueByYear[parseInt(lineRecords[4],10)-1960]+parseFloat(lineRecords[5],10);
		 //console.log(FemaleValueByYear[1]+"hii------");
		}
		else if(lineRecords[2]=='"Life expectancy at birth, male (years)"' )
		{	
			flag1=1;
			count=1;
			MaleValueByYear[parseInt(lineRecords[4],10)-1960] = MaleValueByYear[parseInt(lineRecords[4],10)-1960]+parseFloat(lineRecords[5],10);
		}
		
		if(count==1)
		{
			flag1=1;
			AsiaCountries[parseInt(lineRecords[4],10)-1960]=AsiaCountries[parseInt(lineRecords[4],10)-1960]+1;
		}

	}// end of flag st
		
		
		//console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx");
		//console.log(tempDataFinal);
	    
	

    //jsonData.push(tempData);
	var result=[];
	if(flag1==1)
	{
    for(var l=0;l<=55;l++)
		{
			counter=true;
			//tempDataFinal={};
			var tempDataFinal={};
			tempDataFinal["Year"]=(1960+l).toString();
			tempDataFinal["lifeExpectancyAtBirthFemaleValue"]=(FemaleValueByYear[l]).toString();
			tempDataFinal["lifeExpectancyAtBirthMaleValue"]=(MaleValueByYear[l]).toString();
			result.push(tempDataFinal);
		//fs.writeFileSync("sim.json",JSON.stringify(jsonData),encoding="utf8");
			//console.log(tempDataFinal);
			/*if(l==1){
				console.log("-----------------------------------------");
				console.log(tempDataFinal);
				console.log("------------------------------------------");
			}*/
		}
	}//end of flag1 if st
		 // console.log(jsonData);

		/*console.log("-----------------------------------------");
		console.log(tempDataFinal);
		console.log("------------------------------------------");*/
     if(counter)
 	{

		jsonData=result;
 		fs.writeFileSync("../json/lifeend.json",JSON.stringify(jsonData),encoding="utf8");
 	}
	tempData={};
	tempDataFinal={};
    temprow="";
	isHeader=false;
	counter=false;
	flag=0;
	flag1=0;
});