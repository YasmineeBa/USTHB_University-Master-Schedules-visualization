
//get information with inpute day / time
window.fun={}
var ListId=[]
var SelectedClass=[]
window.fun.classInfo=function classInfo(day,time)
{
  //deselectionner tout les class déja selectionner
  clearSalles();
      
 
  // buffers to save informations
  var filere;
  var section;
  var sec;
  var grade;
  var data=[]
  var classRoom;
  d3.json("../data/collecteData0.json",(json)=>{
    clearSalles();
    // get edt from each section from s1
    section=jmespath.search(json,`S1[]`)
    for(var j=0;j<section.length;j++)
    {
    filere=section[j].Filere;
    grade=section[j].Grade;
    sec=section[j].Section;
    //get the class and infroamtion from specifique day and hour
    data=jmespath.search(section[j],`Jour.${day.slice(0,3)}.T${time.slice(0,2)}[]`)
    
    
      if(data!=null)
      {
    for (var i=0;i<data.length;i++)
    {
      //exepection for the classes that we didnt add in geojson or bad naming
      try {
      //save data in dataset variable so we can acces to them later to show toolbox
      classRoom=document.getElementById(data[i].Salle)
      ListId.push(data[i].Salle)
      classRoom.classList.add("selected")
      classRoom.style.fill="blue"
      classRoom.dataset.prof=data[i].Prof
      classRoom.dataset.module=data[i].Module
      classRoom.dataset.filere=filere
      classRoom.dataset.section=sec
      classRoom.dataset.grade=grade
      if(data[i].Groupe!=null)
        classRoom.dataset.grp=data[i].Groupe
      
      }

      catch{}

    }
  }
  }


  });

}

window.fun.classSelected=function classSelected(allEdt)
{
  clearSalles();
  for(var cls in allEdt)
  {
    try{

    classRoom=document.getElementById(allEdt[cls].Salle)
    

    classRoom.classList.add("selected")
    classRoom.style.fill=allEdt[cls].color
    classRoom.dataset.prof=allEdt[cls].Prof
    classRoom.dataset.module=allEdt[cls].Module
    classRoom.dataset.filere=allEdt[cls].fill
    classRoom.dataset.section=allEdt[cls].sec
    classRoom.dataset.grade=allEdt[cls].gr
    classRoom.dataset.color=allEdt[cls].color
    if(allEdt[cls].group!=null)
      classRoom.dataset.grp=allEdt[cls].group
    
    }
    catch{}
  }
 
}

function clearSalles()
{
  var salles=document.getElementsByClassName("selected")
  var leng=salles.length-1
  for (var i=leng;i>0;i--)
  {

    
    salles[i].style.fill="rgb(222, 215, 211)";
    salles[i].classList.remove("selected")
  }
  SelectedClass={}
}


//center dans une class specifique

window.fun.centerClass=function centerClass(id,color="blue")
  {
    clearSalles();
    // deselectioner 1er ellement :)
    

    //scroll to 0 0
    window.scroll({
      top: 0,
      left: 0,
    
    });
    //scalle max
    image.style.transform = getTransformString(8, 255, 255)
    //save value so the scalling function stay working
    scaleX=255
    scaleY=255
    var room=document.getElementById(id.toUpperCase())

      // changement de etage
    room.classList.forEach((ell)=>{
      var etage=document.getElementById("etage")
      if(ell=="etage2"&&etage.innerHTML==1)
      {
        etage.click()
      }
      if(ell=="etage1"&&etage.innerHTML==2)
      {
        etage.click()
      }
    });
    
    room.style.fill=color
    
    room.classList.add("selected")
    var box=room.getBoundingClientRect()
    //move back to the old selected ellement if it doesnt exist the values would be 0 , 0 
    window.scroll({
      top: oldx,
      left: oldy,
    });
    //calculat coordinate to center the ellement and do little move with animation
    oldx=box.top-(window.h)/2
    oldy=box.left-(window.w+100)/2-box.width
    window.scroll({
      top: oldx,
      left: oldy,
      behavior: 'smooth',
     
    });

  }