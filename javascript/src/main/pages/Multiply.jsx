import React from "react";

import { multiplyRationalsFromUserInput } from "main/utils/RationalHelpers";
import Calculator from "main/components/Calculator";

const Multiply = () => {

  const props = {
    calculateFromUserInput: multiplyRationalsFromUserInput,
    title: "Multiply",
    subtitle: "Fill in the numerator and denominator of two rational numbers (fractions) below, then click the Calculate button to see the result.",
    sign: "x",
  }
  return <Calculator {...props} />;
};

export default Multiply;
