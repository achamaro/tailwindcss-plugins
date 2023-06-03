(async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  process.stdout.write("Hello, world!");
})();
