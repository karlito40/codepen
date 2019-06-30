export default class Snake {
  constructor(ctx, props = {}) {
    this.ctx = ctx;
    this.debug = false;
    this.points = [];

    this.setProps(props);
  }

  setProps(props) {
    this.size = props.size || 6; // Head size (Body size is derived from it)
    this.maxPoints = props.maxPoints || 6; // Body length
    this.suppressRate = props.suppressRate || 50; // At how much rate points are being removed
    this.color = props.color || '#ff0000'; // Color in hexa
  }

  reset() {
    this.points = [];
  }

  tick() {
    this.currentTick = Date.now();

    this.diet();

    this.drawBody();
    this.drawHead();
  }

  eat(head) {
    if (!this.points.length || this.points[0].x !== head.x || this.points[0].y !== head.y) {
      this.points.unshift(head);
    }
  }

  diet() {
    this.lastDietAt = this.lastDietAt || this.currentTick;

    const dtDiet = this.currentTick - this.lastDietAt;

    // prettier-ignore
    let nbPointsToRemove = dtDiet >= this.suppressRate ?
      Math.max(0, ~~(dtDiet / this.suppressRate)) :
      0;

    if (this.points.length > this.maxPoints) {
      nbPointsToRemove = Math.max(this.points.length - this.maxPoints, nbPointsToRemove);
    }

    if (nbPointsToRemove) {
      let nbPointsToKeep = Math.max(1, this.points.length - nbPointsToRemove);
      this.points = this.points.slice(0, nbPointsToKeep);

      this.lastDietAt = this.currentTick;
    }
  }

  drawHead() {
    const head = this.points[0];

    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(head.x, head.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawBody() {
    const computedPoints = this._computePoints();

    computedPoints.forEach((point, i) => {
      if (i === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this._bezierForIndex(i, computedPoints);
      }
    });

    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  _computePoints() {
    let up = [];
    let down = [];
    let pa = 0; // save previous angle

    this.points.forEach((point, i) => {
      const radius = this._getRadius(i);
      let nextPoint = this.points[i + 1] || point; // next point (or current if none / last)
      let vector = getVector(point, nextPoint); // vector to next point
      let na = Math.atan2(vector.y, vector.x) - Math.PI / 2; // perpendicular angle
      let ca = (na + pa) / 2; // compute avg angle

      if (Math.abs(na - pa) > Math.PI) {
        ca += Math.PI;
      }

      ca %= Math.PI * 2;

      up.push({
        x: point.x + Math.cos(ca) * radius,
        y: point.y + Math.sin(ca) * radius
      });

      down.unshift({
        x: point.x + Math.cos(ca) * -radius,
        y: point.y + Math.sin(ca) * -radius
      });

      pa = na; // store angle
    });

    return up.concat(down);
  }

  _getRadius(i) {
    const MAX_I = this.points.length - 1;
    if (!MAX_I) {
      return 0;
    }

    return (this.size * (MAX_I - i)) / MAX_I;
  }

  _bezierForIndex(i, computedPoints) {
    const currentPoint = computedPoints[i];
    const nextPoint = computedPoints[i + 1] || currentPoint;
    const midPoint = {
      x: (currentPoint.x + nextPoint.x) / 2,
      y: (currentPoint.y + nextPoint.y) / 2
    };

    // use midpoint as dest and current point as control point
    this.ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, midPoint.x, midPoint.y);
  }
}

function getVector(a, b) {
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  let len = Math.hypot(dx, dy);

  if (len === 0) {
    return { x: 0, y: 0 };
  }

  let x = dx / len;
  let y = dy / len;

  return { x, y };
}
