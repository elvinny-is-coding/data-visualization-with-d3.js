function init() {
  d3.csv("/COS30045 1.1 Resources/wombats.csv").then(function (data) {
    console.log(data);
    wombatSighting = data;

    barChart(wombatSighting);
  });

  var w = 500;
  var h = 100;

  var padding = 3;

  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  function barChart(dataset) {
    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return i * (w / dataset.length);
      })
      .attr("y", function (d) {
        return h - d.wombats * 4;
      })
      .attr("width", function (d) {
        return w / dataset.length - padding;
      })
      .attr("height", function (d) {
        return d.wombats * 4;
      })
      .attr("fill", function (d) {
        maxDataset = dataset.length;

        const normalizedValue = d.wombats / maxDataset;

        const colorIntensity = Math.min(Math.round(normalizedValue * 100), 255);

        console.log(colorIntensity);

        return `rgb(${colorIntensity}, ${colorIntensity}, 255)`;
      });

    svg
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function (d) {
        return d.wombats;
      })
      .attr("x", function (d, i) {
        return i * (w / dataset.length) + (w / dataset.length - padding) / 2; // Center the text
      })
      .attr("y", function (d) {
        return h - d.wombats * 4 - 5; // Position text above the bar
      })
      .attr("text-anchor", "middle") // Center the text horizontally
      .attr("fill", "black"); // Text color
  }
}

window.onload = init;
