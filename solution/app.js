const D = 10 // Density

const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext("2d")

const w = window.innerWidth
const h = window.innerHeight

const rd = n => Math.floor(n * Math.random())
const rgb = (r, g, b) => `rgb(${r},${g},${b})` 

const nb = 10
const points = []

c.font = "24px sans-serif"
c.fillText("w : " + innerWidth, 50, 50)
c.fillText("h : " + innerHeight, 50, 100)
// It Displays screen's width and height (top left corner)

for(let point = 0; point < nb; point++){
    const x = w * .1 + rd(w / 10) * 10 * 0.8
    const y = h * .1 + rd(h / 10) * 10 * 0.8
    // Random x and y for a point
    
    points.push({ x, y })
}

const paths = []
for(const point in points) {
    let path = []
    const {x: x1, y: y1} = points[point]
    // go through each point
    for(let other = 0; other < points.length; other++){
        if(other == point) continue
        const {x: x2, y: y2} = points[other]
        const d = Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
        // compute distance between points
        if(d < 300 || d > 500) continue
        // some restrictions for the realistic aspect
        
        // The road between points
        const color = Math.floor(((d - 300) / 200) * 255)
        // The color of the road depends of the distance computed 
        c.strokeStyle = rgb(color, color, color)
        c.lineWidth = 2
        c.beginPath()
        c.moveTo(x1, y1)
        c.lineTo(x2, y2)
        c.stroke()
        c.fillStyle = "red"
        paths.push({
            a: [x1, y1],
            b: [x2, y2],
            d
        })
        path.push(other)
        c.font = "24px sans-serif"
        c.fillText(Math.floor(d), Math.floor((x1 + x2) / 2), Math.floor((y1 + y2) / 2), 100)
        // It writes the distance of the road in the center of the road
    }
    if(path.length > 0) {
        // If the point is inaccessible, we let it go away.
        c.fillStyle = rgb(255, 0, 0)
        c.beginPath()
        c.ellipse(x1, y1, 10, 10, 0, 0, 360)
        // Show the point
        c.fill()

        c.font = "24px sans-serif"
        c.fillStyle = rgb(0, 0, 255)
        c.fillText(point, x1, y1)
        // Identification step for debug purposes.
        points[point].surrounding = path
    }
}

const begin = rd(points.length - 1)
const end = rd(points.length - 1)

// Not yet finished.