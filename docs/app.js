
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let sample_values;
let otu_ids;
let otu_labels;
let fullData;

d3.json(url).then((data) => {    
    fullData = data;
    const testSubjects = data.names;
    const filterData = getSamplesById(testSubject[0], data);
    sample_values = filterData.sample_values;
    otu_ids = filterData.otu_ids;
    otu_labels = filterData.otu_labels;

    populateDropdown(testSubjects);
    barChart(otu_ids, sample_values, otu_labels);    
    bubbleChart(otu_ids, sample_values, otu_labels);
    populateDemographics(testSubject[0], data);
    gaugeChart(testSubject[0], data);
});

function populateDropdown(subjectNames) {
    const dropDown = d3.select("#selDataset").node();
    for(let i = 0; i < subjectNames.length; i++) {
        const opt = subjectNames[i];
        const el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        dropDown.appendChild(el);
    }
}

function getSamplesById(id, data) {    
    const sampleData = data.samples.find(sample => sample.id === id);

    if (sampleData) {
        return sampleData;
    } else {
        return [];
    }    
}

function populateDemographics(id, data) {
    const demo = data.metadata.find(mtd => mtd.id.toString() === id);
    demoDisplay = d3.select("#sample-metadata");

    demoDisplay.selectAll("p").remove();

    demoDisplay.append("strong").append("p").text(`id: ${demo.id}`);
    demoDisplay.append("strong").append("p").text(`ethnicity: ${demo.ethnicity}`);;
    demoDisplay.append("strong").append("p").text(`gender: ${demo.gender}`);
    demoDisplay.append("strong").append("p").text(`age: ${demo.age}`);
    demoDisplay.append("strong").append("p").text(`location: ${demo.location}`);
    demoDisplay.append("strong").append("p").text(`bbtype: ${demo.bbtype}`);
    demoDisplay.append("strong").append("p").text(`wfreq: ${demo.wfreq}`);
}

function bubbleChart(ids, values, labels) {
    const trace = {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
            size: values,
            color: ids,
            sizeref: 2
        }        
    };

    const plotData = [trace];
    const layout = {
        title: "",
        height: 500,
        xaxis: {range: [0, 4000]},
        yaxis: {range: [0, 700]}
    };

    Plotly.newPlot("bubble", plotData, layout);
}

function animateBubbleChart(ids, values, labels) {
    const updatedTrace = {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
            size: values,
            color: ids,
            sizeref: 2
        }        
    };

    const xMax = Math.max(...ids);
    const yMax = Math.max(...values);

    const layout = {
        title: ""  
    };

    Plotly.update("bubble");

    const animation = {
        data: [updatedTrace],
        traces: [0]
    };

    Plotly.animate("bubble", animation, { 
        transition: { 
            duration: 1000 
        }, frame: { 
            duration: 1000, 
            redraw: true 
        } 
    });
}

function barChart(ids, values, labels) {    
    const y_data = ids.map(otu_ids => "OTU " + otu_ids);
    const trace = {
        type: "bar",
        orientation: "h",
        x: values.slice(0, 10).reverse(),
        y: y_data.slice(0, 10).reverse(),
        text: labels.slice(0, 10).reverse()
    };

    const plotData = [trace];
    const layout = {
        title: "Top 10 Specimens Collected"
    };

    Plotly.newPlot("bar", plotData, layout)
}

function animateBarChart(ids, values, labels) {
    const y_data = ids.map(otu_ids => "OTU " + otu_ids);
    const updatedTrace = {
        type: "bar",
        orientation: "h",
        x: values.slice(0, 10).reverse(),
        y: y_data.slice(0, 10).reverse(),
        text: labels.slice(0, 10).reverse()
    };

    const animation = {
        data: [updatedTrace],
        traces: [0],
        layout: {},
    };

    Plotly.animate("bar", animation, { 
        transition: { 
            duration: 1000 
        }, frame: { 
            duration: 1000, 
            redraw: true 
        } 
    });
}

function gaugeChart(id, data) {
    const demo = data.metadata.find(mtd => mtd.id.toString() === id);
    const wfreq = demo.wfreq;    
    
    var degrees = 180 - (wfreq * 20),
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: wfreq,
        hoverinfo: 'skip'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,  50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(44, 139, 0, .5)',
    'rgba(74, 150, 0, .5)', 'rgba(104, 161, 0, .5)', 'rgba(134, 172, 0, .5)',
    'rgba(164, 183, 0, .5)', 'rgba(194, 194, 0, .5)', 'rgba(202, 209, 95, .5)',
    'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)']},
    hoverinfo: 'skip',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: '<b>Gauge</b> <br> Wash Frequency',
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
}


function optionChanged(val) {
    newData = getSamplesById(val, fullData);
    
    sample_values = newData.sample_values;
    otu_ids = newData.otu_ids;
    otu_labels = newData.otu_labels ;
    
    animateBarChart(otu_ids, sample_values, otu_labels);
    populateDemographics(val, fullData);
    animateBubbleChart(otu_ids, sample_values, otu_labels);
    gaugeChart(val, fullData);
}




