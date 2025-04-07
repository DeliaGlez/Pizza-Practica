//Christian Rodríguez Moreno. 
// Alma Delia Vargas González.


let piezas;

function setup() {
  createCanvas(800, 450);
  background("black");

  piezas = createInput("8");
  piezas.position(width / 2 - 40, height - 35);
  piezas.input(dibujarCirculos);

  textAlign(CENTER);
  textSize(20);

  dibujarCirculos();
}

function dibujarCirculos() {
  background(0);
  let numPiezas = int(piezas.value());

  let centros = [
    { x: 150, y: 200, color: '#00ffff', nombre: 'Bresenham' }, // Neon Cyan
    { x: 400, y: 200, color: '#39ff14', nombre: 'DDA' },       // Neon Green
    { x: 650, y: 200, color: '#C724B1', nombre: 'Punto-Pendiente' }  // Neon Pink
  ];

  centros.forEach(c => {
    fill(c.color);
    stroke(c.color);
    ellipse(c.x, c.y, 180);
    text(c.nombre, c.x, c.y + 110);
  });

  centros.forEach((c, idx) => {
    stroke(0);
    for (let i = 0; i < numPiezas; i++) {
      let angulo = TWO_PI / numPiezas * i;
      let x2 = c.x + 90 * cos(angulo);
      let y2 = c.y + 90 * sin(angulo);

      if (idx === 0) bresenham(round(c.x), round(c.y), round(x2), round(y2));
      else if (idx === 1) LineaDDA(c.x, c.y, x2, y2);
      else if (idx === 2) lineaPuntoPendiente(c.x, c.y, x2, y2);
    }
  });
}

function bresenham(x1, y1, x2, y2) {
  let dx = abs(x2 - x1);
  let dy = abs(y2 - y1);
  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    point(x1, y1);
    if (x1 === x2 && y1 === y2) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
}

function LineaDDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let m = dy / dx;

  if (abs(m) <= 1) {
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
      [y1, y2] = [y2, y1];
    }
    let y = y1;
    for (let x = x1; x <= x2; x++) {
      point(x, round(y));
      y += m;
    }
  } else {
    if (y1 > y2) {
      [x1, x2] = [x2, x1];
      [y1, y2] = [y2, y1];
    }
    let x = x1;
    for (let y = y1; y <= y2; y++) {
      point(round(x), y);
      x += 1 / m;
    }
  }
}

function lineaPuntoPendiente(x1, y1, x2, y2) {
  if (x1 === x2) {
    let startY = min(y1, y2);
    let endY = max(y1, y2);
    for (let y = startY; y <= endY; y++) point(x1, y);
  } else {
    let m = (y2 - y1) / (x2 - x1);
    let b = y1 - m * x1;
    let startX = min(x1, x2);
    let endX = max(x1, x2);
    for (let x = startX; x <= endX; x++) {
      let y = m * x + b;
      point(x, round(y));
    }
  }
}