import React, { Component } from 'react';
// import Chart from 'react-apexcharts';

const AnalyticsSaleGraph = (props) => {

    const data = {
        
        
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            },
            colors: ['#546E7A', '#E91E63'],
        },
        series: [{
            name: 'Amazon',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
    ]
    };




    return (
        <div className="bg-white p-2">
            <div className="salegraph">
                {/* <Chart options={data.options} series={data.series} type="area" height={220}/> */}
            </div>
        </div>
    );
}

export default AnalyticsSaleGraph;
