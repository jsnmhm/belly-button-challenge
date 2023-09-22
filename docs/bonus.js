// function gaugeChart(freq) {// Enter a speed between 0 and 180
//     var degrees = 180 - (freq * 20),
//         radius = .5;
//     var radians = degrees * Math.PI / 180;
//     var x = radius * Math.cos(radians);
//     var y = radius * Math.sin(radians);

//     // Path: may have to change to create a better triangle
//     var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
//         pathX = String(x),
//         space = ' ',
//         pathY = String(y),
//         pathEnd = ' Z';
//     var path = mainPath.concat(pathX,space,pathY,pathEnd);

//     var data = [{ type: 'scatter',
//     x: [0], y:[0],
//         marker: {size: 28, color:'850000'},
//         showlegend: false,
//         name: 'speed',
//         text: level,
//         hoverinfo: 'skip'},
//     { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,  50],
//     rotation: 90,
//     text: ['8-9', '7-8', '6-7', '5-6',
//             '4-5', '3-4', '2-3', '1-2', '0-1', ''],
//     textinfo: 'text',
//     textposition:'inside',
//     marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(44, 139, 0, .5)',
//     'rgba(74, 150, 0, .5)', 'rgba(104, 161, 0, .5)', 'rgba(134, 172, 0, .5)',
//     'rgba(164, 183, 0, .5)', 'rgba(194, 194, 0, .5)', 'rgba(202, 209, 95, .5)',
//     'rgba(210, 206, 145, .5)', 'rgba(255, 255, 255, 0)']},
//     hoverinfo: 'skip',
//     hole: .5,
//     type: 'pie',
//     showlegend: false
//     }];

//     var layout = {
//     shapes:[{
//         type: 'path',
//         path: path,
//         fillcolor: '850000',
//         line: {
//             color: '850000'
//         }
//         }],
//     title: '<b>Gauge</b> <br> Wash Frequency',
//     height: 500,
//     width: 500,
//     xaxis: {zeroline:false, showticklabels:false,
//                 showgrid: false, range: [-1, 1]},
//     yaxis: {zeroline:false, showticklabels:false,
//                 showgrid: false, range: [-1, 1]}
//     };

//     Plotly.newPlot('gauge', data, layout);

// }