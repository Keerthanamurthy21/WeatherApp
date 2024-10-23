let alertThreshold = 35;

const setThreshold = (threshold) => {
  alertThreshold = threshold;
};

const checkThreshold = (temp) => {
  if (temp > alertThreshold) {
    console.log(`Alert: Temperature exceeded ${alertThreshold}°C!`);
  }
};

module.exports = { setThreshold, checkThreshold };
