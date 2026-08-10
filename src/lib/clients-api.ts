import { supabase } from "@/integrations/supabase/client";

/**
 * One row from the `public.clients` flat table.
 * See docs/architecture/clients.md.
 */
export type ClientRow = {
  id: string;
  business_name: string;
  owner_name: string | null;
  email: string | null;
  whatsapp: string | null;
  phone: string | null;
  city: string | null;
  neighborhood: string | null;
  business_type: string | null;
  locations: string | null;
  status: "new" | "contacted" | "demo_scheduled" | "trial" | "won" | "lost" | "nurture";
  language: string;
  total_score: number | null;
  priority: string | null;
  recommended_plan: string | null;
  estimated_opportunity: number | null;
  missed_revenue: number | null;
  noshow_revenue: number | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ClientsSort = "created_at" | "total_score" | "business_name";
export type ClientsOrder = "asc" | "desc";

export type ClientsQuery = {
  search?: string;
  status?: ClientRow["status"];
  city?: string;
  sort?: ClientsSort;
  order?: ClientsOrder;
  limit?: number;
};

/**
 * Lists clients from the `clients` table. Single round-trip, no N+1.
 * Returns `[]` on error and logs — listing endpoints should not throw.
 *
 * NOTE: Reads require an authenticated session whose email matches the
 * value hard-coded in `public.is_allowed_user()` (see migration).
 */
export async function listClients(q: ClientsQuery = {}): Promise<ClientRow[]> {
  const { search, status, city, sort = "created_at", order = "desc", limit = 100 } = q;

  let query = supabase.from("clients").select("*");

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    query = query.or(`business_name.ilike.${term},owner_name.ilike.${term}`);
  }
  if (status) query = query.eq("status", status);
  if (city) query = query.eq("city", city);
  query = query.order(sort, { ascending: order === "asc" }).limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[clients-api] listClients failed:", error.message);
    return [];
  }
  return (data ?? []) as unknown as ClientRow[];
}

/**
 * Fetch a single client by its id.
 */
export async function fetchClient(id: string): Promise<ClientRow | null> {
  const { data, error } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[clients-api] fetchClient failed:", error.message);
    return null;
  }
  return (data ?? null) as ClientRow | null;
}
