// Joy Division

function setup() {
    createCanvas(windowWidth, windowHeight)
    customDraw(windowWidth, windowHeight)
}

function customDraw(width, height) {
    strokeWeight(4.5);

    let step = 20

    // We want to generate line chunks before painting them
    let _lines = []
    for (var i = step; i <= height; i += step) {
        var _line = []
        for (var j = step; j <= width; j += step) {

            // Style #1: line is at row i now
            // var point = {x: j, y: i}

            // Style #2: Randomly displaced lines
            // var randomness = Math.random() * 20
            // var point = {x: j, y: i + randomness}

            // Style #3: Displace lines more towards the center
            var center = width / 2
            var distanceToCenter = Math.abs(j - center) // values in (0, center)
            var variance = center - distanceToCenter // 0 variance at edges
            variance = Math.max(variance - 100, 0) // extend 0 variance at edges
            var randomness = Math.random() * variance * -0.5

            if (i == step) {
                console.log(`Centre: ${center}, Distance: ${distanceToCenter}, Variance: ${variance}, Rand: ${randomness}`)
            }
            var point = {x: j, y: i + randomness}
            
            _line.push(point)
        }

        _lines.push(_line)
    }

    // Draw lines
    // Iterate lines
    let maxLines = _lines.length / 1.2 // let's reduce this first
    let skipLines = 5
    for (var i = skipLines; i < maxLines; i++) {

        // noFill()
        beginShape() // For vertex

        // Iterate points in line
        for (var j = 0; j < _lines[i].length - 2; j++) {

            var _line = _lines[i]

            // Style #1: Straight lines
            // line(
            //     _line[j].x,
            //     _line[j].y,
            //     _line[j+1].x,
            //     _line[j+1].y,
            // )

            // Style #2: Quadratic curves
            // Begin vertex for first point
            if (j == 0) {
                vertex(_line[j].x, _line[j].y) // Starting point of curve
            }

            var xc = (_line[j].x + _line[j+1].x) / 2
            var yc = (_line[j].y + _line[j+1].y) / 2
            erase()
            quadraticVertex(
                _line[j].x,
                _line[j].y,
                xc,
                yc,
            )
            noErase()
        }

        quadraticVertex(_line[j].x, _line[j].y, _line[j+1].x, _line[j+1].y)
        endShape() // For vertex

        setTimeout(() => {}, 5);

    }

}
