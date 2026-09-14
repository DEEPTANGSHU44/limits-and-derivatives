const canvas = document.getElementById("visualGraph");
const ctx = canvas.getContext("2d");

let currentFunction = "square";

const hSlider = document.getElementById("hValue");
const hDisplay = document.getElementById("hDisplay");
const secantSlope = document.getElementById("secantSlope");
const derivativeValue = document.getElementById("derivativeValue");

function getFunctionY(x) {

    if (currentFunction === "square") {
        return x * x;
    }

    if (currentFunction === "cube") {
        return x * x * x;
    }

    if (currentFunction === "sine") {
        return Math.sin(x);
    }

    if (currentFunction === "absolute") {
        return Math.abs(x);
    }
}

function drawLine(x1, y1, x2, y2, width, dash = []) {

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.setLineDash(dash);

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.stroke();
    ctx.setLineDash([]);
}

function drawGraph() {

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2;

    const scaleX = width / 8;
    const scaleY = height / 8;

    function toCanvasX(x) {
        return originX + x * scaleX;
    }

    function toCanvasY(y) {
        return originY - y * scaleY;
    }

    /* GRID */

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#1c2945";

    for (let x = -4; x <= 4; x++) {

        drawLine(
            toCanvasX(x),
            0,
            toCanvasX(x),
            height,
            1
        );
    }

    for (let y = -4; y <= 4; y++) {

        drawLine(
            0,
            toCanvasY(y),
            width,
            toCanvasY(y),
            1
        );
    }

    /* AXES */

    ctx.strokeStyle = "#7d8da8";

    drawLine(
        0,
        originY,
        width,
        originY,
        2
    );

    drawLine(
        originX,
        0,
        originX,
        height,
        2
    );

    /* FUNCTION */

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.beginPath();

    let firstPoint = true;

    for (let x = -4; x <= 4; x += 0.01) {

        const y = getFunctionY(x);

        if (Math.abs(y) > 4.5) {
            firstPoint = true;
            continue;
        }

        const px = toCanvasX(x);
        const py = toCanvasY(y);

        if (firstPoint) {
            ctx.moveTo(px, py);
            firstPoint = false;
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.stroke();

    /* DERIVATIVE VISUALIZATION */

    if (currentFunction === "square" && hSlider) {

        const h = Number(hSlider.value);

        const x1 = 1;
        const y1 = 1;

        const x2 = 1 + h;
        const y2 = x2 * x2;

        /* SECANT LINE */

        const slope = (y2 - y1) / h;

        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 3;

        const secantY1 = slope * (-4 - x1) + y1;
        const secantY2 = slope * (4 - x1) + y1;

        drawLine(
            toCanvasX(-4),
            toCanvasY(secantY1),
            toCanvasX(4),
            toCanvasY(secantY2),
            3
        );

        /* TANGENT LINE */

        const tangentY1 = 2 * (-4) - 1;
        const tangentY2 = 2 * (4) - 1;

        ctx.strokeStyle = "#7dd3fc";
        ctx.lineWidth = 3;

        drawLine(
            toCanvasX(-4),
            toCanvasY(tangentY1),
            toCanvasX(4),
            toCanvasY(tangentY2),
            3,
            [10, 7]
        );

        /* POINT A */

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.arc(
            toCanvasX(x1),
            toCanvasY(y1),
            7,
            0,
            Math.PI * 2
        );
        ctx.fill();

        /* POINT B */

        ctx.fillStyle = "#fbbf24";

        ctx.beginPath();
        ctx.arc(
            toCanvasX(x2),
            toCanvasY(y2),
            7,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}


/* FUNCTION BUTTONS */

function plotFunction(functionName) {

    currentFunction = functionName;

    const name = document.getElementById("functionName");

    if (functionName === "square") {
        name.textContent = "x²";
    }

    if (functionName === "cube") {
        name.textContent = "x³";
    }

    if (functionName === "sine") {
        name.textContent = "sin(x)";
    }

    if (functionName === "absolute") {
        name.textContent = "|x|";
    }

    drawGraph();
}


/* DERIVATIVE SLIDER */

if (hSlider) {

    function updateDerivative() {

        const h = Number(hSlider.value);

        const x = 1;

        const f1 = x * x;
        const f2 = (x + h) * (x + h);

        const slope = (f2 - f1) / h;

        hDisplay.textContent = h.toFixed(2);

        secantSlope.textContent = slope.toFixed(4);

        derivativeValue.textContent = "2.0000";

        drawGraph();
    }

    hSlider.addEventListener("input", updateDerivative);

    updateDerivative();
}


/* START */

drawGraph();

window.addEventListener("resize", drawGraph);