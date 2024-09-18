var w = 500;
var h = 400;

var padding = 38;

var dataset = [
  [2, 9],
  [3, 5],
  [5, 17],
  [6, 6],
  [6, 12],
  [7, 20],
  [8, 22],
  [10, 11],
  [5, 12],
  [6, 16],
];

// SCALE
// Plus 10 is just the padding on the left right for x scale, top bottom for y scale
// Domain represent the set of values you want to represent
// Range represent the output of the values to map domain to pixel

var xScale = d3
  .scaleLinear()
  .domain([
    d3.min(dataset, (d) => d[0]) - 10,
    d3.max(dataset, (d) => d[0]) + 10,
  ])
  .range([padding, w - padding]);

var yScale = d3
  .scaleLinear()
  .domain([
    d3.min(dataset, (d) => d[1]) - 10,
    d3.max(dataset, (d) => d[1]) + 10,
  ])
  .range([h - padding, padding]);

// Insert SVG to #plot
var svg = d3.select("#plot").append("svg").attr("width", w).attr("height", h);

// Create the data point and assign their attribute
svg
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d[0]))
  .attr("cy", (d) => yScale(d[1]))
  .attr("r", 5)
  .attr("fill", "cyan");

// Create labels for the data point
svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => d[0] + "," + d[1])
  .attr("x", (d) => xScale(d[0]))
  .attr("y", (d) => yScale(d[1]) - 10)
  .attr("font-size", "10px")
  .attr("fill", "black");

// Create y and x axis
var xAxis = d3.axisBottom().ticks(5).scale(xScale);
var yAxis = d3.axisLeft().ticks(5).scale(yScale);

// insert "g" element in svg
// apply transform to position axis
svg
  .append("g")
  .attr("transform", "translate(0, " + (h - padding) + ")")
  .call(xAxis);

svg
  .append("g")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

// Add X axis label
svg
  .append("text")
  .attr("text-anchor", "end")
  .attr("x", w - 34)
  .attr("y", h - 4)
  .text("Tree Age (year)");

// Y axis label:
svg
  .append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", 10)
  .attr("x", -38)
  .text("Tree Height (m)");
