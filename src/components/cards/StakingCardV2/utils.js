const countsPerPeriod = (e, aprValue) => {
  switch (e) {
    case "1M":
      return { _seconds: 86400 * 30, aprValuePerPeriod: aprValue / 12 };
    case "2M":
      return { _seconds: 86400 * 30 * 2, aprValuePerPeriod: (aprValue / 12) * 2 };
    case "3M":
      return { _seconds: 86400 * 30 * 3, aprValuePerPeriod: (aprValue / 12) * 3 };
    case "6M":
      return { _seconds: 86400 * 30 * 6, aprValuePerPeriod: (aprValue / 12) * 6 };
    case "1Y":
      return { _seconds: 86400 * 30 * 12, aprValuePerPeriod: (aprValue / 12) * 12 };
    case "2Y":
      return { _seconds: 86400 * 30 * 12 * 2, aprValuePerPeriod: (aprValue / 12) * 12 * 2 };
    case "3Y":
      return { _seconds: 86400 * 30 * 12 * 3, aprValuePerPeriod: (aprValue / 12) * 12 * 3 };
    case "3Y":
      return { _seconds: 86400 * 30 * 12 * 4, aprValuePerPeriod: (aprValue / 12) * 12 * 4 };
    case "4Y":
      return { _seconds: 86400 * 30 * 12 * 4, aprValuePerPeriod: (aprValue / 12) * 12 * 4 };
    default:
      break;
  }
};
export default countsPerPeriod;

export const pills = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "4Y"];

export const toMax2Decimals = (x) => {
  return +Number(x).toFixed(8);
};

export const toMax4Decimals = (x) => {
  return +Number(x).toFixed(4);
};
