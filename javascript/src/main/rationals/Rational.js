import { gcd, lcm } from "./Helpers";

export default class Rational {
  constructor(numerator, denominator) {
    if (typeof numerator !== "number" || typeof denominator !== "number") {
      throw new Error(
        `Incorrect types passed to Rational constructor; got ${typeof numerator} and ${typeof denominator}`
      );
    }

    this.numerator = Math.trunc(numerator);
    this.denominator = Math.trunc(denominator);

    if (this.denominator === 0) {
      throw new Error('Error, cannot divide by 0');
    }

    if (this.numerator < 0 && this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }
    else if (this.numerator > 0 && this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }

    if (this.numerator !== 0) {
      const greatestCommonDivisor = gcd(this.numerator, this.denominator);
      this.numerator /= greatestCommonDivisor;
      this.denominator /= greatestCommonDivisor;
    }
  }

  toString() {
    return "" + this.numerator + "/" + this.denominator;
  }

  plus(other) {
    Rational.verifyIsRational(other);
    if (this.numerator === 0)
      return new Rational(other.numerator, other.denominator);
    if (other.numerator === 0)
      return new Rational(this.numerator, this.denominator);

    const numGCD = gcd(this.numerator, other.numerator);
    const denomGCD = gcd(this.denominator, other.denominator);

    const numerator =
      (this.numerator / numGCD) * (other.denominator / denomGCD) +
      (other.numerator / numGCD) * (this.denominator / denomGCD);
    const denominator = lcm(this.denominator, other.denominator);

    return new Rational(numerator, denominator);
  }

  static sum(first, second) {
    Rational.verifyIsRational(first);
    Rational.verifyIsRational(second);

    return first.plus(second);
  }

  times(other) {
    Rational.verifyIsRational(other);
    if(this.numerator === 0 || other.numerator === 0) {
      return new Rational(0, 1);
    }
   
    let numerator = this.numerator * other.numerator;
    let denominator = this.denominator * other.denominator;
    const rationalGCD = gcd(numerator, denominator);
    numerator /= rationalGCD;
    denominator /= rationalGCD;
    
    return new Rational(numerator, denominator);
  }

    


  static multiply(first, second) {
    Rational.verifyIsRational(first);
    Rational.verifyIsRational(second);

    return first.times(second);
    }

  minus(other) {
    Rational.verifyIsRational(other);
    let negativeOne = new Rational(-1, 1);
    let negativeOther = negativeOne.times(other);
    
    return this.plus(negativeOther);
  }

  static subtract(first, second) {
    Rational.verifyIsRational(first);
    Rational.verifyIsRational(second);

    return first.minus(second);
  }

  reciprocal() {
    if(this.numerator === 0) {
      throw new Error('Error, cannot divide by 0')
    }
    return new Rational(this.denominator, this.numerator)
  }

  dividedBy(other) {
    Rational.verifyIsRational(other);
    let recip = other.reciprocal();
    return this.times(recip);
  }

  static quotient(first, second) {
    Rational.verifyIsRational(first);
    Rational.verifyIsRational(second);

    return first.dividedBy(second);
  }

  static verifyIsRational(object) {
    if (!(object instanceof Rational)) {
      throw new Error(`Not a Rational object; instead was ${object.__proto__}`);
    }
    return true;
  }
}
