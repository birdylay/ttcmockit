/*
	Tweet
	<Tweet />
*/

var React = require('react');
var ReactDOM = require('react-dom');
var Faux = require('react-faux-dom')
var D3 = require('d3');
var Queue = require('d3-queue');
var Topojson = require('topojson');

let createHook = (comp,elem,statename) => {
	let elems = new Map(),
		interval
	const updateState = ()=> {
		comp.setState({[statename]:elem.toReact()})
	}
	setTimeout(updateState)
	comp.isAnimating = ()=> !!interval
	return (transition)=> {
		transition.each((e)=>{
			elems.set(e,(elems.get(e) || new Set()).add(transition.id))
			interval = interval || setInterval(updateState,16)
		})
		transition.each("end",(e)=>{
			let anims = elems.get(e)
			anims.delete(transition.id)
			if (anims.size){
				elems.set(e,anims)
			} else {
				elems.delete(e)
			}
			if (!elems.size) interval = clearInterval(interval)
		})
	}
}


var Tweet = React.createClass({
	render : function() {

		return (
			<li className="tweet-wrap">
				<div className="content">
					<div className="content-header">
						<img className="avatar" src="https://pbs.twimg.com/profile_images/378800000335236616/2f8b9119aac5bc648e8b88ca1981e6c3_bigger.jpeg" alt="TTC" />
						<strong className="fullname">Official TTC Tweets</strong>
						<span>&rlm;</span>
						<span className="username"> <s>@</s><b>TTCnotices &#183; </b>
						</span>
						<small className="time"><span>7h</span></small>
					</div>
					<div className="tweet-text">
						<p>ALL CLEAR: The delay at Chester has now cleared and full service has resumed on Line 2 with residual delays.</p>
					</div>
				</div>
			</li>
		)
	}
});
/*
var TwitterFeed = React.createClass({
	render : function() {
		return (

		)
	}
})
*/

var TorontoMap = 

React.createClass({
		getInitialState: function(){
			return { torontoMap: <span/>,
								svg: null,
								faux: null,
								hook: null,
								loading: true,
								error: null}
	},

	translateAlong : function(linePaths, lengthAt) {
		return function(d, i, a) {
		return function(t) {
    var p = linePaths.getPointAtLength(t * lengthAt);
        var t2 = Math.min(t + 0.05, 1);
        var p2 = linePaths.getPointAtLength(t2 * lengthAt);
        var x = p2.x - p.x;
        var y = p2.y - p.y;
        var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;
        return "translate(" + p.x + "," + (p.y - 5) + ") rotate(" + r + ")";
      }
	}},

/*
	loaded : function(error, toronto, subwayStops) {
			
	},
	*/

	componentDidUpdate : function() {

			var pathNode = D3.select(".arcTop")[0][0];
			var pathNode2 = D3.select(".arcBottom")[0][0];
			var l = pathNode.getTotalLength();
			var l2 = pathNode2.getTotalLength();
			if (this.state.loading) {
			try {	
	var count = 0;
	var lengthAt = [];
	var linePaths = [];
	var duration = 500;
  for (var i = 0; i < 60; i++) {
    linePaths.push(D3.select('path#hiddenLine' + i).node());
    lengthAt.push(linePaths[i].getTotalLength());
  };
			var train = this.svg.append("rect")
							.attr('rx', 3)
							.attr('ry', 3)
    					.attr("x", 0)
    					.attr("y", 0)
    					.attr("width", 15)
    					.attr("height", 45)
    					.attr("class", "train")    					
    					;
  //for (var j = 0; j < linePaths.length-2; j++) {
    train.transition().duration(3000).attr("width", 5).attr("height", 15).attrTween("transform", this.translateAlong(linePaths[0], lengthAt[0]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[1], lengthAt[1]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[2], lengthAt[2]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[3], lengthAt[3]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[4], lengthAt[4]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[5], lengthAt[5]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[6], lengthAt[6]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[7], lengthAt[7]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[8], lengthAt[8]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[9], lengthAt[9]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[10], lengthAt[10]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[11], lengthAt[11]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[12], lengthAt[12]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[13], lengthAt[13]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[14], lengthAt[14]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[15], lengthAt[15]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[16], lengthAt[16]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[17], lengthAt[17]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[18], lengthAt[18]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[19], lengthAt[19]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[20], lengthAt[20]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[21], lengthAt[21]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[22], lengthAt[22]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[23], lengthAt[23]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[24], lengthAt[24]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[25], lengthAt[25]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[26], lengthAt[26]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[27], lengthAt[27]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[28], lengthAt[28]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[29], lengthAt[29]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[30], lengthAt[30]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[31], lengthAt[31]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[32], lengthAt[32]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[33], lengthAt[33]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[34], lengthAt[34]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[35], lengthAt[35]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[36], lengthAt[36]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[37], lengthAt[37]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[38], lengthAt[38]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[39], lengthAt[39]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[40], lengthAt[40]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[41], lengthAt[41]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[42], lengthAt[42]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[43], lengthAt[43]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[44], lengthAt[44]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[45], lengthAt[45]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[46], lengthAt[46]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[47], lengthAt[47]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[48], lengthAt[48]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[49], lengthAt[49]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[50], lengthAt[50]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[51], lengthAt[51]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[52], lengthAt[52]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[53], lengthAt[53]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[54], lengthAt[54]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[55], lengthAt[55]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[56], lengthAt[56]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[57], lengthAt[57]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[58], lengthAt[58]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[59], lengthAt[59]))
    	.transition().duration(duration).attrTween("transform", this.translateAlong(linePaths[60], lengthAt[60]))
      .call(this.hook);
  //
  /*
   rain.transition()
     .duration(4000)
     .attrTween("transform", function (d, i) {
     return function (t) {
      var p = linePaths[count].getPointAtLength(t * lengthAt[count]);
        	console.log(p.x);
        	
        	
        if ((p.x >= 29 && p.x < 30) ||
        	(p.x >= 75 && p.x < 76) ||
        	(p.x >= 120 && p.x < 121) ||
        	(p.x >= 176 && p.x < 177) ||
        	(p.x >= 213 && p.x < 214) ||
        	(p.x >= 241 && p.x < 242) ||
        	(p.x >= 277 && p.x < 278) ||
        	(p.x >= 299 && p.x < 300) ||
        	(p.x >= 325 && p.x < 326) ||
        	(p.x >= 359 && p.x < 360) ||
        	(p.x >= 374 && p.x < 375) ||
        	(p.x >= 385 && p.x < 386) ||
        	(p.x >= 417 && p.x < 418) || 
        	(p.x >= 445 && p.x < 446) ||
        	(p.x >= 468 && p.x < 469) ||
        	(p.x >= 495 && p.x < 496) ||
        	(p.x >= 543 && p.x < 544) ||
        	(p.x >= 558 && p.x < 559) ||
        	(p.x >= 589 && p.x < 590) ||
        	(p.x >= 618 && p.x < 619) ||
        	(p.x >= 652 && p.x < 653) ||
        	(p.x >= 674 && p.x < 675) ||
        	(p.x >= 699 && p.x < 700) ||
        	(p.x >= 725 && p.x < 726) ||
        	(p.x >= 751 && p.x < 752) ||
        	(p.x >= 777 && p.x < 778) ||
        	(p.x >= 812 && p.x < 813) ||
        	(p.x >= 850 && p.x < 851) ||
        	(p.x >= 894 && p.x < 895) ||
        	(p.x >= 930 && p.x < 931) ||
        	(p.x >= 984 && p.x < 985)    	        	        	        	
        	)
         {

        	var delayTime = 1000
        			delayTime += new Date().getTime();
							while (new Date() < delayTime) {
							}
        }
       

        var t2 = Math.min(t + 0.05, 1);
        var p2 = linePaths[count].getPointAtLength(t2 * lengthAt[count]);

        var x = p2.x - p.x;
        var y = p2.y - p.y;
        var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;
        count++;
        //var s = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3);
        return "translate(" + p.x + "," + (p.y - 5) + ") rotate(" + r + ")";
        }
    }).transition()
        .duration(10000)
        .attrTween("transform", function (d, i) {
        return function (t) {
        var p = pathNode2.getPointAtLength(t * l);

        var t2 = Math.min(t + 0.05, 1);
        var p2 = pathNode2.getPointAtLength(t2 * l);

        var x = p2.x - p.x;
        var y = p2.y - p.y;
        var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;

        //var s = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3);

        return "translate(" + p.x + "," + (p.y + 5) + ") rotate(" + r + ")";
        }
    })*/


    



        
        this.state.loading = false;
		}
		catch(err) {
			console.log(err)
		}
	
	}},

	componentWillMount : function() {
		this.faux = new Faux.createElement('svg');
		this.hook = createHook(this, this.faux, "torontoMap");

				var width = 1000, 
				height = 665;

    	//queue().defer(D3.json, '../map/toronto.json')
    	//.defer(D3.json, '../map/line.json').await(loaded);
		D3.json('../map/toronto.json', (error, toronto) => {
	D3.json('../map/line.json', (error, subwayStops) => {
		
		//D3.json('../map/toronto.json', toronto);
		//D3.json('../map/line.json', subwayStops);
		//var toronto = this.props.toronto;
		//var subwayStops = this.props.stations;
		//var error = this.props.error;
				this.svg = D3.select(this.faux)
    		.attr("width", width)
    		.attr("height", height)
    		 var pathArcsTop;


    var borders = Topojson.feature(toronto, toronto.objects.borders);
    var stations = Topojson.feature(subwayStops, subwayStops.objects.bloorline);

    var center = D3.geo.centroid(borders);
    var scale  = 200000;
    var offset = [530, -50];
    var projection = D3.geo.mercator().scale(scale).center(center).translate(offset);

    var path = D3.geo.path().projection(projection).pointRadius(5);

    this.svg.append("g").append("path")
    		.datum(borders)
    		.attr("d", path)
    		.attr("class", "toronto");
    var x1, x2, y1, y2;
		var linePaths = [];
		var linksTop = [];
        for(var i=0, len=stations.features.length-1; i<len; i++){
            // (note: loop until length - 1 since we're getting the next
            //  item with i+1)
							x1 = stations.features[i].geometry.coordinates[0];
            	y1 = (stations.features[i].geometry.coordinates[1])+0.0002;
            	x2 = stations.features[i+1].geometry.coordinates[0];
            	y2 = (stations.features[i+1].geometry.coordinates[1]+0.0002);
            linksTop.push(
                    [ x1, y1],
                    [ x2, y2]
            );
            linePaths.push({
                type: "LineString",
                coordinates: [
                    [ stations.features[i].geometry.coordinates[0], (stations.features[i].geometry.coordinates[1])+0.0002],
                    [ stations.features[i+1].geometry.coordinates[0], (stations.features[i+1].geometry.coordinates[1]+0.0002)]
                ]
            });

          }

    var linksTopFormat = [{type:"LineString", coordinates:linksTop}];

		var linksBottom = [];
        for(var i=0, len=stations.features.length-2; i<=len; len--){
            // (note: loop until length - 1 since we're getting the next
            //  item with i+1)
            linksBottom.push(
                    [ stations.features[len+1].geometry.coordinates[0], (stations.features[len+1].geometry.coordinates[1]-0.0004)],
                    [ stations.features[len].geometry.coordinates[0], (stations.features[len].geometry.coordinates[1])-0.0004]
            );
            linePaths.push({
                type: "LineString",
                coordinates: [
                    [ stations.features[len+1].geometry.coordinates[0], (stations.features[len+1].geometry.coordinates[1])],
                    [ stations.features[len].geometry.coordinates[0], (stations.features[len].geometry.coordinates[1])]
                ]
            });
          }
    var linksBottomFormat = [{type:"LineString", coordinates:linksBottom}];

    // Standard enter / update 
        pathArcsTop = this.svg.append("g").append("path")
            .data(linksTopFormat)
            .attr("class", "arcTop")
            .attr("d", path)
            .attr("id", "pathTop");
            //var l = pathArcsTop.node().getTotalLength();
            //console.log({l});
        var pathArcsBottom = this.svg.append("path")
            .data(linksBottomFormat)
            .attr("class", "arcBottom")
            .attr("d", path);

  for (var i = 0; i < linePaths.length; i++) {
    this.svg.append('path').data(linePaths.slice(i)).attr("class", "arcHiddenLine").attr("d", path).attr('id', 'hiddenLine' + i);
  };
        //enter
        /*
        pathArcsTop.enter()
            .append("path").attr('class', 'arcTop');

        pathArcsBottom.enter()
            .append("path").attr('class', 'arcBottom');

        //update
        /*pathArcsTop.attr({
                //d is the points attribute for this path, we'll draw
                //  an arc between the points using the arc function
                d: path
            });
*/

       // pathArcsBottom.attr('d', path);
        //exit
       //pathArcsTop.exit().remove();
      // pathArcsBottom.exit().remove();

      this.svg.append("path")
    		.datum(stations)
    		.attr("d", path)
    		.attr("class", "station").style("opacity",0).transition().duration(500).style("opacity",0.8).call(this.hook)
    		})});
    },
/*
    
		for (var i=0; i < links.length; i++) {
			if (i < linksTop.length) {
    	linePaths.push(<path className='arcTop' key={i} d={path(links[i])} />);
    	} else {
    		linePaths.push(<path className='arcBottom' key={i} d={path(links[i])} />);	
    	}
		}
	},
*/
	render : function() {

/*
		var bus = svg.append('rect')
				.attr('x', links[0][0])
				.attr('y', links[0][1])
				.attr('width', 10)
				.attr('height', 10);
*/
    return(
    	/*
			<svg width={width} height={height}>
  			<path className='toronto' d={path(borders)} />
  			<g>
  					{linePaths}
  			</g>
  			<path className='station' d={path(stations)} />
  			<rect x={links[0][0]} y={links[0][1]} width='10' height='10'></rect>
  		</svg>
  		*/

  		<div>
  		{this.state.torontoMap}
  		</div>
    )
	}


});
ReactDOM.render(<Tweet/>, document.querySelector('#main'));
ReactDOM.render(<TorontoMap/>, document.querySelector('#main2'));

/*
D3.json('../map/toronto.json', (error, toronto) => {
	D3.json('../map/line.json', (error, stations) => {
	ReactDOM.render(<TorontoMap error={error} toronto={toronto} stations={stations} />, document.querySelector('#main2'));
})});
*/