// Set the height and width for the SVG container
var h = 500;
var w = 300;

// Create a color scale that maps unemployment data to specific colors
// This scale will interpolate between the specified colors based on the data value
// 0-20 → Color 1 (#f2f0f7)
// 21-40 → Color 2 (#cbc9e2) and so on
var color = d3
  .scaleQuantize()
  .range(["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"]);

// Create a geographic projection using the Mercator projection
// Center the map on coordinates [145, -36.5] and translate it to the center of the SVG
// Scale the map to fit the SVG size
var projection = d3
  .geoMercator()
  .center([145, -36.5])
  .translate([w / 2, h / 2])
  .scale(2450);

// Create a path generator that will convert GeoJSON data to SVG paths using the projection
var path = d3.geoPath().projection(projection);

// Select the #chart element in the HTML, append an SVG, and set its width and height
var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

// Load the CSV data containing unemployment statistics
d3.csv("COS30045_week_8/VIC_LGA_unemployment.csv").then(function (data) {
  // Set the domain for the color scale based on the min and max unemployed values in the data
  color.domain([
    d3.min(data, (d) => +d.unemployed),
    d3.max(data, (d) => +d.unemployed),
  ]);

  // Load the GeoJSON data for the LGA
  d3.json("COS30045_week_8/LGA_VIC.json").then(function (json) {
    // Loop through the unemployment data
    for (var i = 0; i < data.length; i++) {
      var dataState = data[i].LGA; // Get the LGA name
      var dataValue = +data[i].unemployed; // Get the number of unemployed people

      // Loop through the GeoJSON features to find the matching LGA
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.LGA_name; // Get the LGA name from GeoJSON

        // If the LGA names match, add the unemployment value to the GeoJSON feature
        if (dataState === jsonState) {
          json.features[j].properties.value = dataValue;
          break; // Exit the loop once a match is found
        }
      }
    }

    // Append paths to the SVG for each GeoJSON feature
    svg
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path") // Add a 'path' element for each feature
      .attr("d", path) // Define the 'd' attribute using the path generator
      .style("fill", function (d) {
        var value = d.properties.value; // Get the unemployment value
        return value ? color(value) : "#ccc"; // Use color scale or a default color if no value
      })
      .style("stroke", "#fff"); // Set stroke color for the paths

    // Load additional CSV data for city locations
    d3.csv("COS30045_week_8/VIC_city.csv").then(function (cityData) {
      // Append circles to the SVG for each city in the data
      svg
        .selectAll("circle")
        .data(cityData)
        .enter()
        .append("circle") // Add a 'circle' element for each city
        .attr("cx", function (d) {
          return projection([+d.lon, +d.lat])[0]; // Get x-coordinate by projecting longitude
        })
        .attr("cy", function (d) {
          return projection([+d.lon, +d.lat])[1]; // Get y-coordinate by projecting latitude
        })
        .attr("r", 5) // Set the radius of the circles
        .attr("fill", "red") // Set the fill color for the circles
        .attr("stroke", "black") // Set the stroke color for the circles
        .on("mouseover", function (event, d) {
          // Calculate tooltip position based on cx and cy attributes
          var xPosition = parseFloat(d3.select(this).attr("cx"));
          var yPosition = parseFloat(d3.select(this).attr("cy"));

          // Labels
          svg
            .append("text")
            .attr("id", "tooltips")
            .attr("text-anchor", "middle")
            .attr("x", xPosition)
            .attr("y", yPosition - 10) // Offset the tooltip slightly above the circle
            .text(d.place);
        })
        .on("mouseout", function () {
          d3.select("#tooltips").remove();
        });
    });
  });
});
