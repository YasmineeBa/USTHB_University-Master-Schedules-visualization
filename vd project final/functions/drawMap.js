			
			//Width and height
			var w = 900;
			var h = 570;

			//Define map projection
			var proj = d3.geo.mercator()
								   .translate([0,0])
								   .scale([1]);

			//Define path generator
			var path = d3.geo.path()
							 .projection(proj);
							 
			
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
			var tooltipDiv = d3.select("body").append("div")			
			.attr("class", "tooltip")               
			.style("opacity", 0);    

		    d3.json("../data/usthb.geojson", function(json) {
            var b = path.bounds(json);
               s = .99 / Math.max( (b[1][0] - b[0][0]) / w , (b[1][1] - b[0][1]) / h ); 
               t = [ (w - s * (b[1][0] +b[0][0])) / 2 , (h - s * (b[1][1]+b[0][1])) / 2 ];
            proj.translate(t).scale(s);


					var map = svg.selectAll("path")
					   .data(json.features);             
             		map.enter()
					   .append("path")
					   .attr("d", path)
					   .attr("fill-opacity",function(d){return d.properties["fill-opacity"];})
					   .attr("class",(d)=> (d.properties.etage!=null)?"cl1 etage"+d.properties.etage:"cl1")
					   .attr("style",(d)=> {
						if(d.properties.etage==2) return "visibility: hidden;fill:rgb(222, 215, 211)" 
						if(d.properties.nom=="Stade") return "fill:rgb(152,251,152)";
					    if(!d.properties.bigcontour &&d.properties.type!="route" && !d.properties.fill ) return "fill:rgb(222, 215, 211)";
						if(d.properties.type=="route") return "stroke:rgb(240,230,140);stroke-width:0.4;fill:rgb(rgb(255, 191, 0))"; 
						
						return "fill:"+d.properties.fill}
						)

					   .attr("id",(d)=> d.properties.id)
					   .on("mouseover",(d)=>mouseOver(d))                  
					   .on("mouseout",()=> mouseLeave(this));

					   svg.selectAll("text")
					   .data(json.features)
					   .enter()
					   .append("text")
					   .attr("style",(d)=> {
						if(d.properties.etage==2) return "visibility: hidden" })
					   .attr("class",(d)=> {if(d.properties.etage!=null) return "etage"+d.properties.etage})
					   .style("font", "1.5px times")
					   .attr("fill", "dark")
					   .attr("transform", (d) => { return "translate(" + path.centroid(d) + ")"; })
					   .attr("text-anchor", "middle")
					   .text((d) =>d.properties.nom)
					   .on("mouseover",(d)=>mouseOver(d))                  
					   .on("mouseout", ()=>mouseLeave()); 
                       			
				});

function mouseOver(d)
{   
   // e.style.fill="rgb(243,243,243)"

   if(d.properties.nom!=null)  

						{   

						var room=document.getElementById(d.properties.nom)
						try{

						if(room.classList.contains("selected"))
						{
						tooltipDiv.transition()     
							.duration(300)      
							.style("opacity", .9);      
						tooltipDiv.html(`Nom de Salle: ${d.properties.nom} <br/>
										 Module:${room.dataset.module}<br/>  
										 Niveau:${room.dataset.grade}<br/> 
										 Prof:${room.dataset.prof}<br/> 
										 Specialité:${room.dataset.filere}<br/>
										 Section:${room.dataset.section}<br/>
										 ${(room.dataset.grp!=null)?"Group: "+room.dataset.grp:""}<br/> 
										 `)  
							.style("left", (d3.event.pageX) + "px")     
							.style("top", (d3.event.pageY - 40) + "px");
														


						}
						}
						catch{}
					}
					}
					

function mouseLeave()
{   

    //e.style.fill="White"
	tooltipDiv.transition()        
	.duration(350)      
	.style("opacity", 0);   
}
    


