var colors=["rgba(255, 113, 43","rgba(255, 248, 43","rgba(131, 255, 43","rgba(43, 255, 184","rgba(43, 61, 255","rgba(248, 43, 255","rgba(255, 76, 76"]
var opacity=[",1)",",0.8)",",0.6)",",0.4)",",0.2)",",0.1)"]
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function trim(str){
    return str.trim().toUpperCase();
}


function switchDays(day)
{
    var j = 0 ;
    switch(day) {
      case "Sam":
        j = 1 
        break;
      case "Dim":
        j = 2 
        break;
      case "Lun":
        j = 3 
        break;
      case "Mar":
        j = 4 
        break;
      case "Mer":
        j = 5 
        break;
      case "Jeu":
        j = 6 
        break;
    }
    return j;
}

function switchHeure(heure)
{
    var j = 0 ;
    switch(heure) {
      case "08:00 - 09:30":
        j = 1 
        break;
      case "09:40 - 11:10":
        j = 2 
        break;
      case "11:20 - 12:50":
        j = 3 
        break;
      case "13:00 - 14:30":
        j = 4 
        break;
      case "14:40 - 16:10":
        j = 5 
        break;
      case "16:20 - 17:50":
        j = 6 
        break;
    }
    return j;
}


function clearTable()
{
    document.getElementById("table").innerHTML = "<table id='table' style='width:100%'> <thead class='thead-dark' style= 'background-color: rgb(7,17,71);text-align: center; color: white;'><tr> <th></th> <th>08:00 - 09:30</th> <th>09:40 - 11:10</th> <th>11:20 - 12:50</th> <th>13:00 - 14:30</th> <th>14:40 - 16:10</th> <th>16:20 - 17:50</th> </tr></thead> <tr> <td>Sam</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr> <td>Dim</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr><tr> <td>Lun</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr> <td>Mar</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr><tr> <td>Mer</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr> <td>Jeu</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </table> </div>"
}


function setEdt(specialite,grade,section)
{
    
    speSelected = specialite
    gardeSelected = grade
    sectioneSelected = section

    clearTable();

    readTextFile("data/data.json", function(text)
    {   var allclass=[];
        var data = JSON.parse(text);
        for (var i in data)
        {
            if (data[i].Filere == speSelected && data[i].Grade == gardeSelected && data[i].Section == sectioneSelected ){
                for (var j in data[i].Jour)
                {
                    
                    for (var k in data[i].Jour[j])
                    {
                        var color=colors[switchDays(j)]+opacity[switchHeure(k)-1]
                        for (var l in data[i].Jour[j][k])
                        {
                        var jour = j ;
                        var heure = k;    
                        var table = document.getElementById("table");
                        var row = table.getElementsByTagName("tr")[switchDays(jour)];
                        var td = row.getElementsByTagName("td")[switchHeure(heure)];
                        td.innerHTML="";

                            for(var idk=0;idk<=l;idk++)
                            {
                            var onegrp={}
                            var sec = data[i].Section;
                            var fil = data[i].Filere ;
                            var gr = data[i].Grade;
                            var mod = data[i].Jour[j][k][idk].Module;
                            onegrp.sec=sec;
                            onegrp.fill=fil
                            onegrp.gr=gr
                            onegrp.Module=mod

                           
                            var group;
                            try{
                                   
                                    group=" | "+data[i].Jour[j][k][idk].Groupe

                            }
                            
                            catch{
                                
                            }
                            if(data[i].Jour[j][k][idk].Groupe==null)
                            {
                                group="";
                            }
                            td.style.backgroundColor=color;
                            td.dataset.color=color
                            td.innerHTML += "<div>"
                            +"Module : "+mod+" ("+data[i].Jour[j][k][idk].Prof+")"+"<br>"
                            +"Salle : "+data[i].Jour[j][k][idk].Salle+group+"<br>"
                            //+"Prof : "+data[i].Jour[j][k][idk].Prof+"<br>"
                            +"</div>"
                            var tds=td.getElementsByTagName('div')[idk]
                            addlistner(td)
                            //addlistner(tds)

                            
                            tds.dataset.sec=sec
                            tds.dataset.fil=fil
                            tds.dataset.gr=gr
                            tds.dataset.Module=mod
                            onegrp.Salle=data[i].Jour[j][k][idk].Salle
                            tds.dataset.salle=data[i].Jour[j][k][idk].Salle
                            onegrp.Prof=data[i].Jour[j][k][idk].Prof;
                            tds.dataset.prof=data[i].Jour[j][k][idk].Prof
                            tds.dataset.color=color;
                            onegrp.color=color;
                            try{
                                onegrp.group=data[i].Jour[j][k][idk].Groupe
                                tds.dataset.grp=data[i].Jour[j][k][idk].Groupe

                        }
                        
                        catch{
                            
                        }
                        allclass.push(onegrp)
                            }
                            
                            
                        }
                    }
                }
            }
        }
       
        document.getElementById("map").contentWindow.fun.classSelected(allclass)

    });
    
}





function profSelected2(prof)
{   
   

    clearTable();
   
    readTextFile("data/data.json", function(text)
    {
        var allclass=[];
        var data = JSON.parse(text);
        for (var i in data)
        {
            for (var j in data[i].Jour)
            {
                for (var k in data[i].Jour[j])
                {
                    var color=colors[switchDays(j)]+opacity[switchHeure(k)-1]
                    for (var l in data[i].Jour[j][k])
                    {
                        if( trim(""+data[i].Jour[j][k][l].Prof) == prof )
                        {
                            var onegrp={};
                            var sec = data[i].Section;
                            var fil = data[i].Filere ;
                            var gr = data[i].Grade;
                            var mod = data[i].Jour[j][k][l].Module;
                            var jour = j ;
                            var heure = k;
                            var table = document.getElementById("table");
                            var row = table.getElementsByTagName("tr")[switchDays(jour)];
                            var td = row.getElementsByTagName("td")[switchHeure(heure)];

                            onegrp.sec=sec;
                            onegrp.fill=fil
                            onegrp.gr=gr
                            onegrp.Module=mod
                            td.dataset.salle=data[i].Jour[j][k][l].Salle
                            td.dataset.color=color
                            td.style.backgroundColor=color;
                            onegrp.Salle=data[i].Jour[j][k][l].Salle
                            onegrp.Prof=prof;
                            onegrp.color=color;
                            addlistner(td)
                            td.innerHTML = "<div>"
                            +"Section : "+fil+" "+gr+" "+sec+ " "+data[i].Jour[j][k][l].Salle+"<br>"
                            +"Module : "+mod+"<br>"
                            +"</div>"
                            var tds=td.getElementsByTagName('div')[0]
                            tds.dataset.salle=data[i].Jour[j][k][l].Salle
                            tds.dataset.color=color
                            allclass.push(onegrp)
                        }

                       
                    }
                }
            }
        }

        document.getElementById("map").contentWindow.fun.classSelected(allclass)
    });
}






function addlistner(td)
{
    td.onmouseover=(e)=>{
        e.target.style.backgroundColor="rgb(220,220,220)";
    }
    td.onmouseleave=(e)=>{
        e.target.style.backgroundColor=e.target.dataset.color
        var len=e.target.getElementsByTagName("div").length;
        for(var i=0;i<len;i++)
        {
        e.target.getElementsByTagName("div")[i].style.backgroundColor="rgba(255,255,255,0)"
        }
    }
    td.onclick=(e)=>
    {
        var id=e.target.dataset.salle
        var color=e.target.dataset.color
        if(id!=null)
        {
        
        var centerClass=document.getElementById("map").contentWindow.fun.centerClass
    
        centerClass(id,color)
        }
    }
}
