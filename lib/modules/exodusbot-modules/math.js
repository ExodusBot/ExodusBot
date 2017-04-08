class exodus_math{
  constructor(){};
  static getRandomInt(max, min){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
module.exports = exodus_math;
