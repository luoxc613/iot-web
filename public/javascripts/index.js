$(document).ready(function () {
  var timeData = [],
    temperatureData = [],
    humidityData = [],
    timeData1 = [],
    gasData=[];
 /* var data = {
    labels: timeData,
    datasets: [
      {
        fill: false,
        label: 'Temperature',
        yAxisID: 'Temperature',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: temperatureData
      },
      {
        fill: false,
        label: 'Humidity',
        yAxisID: 'Humidity',
        borderColor: "rgba(24, 120, 240, 1)",
        pointBoarderColor: "rgba(24, 120, 240, 1)",
        backgroundColor: "rgba(24, 120, 240, 0.4)",
        pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
        pointHoverBorderColor: "rgba(24, 120, 240, 1)",
        data: humidityData
      }
    ]
  }*/
  var data1={
    labels: timeData1,
    datasets: [
      {
        fill: false,
        label: 'Gas',
        yAxisID: 'Gas',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: gasData
      }
    ]
  }
/*
  var basicOption = {
    title: {
      display: true,
      text: 'Temperature & Humidity Real-time Data',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature(C)',
          display: true
        },
        position: 'left',
      }, {
          id: 'Humidity',
          type: 'linear',
          scaleLabel: {
            labelString: 'Humidity(%)',
            display: true
          },
          position: 'right'
        }]
    }
  }*/
  var basicOption1 = {
    title: {
      display: true,
      text: 'Gas Real-time Data',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'Gas',
        type: 'linear',
        scaleLabel: {
          labelString: 'Gas',
          display: true
        },
        position: 'left',
      }]
    }
  }

  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data1,
    options: basicOption1
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.gas) {
        return;
      }
      timeData.push(obj.time);
      gasData.push(obj.gas);
      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        gasData.shift();
      }

      
      myLineChart.update();
    } catch (err) {
      console.error(err);
    }
  }

 /* var ctx1 = document.getElementById("myChart1").getContext("2d");
  var optionsNoAnimation1= { animation: false }
  var myLineChart1 = new Chart(ctx1, {
    type: 'line',
    data: data1,
    options: basicOption1
  });

  var ws1 = new WebSocket('wss://' + location.host);
  ws1.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws1.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj1 = JSON.parse(message.data);
      if(!obj1.time || !obj1.gas) {
        return;
      }
      timeData1.push(obj1.time);
      gasData.push(obj1.gas);
      // only keep no more than 50 points in the line chart
      const maxLen1 = 50;
      var len1 = timeData1.length;
      if (len1 > maxLen1) {
        timeData1.shift();
        gasData.shift();
      }

      myLineChart1.update();
    } catch (err) {
      console.error(err);
    }
  }*/
});
