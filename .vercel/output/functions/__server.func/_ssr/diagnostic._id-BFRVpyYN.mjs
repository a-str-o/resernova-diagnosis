import { M as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route, s as useLanguage } from "./router-7SAz_osL.mjs";
import { n as Logo, r as cn, t as Button } from "./button-BD21Xb-x.mjs";
import { h as ArrowRight, l as Copy, m as CalendarCheck, n as Sparkles, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as ReportError } from "./diagnostic._id-CeqZgnVJ.mjs";
import { c as fetchDiagnostic, l as formatMAD, n as LanguageSwitcher, o as computeDiagnosis, r as PLAN_PRICES, t as AnimatedCounter } from "./diagnostic-api-CfHtYx2N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnostic._id-BFRVpyYN.js
var import_jsx_runtime = require_jsx_runtime();
function ScoreDial({ score, label, className }) {
	const radius = 62;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - Math.min(100, Math.max(0, score)) / 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative size-40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 160 160",
				className: "size-full -rotate-90",
				"aria-hidden": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "80",
					cy: "80",
					r: radius,
					fill: "none",
					stroke: "var(--color-secondary)",
					strokeWidth: "12"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "80",
					cy: "80",
					r: radius,
					fill: "none",
					stroke: "var(--color-primary)",
					strokeWidth: "12",
					strokeLinecap: "round",
					strokeDasharray: circumference,
					strokeDashoffset: offset,
					style: { transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl font-bold tabular-nums",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: score })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium text-muted-foreground",
						children: "/ 100"
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm font-medium text-muted-foreground",
			children: label
		})]
	});
}
function ScoreBar({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate text-sm font-medium",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-sm font-semibold tabular-nums",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2.5 w-full overflow-hidden rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full transition-[width] duration-1000 ease-out", value >= 70 ? "bg-success" : value >= 45 ? "bg-warning" : "bg-danger"),
				style: { width: `${value}%` }
			})
		})]
	});
}
function Disclaimer({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex items-start gap-2 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
			className: "mt-0.5 size-3.5 shrink-0",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })]
	});
}
function ResultsReport({ diagnosis, reportUrl }) {
	const { t, lang } = useLanguage();
	const { roi } = diagnosis;
	const top = diagnosis.painPoints.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wide text-primary",
						children: t("app.product")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold text-balance-tight sm:text-4xl",
						children: t("results.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-muted-foreground",
						children: t("results.subtitle")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-card md:grid-cols-[auto_1fr] md:gap-10 md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreDial, {
					score: diagnosis.totalScore,
					label: t("results.overall")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 self-center",
					children: [diagnosis.categoryHealth.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
						label: t(`results.category.${c.key}`),
						value: c.value
					}, c.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-1 text-xs text-muted-foreground",
						children: t("results.scoreHelp")
					})]
				})]
			}),
			top.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-balance-tight",
					children: t("results.opportunities")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: top.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "animate-fade-up flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card",
						style: { animationDelay: `${i * 80}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold tabular-nums text-muted-foreground",
									children: String(i + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", p.severity === "high" ? "bg-danger/12 text-danger" : "bg-warning/15 text-gold-foreground"),
									children: t(`severity.${p.severity}`)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold",
								children: t(`pain.${p.key}`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: t(`pain.${p.key}.desc`)
							}),
							!!p.estimatedImpact && p.estimatedImpact > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-auto pt-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: t("results.estOpportunity")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xl font-bold text-primary tabular-nums",
										children: [formatMAD(p.estimatedImpact, lang), " DH"]
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: t("estimate.perMonth")
									})
								]
							})
						]
					}, p.key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-balance-tight",
						children: t("results.roi.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							{
								k: t("results.roi.missedBookings"),
								v: `${roi.missedBookingsPerMonth}`
							},
							{
								k: t("results.roi.avgTicket"),
								v: `${formatMAD(roi.averageTicket, lang)} DH`
							},
							{
								k: t("results.roi.missedRevenue"),
								v: `${formatMAD(roi.missedRevenue, lang)} DH`
							},
							{
								k: t("results.roi.noshowImpact"),
								v: `${formatMAD(roi.noShowRevenue, lang)} DH`
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-muted/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-medium text-muted-foreground",
								children: item.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-lg font-bold tabular-nums",
								children: item.v
							})]
						}, item.k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 rounded-xl bg-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: t("results.roi.total")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-3xl font-bold tabular-nums text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
									value: roi.totalOpportunity,
									format: (n) => formatMAD(n, lang)
								}),
								" DH",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ms-1 text-base font-medium text-muted-foreground",
									children: t("estimate.perMonth")
								})
							]
						})] }), roi.ratio > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:text-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: t("results.roi.ratio")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-bold tabular-nums",
								children: [roi.ratio, "x"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { text: t("results.roi.note") })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-balance-tight",
					children: t("results.reco.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("results.reco.subtitle")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: diagnosis.recommendations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "animate-fade-up rounded-2xl border border-border bg-card p-5 shadow-card",
						style: { animationDelay: `${i * 60}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold",
								children: t(`product.${r.product}`)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase", r.priority === "high" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
								children: t(`priority.${r.priority}`)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t(`product.${r.product}.desc`)
						})]
					}, r.product))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-primary/30 bg-primary-soft/60 p-6 shadow-card md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wide text-primary",
						children: t("results.plan.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-end gap-x-4 gap-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-bold uppercase",
							children: t(`plan.${diagnosis.plan}`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold tabular-nums",
							children: diagnosis.plan === "custom" ? t("results.plan.custom") : `${formatMAD(PLAN_PRICES[diagnosis.plan], lang)} ${t("results.plan.month")}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted-foreground",
						children: t(`plan.${diagnosis.plan}.desc`)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-3 sm:flex-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.resernova.info/en",
									target: "_blank",
									rel: "noopener noreferrer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, {
											className: "size-4",
											"aria-hidden": true
										}),
										t("results.cta.demo"),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											className: "size-4 rtl:rotate-180",
											"aria-hidden": true
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "gap-2 bg-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.resernova.info/en",
									target: "_blank",
									rel: "noopener noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										className: "size-4",
										"aria-hidden": true
									}), t("results.cta.specialist")]
								})
							}),
							reportUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "lg",
								variant: "ghost",
								className: "gap-2",
								onClick: () => {
									navigator.clipboard?.writeText(reportUrl);
									toast.success(t("results.share"));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									className: "size-4",
									"aria-hidden": true
								}), t("results.copyLink")]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { text: t("estimate.disclaimer") })
		]
	});
}
function ReportPage() {
	const { id } = Route.useParams();
	const { t } = useLanguage();
	const { data, isLoading, error } = useQuery({
		queryKey: ["diagnostic", id],
		queryFn: async () => {
			const row = await fetchDiagnostic(id);
			if (!row) throw notFound();
			return row;
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center px-4 text-sm text-muted-foreground",
		children: t("state.loading")
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportError, {});
	const diagnosis = computeDiagnosis(data.answers ?? {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen surface-grid",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsReport, {
				diagnosis,
				reportUrl: typeof window !== "undefined" ? window.location.href : void 0
			})]
		})
	});
}
//#endregion
export { ReportPage as component };
