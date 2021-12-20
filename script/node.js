export class Node {
  constructor(_row, _col, _width, _total_rows) {
    this.row = _row;
    this.col = _col;
    this.x = _row * _width;
    this.y = _col * _width;
    this.width = _width;
    this.total_rows = _total_rows;
  }

  draw(ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }
}
