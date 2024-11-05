function generatedCode() {
  const code = Math.trunc(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return code;
}

module.exports = { generatedCode };
