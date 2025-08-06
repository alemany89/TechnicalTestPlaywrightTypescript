export default {
  testDir: "./tests",
  use: {
    headless: true,
    browserName: "chromium",
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
  },
  reporter: [["html", { open: "never" }]]
};
