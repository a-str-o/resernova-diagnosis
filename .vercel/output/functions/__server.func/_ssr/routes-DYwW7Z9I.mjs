import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as useLanguage } from "./router-7SAz_osL.mjs";
import { n as Logo, r as cn, t as Button } from "./button-BD21Xb-x.mjs";
import { t as Input } from "./input-CptSL5L4.mjs";
import { g as ArrowLeft, h as ArrowRight, o as Lock, p as Check, r as ShieldCheck, s as LoaderCircle, u as Clock } from "../_libs/lucide-react.mjs";
import { a as completeDiagnostic, d as numAnswer, f as saveAnswers, i as STEPS, l as formatMAD, n as LanguageSwitcher, o as computeDiagnosis, p as visibleQuestions, s as createDiagnostic, t as AnimatedCounter, u as isAnswered } from "./diagnostic-api-CfHtYx2N.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DYwW7Z9I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Stepper({ current, total }) {
	const { t } = useLanguage();
	const steps = STEPS.slice(0, total);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Progress",
		className: "hidden lg:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-1",
			children: steps.map((s) => {
				const done = s.index < current;
				const active = s.index === current;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors", active && "bg-card shadow-card"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-8 shrink-0 place-items-center rounded-lg border text-xs font-semibold tabular-nums transition-colors", done && "border-primary bg-primary text-primary-foreground", active && !done && "border-primary bg-primary-soft text-primary", !done && !active && "border-border bg-card text-muted-foreground"),
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-4",
							"aria-hidden": true
						}) : String(s.index).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("min-w-0 truncate text-sm", active ? "font-semibold text-foreground" : "text-muted-foreground"),
						children: t(s.key)
					})]
				}) }, s.index);
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lg:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				t("wizard.step"),
				" ",
				current,
				" ",
				t("wizard.of"),
				" ",
				total
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate ps-3 text-foreground",
				children: t(steps[current - 1]?.key ?? "step.1.name")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2 w-full overflow-hidden rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-primary transition-[width] duration-500 ease-out",
				style: { width: `${current / total * 100}%` }
			})
		})]
	})] });
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
function OptionCard({ selected, label, onClick, multi }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-pressed": selected,
		className: cn("group flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-start transition-all duration-200", "hover:border-primary/60 hover:bg-primary-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", selected ? "border-primary bg-primary-soft shadow-card" : "border-border bg-card"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("grid size-5 shrink-0 place-items-center border transition-colors", multi ? "rounded-md" : "rounded-full", selected ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background"),
			children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3.5",
				"aria-hidden": true
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("min-w-0 text-sm sm:text-base", selected ? "font-semibold" : "font-medium"),
			children: label
		})]
	});
}
function QuestionField({ question, value, error, onChange }) {
	const { lang, t } = useLanguage();
	const label = question.title[lang];
	const help = question.help?.[lang];
	const unit = question.unit?.[lang];
	const inputId = `q-${question.id}`;
	const numberValue = typeof value === "number" ? value : typeof value === "string" && value !== "" ? Number(value) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-fade-up space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: inputId,
						className: "block text-lg font-semibold text-balance-tight sm:text-xl",
						children: [label, !question.required && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ms-2 align-middle text-xs font-medium text-muted-foreground",
							children: [
								"(",
								t("wizard.optional"),
								")"
							]
						})]
					}),
					help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: help
					}),
					question.type === "multiple_choice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-primary",
						children: t("wizard.selectMultiple")
					})
				]
			}),
			question.type === "single_choice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2.5 sm:grid-cols-2",
				children: question.options?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
					label: o.label[lang],
					selected: value === o.value,
					onClick: () => onChange(o.value)
				}, o.value))
			}),
			question.type === "multiple_choice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2.5 sm:grid-cols-2",
				children: question.options?.map((o) => {
					const list = Array.isArray(value) ? value : [];
					const selected = list.includes(o.value);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionCard, {
						multi: true,
						label: o.label[lang],
						selected,
						onClick: () => onChange(selected ? list.filter((v) => v !== o.value) : [...list, o.value])
					}, o.value);
				})
			}),
			question.type === "yes_no" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid max-w-md grid-cols-2 gap-2.5",
				children: [{
					v: "yes",
					l: t("wizard.yes")
				}, {
					v: "no",
					l: t("wizard.no")
				}].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(o.v),
					"aria-pressed": value === o.v,
					className: cn("rounded-xl border px-4 py-3.5 text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", value === o.v ? "border-primary bg-primary text-primary-foreground shadow-card" : "border-border bg-card hover:border-primary/60 hover:bg-primary-soft/60"),
					children: o.l
				}, o.v))
			}),
			(question.type === "slider" || question.type === "number" || question.type === "currency") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-xl border border-border bg-card p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: inputId,
						type: "number",
						inputMode: "numeric",
						min: question.min,
						max: question.max,
						value: numberValue ?? "",
						onChange: (e) => onChange(e.target.value === "" ? void 0 : Number(e.target.value)),
						className: "h-14 max-w-40 rounded-lg text-2xl font-bold tabular-nums"
					}), unit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pb-3.5 text-sm font-medium text-muted-foreground",
						children: unit
					})]
				}), question.type !== "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					value: [Math.min(question.max ?? 100, Math.max(question.min ?? 0, numberValue ?? question.min ?? 0))],
					min: question.min ?? 0,
					max: question.max ?? 100,
					step: question.stepSize ?? 1,
					onValueChange: (v) => onChange(v[0]),
					"aria-label": label
				})]
			}),
			[
				"text",
				"email",
				"phone",
				"url"
			].includes(question.type) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: inputId,
				type: question.type === "email" ? "email" : question.type === "phone" ? "tel" : "text",
				inputMode: question.type === "phone" ? "tel" : void 0,
				placeholder: question.placeholder?.[lang],
				value: typeof value === "string" ? value : "",
				onChange: (e) => onChange(e.target.value),
				className: "h-12 rounded-lg text-base"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm font-medium text-destructive",
				children: error
			})
		]
	});
}
var KEY = "resernova.diagnostic.session";
var empty = {
	diagnosticId: null,
	step: 1,
	answers: {},
	updatedAt: 0
};
function loadSession() {
	if (typeof window === "undefined") return empty;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return empty;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return empty;
		return {
			...empty,
			...parsed
		};
	} catch {
		return empty;
	}
}
function saveSession(session) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(KEY, JSON.stringify({
			...session,
			updatedAt: Date.now()
		}));
	} catch {}
}
function clearSession() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.removeItem(KEY);
	} catch {}
}
var TOTAL_STEPS = 8;
function DiagnosticPage() {
	const { t, lang } = useLanguage();
	const navigate = useNavigate();
	const [started, setStarted] = (0, import_react.useState)(false);
	const [hasSaved, setHasSaved] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(1);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [diagnosticId, setDiagnosticId] = (0, import_react.useState)(null);
	const [phase, setPhase] = (0, import_react.useState)("wizard");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [leadEmail, setLeadEmail] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const s = loadSession();
		if (s.diagnosticId || Object.keys(s.answers).length) {
			setHasSaved(true);
			setDiagnosticId(s.diagnosticId);
			setAnswers(s.answers);
			setStep(s.step || 1);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!started) return;
		saveSession({
			diagnosticId,
			step,
			answers,
			updatedAt: Date.now()
		});
	}, [
		started,
		diagnosticId,
		step,
		answers
	]);
	const questions = (0, import_react.useMemo)(() => visibleQuestions(answers, step), [answers, step]);
	const setAnswer = (0, import_react.useCallback)((id, value) => {
		setAnswers((prev) => ({
			...prev,
			[id]: value
		}));
		setErrors((prev) => ({
			...prev,
			[id]: ""
		}));
	}, []);
	const begin = async (resume) => {
		setStarted(true);
		if (!resume) {
			clearSession();
			setAnswers({});
			setStep(1);
		}
		if (!diagnosticId) {
			const id = await createDiagnostic(lang);
			setDiagnosticId(id);
		}
	};
	const validate = () => {
		const next = {};
		questions.forEach((q) => {
			if (!q.required) return;
			if (!isAnswered(q, answers)) next[q.id] = t("error.required");
			else if (q.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(answers[q.id]))) next[q.id] = t("error.email");
			else if (q.type === "phone" && String(answers[q.id]).replace(/\D/g, "").length < 8) next[q.id] = t("error.phone");
		});
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const goNext = async () => {
		if (!validate()) return;
		if (diagnosticId) saveAnswers(diagnosticId, answers, lang).catch(() => toast.error(t("error.network")));
		if (step < TOTAL_STEPS) {
			setStep(step + 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else {
			setPhase("lead");
			setLeadEmail(String(answers["email"] ?? ""));
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	};
	const submitLead = async () => {
		setSubmitting(true);
		try {
			let id = diagnosticId;
			if (!id) id = await createDiagnostic(lang);
			if (!id) throw new Error("no diagnostic");
			await completeDiagnostic(id, {
				...answers,
				email: leadEmail
			}, lang, {
				business_name: String(answers["business_name"] ?? ""),
				owner_name: String(answers["owner_name"] ?? ""),
				whatsapp: String(answers["whatsapp"] ?? answers["phone"] ?? ""),
				email: leadEmail,
				city: String(answers["city"] ?? "")
			});
			clearSession();
			navigate({
				to: "/diagnostic/$id",
				params: { id }
			});
		} catch {
			toast.error(t("error.generic"));
		} finally {
			setSubmitting(false);
		}
	};
	if (!started) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen surface-grid",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-col px-4 py-6 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto mt-14 max-w-2xl text-center sm:mt-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
								className: "size-3.5 text-primary",
								"aria-hidden": true
							}), t("landing.badge")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 text-4xl font-bold text-balance-tight sm:text-5xl",
							children: t("landing.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base text-muted-foreground sm:text-lg",
							children: t("landing.subtitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								className: "w-full gap-2 sm:w-auto",
								onClick: () => void begin(false),
								children: [t("landing.start"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									className: "size-4 rtl:rotate-180",
									"aria-hidden": true
								})]
							}), hasSaved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								className: "w-full bg-card sm:w-auto",
								onClick: () => void begin(true),
								children: t("landing.resume")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								className: "size-4",
								"aria-hidden": true
							}), t("landing.time")]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-16 grid gap-4 sm:grid-cols-3",
					children: [
						1,
						2,
						3
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-border bg-card p-5 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: t(`landing.point${i}.title`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: t(`landing.point${i}.body`)
						})]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mx-auto mt-10 max-w-xl pb-10 text-center text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
						className: "me-1 inline size-3",
						"aria-hidden": true
					}), t("landing.privacy")]
				})
			]
		})
	});
	if (phase === "lead") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center surface-grid px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-balance-tight",
					children: t("lead.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("lead.subtitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-4",
					children: [[
						{
							key: "owner_name",
							label: t("lead.name")
						},
						{
							key: "business_name",
							label: t("lead.business")
						},
						{
							key: "whatsapp",
							label: t("lead.whatsapp")
						},
						{
							key: "city",
							label: t("lead.city")
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: f.key,
							className: "text-sm font-medium",
							children: f.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: f.key,
							value: String(answers[f.key] ?? ""),
							onChange: (e) => setAnswer(f.key, e.target.value),
							className: "h-11"
						})]
					}, f.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "lead-email",
							className: "text-sm font-medium",
							children: t("lead.email")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lead-email",
							type: "email",
							value: leadEmail,
							onChange: (e) => setLeadEmail(e.target.value),
							className: "h-11"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "mt-6 w-full gap-2",
					disabled: submitting,
					onClick: () => void submitLead(),
					children: [submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": true
					}), submitting ? t("lead.submitting") : t("lead.cta")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: t("landing.privacy")
				})
			]
		})
	});
	const live = computeDiagnosis(answers);
	const showMissed = step === 4 && numAnswer(answers, "average_ticket") > 0;
	const showNoShow = step === 5 && numAnswer(answers, "average_ticket") > 0 && live.roi.appointmentsPerMonth > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen surface-grid",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-6 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, { compact: true })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "lg:sticky lg:top-6 lg:self-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
						current: step,
						total: 9
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/80 p-5 shadow-card backdrop-blur sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold text-balance-tight sm:text-3xl",
								children: t(STEPS[step - 1]?.titleKey ?? "step.1.title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 space-y-8",
								children: questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionField, {
									question: q,
									value: answers[q.id],
									error: errors[q.id] || null,
									onChange: (v) => setAnswer(q.id, v)
								}, q.id))
							}),
							(showMissed || showNoShow) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 animate-fade-up rounded-xl bg-primary-soft p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-muted-foreground",
										children: t("estimate.basedOn")
									}),
									showMissed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm font-medium",
												children: t("estimate.missedRevenue")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-3xl font-bold tabular-nums text-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
													value: live.roi.missedRevenue,
													format: (n) => formatMAD(n, lang)
												}), " DH"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ms-1 text-sm text-muted-foreground",
												children: t("estimate.perMonth")
											})
										]
									}),
									showNoShow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm font-medium",
												children: [
													t("estimate.noshowRate"),
													": ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "tabular-nums",
														children: [live.roi.noShowRate, "%"]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium",
												children: t("estimate.noshowRevenue")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-3xl font-bold tabular-nums text-primary",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, {
														value: live.roi.noShowRevenue,
														format: (n) => formatMAD(n, lang)
													}),
													" DH",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ms-1 text-sm font-medium text-muted-foreground",
														children: t("estimate.perMonth")
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-xs text-muted-foreground",
										children: t("estimate.disclaimer")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex items-center justify-between gap-3 border-t border-border pt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									className: "gap-2",
									disabled: step === 1,
									onClick: () => {
										setStep(Math.max(1, step - 1));
										window.scrollTo({
											top: 0,
											behavior: "smooth"
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
										className: "size-4 rtl:rotate-180",
										"aria-hidden": true
									}), t("wizard.back")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "lg",
									className: "gap-2",
									onClick: () => void goNext(),
									children: [step === TOTAL_STEPS ? t("wizard.seeResults") : t("wizard.continue"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										className: "size-4 rtl:rotate-180",
										"aria-hidden": true
									})]
								})]
							})
						]
					})
				})]
			})]
		})
	});
}
//#endregion
export { DiagnosticPage as component };
