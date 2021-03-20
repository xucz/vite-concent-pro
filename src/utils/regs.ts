/**
 * 采取getter模式，让外界来每次获取的都是新的正则表达式
 * 避免同一个表达式反复使用出现bug
 */

const regs = {
  get num1to9() {
    return /^[1-9]+[0-9]*$/;
  }
}

export default regs;
