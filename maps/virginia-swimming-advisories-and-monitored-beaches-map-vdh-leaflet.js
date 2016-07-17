    $(document).ready(function(){
      // url to get geoJSON from
      // virginia-swimming-advisories-and-monitored-beaches-map-vdh-googlemymap.geojson
      var jsonURL = "https://raw.githubusercontent.com/sunlightpolicy/opendata/master/USlocalpolicylocations.geoJSON";
      // get the getJSON from url
      $.getJSON(jsonURL, function(data) {

if (val['properties'].hasOwnProperty('City') && val['properties']['City'] != '') {
      		  
      		  // gets the locations in the geoJSON that have a city property
        var locations = [];
        $.each(data['features'], function(key, val) {
          // if (val['properties'].hasOwnProperty('City') && val['properties']['City'] != '') {
          if (val['properties'].hasOwnProperty('coordinates'] != '') {
            locations.push(val);
          }
        });

        // set up map
        var map = L.map('mapid').setView([38, -97], 4);
        var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; ' + mapLink + ' Contributors',
          maxZoom: 18
        }).addTo(map);

        // set up icons for markers
        var wwcIcon = L.icon({ iconUrl: 'pin-wwc.png', iconSize: [24, 38] });
        var odpIcon = L.icon({ iconUrl: 'pin.png', iconSize: [24, 38]});

        // iterate over locations in geoJSON which have cities (previously extracted above) and create markers
        // on the map. The coordinates are flipped because of translation from lat/lng to x/y coordinates.
        for (var i = 0; i < locations.length; i++) {
          // determine which icon to use based on property in geoJSON using ternary operator (shorthand if/else)
          var icon = locations[i]['properties']['WWC'] == 'True' ? wwcIcon : odpIcon;
          // get coordinates of location.
          var coords = locations[i]['geometry']['coordinates'];
          
// {"type":"Feature","properties":{
//		"County":"Montgomery County",
//		"Date":"12/04/2012",
//		"Legal Means":"Legislation",
//		"Policy URL":"http://www6.montgomerycountymd.gov/content/council/pdf/agenda/cm/2012/121126/20121126_GO2.pdf",
//		"WWC":"False"}
// // county
// {"type":"Feature","properties":{"County":"Howard County","Date":"7/7/2014","Legal Means":"Legislation","Policy URL":"https://apps.howardcountymd.gov/olis/LegislationDetail.aspx?LegislationID=839","WWC":"False"}
// city
// {"type":"Feature","properties":{"City":"Oakland, CA","Date":"10/15/2013","Legal Means":"Legislation","Policy URL":"http://www.scribd.com/doc/171673962/Resolution-Establishing-An-Open-Data-Policy-For-The-City-Of-Oakland-For-Making-Public-Data-Available-In-Machine-Readable-Formats-Using-Open-Data-Stand","WWC":"False"},"geometry":{"type":"Point","coordinates":[-122.2723388671875,37.814123701604466]}}

// using county here...pretty sure city is needed also...use both or go with "locality"? something else?
// datetime=\"" . locations[i]['properties']['Date'] + "\"
// var v01 = "<h1>" + locations[i]['properties']['Date'] + "<b style='font-size:65px; display:block'>v01</b>" + locations[i]['properties']['Policy URL'] + "</h1>";
          // var mapPinDate = "<time datatime=\"" + locations[i]['properties']['Date'] + "\">" + locations[i]['properties']['Date'] + "</time>"; 
          // var mapPinLinkPolicyURL = "<a href=\"" + locations[i]['properties']['Policy URL'] + "\">Policy URL</a>";
          // var mapPinH1 = "<h1 class=\"map-pin-h1\">" + locations[i]['properties']['City'] + "</h1>";
          
          // ask andy
          // var mapPinList = "<ul class\"xoxo map-pin-list\">";
          // mapPinList += "<li>Link One</li>";
          // mapPinList += "</ul>";
          
          // var mapPinList01 = "<ul class\"xoxo map-pin-list\">";
          // var mapPinList02 = "<li>" + mapPinH1 + "</li>";
          // var mapPinList03 = "<li>" + mapPinLinkPolicyURL + "</li>";
          // var mapPinList04 = "<li><b>Date Signed:</b> " + mapPinDate + "</li>";
          // var mapPinList05 = "<li><b>Legal Means</b>: " + locations[i]['properties']['Legal Means'] + "</li>";
          // var mapPinListClose = "</ul>";
          // var mapPinListContent = mapPinList01 + mapPinList02 + mapPinList03 + mapPinList04 + mapPinList05 + mapPinListClose;
          var mapPinContent = "<div class=\"map-pin-content\">" + mapPinListContent + "</div>";
          

          // create marker at specified coordinates (swapped to convert lat/lng to x/y) and add popup on click.
          // var marker = L.marker([coords[1], coords[0]], {icon: icon}).bindPopup('<a href="' + locations[i]['properties']['Policy URL'] + '">Policy Link</a>').addTo(map);
          var marker = L.marker([coords[1], coords[0]], {icon: icon}).bindPopup(mapPinContent).addTo(map);
          
          
        }
      });
    });