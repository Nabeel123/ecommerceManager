import React, { Component } from 'react';
// import Chart from "react-apexcharts";



const AnalyticsOrderGraph = (props) => {

    const Graph = {
          
        series: [76, 67, 61, 90],
        options: {
          chart: {
            height: 390,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: '50%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                }
              }
            }
          },
          colors: ['#db4774', '#16d8d8', '#39539E', '#0077B5'],
          labels: ['USA', 'Europe', 'Asia', 'Africa'],
          legend: {
            show: false,
            floating: true,
            fontSize: '12px',
            position: 'left',
            offsetX: -30,
            offsetY: -20,
            labels: {
              useSeriesColors: false,
            },
            markers: {
              size: 0
            },
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
              vertical: 3
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                  show: true
              }
            }
          }]
        },
      
      
      };
    

    return (
        <div className="bg-white p-2">
          Visitors Countries
            {/* <Chart
              options={Graph.options}
              series={Graph.series}
              type="donut"
              height= "220px"
            /> */}
        </div>
    );
}

export default AnalyticsOrderGraph;
