// Define the dataset
var dataset = [
  { apples: 5, oranges: 10, grapes: 22 },
  { apples: 4, oranges: 12, grapes: 28 },
  { apples: 2, oranges: 19, grapes: 32 },
  { apples: 7, oranges: 23, grapes: 35 },
  { apples: 23, oranges: 17, grapes: 43 },
];

// Define the keys (categories)
var keys = ["apples", "oranges", "grapes"];

// Set up the stack function
var stack = d3.stack().keys(keys); // Specify the keys to stack

// Apply the stack function to the dataset
var series = stack(dataset);

// Define SVG dimensions
var w = 500;
var h = 300;
var margin = { top: 20, right: 220, bottom: 30, left: 40 };
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

// Set up color scale
// Categorical
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Define the x-scale (for positioning each bar group)
var xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length)) // Number of data points
  .range([0, width])
  .padding(0.1); // Space between bars

// Define the y-scale (for bar heights)
var yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d.apples + d.oranges + d.grapes)]) // Maximum stacked value
  .range([height, 0]); // Reverse, as SVG's origin (0,0) is top-left

// Create the SVG container inside <p id="chart">
var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Create groups for each series
var groups = svg
  .selectAll("g.layer")
  .data(series)
  .enter()
  .append("g")
  .attr("class", "layer")
  .style("fill", function (d, i) {
    return color(i);
  });

// Create the rectangles for each stacked layer
groups
  .selectAll("rect")
  .data(function (d) {
    return d;
  })
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i); // Position based on index
  })
  .attr("y", function (d) {
    return yScale(d[1]); // Top of the rectangle (stacked position)
  })
  .attr("height", function (d) {
    return yScale(d[0]) - yScale(d[1]); // Height is the difference between top and bottom of the stack
  })
  .attr("width", xScale.bandwidth()); // Width based on the x-scale's bandwidth

// Add the y-axis
svg.append("g").attr("class", "axis y-axis").call(d3.axisLeft(yScale));

// Add Legends
svg
  .append("circle")
  .attr("cx", 300)
  .attr("cy", 100)
  .attr("r", 6)
  .style("fill", "rgb(44, 160, 44)");
svg
  .append("circle")
  .attr("cx", 300)
  .attr("cy", 130)
  .attr("r", 6)
  .style("fill", "rgb(255, 127, 14)");
svg
  .append("circle")
  .attr("cx", 300)
  .attr("cy", 160)
  .attr("r", 6)
  .style("fill", "rgb(31, 119, 180)");
svg
  .append("text")
  .attr("x", 320)
  .attr("y", 100)
  .text("apples")
  .style("font-size", "15px")
  .attr("alignment-baseline", "middle");
svg
  .append("text")
  .attr("x", 320)
  .attr("y", 130)
  .text("oranges")
  .style("font-size", "15px")
  .attr("alignment-baseline", "middle");
svg
  .append("text")
  .attr("x", 320)
  .attr("y", 160)
  .text("grapes")
  .style("font-size", "15px")
  .attr("alignment-baseline", "middle");
