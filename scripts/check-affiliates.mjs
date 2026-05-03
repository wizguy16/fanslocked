import { AFFILIATE_REGISTRY } from "../lib/affiliate-registry-data.mjs";

function checkAffiliates() {
  const missing = [];
  const ok = [];

  for (const entry of AFFILIATE_REGISTRY) {
    const hasLink =
      entry.affiliateUrl ||
      process.env[`NEXT_PUBLIC_${entry.slug.toUpperCase()}_AFFILIATE_URL`];

    if (entry.hasAffiliate && !hasLink) {
      missing.push(entry.slug);
    } else if (entry.hasAffiliate && hasLink) {
      ok.push(entry.slug);
    }
  }

  console.log("\n✅ ACTIVE AFFILIATES:");
  console.log(ok.length ? ok.join(", ") : "none");

  console.log("\n❌ MISSING AFFILIATE LINKS:");
  console.log(missing.length ? missing.join(", ") : "none");

  console.log(`\nSummary: ${ok.length} active / ${missing.length} missing\n`);
}

checkAffiliates();
