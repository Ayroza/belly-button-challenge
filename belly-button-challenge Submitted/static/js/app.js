//1 Use the D3 library to read in samples.json from the URL 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Create DROP DOWN Menu 
function init() {
  const dataPromise = d3.json(url);

console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  let samples = data.names
  let dropdownMenu = d3.select("#selDataset");
  console.log(data);

  samples.forEach((sample) => {
    dropdownMenu.append("option")
    .text(sample)
    .property("value", sample);
 
  });
  
  console.log(samples[0])
  buildCharts(samples[0]);
  buildMeta(samples[0]);
});
}

init();


function optionChanged(sampleID) {
buildCharts(sampleID);
buildMeta(sampleID);

}

//DEMOGRAPHIC INFO

function buildMeta(metaData) {
  d3.json(url).then(function(data) {
    let samples = data.metadata
  d3.style(samples,
  "fontsize = 16");
let result = samples.filter(x => x.id == metaData)
    console.log(result[0])
  
let dataMenu = d3.select("#sample-metadata");
dataMenu.html("")
  for (const [key, value] of Object.entries(result[0])) {
    console.log(key, value);
    dataMenu.append("h3").text(`${key}: ${value}`);


}});
};


// HORIZINTAL BAR CHART
function buildCharts(sampleID) {

  d3.json(url).then(function(data) {
  let samples = data.samples
  let result = samples.filter(x => x.id == sampleID)
    console.log(result[0])

  let sampleValue = result[0].sample_values;
  let otuID = result[0].otu_ids;
  let otuLabels = result[0].otu_labels;

// Sort the data by search results descending

let xValue = sampleValue.slice(0,10).reverse();
let yValue = otuID.slice(0,10).reverse();
let hover = otuLabels.slice(0,10).reverse();
console.log(xValue);
console.log(yValue);
console.log(hover);
// Slice the first 10 objects for plotting
 
// Reverse the array to accommodate Plotly's defaults
let trace1 = {
  x: xValue,
  y: yValue.map(id=>`OTU ${id}`),
  text: hover,
  name: "OTU",
  type: "bar",
  orientation: "h"
};

// Data array
// `data` has already been defined, so we must choose a new name here:
let traceData = [trace1];

// Apply a title to the layout
let layout = {
  title: "Top 10 OTUs",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100

  }
};
// Render the plot to the div tag with id "plot"
// Note that we use `traceData` here, not `data`
Plotly.newPlot("bar", traceData, layout);

//BUBBLE CHART

var trace2 = {
  x: otuID,
  y: sampleValue,
  text: otuLabels,
  mode: 'markers',
  marker: {
    color: otuID,
    opacity: [1, 0.8, 0.6, 0.4],
    size: sampleValue
  }
};

var data = [trace2];

var layout2 = {
  title: 'Bateria Per Sample',
  showlegend: false,
  height: 500,
  width: 1000
};

Plotly.newPlot('bubble', data, layout2);

  })}
  // On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);


//DEMOGRAPHIC INFO

function buildMeta(metaData) {
  d3.json(url).then(function(data) {
    let samples = data.metadata

let result = samples.filter(x => x.id == metaData)
    console.log(result[0])
  
let dataMenu = d3.select("#sample-metadata");
dataMenu.html("")
  for (const [key, value] of Object.entries(result[0])) {
    console.log(key, value);
    dataMenu.append("h1").text(`${key}: ${value}`);


}});
};

