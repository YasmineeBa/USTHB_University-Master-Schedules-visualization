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

readTextFile("data/data.json", function(text)
{
    var data = JSON.parse(text);
    var specialites = [] , grades = [] , sections = [];
    
    for(var d in data)
    {
        if(specialites.indexOf(""+data[d].Filere) === -1)
        {
            specialites.push(""+data[d].Filere)
        }
        if(grades.indexOf(""+data[d].Grade) === -1)
        {
            grades.push(""+data[d].Grade)
        }
        if(sections.indexOf(""+data[d].Section) === -1)
        {
            sections.push(""+data[d].Section)
        }
    
    // select
    

}
var profs = [];

for (var i in data)
{
    for (var j in data[i].Jour)
    {
        for (var k in data[i].Jour[j])
        {
            for (var l in data[i].Jour[j][k])
            {
                if(profs.indexOf(trim(""+data[i].Jour[j][k][l].Prof)) === -1 && trim(""+data[i].Jour[j][k][l].Prof) != "" )
                {
                    profs.push(trim(""+data[i].Jour[j][k][l].Prof))
                }
            }
        }
    }
}
profs.sort();

selectSpe = document.getElementById('specialitesID');
for (var i = 0; i<specialites.length; i++)
{
    var opt = document.createElement('option');
    opt.value = specialites[i];
    opt.innerHTML = specialites[i];
    selectSpe.appendChild(opt);
}

selectGra = document.getElementById('gradeID');
for (var i = 0; i<grades.length; i++)
{
    var opt = document.createElement('option');
    opt.value = grades[i];
    opt.innerHTML = grades[i];
    selectGra.appendChild(opt);
}

selectSec = document.getElementById('sectionID');
for (var i = 0; i<sections.length; i++)
{
    var opt = document.createElement('option');
    opt.value = sections[i];
    opt.innerHTML = sections[i];
    selectSec.appendChild(opt);
}

profSelect = document.getElementById('profID');
for (var i = 0; i<profs.length; i++)
{
    var opt = document.createElement('option');
    opt.value = profs[i];
    opt.innerHTML = profs[i];
    profSelect.appendChild(opt);
}

});