let arrLable = [];
let arrBubble = [];
let Ex = 0;
let Ey = 0;
let xIntoY = [];
let Exy = 0;
let x2 = [];
let Ex2 = 0;
let y2 = [];
let Ey2 = 0;


$.ajax({
    url: 'Get',
    type: 'GET',
    success: function (regressionData) {
        if (regressionData) {
            const { data } = regressionData
            let length = data.length;
            for (let i = 0; i < length; i++) {
                arrLable.push(data[i].X);
                arrBubble.push(data[i].Y);
            }

            let ctx = document.getElementById('scatter');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: makeLabels().labels,
                    datasets: [{
                        type: 'line',
                        label: 'Data',
                        data: makeLabels().labels,
                        fill: false,
                        backgroundColor: "rgba(218,83,79, .7)",
                        borderColor: "rgba(218,83,79, .7)",
                        pointRadius: 0
                    }, {
                        type: 'scatter',
                        label: 'Data2',
                        data: makeBubbles(),
                        backgroundColor: "rgba(76,78,80, .7)",
                        borderColor: "transparent"
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom',
                            ticks: {
                                autoSkip: true,
                                max: Math.max(...makeLabels().array)
                            }
                        }]
                    }
                }
            });
            linerRegression(arrLable, arrBubble);
        }
    }
});

const makeLabels = () => {
    arrLable = arrLable.sort((a, b) => a - b);
    let newarr = arrLable.map(item => ({ x: item, y: item }));
    return {
        labels: newarr,
        array: arrLable
    };
};

const makeBubbles = () => {
    arrBubble = arrBubble.map((item, i) => {
        return { x: item, y: arrBubble[i - 1] }
    });
    return arrBubble;
};


const linerRegression = (arrX, arrY) => {
    let n = arrX.length;
    for (let i = 0; i < n; i++) {
        Ex += parseFloat(arrX[i]);
        Ey += parseFloat(arrY[i].x);
        xIntoY.push(arrX[i] * arrY[i].x);
        Exy += parseFloat(xIntoY);
        x2.push(arrX[i] * arrX[i]);
        Ex2 += parseFloat(x2[i]);
        y2.push(arrY[i].x * arrY[i].x);
        Ey2 += parseFloat(y2[i]);
    }

    let xBar = Ex / n;
    let yBar = Ey / n;
    let coefficient = ((n * Exy) - (Ex * Ey)) / Math.sqrt((n * Ex2 - (Ex * Ex))) * Math.sqrt((n * Ey2 - (Ey * Ey)));
    let divC = document.getElementById('coefficient');
    divC.innerText = 'Coefficient:' + coefficient;

    let a = [];
    let b = [];

    for (let i = 0; i < n; i++) {
        a.push(arrX[i] - xBar);
        b.push(arrY[i].x - yBar);
    }

    let divM = document.getElementById('mse');
    divM.innerText = 'Mean squared error:' + meanSquaredError(a, b);
}

const meanSquaredError = (a, b) => {
    let error = 0
    for (let i = 0; i < a.length; i++) {
        error += Math.pow((b[i] - a[i]), 2);
    }
    if (a.length <= 0)
        return error;
    else
        return error / a.length;
}
