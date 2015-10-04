var width = 1200;
var height = 800;
var svg = d3.select("#subway").append("svg")
		    .attr("width", width)
		    .attr("height", height);     

var g = svg.append("g");
var arcGroup = g.append('g'); 

// TORONTO MAP JSON


d3.json("map/subway_bloor.json",function(error, data){


     // create a first guess for the projection
      var center = d3.geo.centroid(data)
      var scale  = 150;
      var offset = [width/2, height/2];
      var projection = d3.geo.mercator().scale(scale).center(center)
          .translate(offset);

      // create the path
      var path = d3.geo.path().projection(projection).pointRadius(6);

      // using the path determine the bounds of the current map and use 
      // these to determine better values for the scale and translation
      var bounds  = path.bounds(data);
      var hscale  = 0.9*scale*width  / (bounds[1][0] - bounds[0][0]);
      var vscale  = 0.9*scale*height / (bounds[1][1] - bounds[0][1]);
      var scale   = (hscale < vscale) ? hscale : vscale;
      var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                        height - (bounds[0][1] + bounds[1][1])/2];

      // new projection
      projection = d3.geo.mercator()
                     .center(center) 
                     .scale(scale)
                     .translate(offset);
      path = path.projection(projection);

	    var subwaystops = svg.selectAll("path")
                         .data(data.features)
                         .enter()
                         .append("path")
                         .attr("d", path)  
                         .style("stroke", "silver")

     linksTop = [];
        for(var i=0, len=data.features.length-1; i<len; i++){
            // (note: loop until length - 1 since we're getting the next
            //  item with i+1)
            linksTop.push({
                type: "LineString",
                coordinates: [
                    [ data.features[i].geometry.coordinates[0], (data.features[i].geometry.coordinates[1]+0.0015)],
                    [ data.features[i+1].geometry.coordinates[0], (data.features[i+1].geometry.coordinates[1]+0.0015)]
                ]
            });
        }
     linksBottom = [];
        for(var i=0, len=data.features.length-1; i<len; i++){
            // (note: loop until length - 1 since we're getting the next
            //  item with i+1)
            linksBottom.push({
                type: "LineString",
                coordinates: [
                    [ data.features[i].geometry.coordinates[0], (data.features[i].geometry.coordinates[1]-0.0015)],
                    [ data.features[i+1].geometry.coordinates[0], (data.features[i+1].geometry.coordinates[1]-0.0015)]
                ]
            });
        }     

        var links = linksTop.concat(linksBottom)

        // Standard enter / update 
        var pathArcs = arcGroup.selectAll(".arc")
                               .data(links);

        //enter
        pathArcs.enter()
            .append("path").attr({
                'class': 'arc'
            }).style({ 
                fill: 'none',
            });

        //update
        pathArcs.attr({
                //d is the points attribute for this path, we'll draw
                //  an arc between the points using the arc function
                d: path
            })
            .style({
                stroke: '#336600',
                'stroke-width': '4px'
            })

        //exit
        pathArcs.exit().remove();   
        console.log(d3.select(subwaystops).attr("transform"))

	}); // end toronto json

