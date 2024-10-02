// Initial dataset
var dataset = [14, 5, 25, 23, 9, 5, 23];

// Chart dimensions and padding
var w = 500;
var h = 300;
var padding = 30;

// Create SVG container
var svg = d3
  .select("#chart")
  .append("svg")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", w)
  .attr("height", h);

// Define scales
var xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([padding, w - padding])
  .paddingInner(0.05);

var yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([h - padding, padding]);

// Render the initial bars
var bars = svg.selectAll("rect").data(dataset);

bars
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
  .attr("fill", "teal")
  .on("mouseover", function (event, d) {
    // Color transition on mouseover
    d3.select(this).transition().duration(300).attr("fill", "orange");

    // Calculate tooltip position: center above the bar
    var xPosition =
      parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) + 30; // Place slightly above the bar

    svg
      .append("text")
      .attr("id", "tooltips")
      .attr("x", xPosition)
      .attr("y", yPosition)
      .text(d);
  })
  .on("mouseout", function () {
    // Return to original color on mouseout
    d3.select(this).transition().duration(300).attr("fill", "teal");

    d3.select("#tooltips").remove();
  });
// Browser tooltips
// .append("title")
// .text(function (d) {
//   return d;
// });

// Button functionality

// Add new data with btn1
d3.select(".btn1").on("click", function () {
  var maxValue = 25;
  var newNumber = Math.floor(Math.random() * maxValue);

  dataset.push(newNumber); // Add a new random number to the dataset

  updateBars();
});

// Remove the last data with btn2
d3.select(".btn2").on("click", function () {
  dataset.pop(); // Remove the last element from the dataset
  updateBars();
});

// Sort the data with btn3
d3.select(".btn3").on("click", function () {
  sortBars();
});

// Sort bars function with transitions
function sortBars() {
  // Sort dataset in ascending or descending order
  dataset.sort(ascending ? d3.ascending : d3.descending);

  // Toggle the sorting flag
  ascending = !ascending;

  // Update the xScale domain to reflect the new order of data
  xScale.domain(d3.range(dataset.length));

  // Reposition the bars based on the sorted dataset
  var bars = svg.selectAll("rect").data(dataset, (d, i) => d + "-" + i); // Create a unique key for each data point

  // Join data to bars with enter-update-exit pattern
  bars.join(
    // Enter selection
    (enter) =>
      enter
        .append("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", (d) => yScale(d)) // Use yScale to position bars correctly
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => h - padding - yScale(d)) // Set height correctly
        .style("fill", "teal")
        .call(
          (enter) =>
            enter
              .transition()
              .duration(1500) // Longer duration for better visibility
              .ease(d3.easeBounce) // Add easing for a more appealing transition
              .attr("x", (d, i) => xScale(i)) // Position bars based on sorted order
              .attr("y", (d) => yScale(d)) // Position using yScale
              .attr("height", (d) => h - padding - yScale(d)) // Adjust height correctly
        ),
    // Update selection
    (update) =>
      update
        .transition()
        .duration(1500) // Consistent duration with the enter transition
        .ease(d3.easeBounce) // Add easing for smoothness
        .attr("x", (d, i) => xScale(i)) // Position bars based on sorted order
        .attr("y", (d) => yScale(d)) // Position using yScale
        .attr("height", (d) => h - padding - yScale(d)), // Adjust height correctly
    // Exit selection
    (exit) =>
      exit
        .transition() // Fade out before removing
        .duration(1500)
        .ease(d3.easeCubicInOut) // Easing for exit transition
        .style("opacity", 0) // Fade out
        .remove() // Remove the elements after fade-out
  );
}

// Initialize ascending flag for sorting
var ascending = true;

// Function to update bars after adding/removing data
function updateBars() {
  // Update scales
  xScale.domain(d3.range(dataset.length));
  yScale.domain([0, d3.max(dataset)]);

  // Bind data to bars
  var bars = svg.selectAll("rect").data(dataset);

  // Enter new bars
  bars
    .enter()
    .append("rect")
    .attr("x", w) // Start off-screen to the right
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return h - padding - yScale(d);
    })
    .attr("fill", "teal")
    .merge(bars) // Merge with existing bars
    .on("mouseover", function (event, d) {
      // Color transition on mouseover
      d3.select(this).transition().duration(300).attr("fill", "orange");

      // Calculate tooltip position: center above the bar
      var xPosition =
        parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
      var yPosition = parseFloat(d3.select(this).attr("y")) - 10; // Place slightly above the bar

      svg
        .append("text")
        .attr("id", "tooltips")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .text(d);
    })
    .on("mouseout", function () {
      // Return to original color on mouseout
      d3.select(this).transition().duration(300).attr("fill", "teal");

      d3.select("#tooltips").remove();
    })
    .transition() // Apply transitions after setting events
    .duration(500)
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return h - padding - yScale(d);
    });

  // Remove old bars
  bars
    .exit()
    .transition()
    .duration(500)
    .attr("x", -xScale.bandwidth()) // Move off-screen to the left
    .remove();
}
