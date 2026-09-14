const slider = document.getElementById("xValue");
if (slider) {

const xDisplay = document.getElementById("xDisplay");
const fDisplay = document.getElementById("fDisplay");

const graphX = document.getElementById("graphX");
const graphY = document.getElementById("graphY");

const canvas = document.getElementById("limitGraph");
const ctx = canvas.getContext("2d");


function drawGraph(xValue) {

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    /* Coordinate system */

    const originX = width / 2;
    const originY = height / 2;

    const scaleX = width / 8;
    const scaleY = height / 8;


    /* Grid */

    ctx.lineWidth = 1;

    for (let x = -4; x <= 4; x++) {

        const px = originX + x * scaleX;

        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
        ctx.stroke();

    }

    for (let y = -4; y <= 4; y++) {

        const py = originY - y * scaleY;

        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();

    }


    /* Axes */

    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();


    /* Function y = x + 2 */

    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let x = -4; x <= 4; x += 0.01) {

        const y = x + 2;

        const px = originX + x * scaleX;
        const py = originY - y * scaleY;

        if (x === -4) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.stroke();


    /* Moving point */

    const yValue = xValue + 2;

    const pointX = originX + xValue * scaleX;
    const pointY = originY - yValue * scaleY;

    ctx.beginPath();
    ctx.arc(pointX, pointY, 8, 0, Math.PI * 2);
    ctx.fill();


    /* Target point at x = 2 */

    const targetX = originX + 2 * scaleX;
    const targetY = originY - 4 * scaleY;

    ctx.beginPath();
    ctx.arc(targetX, targetY, 8, 0, Math.PI * 2);
    ctx.stroke();

}


/* Slider */

slider.addEventListener("input", function () {

    const x = Number(slider.value);
    const y = x + 2;

    xDisplay.textContent = x.toFixed(2);
    fDisplay.textContent = y.toFixed(2);

    graphX.textContent = x.toFixed(2);
    graphY.textContent = y.toFixed(2);

    drawGraph(x);

});


/* Initial graph */

drawGraph(Number(slider.value));


/* Redraw when window changes size */

window.addEventListener("resize", function () {

    drawGraph(Number(slider.value));

})};
/* ================================
   CALCULUS CHALLENGES
================================ */

function checkAnswer(question) {

    if (question === 1) {

        const answer = Number(
            document.getElementById("answer1").value
        );

        const result = document.getElementById("result1");

        if (answer === 4) {
            result.textContent = "✓ Correct. The limit is 4.";
            result.style.color = "#7dd3fc";
        } else {
            result.textContent = "✗ Not quite. Try factoring x² − 4.";
            result.style.color = "#f87171";
        }
    }


    if (question === 2) {

        const answer = document
            .getElementById("answer2")
            .value
            .replace(/\s/g, "")
            .toLowerCase();

        const result = document.getElementById("result2");

        if (
            answer === "9x²-10x+7" ||
            answer === "9x^2-10x+7"
        ) {
            result.textContent =
                "✓ Correct. f′(x) = 9x² − 10x + 7.";
            result.style.color = "#7dd3fc";
        } else {
            result.textContent =
                "✗ Check the power rule carefully.";
            result.style.color = "#f87171";
        }
    }


    if (question === 3) {

        const answer = Number(
            document.getElementById("answer3").value
        );

        const result = document.getElementById("result3");

        if (answer === 4) {
            result.textContent =
                "✓ Correct. k = 4 makes the function continuous.";
            result.style.color = "#7dd3fc";
        } else {
            result.textContent =
                "✗ Compare the left-hand limit with f(2).";
            result.style.color = "#f87171";
        }
    }


    if (question === 4) {

        const answer = document
            .getElementById("answer4")
            .value
            .replace(/\s/g, "")
            .toLowerCase();

        const result = document.getElementById("result4");

        if (
            answer === "2x" ||
            answer === "2*x"
        ) {
            result.textContent =
                "✓ Correct. f′(x) = 2x.";
            result.style.color = "#7dd3fc";
        } else {
            result.textContent =
                "✗ Use the definition of the derivative and simplify.";
            result.style.color = "#f87171";
        }
    }
}