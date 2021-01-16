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
    
    this.numerator = this.numerator * other.numerator;
    this.denominator = this.denominator * other.denominator;
    return new Rational(this.numerator, this.denominator);
/*
    const ratGCD = gcd(this.numerator, this.denominator);
    const numerator = this.numerator / ratGCD;
    const denominator = this.denominator/ ratGCD;
    
    return new Rational(numerator, denominator); */
  }

    


  static multiply(first, second) {
    Rational.verifyIsRational(first);
    Rational.verifyIsRational(second);

    return first.times(second);
    }

  minus(other) {
    return 42;
  }

  static subtract(first, second) {
    return 42;
  }

  reciprocal() {
    return 42;
  }

  dividedBy(other) {
    return 42;
  }

  static quotient(first, second) {
    return 42;
  }

  static verifyIsRational(object) {
    if (!(object instanceof Rational)) {
      throw new Error(`Not a Rational object; instead was ${object.__proto__}`);
    }
    return true;
  }
}
