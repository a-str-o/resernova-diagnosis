import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BSfjoP2_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as signOut, r as ALLOWED_EMAIL } from "./router-7SAz_osL.mjs";
import { n as Logo, t as Button } from "./button-BD21Xb-x.mjs";
import { t as Input } from "./input-CptSL5L4.mjs";
import { a as LogOut, i as Search, s as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.clients-DyDrGrRt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Lists clients from the `clients` table. Single round-trip, no N+1.
* Returns `[]` on error and logs — listing endpoints should not throw.
*
* NOTE: Reads require an authenticated session whose email matches the
* value hard-coded in `public.is_allowed_user()` (see migration).
*/
async function listClients(q = {}) {
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
	return data ?? [];
}
var STATUSES = [
	"new",
	"contacted",
	"demo_scheduled",
	"trial",
	"won",
	"lost",
	"nurture"
];
function ClientsPage() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [city, setCity] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("created_at");
	const [order, setOrder] = (0, import_react.useState)("desc");
	const query = useQuery({
		queryKey: [
			"clients",
			search,
			status,
			city,
			sort,
			order
		],
		queryFn: () => listClients({
			...search ? { search } : {},
			...status !== "all" ? { status } : {},
			...city ? { city } : {},
			sort,
			order,
			limit: 200
		})
	});
	const rows = query.data ?? [];
	const cities = (0, import_react.useMemo)(() => Array.from(new Set(rows.map((r) => r.city).filter(Boolean))).sort(), [rows]);
	const onSignOut = async () => {
		await signOut();
		toast.success("Signed out");
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen surface-grid",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-6 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs text-muted-foreground sm:inline",
							children: ALLOWED_EMAIL
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "gap-2",
							onClick: () => void onSignOut(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
								className: "size-4",
								"aria-hidden": true
							}), "Sign out"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 text-2xl font-bold",
					children: "Clients"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						rows.length,
						" ",
						rows.length === 1 ? "row" : "rows",
						query.isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ms-2 inline-flex items-center gap-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-3 animate-spin",
								"aria-hidden": true
							}), " refreshing"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Search business or owner",
								className: "h-10 ps-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (e) => setStatus(e.target.value),
							className: "h-10 rounded-md border border-input bg-background px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All statuses"
							}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: city,
							onChange: (e) => setCity(e.target.value),
							className: "h-10 rounded-md border border-input bg-background px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "All cities"
							}), cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: "h-10 rounded-md border border-input bg-background px-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "created_at",
									children: "Sort: date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "total_score",
									children: "Sort: score"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "business_name",
									children: "Sort: name"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: order,
							onChange: (e) => setOrder(e.target.value),
							className: "h-10 rounded-md border border-input bg-background px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "desc",
								children: "Desc"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "asc",
								children: "Asc"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "min-w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-start font-semibold",
										children: "Business"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-start font-semibold",
										children: "Owner"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-start font-semibold",
										children: "City"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-start font-semibold",
										children: "Contact"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-end font-semibold",
										children: "Score"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-start font-semibold",
										children: "Priority"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-start font-semibold",
										children: "Plan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-end font-semibold",
										children: "Opportunity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-start font-semibold",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-start font-semibold",
										children: "Submitted"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 10,
									className: "px-4 py-10 text-center text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										className: "mx-auto size-4 animate-spin",
										"aria-hidden": true
									})
								}) }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 10,
									className: "px-4 py-10 text-center text-muted-foreground",
									children: "No clients yet."
								}) }) : rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientRowView, { row: r }, r.id))
							})]
						})
					})
				})
			]
		})
	});
}
function ClientRowView({ row }) {
	const submitted = row.submitted_at ?? row.created_at;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "hover:bg-muted/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3 font-medium",
				children: row.business_name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3 text-muted-foreground",
				children: row.owner_name ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3 text-muted-foreground",
				children: row.city ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3 text-muted-foreground",
				children: row.email ?? row.whatsapp ?? row.phone ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3 text-end tabular-nums",
				children: row.total_score ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3",
				children: row.priority ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3",
				children: row.recommended_plan ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3 text-end tabular-nums",
				children: row.estimated_opportunity != null ? row.estimated_opportunity.toLocaleString() : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-secondary px-2 py-0.5 text-xs font-medium",
					children: row.status
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3 text-xs text-muted-foreground",
				children: new Date(submitted).toLocaleString()
			})
		]
	});
}
//#endregion
export { ClientsPage as component };
