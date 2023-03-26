
(function charge()
{
  
    document.getElementById("container_prof").style.display="block"

    
    let selects=document.getElementById("container_etu").getElementsByTagName("select")
    
    
    for(var i=0;i<selects.length;i++)
    {
        selects[i].onchange=(e)=>
        {   
            let speSelected = document.getElementById('specialitesID').value;
            let gardeSelected = document.getElementById('gradeID').value;
            let sectioneSelected = document.getElementById('sectionID').value;
            setEdt(speSelected,gardeSelected,sectioneSelected)
        }
    }
    document.getElementById("profID").onchange=(e)=>
    {
    let profSelect = document.getElementById('profID').value;
    profSelected2(profSelect)

    }
    
    document.getElementById("search").onclick=()=>{var centerClass=document.getElementById("map").contentWindow.fun.centerClass
    if(document.getElementById("salle").value!="")
    centerClass(document.getElementById("salle").value)}

    document.getElementById("heure").onchange=change;
   document.getElementById("day").onchange=change;


  async function change(e){
      // get the data from the dropbox 
      var heure=document.getElementById("heure")[document.getElementById("heure").selectedIndex].innerText
       var jour=document.getElementById("day")[document.getElementById("day").selectedIndex].innerText
      //run function that restart information for day and hour
      document.getElementById("map").contentWindow.fun.classInfo(jour,heure);
      
  }


  
  var hide=document.getElementById("hide")
  hide.onclick=(e)=>{
    if(document.getElementById("edt").style.display=="block")
    {
    document.getElementById("edt").style.display="none"
    document.getElementById("map").height=660
    }
    else
    {
        document.getElementById("edt").style.display="block"
        document.getElementById("map").height=500
    }
  }
  

})();