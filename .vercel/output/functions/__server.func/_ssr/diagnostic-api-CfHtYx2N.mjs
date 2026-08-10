import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BSfjoP2_.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as LANGS, s as useLanguage } from "./router-7SAz_osL.mjs";
import { r as cn, t as Button } from "./button-BD21Xb-x.mjs";
import { c as Globe, d as Circle, f as ChevronRight, p as Check } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnostic-api-CfHtYx2N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function LanguageSwitcher({ compact = false }) {
	const { lang, setLang } = useLanguage();
	const current = LANGS.find((l) => l.code === lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			className: "gap-2 rounded-full border-border/80 bg-card px-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
					className: "size-4 text-muted-foreground",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: current.flag
				}),
				!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: current.label
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		className: "min-w-44",
		children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onSelect: () => setLang(l.code),
			className: l.code === lang ? "bg-primary-soft font-semibold" : "",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "me-2",
				"aria-hidden": true,
				children: l.flag
			}), l.label]
		}, l.code))
	})] });
}
var t3 = (en, fr, ar) => ({
	en,
	fr,
	ar
});
var STEPS = [
	{
		index: 1,
		key: "step.1.name",
		titleKey: "step.1.title"
	},
	{
		index: 2,
		key: "step.2.name",
		titleKey: "step.2.title"
	},
	{
		index: 3,
		key: "step.3.name",
		titleKey: "step.3.title"
	},
	{
		index: 4,
		key: "step.4.name",
		titleKey: "step.4.title"
	},
	{
		index: 5,
		key: "step.5.name",
		titleKey: "step.5.title"
	},
	{
		index: 6,
		key: "step.6.name",
		titleKey: "step.6.title"
	},
	{
		index: 7,
		key: "step.7.name",
		titleKey: "step.7.title"
	},
	{
		index: 8,
		key: "step.8.name",
		titleKey: "step.8.title"
	},
	{
		index: 9,
		key: "step.9.name",
		titleKey: "results.title"
	}
];
var num = (a, id, fallback = 0) => {
	const v = a[id];
	if (typeof v === "number" && !Number.isNaN(v)) return v;
	if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
	return fallback;
};
var has = (a, id, value) => {
	const v = a[id];
	return Array.isArray(v) ? v.includes(value) : v === value;
};
var usesWhatsApp = (a) => has(a, "booking_channels", "whatsapp");
var isMultiLocation = (a) => {
	const v = a["locations"];
	return v === "2" || v === "3_5" || v === "6plus";
};
var isSolo = (a) => a["team_size"] === "solo";
var hasNoShows = (a) => num(a, "noshows_per_month", 0) > 0;
var isHighRevenue = (a) => a["monthly_revenue"] === "100_250k" || a["monthly_revenue"] === "250k_plus" || a["monthly_revenue"] === "50_100k";
var QUESTIONS = [
	{
		id: "business_name",
		step: 1,
		type: "text",
		required: true,
		compact: true,
		title: t3("Business name", "Nom de l'établissement", "سمية المحل"),
		placeholder: t3("Salon Amal", "Salon Amal", "صالون أمل")
	},
	{
		id: "owner_name",
		step: 1,
		type: "text",
		required: true,
		compact: true,
		title: t3("Owner or decision maker", "Propriétaire ou décideur", "المالك ولا صاحب القرار")
	},
	{
		id: "phone",
		step: 1,
		type: "phone",
		required: true,
		compact: true,
		title: t3("Phone number", "Numéro de téléphone", "رقم التيليفون"),
		placeholder: t3("06 12 34 56 78", "06 12 34 56 78", "06 12 34 56 78")
	},
	{
		id: "whatsapp",
		step: 1,
		type: "phone",
		compact: true,
		title: t3("WhatsApp number", "Numéro WhatsApp", "رقم واتساب"),
		help: t3("Leave empty if it's the same number.", "Laissez vide si c'est le même numéro.", "خليه خاوي إلا كان نفس الرقم.")
	},
	{
		id: "email",
		step: 1,
		type: "email",
		compact: true,
		title: t3("Email", "E-mail", "الإيميل")
	},
	{
		id: "city",
		step: 1,
		type: "text",
		required: true,
		compact: true,
		title: t3("City", "Ville", "المدينة"),
		placeholder: t3("Casablanca", "Casablanca", "الدار البيضاء")
	},
	{
		id: "neighborhood",
		step: 1,
		type: "text",
		compact: true,
		title: t3("Neighborhood", "Quartier", "الحي")
	},
	{
		id: "business_type",
		step: 1,
		type: "single_choice",
		required: true,
		title: t3("What type of business do you run?", "Quel type d'établissement gérez-vous ?", "شنو نوع المحل ديالك؟"),
		options: [
			{
				value: "hair_salon",
				label: t3("Hair Salon", "Salon de coiffure", "صالون الحلاقة")
			},
			{
				value: "barber",
				label: t3("Barber", "Barbier", "حلاق الرجال")
			},
			{
				value: "beauty_salon",
				label: t3("Beauty Salon", "Institut de beauté", "صالون التجميل")
			},
			{
				value: "nail_salon",
				label: t3("Nail Salon", "Onglerie", "صالون الأظافر")
			},
			{
				value: "spa",
				label: t3("Spa", "Spa", "سبا")
			},
			{
				value: "hammam",
				label: t3("Hammam", "Hammam", "حمام")
			},
			{
				value: "massage",
				label: t3("Massage", "Massage", "مساج")
			},
			{
				value: "aesthetic",
				label: t3("Aesthetic / Laser", "Esthétique / Laser", "طب التجميل / ليزر")
			},
			{
				value: "other",
				label: t3("Other", "Autre", "شي حاجة أخرى")
			}
		]
	},
	{
		id: "locations",
		step: 1,
		type: "single_choice",
		required: true,
		title: t3("How many locations do you have?", "Combien d'établissements avez-vous ?", "شحال من فرع عندك؟"),
		options: [
			{
				value: "1",
				label: t3("1 location", "1 établissement", "فرع وحد")
			},
			{
				value: "2",
				label: t3("2 locations", "2 établissements", "جوج فروع")
			},
			{
				value: "3_5",
				label: t3("3–5 locations", "3–5 établissements", "3 حتى 5 فروع")
			},
			{
				value: "6plus",
				label: t3("6+ locations", "6+ établissements", "6 ولا كثر")
			}
		]
	},
	{
		id: "years_in_business",
		step: 1,
		type: "single_choice",
		title: t3("How long have you been open?", "Depuis combien de temps êtes-vous ouvert ?", "شحال هادي وانت خدام؟"),
		options: [
			{
				value: "lt1",
				label: t3("Less than 1 year", "Moins d'un an", "أقل من عام")
			},
			{
				value: "1_3",
				label: t3("1–3 years", "1–3 ans", "من عام ل 3")
			},
			{
				value: "3_7",
				label: t3("3–7 years", "3–7 ans", "من 3 ل 7 سنين")
			},
			{
				value: "7plus",
				label: t3("More than 7 years", "Plus de 7 ans", "كثر من 7 سنين")
			}
		]
	},
	{
		id: "online_presence",
		step: 1,
		type: "multiple_choice",
		title: t3("Where can clients find you online?", "Où vos clients vous trouvent-ils en ligne ?", "فين كيلقاوك الزبناء فالأنترنت؟"),
		options: [
			{
				value: "website",
				label: t3("Website", "Site web", "موقع إلكتروني")
			},
			{
				value: "instagram",
				label: t3("Instagram", "Instagram", "إنستغرام")
			},
			{
				value: "facebook",
				label: t3("Facebook", "Facebook", "فيسبوك")
			},
			{
				value: "google",
				label: t3("Google Maps", "Google Maps", "خرائط Google")
			},
			{
				value: "none",
				label: t3("Nowhere yet", "Nulle part encore", "مازال حتى بلاصة")
			}
		]
	},
	{
		id: "website_url",
		step: 1,
		type: "url",
		title: t3("Website or Instagram link", "Lien du site ou Instagram", "رابط الموقع ولا إنستغرام"),
		placeholder: t3("instagram.com/…", "instagram.com/…", "instagram.com/…"),
		condition: (a) => has(a, "online_presence", "website") || has(a, "online_presence", "instagram")
	},
	{
		id: "team_size",
		step: 2,
		type: "single_choice",
		required: true,
		title: t3("How many people currently work in your business?", "Combien de personnes travaillent actuellement chez vous ?", "شحال من واحد خدام معاك دابا؟"),
		options: [
			{
				value: "solo",
				label: t3("Just me", "Seulement moi", "غير أنا")
			},
			{
				value: "2_3",
				label: t3("2–3", "2–3", "2 حتى 3")
			},
			{
				value: "4_7",
				label: t3("4–7", "4–7", "4 حتى 7")
			},
			{
				value: "8_15",
				label: t3("8–15", "8–15", "8 حتى 15")
			},
			{
				value: "15plus",
				label: t3("15+", "15+", "كثر من 15")
			}
		]
	},
	{
		id: "service_providers",
		step: 2,
		type: "number",
		min: 1,
		max: 60,
		title: t3("How many of them provide services?", "Combien d'entre eux réalisent des prestations ?", "شحال فيهم كيخدمو مع الزبناء؟"),
		help: t3("Only the people who actually take appointments.", "Uniquement celles et ceux qui prennent des rendez-vous.", "غير اللي كياخدو مواعد مع الزبناء."),
		condition: (a) => !isSolo(a)
	},
	{
		id: "hours_per_day",
		step: 2,
		type: "slider",
		min: 4,
		max: 16,
		stepSize: 1,
		compact: true,
		title: t3("How many hours do you operate per day?", "Combien d'heures ouvrez-vous par jour ?", "شحال من ساعة كتخدم فالنهار؟"),
		unit: t3("hours", "heures", "ساعة")
	},
	{
		id: "days_per_week",
		step: 2,
		type: "slider",
		min: 1,
		max: 7,
		stepSize: 1,
		compact: true,
		title: t3("How many days per week?", "Combien de jours par semaine ?", "شحال من نهار فالسيمانة؟"),
		unit: t3("days", "jours", "أيام")
	},
	{
		id: "individual_schedules",
		step: 2,
		type: "yes_no",
		title: t3("Do employees have individual schedules?", "Vos employés ont-ils des horaires individuels ?", "واش كل موظف عندو الوقت ديالو؟"),
		condition: (a) => !isSolo(a)
	},
	{
		id: "availability_tool",
		step: 2,
		type: "single_choice",
		title: t3("How do you currently manage availability?", "Comment gérez-vous les disponibilités aujourd'hui ?", "كيفاش كتدبّر الأوقات المتاحة دابا؟"),
		options: [
			{
				value: "notebook",
				label: t3("Notebook", "Carnet", "كناش")
			},
			{
				value: "whatsapp",
				label: t3("WhatsApp", "WhatsApp", "واتساب")
			},
			{
				value: "excel",
				label: t3("Excel", "Excel", "إكسيل")
			},
			{
				value: "google_calendar",
				label: t3("Google Calendar", "Google Agenda", "أجندة Google")
			},
			{
				value: "software",
				label: t3("Another software", "Un autre logiciel", "برنامج آخر")
			},
			{
				value: "nothing",
				label: t3("Nothing specific", "Rien de particulier", "ما كاين حتى حاجة")
			}
		]
	},
	{
		id: "double_booking",
		step: 2,
		type: "single_choice",
		title: t3("How do you prevent double bookings?", "Comment évitez-vous les doubles réservations ?", "كيفاش كتمنع تضارب المواعد؟"),
		options: [
			{
				value: "calendar_software",
				label: t3("Calendar software", "Logiciel d'agenda", "برنامج أجندة")
			},
			{
				value: "manual",
				label: t3("Manual checking", "Vérification manuelle", "كنتشيكي باليد")
			},
			{
				value: "whatsapp",
				label: t3("WhatsApp", "WhatsApp", "واتساب")
			},
			{
				value: "notebook",
				label: t3("Notebook", "Carnet", "كناش")
			},
			{
				value: "conflicts",
				label: t3("We sometimes have conflicts", "Il y a parfois des conflits", "شي مرات كيتلاقاو المواعد")
			},
			{
				value: "none",
				label: t3("We don't have a system", "Nous n'avons pas de système", "ما عندنا حتى نظام")
			}
		]
	},
	{
		id: "booking_channels",
		step: 3,
		type: "multiple_choice",
		required: true,
		title: t3("Where do your clients usually contact you when they want to book?", "Par quel moyen vos clients vous contactent-ils généralement pour prendre rendez-vous ?", "فين كيتواصلو معاك الزبناء غالباً باش ياخدو موعد؟"),
		options: [
			{
				value: "whatsapp",
				label: t3("WhatsApp", "WhatsApp", "واتساب")
			},
			{
				value: "phone",
				label: t3("Phone", "Téléphone", "التلفون")
			},
			{
				value: "instagram",
				label: t3("Instagram", "Instagram", "إنستغرام")
			},
			{
				value: "facebook",
				label: t3("Facebook", "Facebook", "فيسبوك")
			},
			{
				value: "walk_in",
				label: t3("Walk-in", "Sans rendez-vous", "كيجيو للصالون مباشرة")
			},
			{
				value: "website",
				label: t3("Website", "Site web", "الموقع")
			},
			{
				value: "platform",
				label: t3("Booking platform", "Plateforme de réservation", "منصة حجز")
			},
			{
				value: "other",
				label: t3("Other", "Autre", "شي حاجة أخرى")
			}
		]
	},
	{
		id: "requests_per_week",
		step: 3,
		type: "slider",
		min: 0,
		max: 500,
		stepSize: 5,
		required: true,
		title: t3("Approximately how many appointment requests do you receive every week?", "Combien de demandes de rendez-vous recevez-vous environ chaque semaine ?", "تقريباً شحال من طلب ديال موعد كيوصلك كل سيمانة؟"),
		help: t3("This helps us estimate how much booking demand your business handles.", "Cela nous aide à estimer le volume de demandes que vous gérez.", "هادشي كيعاونا نعرفو شحال ديال الطلب كتدبّر."),
		unit: t3("requests / week", "demandes / semaine", "طلب / فالسيمانة")
	},
	{
		id: "response_time",
		step: 3,
		type: "single_choice",
		required: true,
		title: t3("How quickly do you usually respond to WhatsApp booking requests?", "En combien de temps répondez-vous aux demandes WhatsApp ?", "فشحال كتجاوب على طلبات الحجز فواتساب؟"),
		condition: usesWhatsApp,
		options: [
			{
				value: "immediately",
				label: t3("Immediately", "Immédiatement", "دغيا")
			},
			{
				value: "lt5",
				label: t3("Less than 5 minutes", "Moins de 5 minutes", "أقل من 5 دقايق")
			},
			{
				value: "5_15",
				label: t3("5–15 minutes", "5–15 minutes", "من 5 ل 15 دقيقة")
			},
			{
				value: "15_30",
				label: t3("15–30 minutes", "15–30 minutes", "من 15 ل 30 دقيقة")
			},
			{
				value: "30_60",
				label: t3("30–60 minutes", "30–60 minutes", "من 30 ل 60 دقيقة")
			},
			{
				value: "gt60",
				label: t3("More than 1 hour", "Plus d'une heure", "كثر من ساعة")
			},
			{
				value: "next_day",
				label: t3("Sometimes the next day", "Parfois le lendemain", "شي مرات غدا")
			}
		]
	},
	{
		id: "who_handles",
		step: 3,
		type: "single_choice",
		title: t3("Who usually handles booking messages?", "Qui gère habituellement les messages de réservation ?", "شكون غالباً كيرد على رسائل الحجز؟"),
		options: [
			{
				value: "me",
				label: t3("Me", "Moi", "أنا")
			},
			{
				value: "receptionist",
				label: t3("Receptionist", "Réceptionniste", "موظفة الاستقبال")
			},
			{
				value: "staff",
				label: t3("Staff members", "Les employés", "الموظفين")
			},
			{
				value: "multiple",
				label: t3("Multiple people", "Plusieurs personnes", "بزاف ديال الناس")
			},
			{
				value: "nobody",
				label: t3("Nobody specifically", "Personne en particulier", "ما كاين حتى واحد بالضبط")
			}
		]
	},
	{
		id: "busy_hours_behavior",
		step: 4,
		type: "single_choice",
		required: true,
		title: t3("During busy hours, what happens when a new client sends a WhatsApp message?", "Aux heures de pointe, que se passe-t-il quand un nouveau client envoie un message WhatsApp ?", "منين تكون مشغول بزاف، شنو كيوقع ملي شي زبون جديد كيصيفط رسالة فواتساب؟"),
		options: [
			{
				value: "immediate",
				label: t3("I answer immediately", "Je réponds immédiatement", "كنجاوب دغيا")
			},
			{
				value: "team",
				label: t3("Someone on my team answers", "Quelqu'un de mon équipe répond", "شي واحد من الفريق كيجاوب")
			},
			{
				value: "when_free",
				label: t3("We answer when we're free", "Nous répondons quand nous sommes libres", "كنجاوبو ملي نتفرغو")
			},
			{
				value: "forget",
				label: t3("Sometimes we forget", "Parfois nous oublions", "شي مرات كننساو")
			},
			{
				value: "miss",
				label: t3("We often miss messages", "Nous ratons souvent des messages", "بزاف ديال المرات كتفوتنا رسائل")
			}
		]
	},
	{
		id: "late_discovery",
		step: 4,
		type: "single_choice",
		required: true,
		title: t3("Have you ever discovered a WhatsApp message hours later and realized the client wanted to book?", "Vous est-il arrivé de découvrir un message WhatsApp des heures plus tard en réalisant que le client voulait réserver ?", "واش وقع ليك لقيتي رسالة فواتساب من بعد شي ساعات وعرفتي بلي الزبون كان باغي ياخد موعد؟"),
		options: [
			{
				value: "never",
				label: t3("Never", "Jamais", "عمرها")
			},
			{
				value: "rarely",
				label: t3("Rarely", "Rarement", "قليل")
			},
			{
				value: "sometimes",
				label: t3("Sometimes", "Parfois", "شي مرات")
			},
			{
				value: "often",
				label: t3("Often", "Souvent", "بزاف")
			},
			{
				value: "very_often",
				label: t3("Very often", "Très souvent", "بزاف بزاف")
			}
		]
	},
	{
		id: "unconverted_per_month",
		step: 4,
		type: "slider",
		min: 0,
		max: 200,
		stepSize: 1,
		required: true,
		title: t3("Approximately how many booking requests do you think you don't convert each month?", "Combien de demandes de rendez-vous pensez-vous ne pas convertir chaque mois ?", "تقريباً شحال من طلب موعد كتحس بلي ما كيتحولش لموعد كل شهر؟"),
		help: t3("An approximation is enough — we only need an order of magnitude.", "Une estimation suffit — nous cherchons un ordre de grandeur.", "تقدير كافي — غير باش نعرفو الحجم تقريباً."),
		unit: t3("requests / month", "demandes / mois", "طلب / فالشهر")
	},
	{
		id: "average_ticket",
		step: 4,
		type: "currency",
		min: 0,
		max: 5e3,
		required: true,
		title: t3("What is the average value of one appointment?", "Quelle est la valeur moyenne d'un rendez-vous ?", "شحال معدل ثمن الموعد الواحد؟"),
		unit: t3("DH", "DH", "درهم")
	},
	{
		id: "appointments_per_month",
		step: 5,
		type: "slider",
		min: 0,
		max: 2e3,
		stepSize: 10,
		required: true,
		title: t3("How many appointments do you handle per month?", "Combien de rendez-vous réalisez-vous par mois ?", "شحال من موعد كتدبّر فالشهر؟"),
		unit: t3("appointments / month", "rendez-vous / mois", "موعد / فالشهر")
	},
	{
		id: "noshows_per_month",
		step: 5,
		type: "slider",
		min: 0,
		max: 300,
		stepSize: 1,
		required: true,
		title: t3("Approximately how many clients don't show up?", "Environ combien de clients ne se présentent pas ?", "تقريباً شحال من زبون ما كيجيش؟"),
		unit: t3("no-shows / month", "absences / mois", "غياب / فالشهر")
	},
	{
		id: "sends_reminders",
		step: 5,
		type: "yes_no",
		title: t3("Do you send appointment reminders?", "Envoyez-vous des rappels de rendez-vous ?", "واش كتصيفط تذكير بالموعد؟"),
		condition: hasNoShows
	},
	{
		id: "reminder_channel",
		step: 5,
		type: "single_choice",
		title: t3("How are reminders sent?", "Comment les rappels sont-ils envoyés ?", "كيفاش كتصيفط التذكير؟"),
		condition: (a) => hasNoShows(a) && a["sends_reminders"] === "yes",
		options: [
			{
				value: "manual_whatsapp",
				label: t3("Manually on WhatsApp", "Manuellement sur WhatsApp", "باليد فواتساب")
			},
			{
				value: "manual_call",
				label: t3("By calling the client", "En appelant le client", "بالتيليفون")
			},
			{
				value: "sms",
				label: t3("SMS", "SMS", "رسالة SMS")
			},
			{
				value: "automatic",
				label: t3("Automatically by software", "Automatiquement par logiciel", "أوتوماتيك ببرنامج")
			}
		]
	},
	{
		id: "client_data_location",
		step: 6,
		type: "single_choice",
		required: true,
		title: t3("Where do you keep information about your clients?", "Où conservez-vous les informations sur vos clients ?", "فين كتحتافظ بمعلومات الزبناء؟"),
		options: [
			{
				value: "nowhere",
				label: t3("Nowhere", "Nulle part", "حتى بلاصة")
			},
			{
				value: "contacts",
				label: t3("Phone contacts", "Contacts du téléphone", "أرقام التيليفون")
			},
			{
				value: "whatsapp",
				label: t3("WhatsApp", "WhatsApp", "واتساب")
			},
			{
				value: "notebook",
				label: t3("Notebook", "Carnet", "كناش")
			},
			{
				value: "excel",
				label: t3("Excel", "Excel", "إكسيل")
			},
			{
				value: "software",
				label: t3("Another software", "Un autre logiciel", "برنامج آخر")
			},
			{
				value: "crm",
				label: t3("A CRM", "Un CRM", "CRM")
			}
		]
	},
	{
		id: "crm_name",
		step: 6,
		type: "text",
		title: t3("Which CRM do you use?", "Quel CRM utilisez-vous ?", "شنو CRM اللي كتستعمل؟"),
		condition: (a) => a["client_data_location"] === "crm" || a["client_data_location"] === "software"
	},
	{
		id: "crm_feedback",
		step: 6,
		type: "text",
		title: t3("What works well and what doesn't with it?", "Qu'est-ce qui fonctionne bien ou non avec cet outil ?", "شنو كيعجبك وشنو ما كيعجبكش فيه؟"),
		condition: (a) => a["client_data_location"] === "crm" || a["client_data_location"] === "software"
	},
	{
		id: "sees_history",
		step: 6,
		type: "yes_no",
		compact: true,
		title: t3("Can you see a client's previous appointments?", "Pouvez-vous voir les rendez-vous passés d'un client ?", "واش تقدر تشوف المواعد القدام ديال شي زبون؟")
	},
	{
		id: "sees_spend",
		step: 6,
		type: "yes_no",
		compact: true,
		title: t3("Can you see how much a client has spent with your business?", "Pouvez-vous voir combien un client a dépensé chez vous ?", "واش تقدر تشوف شحال صرف عندك شي زبون؟")
	},
	{
		id: "sees_inactive",
		step: 6,
		type: "yes_no",
		compact: true,
		title: t3("Can you identify clients who haven't visited recently?", "Pouvez-vous repérer les clients qui ne sont pas revenus récemment ?", "واش تقدر تعرف الزبناء اللي مدة ما جاو؟")
	},
	{
		id: "personalized_offers",
		step: 6,
		type: "single_choice",
		title: t3("Do you send personalized offers to existing clients?", "Envoyez-vous des offres personnalisées à vos clients existants ?", "واش كتصيفط عروض خاصة للزبناء ديالك؟"),
		options: [
			{
				value: "never",
				label: t3("Never", "Jamais", "عمرني")
			},
			{
				value: "rarely",
				label: t3("Rarely", "Rarement", "قليل")
			},
			{
				value: "sometimes",
				label: t3("Sometimes", "Parfois", "شي مرات")
			},
			{
				value: "frequently",
				label: t3("Frequently", "Fréquemment", "بزاف")
			}
		]
	},
	{
		id: "wants_reactivation",
		step: 6,
		type: "yes_no",
		title: t3("If a client hasn't visited for 60 days, would you like to automatically identify them and contact them?", "Si un client n'est pas venu depuis 60 jours, aimeriez-vous le repérer et le recontacter automatiquement ?", "إلا شي زبون دازو 60 يوم ما جا، واش كتبغي تعرفو وتتواصل معاه أوتوماتيكياً؟")
	},
	{
		id: "monthly_revenue",
		step: 7,
		type: "single_choice",
		required: true,
		title: t3("What is your monthly revenue range?", "Quelle est votre tranche de chiffre d'affaires mensuel ?", "شحال دخلك الشهري تقريباً؟"),
		help: t3("An approximate range is enough.", "Une fourchette approximative suffit.", "غير تقريباً، ماشي بالضبط."),
		options: [
			{
				value: "lt10k",
				label: t3("Under 10,000 DH", "Moins de 10 000 DH", "أقل من 10.000 درهم")
			},
			{
				value: "10_25k",
				label: t3("10,000–25,000 DH", "10 000–25 000 DH", "من 10.000 ل 25.000 درهم")
			},
			{
				value: "25_50k",
				label: t3("25,000–50,000 DH", "25 000–50 000 DH", "من 25.000 ل 50.000 درهم")
			},
			{
				value: "50_100k",
				label: t3("50,000–100,000 DH", "50 000–100 000 DH", "من 50.000 ل 100.000 درهم")
			},
			{
				value: "100_250k",
				label: t3("100,000–250,000 DH", "100 000–250 000 DH", "من 100.000 ل 250.000 درهم")
			},
			{
				value: "250k_plus",
				label: t3("250,000+ DH", "250 000+ DH", "كثر من 250.000 درهم")
			}
		]
	},
	{
		id: "biggest_challenges",
		step: 7,
		type: "multiple_choice",
		required: true,
		title: t3("What is your biggest challenge right now?", "Quel est votre plus grand défi actuellement ?", "شنو أكبر مشكل عندك دابا؟"),
		options: [
			{
				value: "new_clients",
				label: t3("Getting new clients", "Trouver de nouveaux clients", "جلب زبناء جدد")
			},
			{
				value: "retention",
				label: t3("Keeping existing clients", "Fidéliser les clients", "الحفاظ على الزبناء")
			},
			{
				value: "bookings",
				label: t3("Managing bookings", "Gérer les réservations", "تدبير المواعد")
			},
			{
				value: "noshows",
				label: t3("No-shows", "Les absences", "الزبناء اللي ما كيجيوش")
			},
			{
				value: "staff",
				label: t3("Staff management", "Gestion du personnel", "تدبير الموظفين")
			},
			{
				value: "whatsapp",
				label: t3("WhatsApp messages", "Les messages WhatsApp", "رسائل واتساب")
			},
			{
				value: "revenue",
				label: t3("Increasing revenue", "Augmenter le revenu", "زيادة المداخيل")
			},
			{
				value: "multi_location",
				label: t3("Managing multiple locations", "Gérer plusieurs sites", "تدبير بزاف ديال الفروع")
			},
			{
				value: "performance",
				label: t3("Understanding business performance", "Comprendre la performance", "فهم أداء المشروع")
			}
		]
	},
	{
		id: "expansion_plan",
		step: 7,
		type: "single_choice",
		title: t3("Are you planning to open another location?", "Prévoyez-vous d'ouvrir un autre établissement ?", "واش ناوي تحل شي فرع آخر؟"),
		options: [
			{
				value: "12m",
				label: t3("Yes, within 12 months", "Oui, d'ici 12 mois", "أه، فأقل من 12 شهر")
			},
			{
				value: "eventually",
				label: t3("Yes, eventually", "Oui, un jour", "أه، من بعد")
			},
			{
				value: "maybe",
				label: t3("Maybe", "Peut-être", "يمكن")
			},
			{
				value: "no",
				label: t3("No", "Non", "لا")
			}
		]
	},
	{
		id: "cross_location_visibility",
		step: 7,
		type: "yes_no",
		title: t3("Can you compare performance between your locations today?", "Pouvez-vous comparer la performance entre vos établissements ?", "واش تقدر تقارن الأداء بين الفروع ديالك؟"),
		condition: isMultiLocation
	},
	{
		id: "reporting_frequency",
		step: 7,
		type: "single_choice",
		title: t3("How often do you review your business numbers?", "À quelle fréquence analysez-vous vos chiffres ?", "شحال من مرة كتشوف الأرقام ديال المشروع؟"),
		condition: isHighRevenue,
		options: [
			{
				value: "daily",
				label: t3("Daily", "Chaque jour", "كل نهار")
			},
			{
				value: "weekly",
				label: t3("Weekly", "Chaque semaine", "كل سيمانة")
			},
			{
				value: "monthly",
				label: t3("Monthly", "Chaque mois", "كل شهر")
			},
			{
				value: "rarely",
				label: t3("Rarely", "Rarement", "قليل")
			},
			{
				value: "never",
				label: t3("Never", "Jamais", "عمرني")
			}
		]
	},
	{
		id: "decision_maker",
		step: 8,
		type: "single_choice",
		required: true,
		title: t3("Who usually makes decisions about new software?", "Qui décide habituellement pour les nouveaux logiciels ?", "شكون غالباً كياخد القرار على البرامج الجديدة؟"),
		options: [
			{
				value: "me",
				label: t3("Me", "Moi", "أنا")
			},
			{
				value: "partner",
				label: t3("My partner", "Mon associé", "الشريك ديالي")
			},
			{
				value: "manager",
				label: t3("Manager", "Le manager", "المسؤول")
			},
			{
				value: "someone_else",
				label: t3("Someone else", "Quelqu'un d'autre", "شي واحد آخر")
			}
		]
	},
	{
		id: "timeline",
		step: 8,
		type: "single_choice",
		required: true,
		title: t3("If you found a solution that could save time and increase revenue, when would you consider implementing it?", "Si vous trouviez une solution qui fait gagner du temps et augmente le revenu, quand l'implémenteriez-vous ?", "إلا لقيتي حل كيربح ليك الوقت وكيزيد الدخل، إمتا غادي تفكر تستعملو؟"),
		options: [
			{
				value: "immediately",
				label: t3("Immediately", "Immédiatement", "دابا")
			},
			{
				value: "this_month",
				label: t3("This month", "Ce mois-ci", "هاد الشهر")
			},
			{
				value: "3m",
				label: t3("Within 3 months", "D'ici 3 mois", "فأقل من 3 شهور")
			},
			{
				value: "3_6m",
				label: t3("3–6 months", "3–6 mois", "من 3 ل 6 شهور")
			},
			{
				value: "researching",
				label: t3("Just researching", "Je me renseigne", "غير كنقلب")
			}
		]
	},
	{
		id: "objections",
		step: 8,
		type: "multiple_choice",
		title: t3("What would prevent you from adopting a new system?", "Qu'est-ce qui vous empêcherait d'adopter un nouveau système ?", "شنو ممكن يمنعك تستعمل نظام جديد؟"),
		options: [
			{
				value: "price",
				label: t3("Price", "Le prix", "الثمن")
			},
			{
				value: "difficult",
				label: t3("Difficult to use", "Difficile à utiliser", "صعيب يتستعمل")
			},
			{
				value: "team_adoption",
				label: t3("Team won't use it", "L'équipe ne l'utilisera pas", "الفريق ما غاديش يستعملو")
			},
			{
				value: "whatsapp_change",
				label: t3("Don't want to change WhatsApp", "Ne pas vouloir changer WhatsApp", "ما بغيتش نبدل واتساب")
			},
			{
				value: "trust_automation",
				label: t3("Don't trust automation", "Méfiance envers l'automatisation", "ما كنثيقش فالأوتوماتيك")
			},
			{
				value: "features",
				label: t3("Need specific features", "Besoin de fonctionnalités précises", "خاصني خصائص معينة")
			},
			{
				value: "partner",
				label: t3("Need to discuss with partner", "Doit en parler à mon associé", "خاصني نتشاور مع الشريك")
			},
			{
				value: "nothing",
				label: t3("Nothing", "Rien", "والو")
			}
		]
	}
];
function visibleQuestions(answers, step) {
	return QUESTIONS.filter((q) => q.step === step && (!q.condition || q.condition(answers)));
}
function isAnswered(q, answers) {
	const v = answers[q.id];
	if (v === void 0 || v === null) return false;
	if (Array.isArray(v)) return v.length > 0;
	if (typeof v === "string") return v.trim() !== "";
	return true;
}
var numAnswer = num;
var hasAnswer = has;
var PLAN_PRICES = {
	starter: 299,
	pro: 549,
	custom: 0
};
var clamp = (v, min, max) => Math.max(min, Math.min(max, v));
var TEAM_POINTS = {
	solo: 4,
	"2_3": 9,
	"4_7": 14,
	"8_15": 18,
	"15plus": 20
};
var LOCATION_BONUS = {
	"1": 0,
	"2": 3,
	"3_5": 5,
	"6plus": 6
};
var REVENUE_POINTS = {
	lt10k: 2,
	"10_25k": 5,
	"25_50k": 9,
	"50_100k": 13,
	"100_250k": 17,
	"250k_plus": 20
};
var RESPONSE_LAG = {
	immediately: 0,
	lt5: 1,
	"5_15": 4,
	"15_30": 7,
	"30_60": 10,
	gt60: 13,
	next_day: 15
};
var LATE_DISCOVERY = {
	never: 0,
	rarely: 3,
	sometimes: 7,
	often: 11,
	very_often: 15
};
var BUSY_BEHAVIOR = {
	immediate: 0,
	team: 2,
	when_free: 7,
	forget: 11,
	miss: 15
};
var URGENCY = {
	immediately: 5,
	this_month: 4,
	"3m": 3,
	"3_6m": 2,
	researching: 1
};
function computeDiagnosis(answers) {
	const teamPts = TEAM_POINTS[String(answers["team_size"] ?? "")] ?? 4;
	const revenuePts = REVENUE_POINTS[String(answers["monthly_revenue"] ?? "")] ?? 4;
	const locBonus = LOCATION_BONUS[String(answers["locations"] ?? "1")] ?? 0;
	const business_size = clamp(Math.round((teamPts + revenuePts) / 2) + locBonus, 0, 20);
	const requestsPerWeek = numAnswer(answers, "requests_per_week", 0);
	const booking_volume = clamp(Math.round(requestsPerWeek / 150 * 20), 0, 20);
	const channels = Array.isArray(answers["booking_channels"]) ? answers["booking_channels"] : [];
	const usesWa = channels.includes("whatsapp");
	const usesInsta = channels.includes("instagram") || channels.includes("facebook");
	const manualChannels = channels.filter((c) => [
		"whatsapp",
		"phone",
		"instagram",
		"facebook"
	].includes(c)).length;
	const whatsapp_dependency = clamp((usesWa ? 8 : 0) + (usesInsta ? 3 : 0) + manualChannels * 1.5, 0, 15);
	const responseLag = RESPONSE_LAG[String(answers["response_time"] ?? "")] ?? 5;
	const late = LATE_DISCOVERY[String(answers["late_discovery"] ?? "")] ?? 0;
	const busy = BUSY_BEHAVIOR[String(answers["busy_hours_behavior"] ?? "")] ?? 0;
	const missed_bookings = clamp(Math.round((responseLag + late + busy) / 3), 0, 15);
	const appointmentsPerMonth = numAnswer(answers, "appointments_per_month", 0);
	const noShowsPerMonth = numAnswer(answers, "noshows_per_month", 0);
	const noShowRate = appointmentsPerMonth > 0 ? noShowsPerMonth / appointmentsPerMonth * 100 : 0;
	const noshow = clamp(Math.round(noShowRate / 15 * 10), 0, 10);
	const dataLoc = String(answers["client_data_location"] ?? "nowhere");
	const crmBase = {
		nowhere: 10,
		contacts: 9,
		whatsapp: 8,
		notebook: 8,
		excel: 6,
		software: 3,
		crm: 1
	};
	const visibilityGaps = (answers["sees_history"] === "no" ? 1 : 0) + (answers["sees_spend"] === "no" ? 1 : 0) + (answers["sees_inactive"] === "no" ? 1 : 0);
	const crm_maturity = clamp(Math.round(((crmBase[dataLoc] ?? 8) + visibilityGaps) / 1.3), 0, 10);
	const expansion = String(answers["expansion_plan"] ?? "");
	const growth = clamp((expansion === "12m" ? 5 : expansion === "eventually" ? 3 : expansion === "maybe" ? 2 : 1) + (isMultiLocation(answers) ? 1 : 0), 0, 5);
	const urgency = URGENCY[String(answers["timeline"] ?? "")] ?? 1;
	const scores = {
		business_size,
		booking_volume,
		whatsapp_dependency: Math.round(whatsapp_dependency),
		missed_bookings,
		noshow,
		crm_maturity,
		growth,
		urgency
	};
	const totalScore = Object.values(scores).reduce((s, v) => s + v, 0);
	const leadPriority = totalScore >= 80 ? "hot" : totalScore >= 60 ? "qualified" : totalScore >= 40 ? "nurture" : "low";
	const schedulingManual = [
		"notebook",
		"whatsapp",
		"nothing",
		"excel"
	].includes(String(answers["availability_tool"] ?? "nothing"));
	const conflictRisk = [
		"conflicts",
		"none",
		"manual",
		"notebook",
		"whatsapp"
	].includes(String(answers["double_booking"] ?? "none"));
	const operations = clamp(100 - (schedulingManual ? 30 : 0) - (conflictRisk ? 22 : 0) - (answers["individual_schedules"] === "no" ? 10 : 0), 10, 98);
	const bookings = clamp(100 - responseLag * 3 - busy * 2 - (usesWa && !answers["response_time"] ? 5 : 0), 10, 98);
	const retention = clamp(100 - crm_maturity * 7 - (answers["personalized_offers"] === "never" ? 12 : 0), 8, 98);
	const reportingWeak = [
		"rarely",
		"never",
		""
	].includes(String(answers["reporting_frequency"] ?? ""));
	const visibility = clamp(100 - (answers["sees_spend"] === "no" ? 30 : 0) - (dataLoc === "nowhere" ? 25 : 0) - (reportingWeak ? 15 : 0), 8, 98);
	const averageTicket = numAnswer(answers, "average_ticket", 0);
	const unconverted = numAnswer(answers, "unconverted_per_month", 0);
	const missedRevenue = Math.round(unconverted * averageTicket);
	const noShowRevenue = Math.round(noShowsPerMonth * averageTicket);
	const pains = [];
	if (usesWa && (responseLag >= 4 || busy >= 7 || late >= 7)) pains.push({
		key: "missed_whatsapp",
		severity: responseLag >= 10 || busy >= 11 ? "high" : "medium",
		product: "ai_receptionist",
		estimatedImpact: missedRevenue
	});
	if (responseLag >= 7) pains.push({
		key: "slow_response",
		severity: responseLag >= 13 ? "high" : "medium",
		product: "whatsapp_booking"
	});
	if (noShowRate > 5) pains.push({
		key: "high_noshow",
		severity: noShowRate > 10 ? "high" : "medium",
		product: "reminders",
		estimatedImpact: noShowRevenue
	});
	if (answers["sends_reminders"] === "no" && noShowsPerMonth > 0) pains.push({
		key: "no_reminders",
		severity: "medium",
		product: "reminders",
		estimatedImpact: noShowRevenue
	});
	if (schedulingManual || conflictRisk) pains.push({
		key: "manual_scheduling",
		severity: conflictRisk ? "high" : "medium",
		product: "smart_calendar"
	});
	if ([
		"nowhere",
		"contacts",
		"whatsapp",
		"notebook"
	].includes(dataLoc) || visibilityGaps >= 2) pains.push({
		key: "no_crm",
		severity: dataLoc === "nowhere" ? "high" : "medium",
		product: "crm"
	});
	if (isMultiLocation(answers)) pains.push({
		key: "multi_location",
		severity: answers["cross_location_visibility"] === "no" ? "high" : "medium",
		product: "multi_location"
	});
	if (answers["sees_spend"] === "no" || reportingWeak) pains.push({
		key: "no_analytics",
		severity: "medium",
		product: "analytics"
	});
	if (!["solo"].includes(String(answers["team_size"])) && (answers["individual_schedules"] === "no" || hasAnswer(answers, "biggest_challenges", "staff"))) pains.push({
		key: "team_coordination",
		severity: "medium",
		product: "team"
	});
	const severityWeight = {
		high: 3,
		medium: 2,
		low: 1
	};
	pains.sort((a, b) => severityWeight[b.severity] - severityWeight[a.severity] || (b.estimatedImpact ?? 0) - (a.estimatedImpact ?? 0));
	const recoMap = /* @__PURE__ */ new Map();
	pains.forEach((p) => {
		const priority = p.severity === "high" ? "high" : "medium";
		const existing = recoMap.get(p.product);
		if (!existing || existing !== "high" && priority === "high") recoMap.set(p.product, priority);
	});
	if (!recoMap.has("smart_calendar")) recoMap.set("smart_calendar", "medium");
	if (usesWa && !recoMap.has("ai_receptionist")) recoMap.set("ai_receptionist", "medium");
	const order = [
		"high",
		"medium",
		"low"
	];
	const recommendations = [...recoMap.entries()].sort((a, b) => order.indexOf(a[1]) - order.indexOf(b[1])).map(([product, priority], i) => ({
		product,
		priority,
		rank: i + 1
	}));
	const bigTeam = ["8_15", "15plus"].includes(String(answers["team_size"]));
	const manyLocations = ["3_5", "6plus"].includes(String(answers["locations"]));
	const highVolume = requestsPerWeek >= 120;
	const plan = manyLocations || bigTeam && highVolume ? "custom" : highVolume || requestsPerWeek >= 45 || bigTeam || answers["locations"] === "2" || crm_maturity >= 7 ? "pro" : "starter";
	const planPrice = PLAN_PRICES[plan] || PLAN_PRICES.pro;
	const totalOpportunity = missedRevenue + noShowRevenue;
	return {
		scores,
		totalScore,
		leadPriority,
		categoryHealth: [
			{
				key: "operations",
				value: Math.round(operations)
			},
			{
				key: "bookings",
				value: Math.round(bookings)
			},
			{
				key: "retention",
				value: Math.round(retention)
			},
			{
				key: "visibility",
				value: Math.round(visibility)
			}
		],
		painPoints: pains,
		recommendations,
		roi: {
			missedBookingsPerMonth: unconverted,
			averageTicket,
			missedRevenue,
			appointmentsPerMonth,
			noShowsPerMonth,
			noShowRate: Math.round(noShowRate * 10) / 10,
			noShowRevenue,
			totalOpportunity,
			planPrice,
			ratio: planPrice > 0 ? Math.round(totalOpportunity / planPrice * 10) / 10 : 0
		},
		plan,
		objections: Array.isArray(answers["objections"]) ? answers["objections"] : []
	};
}
function formatMAD(value, lang) {
	const locale = lang === "fr" ? "fr-MA" : lang === "ar" ? "ar-MA" : "en-US";
	try {
		return new Intl.NumberFormat(locale === "ar-MA" ? "en-US" : locale, { maximumFractionDigits: 0 }).format(Math.round(value));
	} catch {
		return String(Math.round(value));
	}
}
function AnimatedCounter({ value, duration = 900, format, className }) {
	const [display, setDisplay] = (0, import_react.useState)(0);
	const fromRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const from = fromRef.current;
		const start = performance.now();
		let frame = 0;
		const tick = (now) => {
			const p = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - p, 3);
			setDisplay(from + (value - from) * eased);
			if (p < 1) frame = requestAnimationFrame(tick);
			else fromRef.current = value;
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [value, duration]);
	const rounded = Math.round(display);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children: format ? format(rounded) : rounded
	});
}
async function createDiagnostic(lang) {
	const { data, error } = await supabase.from("diagnostics").insert({ language: lang }).select("id").single();
	if (error) return null;
	return data.id;
}
async function saveAnswers(diagnosticId, answers, lang) {
	await supabase.from("diagnostics").update({
		answers,
		language: lang,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", diagnosticId);
	const rows = Object.entries(answers).map(([question_id, answer]) => ({
		diagnostic_id: diagnosticId,
		question_id,
		answer: answer ?? null,
		language: lang
	}));
	if (rows.length) await supabase.from("diagnostic_answers").upsert(rows, { onConflict: "diagnostic_id,question_id" });
}
async function completeDiagnostic(diagnosticId, answers, lang, lead) {
	const d = computeDiagnosis(answers);
	await saveAnswers(diagnosticId, answers, lang);
	await supabase.from("diagnostics").update({
		status: "completed",
		total_score: d.totalScore,
		priority: d.leadPriority,
		recommended_plan: d.plan,
		estimated_opportunity: d.roi.totalOpportunity,
		missed_revenue: d.roi.missedRevenue,
		noshow_revenue: d.roi.noShowRevenue,
		completed_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", diagnosticId);
	await supabase.from("leads").insert({
		diagnostic_id: diagnosticId,
		business_name: lead.business_name || "—",
		owner_name: lead.owner_name ?? null,
		phone: answers["phone"] ?? null,
		whatsapp: lead.whatsapp ?? null,
		email: lead.email ?? null,
		city: lead.city ?? null,
		neighborhood: answers["neighborhood"] ?? null,
		business_type: answers["business_type"] ?? null,
		locations: answers["locations"] ?? null
	});
	await supabase.from("clients").insert({
		business_name: lead.business_name || "—",
		owner_name: lead.owner_name ?? null,
		email: lead.email ?? null,
		whatsapp: lead.whatsapp ?? null,
		phone: answers["phone"] ?? null,
		city: lead.city ?? null,
		neighborhood: answers["neighborhood"] ?? null,
		business_type: answers["business_type"] ?? null,
		locations: answers["locations"] ?? null,
		status: "new",
		language: lang,
		total_score: d.totalScore,
		priority: d.leadPriority,
		recommended_plan: d.plan,
		estimated_opportunity: d.roi.totalOpportunity,
		missed_revenue: d.roi.missedRevenue,
		noshow_revenue: d.roi.noShowRevenue,
		submitted_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	await supabase.from("lead_scores").insert(Object.entries(d.scores).map(([category, score]) => ({
		diagnostic_id: diagnosticId,
		category,
		score,
		max_score: {
			business_size: 20,
			booking_volume: 20,
			whatsapp_dependency: 15,
			missed_bookings: 15,
			noshow: 10,
			crm_maturity: 10,
			growth: 5,
			urgency: 5
		}[category] ?? 10
	})));
	if (d.painPoints.length) await supabase.from("pain_points").insert(d.painPoints.map((p) => ({
		diagnostic_id: diagnosticId,
		key: p.key,
		severity: p.severity,
		recommended_product: p.product,
		estimated_impact: p.estimatedImpact ?? null
	})));
	if (d.recommendations.length) await supabase.from("recommendations").insert(d.recommendations.map((r) => ({
		diagnostic_id: diagnosticId,
		product: r.product,
		priority: r.priority,
		rank: r.rank
	})));
	return d;
}
async function fetchDiagnostic(id) {
	const { data, error } = await supabase.from("diagnostics").select("*").eq("id", id).maybeSingle();
	if (error) throw error;
	return data;
}
//#endregion
export { completeDiagnostic as a, fetchDiagnostic as c, numAnswer as d, saveAnswers as f, STEPS as i, formatMAD as l, LanguageSwitcher as n, computeDiagnosis as o, visibleQuestions as p, PLAN_PRICES as r, createDiagnostic as s, AnimatedCounter as t, isAnswered as u };
