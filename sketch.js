let startX, startY;	// set the x-coordinate for the circle center
let dayPalette, nightPalette;
let nightSec, nightMin, nightHr;
let startAngle = -90;
let endAngle = 270;
let prevMin;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    angleMode(DEGREES);
    ellipseMode(CENTER);

    startY = windowHeight/2
    startX = windowWidth/2

    //setup color pallettes (hr, min, sec)
    dayPalette = [color(81, 171, 250), color(255,170,125), color(255,230,145)]
    nightPalette = [color(19, 24, 98), color(84,107,171), color(88,72,128)]
}

function draw() {
    clear();

    let sec = second();
    let min = minute();
    let hr = hour();

    if (hr <= 12) { //daytime
        background(255)
    } else { //nighttime
        background(0)
    }

    let secondAngle = map(sec, 0, 60, startAngle, endAngle);
    let minuteAngle = map(min, 0, 60, startAngle, endAngle);
    let hourAngle = map(hr % 12, 0, 12, startAngle, endAngle);

    let angles = [hourAngle, minuteAngle, secondAngle];

    for (let i = 0; i < 3; i++) {
        let radius = (3 - i) * 100;
        
        if (hr <= 12) { //daytime
            stroke(dayPalette[i])
        } else { //nighttime
            stroke(nightPalette[i])
        }

        strokeWeight(20*(3-i))
        noFill()
        if (i == 2) {
            radius = radius + 45;
        }
        arc(startX, startY, radius, radius, 270, angles[i]);
       
        strokeWeight(2)
        if (hr <= 12) { //daytime
            fill(19, 24, 98)
            stroke(19, 24, 98)
        } else { //nighttime
            fill(255)
            stroke(255)
        }
        x = startX + radius/2 * cos(angles[i]);
        y = startY + radius/2 * sin(angles[i]);
        ellipse(x, y, 16*(3-i)); 
    }

    if (prevMin != min) {
        console.log(min)
        prevMin = min
    } 
}