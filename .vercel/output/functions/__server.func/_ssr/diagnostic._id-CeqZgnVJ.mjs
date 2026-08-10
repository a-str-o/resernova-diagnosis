import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as useLanguage } from "./router-7SAz_osL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnostic._id-CeqZgnVJ.js
var import_jsx_runtime = require_jsx_runtime();
function ReportError() {
	const { t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: t("error.notFound.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: t("error.notFound.body")
			})]
		})
	});
}
//#endregion
export { ReportError as t };
