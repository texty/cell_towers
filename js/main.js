(function() {

    var source = $("#info-box-template").html();
    var infobox_template = Handlebars.compile(source);

    var map = L.map('map', {
        center: [50.46, 30.5],
        zoom: 9,
        renderer: L.canvas(),
        scrollWheelZoom: false
    });


    var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 15
    });

    CartoDB_DarkMatter.addTo(map);

    var dateFormat = d3.timeFormat("%d.%m.%Y");

    d3.csv("data/grouped.csv", function(err, csv_data) {

        if (err) throw err;

        var geojson = csv_data.map(function(d) {
            return {
                type: "Feature",
                properties: d,
                geometry: {
                    type: "Point",
                    coordinates: [ d.lon, d.lat ]
                }
            };
        });

        geojson.forEach(function (d) {
            d.properties.docs_text=d.properties.docs;
            d.properties.docs=d.properties.docs.split("\n")
                .map(function(d) { return {id: d} });
        });


        function onEachFeature(feature, layer) {
            var popupContent = "<p>" + feature.properties.docs;

            layer.bindPopup(popupContent);
        }

        var default_color = "#ff7800";

        var selected_layer;
        // var hover_layers = [];


        var default_style = {fillColor: default_color, fillOpacity: 0.25};
        var hover_style = {fillColor: "#1E90FF", fillOpacity: 0.8};
        var hover_background_style = {fillColor: default_color, fillOpacity: 0.1};

        var selected_style = {fillColor: "#1E90FF", fillOpacity: 0.8};



        var points_layer = L.geoJSON(geojson, {

            style: function (feature) {
                return {
                    radius: 3,
                    fillColor: default_color ,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.25,
                    stroke: 0
                };
            },

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            }
        });


        points_layer.on("click", function(e) {
            var props = e.layer.feature.properties;
            join_date(props);

            var active_layer = e.layer;

            showInfobox(props);

            select_layer(active_layer);

            join_layers(props, points_layer);


            var rows = d3.selectAll(".map-popup-container li a");
            
            rows.on("mouseover", function() {
                    console.log("mouseover");
                    hover_id(active_layer, this.text);

                    rows.classed("hover", false);
                    d3.select(this).classed("hover", true);
                });
                // .on("mouseleave", clear_hover);
        });

        points_layer.addTo(map);


        function select_layer(layer) {
            points_layer.setStyle(default_style);
            // if (selected_layer) selected_layer.setStyle(default_style);
            layer.setStyle(selected_style);
            selected_layer = layer;
        }

        function hover_id(layer, doc_id) {
            points_layer.setStyle(hover_background_style);

            layer.feature.properties.docs
                .filter(function(d) {return d.id == doc_id})[0].layers
                .forEach(function(l) {l.setStyle(hover_style)});
        }

        function clear_hover() {
            points_layer.setStyle(default_style);
            if (selected_layer) selected_layer.setStyle(selected_style);
        }

    });


    function join_date(properties) {
        properties.docs.forEach(function(d) {
            d.date = dateFormat(documents.getById(d.id).adjudication_date);
        });
    }

    function join_layers(properties, points_layer) {
        properties.docs.forEach(function(d) {
            d.layers = [];

            points_layer.eachLayer(function(l) {
                if (l.feature.properties.docs_text.indexOf(d.id) >= 0) d.layers.push(l);
            });
        });
    }

    function showInfobox(properties) {
        d3.select(".map-popup-content").html(infobox_template(properties));

        const container = document.querySelector('#ul-container');
        Ps.initialize(container, {
            suppressScrollX: true
            
        });
    }


})();

