var dataset = [10, 20, 30, 40, 50];

// Define width, height, and radius
var w = 400; // Define width
var h = 400; // Define height
var outerRadius = w / 2;
var innerRadius = 0;

// Define color scale before using it
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Create the arc generator
var arc = d3.arc().outerRadius(outerRadius).innerRadius(innerRadius);

// Create the pie layout
var pie = d3.pie();

// Create the SVG container and append it to the body
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

// Bind the data to the arcs
var arcs = svg
  .selectAll("g.arc")
  .data(pie(dataset)) // Correct data binding
  .enter()
  .append("g")
  .attr("class", "arc");

// Append the paths (slices) and set the color and arc path
arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i); // Use color scale
  })
  .attr("d", arc); // Use arc generator

// Append the text labels and set their position
arcs
  .append("text")
  .text(function (d) {
    return d.data; // Use d.data to get the value
  })
  .attr("transform", function (d) {
    return "translate(" + arc.centroid(d) + ")"; // Correct transformation using arc.centroid
  })
  .attr("text-anchor", "middle") // Center the text
  .attr("font-size", "12px"); // Set font size
