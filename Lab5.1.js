var w = 500;
var h = 300;
var padding = 30;

var dataset = [14, 5, 25, 23, 9, 5, 23, 25, 23, 12, 25, 21, 11];

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

// Labels
svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return d;
  })
  .attr("x", function (d, i) {
    return xScale(i) + xScale.bandwidth() / 2;
  })
  .attr("y", function (d) {
    return yScale(d) - 5;
  })
  .attr("text-anchor", "middle")
  .attr("fill", "black");

// Y-Axis
var yAxis = d3.axisLeft(yScale).ticks(5);

var yAxisGroup = svg
  .append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

// Button
d3.select("button").on("click", function () {
  var numValues = dataset.length;
  var maxValue = 25;

  dataset = [];

  for (var i = 0; i < numValues; i++) {
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);
  }

  // Update scale domain based on new data
  yScale.domain([0, d3.max(dataset)]);

  // Update bars
  svg
    .selectAll("rect")
    .data(dataset)
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("height", function (d) {
      return h - padding - yScale(d);
    });

  // Update labels
  svg
    .selectAll("text")
    .data(dataset)
    .text(function (d) {
      return d;
    })
    .attr("x", function (d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return yScale(d) - 5;
    });

  // Update the Y-Axis with new scale
  yAxisGroup.transition().duration(500).call(yAxis);
});
