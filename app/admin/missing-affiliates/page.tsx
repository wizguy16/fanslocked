import { MissingAffiliatesDashboard } from "@/components/admin/missing-affiliates-dashboard";
import { buildSiteAffiliateInventory } from "@/lib/affiliate-inventory";

export default function MissingAffiliatesPage() {
  const inventory = buildSiteAffiliateInventory();

  return <MissingAffiliatesDashboard inventory={inventory} />;
}
