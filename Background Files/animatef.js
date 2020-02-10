var num_circles = 100;
var DFT
var time = 0;

let speed;
let zoom;

function integrate(f, a, b, dx) { //integrate(f, 0, 1, 0.00001)
    /* define variables
    f = a defined function, in this case x^0.5
    a = 0;		// left boundary of area
    b = 1;		// right boundary of area
    dx = 0.00001;		// width of the trapezoids
    integrate(f, a, b, dx)*/
	// calculate the number of trapezoids
	n = (b - a) / dx; //100,000
	// define the variable for area
	Area = 0;
	//loop to calculate the area of each trapezoid and sum.
	for (i = 1; i <= n; i++) { // PYTHONIC: for i in range(1, n+1):
		//the x locations of the left and right side of each trapezpoid, FOR i = 1
		x0 = a + (i-1)*dx; // set left boundary i.e. 0 + (1-1)*0.00001 = 0
		x1 = a + i*dx; // set right boundary i.e. 0 + (2-1)*0.00001 = 0.00001
		// the area of each trapezoid
		Ai = dx * (f(x0) + f(x1))/ 2; //area of a trapezoid = 0.5 * width * (h1+h2), heights are given by the function specified earlier, width is dx
        // i.e. 0.00001 * (f(0)+f(0.00001))/2 = 1.5811388301×10^−8
		// cumulatively sum the areas
		Area += Ai
	}
	return Area; // Example should output 0.6666566601218915
}

//define function to be integrated
function f(x){
	return Math.pow(x,0.5);
}

function setup(){

	canvas = createCanvas(1080, 720);
    canvas.parent("sketch-holder")

    zoom = createSlider(10,50,10);
    zoom.parent("zoom")

    speed = createSlider(1,10,1);
    speed.parent("speed")

	K = Int16Array.from({length: M}, (_, i) => (1 + i >> 1) * (i & 1 ? -1 : 1))
    //K = Int16Array.from({length: M}, (_, i) => (1 + i >> 1) * (i & 1 ? -1 : 1))
    // Int16Array: creates an array of signed 16bit numbers
    // {length: M} specifies the length
    // (_, i) underscore is a convention used to sometimes say "ignore this parameter", alone will fail
    // (_, i) _ is taking place of the index, i is the value.
    // (_, i) => (1 + i >> 1) creates an array of numbers going 0, 1, 1, 2, 2, 3, 3, 4, 4
    // (i & 1 ? -1 : 1) will always return 1 or negative 1,
    // i & 1 asks if i (in binary) and 1 (in binary) share any digits, returns thos as 1, result: if i is odd, will return 00000001, otherwise will return 0000
    // ? -1 : 1 asks if the last operator returned 1 or 0, if 1, returns -1, if 1, returns 1
	
}


function draw(){
    background(0)
    //set origin
    translate(width/2, height/2)

}
