class Parent {
  static log() {
    console.log('this is static function');
  }
  static age = 26;
  logNotStatic() {
    console.log('this is not static function');
  }
}
export class TestSuper extends Parent {
  static testa() {
    console.log('a', this.log(), super.age);
  }
  d() {
    this.logNotStatic();
  }
}
