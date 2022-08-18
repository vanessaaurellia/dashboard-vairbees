function toggler(){ 
    document.getElementById('sidebar').classList.toggle('active');
}

/*$.ajax({
    method: 'GET',
    url: 'database/data.json',
    success: function(response) {
        document.getElementById("displayPageview").innerHTML = parseInt(response.reports[0].data.rows[0].metrics[0].values[0]).toLocaleString();
        document.getElementById("displayUser").innerHTML = parseInt(response.reports[0].data.rows[0].metrics[0].values[1]).toLocaleString();
        document.getElementById("displayTotalSession").innerHTML = parseInt(response.reports[0].data.rows[0].metrics[0].values[2]).toLocaleString();
        document.getElementById("displayAvgVisit").innerHTML = parseInt(response.reports[0].data.rows[0].metrics[0].values[3]);
    }
})*/

function chart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const ctx3 = document.getElementById('myChart3').getContext('2d');
    const ctx4 = document.getElementById('myChart4').getContext('2d');
    const ctx5 = document.getElementById('myChart5').getContext('2d');

    const pageViewsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
            ],
            datasets: [{
                label: 'Page view',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgb(241, 135, 0)',
                borderColor: 'rgb(241, 135, 0)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const userChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
            ],
            datasets: [{
                label: 'User',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgb(241, 135, 0)',
                borderColor: 'rgb(241, 135, 0)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const sessionChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
            ],
            datasets: [{
                label: 'Session',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgb(241, 135, 0)',
                borderColor: 'rgb(241, 135, 0)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const visitTimeChart = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
            ],
            datasets: [{
                label: 'Avg Visit Time',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgb(241, 135, 0)',
                borderColor: 'rgb(241, 135, 0)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const deviceChart = new Chart(ctx5, {
        type: 'doughnut',
        data: {
            labels: [
                'January',
                'February',
                'March',
            ],
            datasets: [{
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(118, 183, 67, 1)',
                    'rgba(249, 206, 48, 1)',
                    'rgba(224, 79, 26, 1)'
                ],
                hoverOffset: 4
            }]
        }
    });

    function loadPageVieweviceReports(token) {
        getGapiBatchReport(token, "date", {
            debug: true,
            callback: (response) => {
                const rows = response.reports[0].data.rows;
                const pageViewsMetrics = rows?.reduce((acc, e) => {
                    return {...acc, [e.dimensions[0]]: e.metrics[0].values[0]}
                }, 0)
                const labels = Object.keys(pageViewsMetrics)
                const values = Object.values(pageViewsMetrics)
                console.log(pageViewsMetrics)
                pageViewsChart.data.labels = labels
                pageViewsChart.data.datasets[0].data = values
                pageViewsChart.update();
            }
        })
    }
    
    function userReports(token) {
        getGapiBatchReport(token, "date", {
            debug: true,
            callback: (response) => {
                const rows = response.reports[0].data.rows;
                const userMetrics = rows?.reduce((acc, e) => {
                    return {...acc, [e.dimensions[0]]: e.metrics[0].values[1]}
                }, 0)
                const labels = Object.keys(userMetrics)
                const values = Object.values(userMetrics)
                console.log(userMetrics)
                userChart.data.labels = labels
                userChart.data.datasets[0].data = values
                userChart.update();
            }
        })
    }
    
    function sessionReports(token) {
        getGapiBatchReport(token, "date", {
            debug: true,
            callback: (response) => {
                const rows = response.reports[0].data.rows;
                const sessionMetrics = rows?.reduce((acc, e) => {
                    return {...acc, [e.dimensions[0]]: e.metrics[0].values[2]}
                }, 0)
                const labels = Object.keys(sessionMetrics)
                const values = Object.values(sessionMetrics)
                console.log(sessionMetrics)
                sessionChart.data.labels = labels
                sessionChart.data.datasets[0].data = values
                sessionChart.update();
            }
        })
    }
    
    function visitTimeReports(token) {
        getGapiBatchReport(token, "date", {
            debug: true,
            callback: (response) => {
                const rows = response.reports[0].data.rows;
                const visitTimeMetrics = rows?.reduce((acc, e) => {
                    return {...acc, [e.dimensions[0]]: e.metrics[0].values[3]}
                }, 0)
                const labels = Object.keys(visitTimeMetrics)
                const values = Object.values(visitTimeMetrics)
                console.log(visitTimeMetrics)
                visitTimeChart.data.labels = labels
                visitTimeChart.data.datasets[0].data = values
                visitTimeChart.update();
            }
        })
    }
    
    function loadDeviceReports(token) {
        getGapiBatchReport(token, "device", {
            debug: true,
            callback: (response) => {
                const rows = response.reports[0].data.rows;
                const devicesMetrics = rows?.reduce((acc, e) => {
                    return {...acc, [e.dimensions[0]]: e.metrics[0].values[1]}
                }, 0)
                const labels = Object.keys(devicesMetrics)
                const values = Object.values(devicesMetrics)
                console.log(devicesMetrics)
                deviceChart.data.labels = labels
                deviceChart.data.datasets[0].data = values
                deviceChart.update();
            }
        })
    }

    (()=>loadReports(access_token))();
    (()=>loadPageVieweviceReports(access_token))();
    (()=>userReports(access_token))();
    (()=>sessionReports(access_token))();
    (()=>visitTimeReports(access_token))();
    (()=>loadDeviceReports(access_token))();
}

var client;
let access_token = localStorage.getItem("VB_ACC_TOKEN") || null;

function getToken() {
    client.requestAccessToken();
}

function getGapiBatchReport(token, type = "default", { debug, callback } = { 
    debug: true, callback: (response) => {}
 }) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://analyticsreporting.googleapis.com/v4/reports:batchGet');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (debug) {
                console.log(xhr.responseText);
            }
            const response = JSON.parse(xhr.responseText);
            callback(response);
        }
    }

    xhr.send(
        JSON.stringify({
            reportRequests: [
                {
                    viewId: '264883937', 
                    dateRanges: [
                        {
                            startDate: '180daysAgo',
                            endDate: 'today'
                        }
                    ],
                    metrics: [
                        {'expression': 'ga:pageviews'},
                        {'expression': 'ga:users'}, 
                        {'expression': 'ga:sessions'}, 
                        {'expression': 'ga:avgSessionDuration'}
                        
                    ],
                    ...( type === "date" && {
                        dimensions: [
                            {'name': 'ga:date'}
                        ]
                    }),
                    
                    ...( type === "device" && {
                        dimensions: [
                            {'name': 'ga:deviceCategory'}
                        ]
                    }),

                    ...( type === "country" && {
                        dimensions: [
                            {'name': 'ga:country'}
                        ]
                    })
                }
            ]
        })
    );
}

function loadReports(token) {
    getGapiBatchReport(token, "default", {
        debug: true,
        callback: (response) => {
            document.getElementById("displayPageview").innerHTML = parseInt(response.reports[0].data.rows[0].metrics[0].values[0]).toLocaleString();
            document.getElementById("displayUser").innerHTML = parseInt(response.reports[0].data.rows[0].metrics[0].values[1]).toLocaleString();
            document.getElementById("displayTotalSession").innerHTML = parseInt(response.reports[0].data.rows[0].metrics[0].values[2]).toLocaleString();
            document.getElementById("displayAvgVisit").innerHTML = parseInt(response.reports[0].data.rows[0].metrics[0].values[3]);
        }
    })
}