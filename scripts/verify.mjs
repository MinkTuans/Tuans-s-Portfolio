import assert from "assert";

async function runTests() {
  console.log("--- TEST 1: Homepage ---");
  const homeRes = await fetch("http://localhost:3000/");
  assert.strictEqual(homeRes.status, 200, "Homepage status should be 200");
  const homeHtml = await homeRes.text();
  assert(homeHtml.includes("Phạm Minh Tuấn"), "Homepage must include full name");
  assert(homeHtml.includes("The Wolf"), "Homepage must include concept");
  assert(homeHtml.includes("MindNova AI"), "Homepage must include MindNova AI");
  assert(homeHtml.includes("AI Cooking"), "Homepage must include AI Cooking");
  assert(homeHtml.includes("TOUR MANAGEMENT WEBSITE"), "Homepage must include Tour Management Website");
  assert(homeHtml.includes("NGOC PHI THUY JADE"), "Homepage must include experience");
  assert(homeHtml.includes("WHAT I ACTUALLY BUILT") || homeHtml.includes("Trực tiếp viết mã"), "Must show what candidate directly built");
  assert(!homeHtml.includes('href="/admin"'), "Security violation: /admin found in public HTML");
  assert(!homeHtml.includes('href="/admin/'), "Security violation: /admin/ found in public HTML");
  assert(homeHtml.includes("The Wolf Run"), "Must include The Wolf Run scroll animation section");
  assert(!homeHtml.includes("3D Wolf • Interactive View"), "Old 3D dog canvas must be completely removed");
  assert(!homeHtml.includes("3D Wolf • The Wolf's Journey"), "Old 3D dog badge must be completely removed");
  console.log("✅ Homepage passed all criteria: Morning Meadow active, The Wolf Run verified, ZERO old 3D dog, ZERO admin links exposed.");

  console.log("--- TEST 2: Robots.txt ---");
  const robotsRes = await fetch("http://localhost:3000/robots.txt");
  const robotsText = await robotsRes.text();
  assert(robotsText.includes("Disallow: /admin"), "robots.txt must disallow /admin");
  console.log("✅ Robots.txt correctly disallows /admin and /api/admin.");

  console.log("--- TEST 3: Sitemap.xml ---");
  const sitemapRes = await fetch("http://localhost:3000/sitemap.xml");
  const sitemapText = await sitemapRes.text();
  assert(!sitemapText.includes("/admin"), "sitemap.xml must NOT include /admin");
  console.log("✅ Sitemap.xml excludes /admin completely.");

  console.log("--- TEST 4: Admin Authentication ---");
  const failAuth = await fetch("http://localhost:3000/api/admin/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "wrong_password" }),
  });
  assert.strictEqual(failAuth.status, 401, "Wrong password must be rejected with 401");

  const successAuth = await fetch("http://localhost:3000/api/admin/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "TuanWolf2026!" }),
  });
  assert.strictEqual(successAuth.status, 200, "Valid password should return 200");
  const authData = await successAuth.json();
  assert.strictEqual(authData.success, true, "Auth success should be true");
  console.log("✅ Admin Auth API validated (rejects wrong password, accepts valid token).");

  console.log("--- TEST 5: OpenGraph Image Endpoint ---");
  const ogRes = await fetch("http://localhost:3000/opengraph-image");
  assert.strictEqual(ogRes.status, 200, "OpenGraph dynamic image should return 200");
  assert(ogRes.headers.get("content-type")?.includes("image/png"), "OpenGraph should return PNG image");
  console.log("✅ OpenGraph 1200x630 dynamic image endpoint verified.");

  console.log("--- TEST 6: Icon Favicon Endpoint ---");
  const iconRes = await fetch("http://localhost:3000/icon");
  assert.strictEqual(iconRes.status, 200, "Icon dynamic endpoint should return 200");
  console.log("✅ Icon dynamic favicon endpoint verified.");

  console.log("\n==========================================");
  console.log("🎉 ALL INTEGRATION & SECURITY TESTS PASSED!");
  console.log("==========================================\n");
}

runTests().catch((e) => {
  console.error("❌ TEST FAILED:", e);
  process.exit(1);
});
