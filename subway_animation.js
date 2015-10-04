
// get pixel coordinates 
function d3_geo_mercator(λ, φ) 
{
    return [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ];
}

$(document).ready(function () {    
            $.getJSON('map/subway_bloor.json', function (data) {
                var items = [];
                $.each(data.features, function (key, val) {
				    $.each(val.properties, function(i,j){
				        items.push('<li id="' + i + '">' + j + '</li>');
				    })              
				});
                $('<ul/>', {
                    'class':'my-new-list',
                    html:items.join('')
                }).appendTo('body');
                console.log(items)
            });
        });


var paper = Raphael(0,0,1200,800);
