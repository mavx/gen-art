function setup() {
    createCanvas(windowWidth, windowHeight)

    noStroke()
    fill(255, 0, 0, 255)
    polygon = generatePolygonPoints(
        windowWidth / 2, 
        windowHeight / 2, 
        200, 
        10,
    )
    basePolygon = deformPolygon(polygon, 6, 15)
    drawPolygon(basePolygon)

    fill(255, 0, 0, 12)
    moreDeformedPolygons = 70
    for (var n = 0; n < moreDeformedPolygons; n++) {
        var deformedPolygon = deformPolygon(basePolygon, 3, 20)
        drawPolygon(deformedPolygon)
    }

}

function drawPolygon(points) {
    beginShape()
    for (var i = 0; i < points.length; i++) {
        vertex(points[i].x, points[i].y)
    }
    endShape(CLOSE)
}

function generatePolygonPoints(x, y, radius, npoints) {
    let angle = TWO_PI / npoints
    let points = []
    var sx, sy
    for (var a = 0; a < TWO_PI; a += angle) {
        sx = x + cos(a) * radius
        sy = y + sin(a) * radius
        points.push({x: sx, y: sy})
    }
    return points
}

// Pick a random Gaussian point from the mid-point of each line
function deformPolygon(points, ndeforms, sd) {
    // Add starting point to the end
    // console.log(`Points: ${points.length}`)
    // points.push(points[0])
    // console.log(`Points: ${points.length}`)

    // End of deformations
    if (ndeforms <= 0) {
        return points
    }

    console.log(`Deformation #${ndeforms}, Initial points: ${points.length}, SD: ${sd}`)

    var newPoints = []
    for (var i = 0; i < points.length; i++) {
        var thisPoint = points[i]
        var nextPoint = points[i + 1] ? points[i + 1] : points[0]
        // console.log(`this: ${JSON.stringify(thisPoint)}, next: ${JSON.stringify(nextPoint)}`)
        var midX = (thisPoint.x + nextPoint.x) / 2
        var midY = (thisPoint.y + nextPoint.y) / 2
        var random = randomGaussian() * sd
        // console.log(`Random: ${random}`)
        var midPoint = {
            // x: randomGaussian(midX, sd),
            // y: randomGaussian(midY, sd)
            x: midX + random,
            y: midY + random,
        }
        newPoints.push(thisPoint)
        newPoints.push(midPoint)
    }

    console.log(`Deformation #${ndeforms}, New points: ${newPoints.length}`)

    if (ndeforms > 0) {
        newPoints = deformPolygon(newPoints, ndeforms - 1, sd)
    }

    return newPoints
}

function randomPoints(pointXY, count) {
    points = []
    for (var n = 0; n < count; n++) {
        points.push({
            x: randomGaussian(pointXY.x, 75),
            y: randomGaussian(pointXY.y, 75),
        })
    }
    return points
}