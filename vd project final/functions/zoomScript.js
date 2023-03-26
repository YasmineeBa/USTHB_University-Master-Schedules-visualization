//https://onestepcode.com/zoom-pan-effect-svg/

const image = document.getElementsByTagName("svg")[0];
document.body.style="overflow-y: hidden; overflow-x: hidden;"
var scaleY=150;
var scaleX=150;
var type=1;
const zoom = (direction) => {
  document.body.style=""
  const { scale, x, y } = getTransformParameters(image);
  let dScale = 1;
  let Tscale =15;
  if (direction == "out") {dScale *= -1;Tscale*=-1;}

  if(!((scale == (8) && direction != "out")||(scale == 1 && direction == "out")))
  {
    if(scale===6)
        {changeStroke(type); type*=-1}

  scaleY+=Tscale;
  scaleX+=Tscale;
  image.style.transform = getTransformString(scale + dScale, scaleX, scaleY);
  }
  else
  {
    if(scale===1||scale==1)
    { 
        window.scroll({
      top: 0,
      left: 0,

      
    });
    changeStroke(-1)
    document.body.style="overflow-y: hidden; overflow-x: hidden;"
    image.style.transform = getTransformString(scale , 0, 0);
  }
    
  }

};

const getTransformParameters = (element) => {
    const transform = element.style.transform;
    let scale = 1,
      x = 0,
      y = 0;
    if (transform.includes("scale"))
      scale = parseFloat(transform.slice(transform.indexOf("scale") + 6));
    if (transform.includes("translateX"))
      x = parseInt(transform.slice(transform.indexOf("translateX") + 11));
    if (transform.includes("translateY"))
      y = parseInt(transform.slice(transform.indexOf("translateY") + 11));
    return { scale, x, y };
  };

  const getTransformString = (scale, x, y) =>
  "scale(" + scale + ") " + "translateX(" + x + "px) translateY(" + y + "px)";
  function changeStroke(t)
  {
    if(t==1)
    {
        var cl=document.getElementsByClassName("cl1")
        for (var i=0;i<cl.length;i++)
        {
            cl[i].style.strokeWidth="0.1"
        }
    }
    else
     {
        var cl=document.getElementsByClassName("cl1")
        for (var i=0;i<cl.length;i++)
        {
            cl[i].style.strokeWidth="0.25"
        }
     }

  }

  document.getElementById("zoomIn").onclick=()=>zoom("in")
  document.getElementById("zoomOut").onclick=()=>zoom("out")
var oldx=0;
var oldy=0;

  document.getElementById("etage").onclick=(e)=>{
    var etage1=document.getElementsByClassName("etage1")
    var etage2=document.getElementsByClassName("etage2")
    if(e.target.innerText==1)
       {e.target.innerText=2;
        show(etage2)
        hide(etage1)

       }
    else {
      e.target.innerText=1;
      show(etage1)
      hide(etage2)
    }

  }
  function hide(tab)
  {
   for(var i=0;i<tab.length;i++)
   {
    tab[i].style.visibility='hidden'
   }
  }
  function show(tab)
  {
   for(var i=0;i<tab.length;i++)
   {
    tab[i].style.visibility='visible'
   }
  }

  var isDown = false;
  document.body.addEventListener('mousedown', function(e) {
      isDown = true;
  }, true);
  
  document.body.addEventListener('mouseup', function() {

      isDown = false;

  }, true);
  document.body.addEventListener("mouseout",function(event){
    if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))
    {
  
      isDown = false;
  
    }
     
  }, true);
  
  document.addEventListener('mousemove', function(event) {
     event.preventDefault();
     if (isDown) {
     var deltaX = event.movementX;
     var deltaY = event.movementY;
     window.scroll({
      top: window.pageYOffset-deltaY,
      left: window.pageXOffset-deltaX,
    });
   }
  }, true);