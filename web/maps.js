var map;
var postCount;

function initMap () {
    // Get GunnHacks' position as a default
    var gunnhacks = {lat: 37.400814, lng: -122.132718};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: gunnhacks,
        mapTypeControl: false
    });
    
    // Get the current location and center view on it
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    addMarker(
        gunnhacks.lat,
        gunnhacks.lng,
        createPost(
            "A Random Position",
            "http://icons.veryicon.com/32/System/Mini%201/User.png",
            "Hello World, this is a post!",
            "15 minutes ago",
            1
        )
    );
}

// This creates a post object that will be displayed on the map
function createPost (name, icon, content, date) {
    postCount++;
    return {name: name, icon: icon, content: content, date: date, id: postCount};
}

// This creates a marker on the map at the lat,lng positions
// The id is to be used later to place and display information about the marker
function addMarker (lat, lng, post) {
    // Create the marker object on the map
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: post.name,
        icon: post.icon
    });

    var infoContent = "<div id=\"post-info-" + post.id +"\"><h3 class=\"post-info-title\">" + post.name + "</h3><p class=\"post-info-content\">" + post.content + "</p><span class=\"post-info-date\">" + post.date + "</span></div>";

    var infowindow = new google.maps.InfoWindow({
        content: infoContent
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

// Handles all the location errors
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }
