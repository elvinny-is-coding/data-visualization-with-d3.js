function init() {
  var w = 600;
  var h = 300;
  var padding = 60; // Add padding for the axes

  d3.csv("/COS30045 1.1 Resources/Lab7.1.csv", function (d) {
    return { date: new Date(+d.year, +d.month - 1), number: +d.number };
  }).then(function (dataset) {
    // Scales with padding
    var xScale = d3
      .scaleTime()
      .domain([
        d3.min(dataset, function (d) {
          return d.date;
        }),
        d3.max(dataset, function (d) {
          return d.date;
        }),
      ])
      .range([padding, w - padding]); // Add padding on both sides

    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return d.number;
        }),
      ])
      .range([h - padding, padding]); // Invert the y-axis and add padding

    // Define the line generator
    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.date);
      })
      .y(function (d) {
        return yScale(d.number);
      });

    // Create the SVG and append the line
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg.append("path").datum(dataset).attr("class", "line").attr("d", line);

    // Adding Axes
    var xAxis = d3.axisBottom(xScale); // X-axis at the bottom
    var yAxis = d3.axisLeft(yScale); // Y-axis on the left

    // Append x-axis to the SVG
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${h - padding})`) // Position at the bottom
      .call(xAxis);

    // Append y-axis to the SVG
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${padding}, 0)`) // Position on the left
      .call(yAxis);

    // Annotation
    // Add a line to mark 500,000 unemployed
    svg
      .append("line")
      .attr("class", "halfMilMark")
      // Start of line (x1, y1)
      .attr("x1", padding)
      .attr("y1", yScale(500000))
      // End of line (x2, y2)
      .attr("x2", w - padding) // Ensure it ends within the chart area
      .attr("y2", yScale(500000));

    // Add text label for the annotation
    svg
      .append("text")
      .attr("class", "halfMilLabel")
      .attr("x", padding + 10) // Adjust x to be slightly away from the padding
      .attr("y", yScale(500000) - 7) // Place the label slightly above the line
      .text("Half a million unemployed");

    // Define the area generator
    var area = d3
      .area()
      .x(function (d) {
        return xScale(d.date); // Use xScale for the x-axis
      })
      // Base line for area shape (the bottom of the chart)
      .y0(function () {
        return yScale.range()[0]; // The lowest value of the y-axis (usually 0)
      })
      // The y1 function defines the top of the area
      .y1(function (d) {
        return yScale(d.number); // The actual data points
      });

    // Update the SVG append to use the area generator instead of line
    svg.append("path").datum(dataset).attr("class", "area").attr("d", area); // Use the area generator

    console.table(dataset); // To inspect the data in the browser console
  });
}

init();
