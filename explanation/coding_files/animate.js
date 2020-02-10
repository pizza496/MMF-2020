var setupDone = false;
var follow = true;
var DFT
var K
var t = 0;

//Step function
var first = false;
function aabs([re, im]) {
    return Math.hypot(re, im);
}
function expim(im) {
    return [Math.cos(im), Math.sin(im)];
}
function add([rea, ima], [reb, imb]) {
    return [rea + reb, ima + imb];
}
function mul([rea, ima], [reb, imb]) {
    return [rea * reb - ima * imb, rea * imb + ima * reb];
}
let zoom;
let speed;
async function setup(){
    canvas = createCanvas(1080, 720);
    canvas.parent("sketch-holder")
    zoom = createSlider(10,50,50);
    zoom.parent("zoom")
    speed = createSlider(1,10,1);
    speed.parent("speed")

    K = Int16Array.from({length: M}, (_, i) => (1 + i >> 1) * (i & 1 ? -1 : 1))
    // K = Int16Array.from({length: M}, (_, i) => (1 + i >> 1) * (i & 1 ? -1 : 1))
    // Int16Array: creates an array of signed 16bit numbers
    // {length: M} specifies the length
    // (_, i) underscore is a convention used to sometimes say "ignore this parameter", alone will fail
    // (_, i) _ is taking place of the index, i is the value.
    // (_, i) => (1 + i >> 1) creates an array of numbers going 0, 1, 1, 2, 2, 3, 3, 4, 4
    // (i & 1 ? -1 : 1) will always return 1 or negative 1,
    // i & 1 asks if i (in binary) and 1 (in binary) share any digits, returns those as 1, result: if i is odd, will return 00000001, otherwise will return 0000
    // ? -1 : 1 asks if the last operator returned 1 or 0, if 1, returns -1, if 1, returns 1
    DFT = Array.from(K, k => {
        //make an array from K calling elements of new array by variable k which is equal to the value of each element of K
        let x = [0, 0];
        // a variable x is equal to [0, 0]
        for (let i = 0, N = P.length; i < N; ++i) {
            //  i starts equal to 0,
            //  N is equal to the length of P (the array of points),
            //  and i is always less than N
            //  repeat what comes next incrementing the variable i by one each time. (i=0, i=1, i=2)
            x = add(x, mul(P[i], expim(k * i / N * 2 * -Math.PI)));
            // order of operations: evaluate expim first, than evaluate mul, then evaluate add
            // expim: returns [cos(input), sin(input)] for the imaginary number being entered.
                // returns [cos(k * i / N * 2 * -pi)] PEMDAS applies
            // mul: multiplies two imaginary numbers
            // add: adds two imaginary numbers, redefines x, acts as sigma notation for summations
            // Imaginary numbers are represented by arrays of length 2 eg. [0,0]
        }
        return [x[0] / N, x[1] / N];
        // returns the final value for each element the DFT array
    })
    setupDone = true
}
var width = 1080;
const R = [];
function draw() {
    background(0);
    // translate(600, 600);
    if(setupDone){
        const scale2 = zoom.value()/10 * width / viewbox_width;
        const a = t * 2 / q * Math.PI;
        // Calculate the current point.
        let p = [0, 0];
        for (let i = 0; i < M; ++i) {
            p = add(p, mul(DFT[i], expim(a * K[i])));
        }
        // Zoom.
        translate(width / 2, height / 2);
        scale(scale2);
        if(follow) translate(-p[0], -p[1]);
        // Draw circles.
        noFill();
        stroke(75);
        for (let i = 0, p = [0, 0]; i < M; ++i) { // as i increases i=0, i=1, i=2, p starts at [0,0]
            const r = aabs(DFT[i]);
            // aabs returns the magnitude of the vector based on the coeficient
            ellipse(p[0], p[1],r*2);
            // draw a circle with radius r, centered at p
            p = add(p, mul(DFT[i], expim(a * K[i])));
            // shift p based on the vector the circle is enclosing
        }
        // Draw lines within the circles.
        stroke(125);
        for (let i = 0, p = [0, 0]; i < M; ++i) {
            prevP = p;
            p = add(p, mul(DFT[i], expim(a * K[i])))
            line(...prevP,...p);
        }
        // Draw the path.
        beginShape();
        noFill();
        stroke(255)
        if (R.length < q) R.push(p);
        for (let i = 1, n = R.length; i < n; ++i) {
            vertex(...R[i]);
        }
        endShape();
        t+=speed.value(); // increase time
    }
}


function keyPressed(){
    if (key == "q"){
        follow = !follow;
    }
}
