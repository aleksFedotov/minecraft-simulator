export default class Cube {
  key: string;
  pos: number[];
  texture: string;

  constructor(key: string, pos: number[], texture: string) {
    this.key = key;
    this.pos = pos;
    this.texture = texture;
  }
}
