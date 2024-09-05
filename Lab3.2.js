var w = 500;
var h = 200;

var padding = 20;

var dataset = [
  [5, 20, 12],
  [400, 90, 22],
  [250, 20, 23],
  [300, 50, 12],
  [100, 95, 16],
  [410, 12, 12],
  [406, 44, 10],
];

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

// Svg
var svg = d3.select("#plot").append("svg").attr("width", w).attr("height", h);

svg
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d[0]))
  .attr("cy", (d) => yScale(d[1]))
  .attr("r", 5)
  .attr("fill", "cyan");

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

// Axis
var xAxis = d3.axisBottom().ticks(5).scale(xScale);
var yAxis = d3.axisLeft().ticks(5).scale(yScale);

svg
  .append("g")
  .attr("transform", "translate(0, " + (h - padding) + ")")
  .call(xAxis);

svg
  .append("g")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
