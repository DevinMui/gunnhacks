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
        });
    }

    for (var i = 0; i < 5; i++) {
        addMarker(Math.random() * 360 - 180, Math.random() * 360 - 180, createPost("GunnHacks", "https://gunnhacks.com/img/logo.png", "Hello World? Hello World!", "15 minutes ago", i));
    }

    // Add the default gunnhacks marker
    addMarker(
        gunnhacks.lat,
        gunnhacks.lng,
        createPost(
            "GunnHacks",
            "https://gunnhacks.com/img/logo.png",
            "<img src=\"http://www.w3schools.com/css/img_fjords.jpg\" /><br />Hello World? Hello World!",
            "15 minutes ago",
            1
        )
    );
}

// This creates a post object that will be displayed on the map
// Name: name of the post
// Icon: URL to the picture of the person that posted
// Content: Picture or text of the post
// Date: When the post was posted
function createPost (name, icon, content, date) {
    postCount++;
    var image = {
        url: icon,
        scaledSize: new google.maps.Size(48, 48)
    };
    return {name: name, icon: image, content: content, date: date, id: postCount};
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
        map.setCenter(marker.position);
    });
}
