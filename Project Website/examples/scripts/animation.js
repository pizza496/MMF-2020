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
//    let svg = await fetch("https://gist.githubusercontent.com/mbostock/a4fd7a68925d4039c22996cc1d4862ce/raw/d813a42956d311d73fee336e1b5aac899c835883/fourier.svg")
//        .then(response => response.text())
//        .then(text => (new DOMParser).parseFromString(text, "image/svg+xml"))
//        .then(svg => svg.documentElement);
    canvas = createCanvas(1080, 720);
    canvas.parent("sketch-holder")
    zoom = createSlider(10,50,10);
    zoom.parent("zoom")
    speed = createSlider(1,10,1);
    speed.parent("speed")
//    viewbox = svg.viewBox.baseVal
//    let path2 = svg.querySelector("path")
//    l = path2.getTotalLength()
//    P = Array.from({length: N}, (_, i) => {
//        const {x, y} = path2.getPointAtLength(i / N * l);
//        return [x - viewbox.width / 2, y - viewbox.height / 2];
//    })
//    console.log(P)

    K = Int16Array.from({length: M}, (_, i) => (1 + i >> 1) * (i & 1 ? -1 : 1))
    //K = Int16Array.from({length: M}, (_, i) => (1 + i >> 1) * (i & 1 ? -1 : 1))
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
        }
        return [x[0] / N, x[1] / N];
    })
    setupDone = true
}
var width = 1080;
const R = [];
function draw() {
    background(0);
    //translate(600, 600);
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
        for (let i = 0, p = [0, 0]; i < M; ++i) {
            const r = aabs(DFT[i]);
            ellipse(p[0], p[1],r*2);
            p = add(p, mul(DFT[i], expim(a * K[i])));
        }
        // Draw lines.
        /*
        context.beginPath();
        context.moveTo(0, 0);
        */
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
        t+=speed.value();
    }
}


function keyPressed(){
    if (key == "q"){
        follow = !follow;
    }
}
