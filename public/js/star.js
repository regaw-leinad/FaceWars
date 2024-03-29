function Star(cx, cy, radius, shipGrav, projGrav) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.shipGrav = shipGrav;
    this.projGrav = projGrav;
    this.id = 'star-' + salt(3);

    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.el.setAttribute('id', this.id);
    this.el.setAttribute('r', this.radius);
    var coords = getInternalCoords(cx, cy);
    this.el.setAttribute('cx', coords.x);
    this.el.setAttribute('cy', coords.y);
    this.el.setAttribute('class', 'star');
    this.el.setAttribute('fill', 'url(#grad2)');

    Board.$stars.append(this.el);
}