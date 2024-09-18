var w = 500;
var h = 300;
var padding = 30;

var dataset = [14, 5, 25, 23, 9, 5, 23];

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", w)
  .attr("height", h);

// Define scales
const xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([padding, w - padding])
  .paddingInner(0.05);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([h - padding, padding]);

// Bars
svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("y", function (d) {
    return yScale(d);
  })
  .attr("width", xScale.bandwidth())
  .attr("height", function (d) {
    return h - padding - yScale(d);
  })
  .attr("fill", "teal");

// Button
d3.select(".btn1").on("click", function () {
  var numValues = dataset.length;
  var maxValue = 25;

  // Generate a new random number and add it to the dataset
  var newNumber = Math.floor(Math.random() * maxValue);
  dataset.push(newNumber);

  // Update the scales to reflect the new dataset size and values
  xScale.domain(d3.range(dataset.length));

  // Bind the updated dataset to the bars
  var bars = svg.selectAll("rect").data(dataset);

  // Enter selection: Append new bars for the newly added data point
  bars
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", h - padding) // Start from the bottom of the graph
    .attr("width", xScale.bandwidth())
    .attr("height", 0) // Initial height set to 0 for animation effect
    .attr("fill", "teal")
    .merge(bars) // Merge with update selection
    .transition()
    .duration(500)
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("height", function (d) {
      return h - padding - yScale(d);
    });
});

d3.select(".btn2").on("click", function () {
  dataset.shift();

  // Update the scales to reflect the new dataset size and values
  xScale.domain(d3.range(dataset.length));

  // Bind the updated dataset to the bars
  var bars = svg.selectAll("rect").data(dataset);

  bars
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", h - padding) // Start from the bottom of the graph
    .attr("width", xScale.bandwidth())
    .attr("height", 0) // Initial height set to 0 for animation effect
    .attr("fill", "teal")
    .merge(bars) // Merge with update selection
    .transition()
    .duration(500)
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("height", function (d) {
      return h - padding - yScale(d);
    });

  // Append new bars for the newly added data point
  bars.exit().transition().duration(500).attr("x", w).remove();
});
