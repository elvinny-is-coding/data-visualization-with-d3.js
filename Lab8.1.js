// Set up height and width for the SVG container
var h = 500;
var w = 300;

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

// Load the GeoJSON data (a map of Local Government Areas in Victoria, Australia)
d3.json("COS30045_week_8/LGA_VIC.json").then(function (json) {
  // For each feature in the GeoJSON, append a path to the SVG
  svg
    .selectAll("path")
    .data(json.features) // Bind data (features) to the SVG paths
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "grey") // Set the fill color of each area to grey
    .attr("stroke", "black"); // Set the stroke (border) color of each area to black
});
