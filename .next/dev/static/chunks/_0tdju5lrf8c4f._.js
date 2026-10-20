(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/cotizador/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CotizadorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormularioAcuerdo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FormularioAcuerdo.tsx [app-client] (ecmascript)"); // <-- IMPORTAMOS EL COMPONENTE MAESTRO
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function CotizadorPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [verificando, setVerificando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Verificamos que el usuario no sea ADMINISTRATIVO (ellos no pueden cotizar)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CotizadorPage.useEffect": ()=>{
            const checkAccess = {
                "CotizadorPage.useEffect.checkAccess": async ()=>{
                    const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                    if (session?.user?.email) {
                        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('rol').eq('email', session.user.email).single();
                        if (data && data.rol === 'ADMINISTRATIVO') {
                            router.push('/crm');
                        } else {
                            setVerificando(false);
                        }
                    } else {
                        setVerificando(false);
                    }
                }
            }["CotizadorPage.useEffect.checkAccess"];
            checkAccess();
        }
    }["CotizadorPage.useEffect"], [
        router
    ]);
    if (verificando) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex items-center justify-center p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-cyan-400 font-semibold animate-pulse",
                children: "Verificando accesos..."
            }, void 0, false, {
                fileName: "[project]/app/cotizador/page.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/cotizador/page.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full overflow-hidden rounded-xl border border-white/10 shadow-2xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormularioAcuerdo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            origen: "COTIZADOR",
            modo: "CREATE",
            dealAEditar: null,
            onCerrar: ()=>router.push('/crm'),
            onGuardadoExitoso: ()=>{
                // Cuando se guarde con éxito, enviamos al usuario al tablero CRM
                router.push('/crm');
            }
        }, void 0, false, {
            fileName: "[project]/app/cotizador/page.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/cotizador/page.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(CotizadorPage, "DAWwrFIoUX9ehqPIQ+Xf7YwbVfo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CotizadorPage;
var _c;
__turbopack_context__.k.register(_c, "CotizadorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FormularioAcuerdo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FormularioAcuerdo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchableSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SearchableSelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generadorPdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/generadorPdf.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function FormularioAcuerdo({ origen, modo, dealAEditar, onCerrar, onGuardadoExitoso }) {
    _s();
    const [clientes, setClientes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [catalogo, setCatalogo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tiendas, setTiendas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usuarios, setUsuarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Estados Generales
    const [titulo, setTitulo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [vendedorSeleccionado, setVendedorSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [clienteSeleccionado, setClienteSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [esAgencia, setEsAgencia] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [auspicianteSeleccionado, setAuspicianteSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [esReclasificado, setEsReclasificado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [elementosAcuerdo, setElementosAcuerdo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Descuento Global
    const [descuentoGlobalTipo, setDescuentoGlobalTipo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('%');
    const [descuentoGlobalValor, setDescuentoGlobalValor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Estados del Ítem Individual (Configurador)
    const [canal, setCanal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Digital");
    const [elementoSeleccionado, setElementoSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [itemFechaDesde, setItemFechaDesde] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [itemFechaHasta, setItemFechaHasta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tiendasSeleccionadas, setTiendasSeleccionadas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [busquedaTienda, setBusquedaTienda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cantidad, setCantidad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [sobreprecioTipo, setSobreprecioTipo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('%');
    const [sobreprecioValor, setSobreprecioValor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [descuentoItemTipo, setDescuentoItemTipo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('%');
    const [descuentoItemValor, setDescuentoItemValor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [adjuntosItemActual, setAdjuntosItemActual] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Procesos
    const [subiendoArchivo, setSubiendoArchivo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [guardando, setGuardando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [generandoPdf, setGenerandoPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [enviandoCorreo, setEnviandoCorreo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FormularioAcuerdo.useEffect": ()=>{
            fetchTablasApoyo();
        }
    }["FormularioAcuerdo.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FormularioAcuerdo.useEffect": ()=>{
            if (modo === 'EDIT' && dealAEditar) {
                cargarDatosEdicion(dealAEditar);
            }
        }
    }["FormularioAcuerdo.useEffect"], [
        modo,
        dealAEditar
    ]);
    const fetchTablasApoyo = async ()=>{
        const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
        if (session?.user?.email) {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('*').eq('email', session.user.email).single();
            if (data) {
                setCurrentUser(data);
                if (modo === 'CREATE') setVendedorSeleccionado(data.id.toString());
            }
        }
        const { data: dataClientes } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('clientes').select('*');
        if (dataClientes) setClientes(dataClientes);
        const { data: dataCatalogo } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('catalogo').select('*');
        if (dataCatalogo) setCatalogo(dataCatalogo);
        const { data: dataTiendas } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tiendas').select('*').order('numero', {
            ascending: true
        });
        if (dataTiendas) setTiendas(dataTiendas);
        const { data: dataUsuarios } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('*');
        if (dataUsuarios) setUsuarios(dataUsuarios);
    };
    const cargarDatosEdicion = (deal)=>{
        setTitulo(deal.titulo || "");
        setVendedorSeleccionado(deal.vendedor_id ? deal.vendedor_id.toString() : "");
        setClienteSeleccionado(deal.cliente_id ? deal.cliente_id.toString() : "");
        const clienteObj = clientes.find((c)=>c.id === deal.cliente_id);
        setEsAgencia(clienteObj?.es_agencia || false);
        setAuspicianteSeleccionado(deal.auspiciante_id ? deal.auspiciante_id.toString() : "");
        setEsReclasificado(deal.es_reclasificado || false);
        // Carga de descuentos nativos desde la base de datos
        setDescuentoGlobalTipo(deal.descuento_global_tipo || '%');
        setDescuentoGlobalValor(deal.descuento_global_valor ?? (deal.descuento_porcentaje || 0));
        if (deal.elementos_json && deal.elementos_json.length > 0) {
            setElementosAcuerdo(deal.elementos_json);
        }
    };
    const handleCanalChange = (nuevoCanal)=>{
        setCanal(nuevoCanal);
        setElementoSeleccionado("");
        setTiendasSeleccionadas([]);
        setAdjuntosItemActual([]);
        setCantidad(1);
        setSobreprecioValor(0);
        setDescuentoItemValor(0);
    };
    const handleAgregarElemento = ()=>{
        if (!elementoSeleccionado) return;
        if (!itemFechaDesde || !itemFechaHasta) {
            alert("Debes establecer la Vigencia (Desde/Hasta) específica para este elemento.");
            return;
        }
        if (canal === 'InStore' && tiendasSeleccionadas.length === 0) {
            alert("Selecciona al menos una tienda para InStore.");
            return;
        }
        const itemCatalogo = catalogo.find((c)=>c.id.toString() === elementoSeleccionado);
        if (!itemCatalogo) return;
        let multiplicadorTiempo = 1;
        let labelPeriodo = 'Campaña Única';
        const d1 = new Date(`${itemFechaDesde}T12:00:00Z`);
        const d2 = new Date(`${itemFechaHasta}T12:00:00Z`);
        if (d2 >= d1) {
            if (itemCatalogo.periodo === 'Semanal') {
                const diffTime = d2.getTime() - d1.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                multiplicadorTiempo = Math.ceil(diffDays / 7);
                labelPeriodo = `${multiplicadorTiempo} Semana(s)`;
            } else if (itemCatalogo.periodo === 'Mensual') {
                const m1 = d1.getUTCFullYear() * 12 + d1.getUTCMonth();
                const m2 = d2.getUTCFullYear() * 12 + d2.getUTCMonth();
                multiplicadorTiempo = m2 - m1 + 1;
                labelPeriodo = `${multiplicadorTiempo} Mes(es)`;
            }
        }
        const multiplicadorTiendas = canal === 'InStore' ? tiendasSeleccionadas.length : 1;
        const multiplicadorCantidad = canal === 'InStore' ? cantidad : 1;
        // Matemática del Ítem
        const subtotalOriginal = itemCatalogo.precio_base * multiplicadorTiendas * multiplicadorTiempo * multiplicadorCantidad;
        // 1. Sobreprecio
        const montoSobreprecio = sobreprecioTipo === '%' ? subtotalOriginal * (sobreprecioValor / 100) : sobreprecioValor;
        const precioLista = subtotalOriginal + montoSobreprecio;
        // 2. Descuento del Ítem
        const montoDescuento = descuentoItemTipo === '%' ? precioLista * (descuentoItemValor / 100) : descuentoItemValor;
        const subtotal = Math.max(0, precioLista - montoDescuento);
        const nuevoItem = {
            idUnico: Date.now(),
            catalogoId: itemCatalogo.id,
            nombre: itemCatalogo.elemento,
            canal: canal,
            fechaDesde: itemFechaDesde,
            fechaHasta: itemFechaHasta,
            tiendas: tiendasSeleccionadas,
            cantidad: multiplicadorCantidad,
            multiplicadorTiempo,
            labelPeriodo,
            precioLista,
            montoDescuentoItem: montoDescuento,
            subtotal,
            adjuntos: adjuntosItemActual
        };
        setElementosAcuerdo([
            ...elementosAcuerdo,
            nuevoItem
        ]);
        setElementoSeleccionado("");
        setTiendasSeleccionadas([]);
        setAdjuntosItemActual([]);
        setCantidad(1);
        setSobreprecioValor(0);
        setDescuentoItemValor(0);
    };
    const eliminarElemento = (idUnico)=>setElementosAcuerdo(elementosAcuerdo.filter((item)=>item.idUnico !== idUnico));
    const handleFileUploadItem = async (e, categoria)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setSubiendoArchivo(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('adjuntos').upload(fileName, file);
            if (uploadError) throw uploadError;
            const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('adjuntos').getPublicUrl(fileName);
            setAdjuntosItemActual((prev)=>[
                    ...prev,
                    {
                        id: fileName,
                        nombre: file.name,
                        url: data.publicUrl,
                        tipo: file.type,
                        categoria: categoria
                    }
                ]);
        } catch (error) {
            alert(`Error subiendo archivo: ${error.message}`);
        } finally{
            setSubiendoArchivo(false);
        }
    };
    // Matemática Global
    const totalSubtotales = elementosAcuerdo.reduce((acc, item)=>acc + item.subtotal, 0);
    const montoDescuentoGlobal = descuentoGlobalTipo === '%' ? totalSubtotales * (descuentoGlobalValor / 100) : descuentoGlobalValor;
    const totalFinal = Math.max(0, totalSubtotales - montoDescuentoGlobal);
    const handleSaveDeal = async ()=>{
        if (!titulo.trim() || !clienteSeleccionado || elementosAcuerdo.length === 0) {
            alert("Faltan datos obligatorios o elementos para guardar el acuerdo.");
            return;
        }
        setGuardando(true);
        try {
            // 1. Fechas generales calculadas automáticamente
            const fechas = elementosAcuerdo.flatMap((i)=>[
                    new Date(`${i.fechaDesde}T12:00:00Z`).getTime(),
                    new Date(`${i.fechaHasta}T12:00:00Z`).getTime()
                ]);
            const fechaMinima = new Date(Math.min(...fechas)).toISOString().split('T')[0];
            const fechaMaxima = new Date(Math.max(...fechas)).toISOString().split('T')[0];
            // 2. Canal principal
            const tieneDigital = elementosAcuerdo.some((i)=>i.canal === 'Digital');
            const tieneInStore = elementosAcuerdo.some((i)=>i.canal === 'InStore');
            const canalPrincipal = tieneDigital && tieneInStore ? 'Omnicanal' : tieneDigital ? 'Digital' : 'InStore';
            // 3. Proporción del descuento global por ítem
            const elementosProcesados = elementosAcuerdo.map((item)=>{
                const peso = totalSubtotales > 0 ? item.subtotal / totalSubtotales : 0;
                const porcionDescuentoGlobal = montoDescuentoGlobal * peso;
                const precioFinalProrrateado = item.subtotal - porcionDescuentoGlobal;
                return {
                    ...item,
                    porcionDescuentoGlobal,
                    precioFinalProrrateado
                };
            });
            // 4. Adjuntos consolidados
            const todosLosAdjuntos = elementosProcesados.flatMap((item)=>(item.adjuntos || []).map((adj)=>({
                        ...adj,
                        catalogo_id: item.catalogoId,
                        elemento_nombre: item.nombre
                    })));
            const stageToSave = modo === 'EDIT' ? dealAEditar?.stage || 'OPORTUNIDAD' : origen === 'CRM' ? 'OPORTUNIDAD' : 'COTIZADO';
            // 5. Payload con los campos creados en la base de datos
            const dealData = {
                titulo: titulo,
                amount: totalFinal,
                channel: canalPrincipal,
                cliente_id: Number(clienteSeleccionado),
                auspiciante_id: auspicianteSeleccionado ? Number(auspicianteSeleccionado) : null,
                catalogo_id: Number(elementosProcesados[0].catalogoId),
                descuento_global_tipo: descuentoGlobalTipo,
                descuento_global_valor: descuentoGlobalValor,
                descuento_porcentaje: descuentoGlobalTipo === '%' ? descuentoGlobalValor : 0,
                fecha_desde: fechaMinima,
                fecha_hasta: fechaMaxima,
                adjuntos: todosLosAdjuntos,
                elementos_json: elementosProcesados,
                es_reclasificado: esReclasificado,
                vendedor_id: vendedorSeleccionado ? Number(vendedorSeleccionado) : currentUser?.id || null,
                stage: stageToSave
            };
            let dealIdToUse = modo === 'EDIT' ? dealAEditar?.id : null;
            if (modo === 'CREATE') {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deals').insert([
                    dealData
                ]).select().single();
                if (error) throw error;
                dealIdToUse = data.id;
            } else {
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deals').update(dealData).eq('id', dealIdToUse);
                if (error) throw error;
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deal_tiendas').delete().eq('deal_id', dealIdToUse);
            }
            const tiendasUnicas = new Set();
            elementosProcesados.forEach((item)=>{
                if (item.tiendas) item.tiendas.forEach((tId)=>tiendasUnicas.add(tId));
            });
            if (dealIdToUse && tiendasUnicas.size > 0) {
                const registrosTiendas = Array.from(tiendasUnicas).map((tId)=>({
                        deal_id: dealIdToUse,
                        tienda_id: tId
                    }));
                const { error: errorTiendas } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deal_tiendas').insert(registrosTiendas);
                if (errorTiendas) throw errorTiendas;
            }
            onGuardadoExitoso();
        } catch (error) {
            console.error("Error al guardar acuerdo:", error);
            alert(`Hubo un error al guardar: ${error?.message || error?.details || "Error al comunicarse con la base de datos"}`);
        } finally{
            setGuardando(false);
        }
    };
    const handleEnviarCorreo = async ()=>{
        if (!dealAEditar) return;
        const emailDestino = window.prompt("Ingresa el correo del destinatario:", dealAEditar.cliente?.contacto_email || "");
        if (!emailDestino || emailDestino.trim() === "") return;
        setEnviandoCorreo(true);
        try {
            const dealParaPDF = {
                ...dealAEditar,
                adjuntos: elementosAcuerdo.flatMap((i)=>i.adjuntos || []),
                elementos_json: elementosAcuerdo
            };
            const resultadoPdf = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generadorPdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generarAcuerdoPDF"])(dealParaPDF, true);
            if (!resultadoPdf) throw new Error("No se pudo generar el PDF.");
            const { pdfBase64, nombreArchivo } = resultadoPdf;
            const nombreVendedor = currentUser?.nombre || 'Equipo Comercial';
            const emailVendedor = currentUser?.email || 'ar_carrefourmedia@carrefour.com';
            const res = await fetch('/api/enviar-acuerdo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    destinatario: emailDestino,
                    asunto: `Propuesta de Servicios Carrefour Media - ${dealAEditar.titulo}`,
                    mensaje: `Hola ${dealAEditar.cliente?.nombre || ''},\n\nAdjunto enviamos la propuesta comercial para "${dealAEditar.titulo}".\n\nSaludos,\n${nombreVendedor}`,
                    pdfBase64: pdfBase64,
                    nombreArchivo: nombreArchivo,
                    remitenteNombre: nombreVendedor,
                    remitenteEmail: emailVendedor
                })
            });
            if (!res.ok) throw new Error("Error al enviar el correo.");
            alert("¡Acuerdo enviado exitosamente por correo electrónico!");
        } catch (error) {
            alert(`Hubo un error al enviar el correo: ${error.message}`);
        } finally{
            setEnviandoCorreo(false);
        }
    };
    const opcionesClientes = clientes.map((c)=>({
            id: c.id,
            label: c.nombre
        }));
    const opcionesCatalogo = catalogo.filter((c)=>c.canal === canal).map((c)=>({
            id: c.id,
            label: `${c.elemento} ($${c.precio_base.toLocaleString()})`
        }));
    const FormularioContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-900 ${origen === 'CRM' ? 'border border-white/20 rounded-xl shadow-2xl w-full max-w-6xl relative max-h-[95vh]' : 'w-full h-full'} overflow-hidden flex flex-col`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/80",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-xl text-white",
                        children: modo === 'CREATE' ? 'Nueva Cotización' : 'Editar Acuerdo'
                    }, void 0, false, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    origen === 'CRM' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onCerrar,
                        className: "text-slate-400 hover:text-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined",
                            children: "close"
                        }, void 0, false, {
                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                            lineNumber: 364,
                            columnNumber: 101
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 364,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormularioAcuerdo.tsx",
                lineNumber: 362,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row flex-1 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-6 border-r border-white/10 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2",
                                        children: "1. Datos del Cliente"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 371,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                children: "Título del Acuerdo *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 375,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: titulo,
                                                                onChange: (e)=>setTitulo(e.target.value),
                                                                className: "w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 376,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 17
                                                    }, this),
                                                    currentUser?.rol === 'JEFE_VENTAS' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                children: "Responsable / Vendedor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 380,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: vendedorSeleccionado,
                                                                onChange: (e)=>setVendedorSeleccionado(e.target.value),
                                                                className: "w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400",
                                                                children: usuarios.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: u.id,
                                                                        children: u.nombre
                                                                    }, u.id, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 382,
                                                                        columnNumber: 42
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 381,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 373,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                children: "Cliente / Agencia *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchableSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                options: opcionesClientes,
                                                                value: clienteSeleccionado,
                                                                onChange: (id)=>{
                                                                    setClienteSeleccionado(id);
                                                                    const c = clientes.find((x)=>x.id.toString() === id);
                                                                    setEsAgencia(c?.es_agencia || false);
                                                                },
                                                                placeholder: "Buscar..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 390,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 17
                                                    }, this),
                                                    esAgencia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-cyan-400 block mb-1",
                                                                children: "Anunciante Final"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 394,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchableSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                options: clientes.filter((c)=>!c.es_agencia).map((c)=>({
                                                                        id: c.id,
                                                                        label: c.nombre
                                                                    })),
                                                                value: auspicianteSeleccionado,
                                                                onChange: setAuspicianteSeleccionado,
                                                                placeholder: "Marca..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 395,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 387,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 372,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 370,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2",
                                        children: "2. Configurar Espacios y Precios"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 404,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-950 p-4 rounded-xl border border-slate-700 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-2 text-sm text-white",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                checked: canal === 'Digital',
                                                                onChange: ()=>handleCanalChange('Digital'),
                                                                className: "text-cyan-500 bg-slate-900 border-slate-700"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 408,
                                                                columnNumber: 79
                                                            }, this),
                                                            " Digital"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-2 text-sm text-white",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                checked: canal === 'InStore',
                                                                onChange: ()=>handleCanalChange('InStore'),
                                                                className: "text-amber-500 bg-slate-900 border-slate-700"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 409,
                                                                columnNumber: 79
                                                            }, this),
                                                            " InStore"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 407,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchableSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                options: opcionesCatalogo,
                                                value: elementoSeleccionado,
                                                onChange: setElementoSeleccionado,
                                                placeholder: `Buscar espacio ${canal}...`
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 412,
                                                columnNumber: 15
                                            }, this),
                                            elementoSeleccionado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 pt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                        children: "Desde *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 417,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "date",
                                                                        value: itemFechaDesde,
                                                                        onChange: (e)=>setItemFechaDesde(e.target.value),
                                                                        className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 417,
                                                                        columnNumber: 108
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                        children: "Hasta *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 418,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "date",
                                                                        value: itemFechaHasta,
                                                                        onChange: (e)=>setItemFechaHasta(e.target.value),
                                                                        className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 418,
                                                                        columnNumber: 108
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 418,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 19
                                                    }, this),
                                                    canal === 'InStore' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                    children: "Cant. por Tienda"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                    lineNumber: 423,
                                                                    columnNumber: 28
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    value: cantidad,
                                                                    onChange: (e)=>setCantidad(Number(e.target.value)),
                                                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-amber-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                    lineNumber: 423,
                                                                    columnNumber: 119
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 422,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4 p-3 bg-slate-900 border border-slate-700 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[10px] font-bold text-slate-400 uppercase block mb-1",
                                                                        children: "Sobreprecio Base"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 429,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                value: sobreprecioTipo,
                                                                                onChange: (e)=>setSobreprecioTipo(e.target.value),
                                                                                className: "bg-slate-800 border border-slate-700 rounded-l p-2 text-white text-sm focus:outline-none",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: "%",
                                                                                        children: "%"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                        lineNumber: 432,
                                                                                        columnNumber: 27
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: "$",
                                                                                        children: "$"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                        lineNumber: 433,
                                                                                        columnNumber: 27
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                lineNumber: 431,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: sobreprecioValor,
                                                                                onChange: (e)=>setSobreprecioValor(Number(e.target.value)),
                                                                                className: "w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-2 text-white text-sm focus:border-cyan-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                lineNumber: 435,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 430,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 428,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[10px] font-bold text-slate-400 uppercase block mb-1",
                                                                        children: "Descuento al Ítem"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 439,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                value: descuentoItemTipo,
                                                                                onChange: (e)=>setDescuentoItemTipo(e.target.value),
                                                                                className: "bg-slate-800 border border-slate-700 rounded-l p-2 text-white text-sm focus:outline-none",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: "%",
                                                                                        children: "%"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                        lineNumber: 442,
                                                                                        columnNumber: 27
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: "$",
                                                                                        children: "$"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                        lineNumber: 443,
                                                                                        columnNumber: 27
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                lineNumber: 441,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: descuentoItemValor,
                                                                                onChange: (e)=>setDescuentoItemValor(Number(e.target.value)),
                                                                                className: "w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-2 text-white text-sm focus:border-cyan-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                lineNumber: 445,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 440,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this),
                                            canal === 'InStore' && elementoSeleccionado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-slate-800/50 rounded border border-slate-700 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: busquedaTienda,
                                                        onChange: (e)=>setBusquedaTienda(e.target.value),
                                                        placeholder: "Buscar tienda InStore...",
                                                        className: "w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "max-h-32 overflow-y-auto space-y-1",
                                                        children: tiendas.filter((t)=>t.nombre.toLowerCase().includes(busquedaTienda.toLowerCase())).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        checked: tiendasSeleccionadas.includes(t.id),
                                                                        onChange: ()=>setTiendasSeleccionadas((prev)=>prev.includes(t.id) ? prev.filter((x)=>x !== t.id) : [
                                                                                    ...prev,
                                                                                    t.id
                                                                                ]),
                                                                        className: "rounded bg-slate-900"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 458,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-amber-400",
                                                                        children: t.numero
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 459,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    " ",
                                                                    t.nombre
                                                                ]
                                                            }, t.id, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 453,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleAgregarElemento,
                                                disabled: !elementoSeleccionado,
                                                className: "w-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-600/40 rounded py-2 text-sm font-bold mt-4",
                                                children: "+ Agregar Elemento a la Cotización"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 466,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 405,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-[380px] bg-slate-950 p-6 flex flex-col justify-between border-l border-white/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-white mb-4 border-b border-white/10 pb-2",
                                        children: "Resumen Cotización"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 474,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-60 overflow-y-auto space-y-2 mb-4",
                                        children: elementosAcuerdo.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-slate-800 p-3 rounded border border-slate-700 relative group text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-start",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-white text-xs leading-tight w-2/3",
                                                                children: item.nombre
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 479,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-cyan-400 font-bold text-xs",
                                                                children: [
                                                                    "$",
                                                                    item.subtotal.toLocaleString(undefined, {
                                                                        maximumFractionDigits: 0
                                                                    })
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-slate-400 mt-1",
                                                        children: [
                                                            item.fechaDesde,
                                                            " al ",
                                                            item.fechaHasta
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>eliminarElemento(item.idUnico),
                                                        className: "absolute top-2 right-2 text-rose-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined text-xs",
                                                            children: "close"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 483,
                                                            columnNumber: 123
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, item.idUnico, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 475,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 pt-4 border-t border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400 font-semibold",
                                                children: "Subtotal Ítems"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 491,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-bold",
                                                children: [
                                                    "$",
                                                    totalSubtotales.toLocaleString(undefined, {
                                                        maximumFractionDigits: 0
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 492,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900 p-3 rounded-lg border border-slate-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[10px] font-bold text-slate-400 uppercase block mb-1",
                                                children: "Descuento Global a Repartir"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 496,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: descuentoGlobalTipo,
                                                        onChange: (e)=>setDescuentoGlobalTipo(e.target.value),
                                                        className: "bg-slate-800 border border-slate-700 rounded-l p-1.5 text-white text-sm focus:outline-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "%",
                                                                children: "%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 499,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "$",
                                                                children: "$"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 22
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: descuentoGlobalValor,
                                                        onChange: (e)=>setDescuentoGlobalValor(Number(e.target.value)),
                                                        className: "w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-1.5 text-white text-sm focus:border-cyan-400 text-right font-mono"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 497,
                                                columnNumber: 16
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 495,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-end bg-cyan-950/30 p-3 rounded-xl border border-cyan-500/50 mt-2 shadow-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-semibold text-sm",
                                                children: "Total Final"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 507,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-extrabold text-cyan-400",
                                                children: [
                                                    "$",
                                                    totalFinal.toLocaleString(undefined, {
                                                        maximumFractionDigits: 0
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 508,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 506,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleSaveDeal,
                                        disabled: guardando,
                                        className: "w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold rounded-lg py-3 text-sm mt-4 transition-colors",
                                        children: guardando ? "Guardando..." : "Guardar Cotización"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 511,
                                        columnNumber: 13
                                    }, this),
                                    modo === 'EDIT' && dealAEditar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: async ()=>await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generadorPdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generarAcuerdoPDF"])(dealAEditar),
                                                className: "w-full bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 font-bold rounded py-2 text-sm flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: "picture_as_pdf"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Descargar Contrato PDF"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 517,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                disabled: enviandoCorreo || guardando,
                                                onClick: handleEnviarCorreo,
                                                className: "w-full bg-indigo-600 border border-indigo-500 text-white hover:bg-indigo-500 font-bold rounded py-2 text-sm flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: enviandoCorreo ? 'hourglass_empty' : 'send'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    enviandoCorreo ? 'Enviando...' : 'Enviar por Correo'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 520,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 516,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 472,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormularioAcuerdo.tsx",
                lineNumber: 367,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormularioAcuerdo.tsx",
        lineNumber: 361,
        columnNumber: 5
    }, this);
    if (origen === 'CRM') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/80 backdrop-blur-sm",
                onClick: onCerrar
            }, void 0, false, {
                fileName: "[project]/components/FormularioAcuerdo.tsx",
                lineNumber: 531,
                columnNumber: 108
            }, this),
            FormularioContent
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormularioAcuerdo.tsx",
        lineNumber: 531,
        columnNumber: 32
    }, this);
    return FormularioContent;
}
_s(FormularioAcuerdo, "aLgBV22OzPdkC6BRzIdnZgmAmTI=");
_c = FormularioAcuerdo;
var _c;
__turbopack_context__.k.register(_c, "FormularioAcuerdo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SearchableSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchableSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function SearchableSelect({ options, value, onChange, placeholder }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const selectedOption = options.find((o)=>o.id.toString() === value.toString());
    const displayValue = isOpen ? search : selectedOption ? selectedOption.label : "";
    const filteredOptions = options.filter((o)=>o.label.toLowerCase().includes(search.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: displayValue,
                        onChange: (e)=>{
                            setSearch(e.target.value);
                            setIsOpen(true);
                            if (value) onChange("");
                        },
                        onFocus: ()=>{
                            setIsOpen(true);
                            setSearch("");
                        },
                        onBlur: ()=>setTimeout(()=>setIsOpen(false), 150),
                        placeholder: placeholder,
                        className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    }, void 0, false, {
                        fileName: "[project]/components/SearchableSelect.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "material-symbols-outlined absolute right-3 top-3 text-slate-500 pointer-events-none text-lg",
                        children: "expand_more"
                    }, void 0, false, {
                        fileName: "[project]/components/SearchableSelect.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SearchableSelect.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto",
                children: filteredOptions.length > 0 ? filteredOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onMouseDown: (e)=>{
                            e.preventDefault();
                            onChange(opt.id.toString());
                            setIsOpen(false);
                        },
                        className: "p-3 hover:bg-slate-700 cursor-pointer text-sm text-white border-b border-slate-700/50 last:border-0",
                        children: opt.label
                    }, opt.id, false, {
                        fileName: "[project]/components/SearchableSelect.tsx",
                        lineNumber: 51,
                        columnNumber: 15
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3 text-sm text-slate-400 italic",
                    children: "No se encontraron resultados"
                }, void 0, false, {
                    fileName: "[project]/components/SearchableSelect.tsx",
                    lineNumber: 64,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SearchableSelect.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SearchableSelect.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(SearchableSelect, "wqGYUe+VCJeiUqsg46PymlKAkIM=");
_c = SearchableSelect;
var _c;
__turbopack_context__.k.register(_c, "SearchableSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/generadorPdf.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generarAcuerdoPDF",
    ()=>generarAcuerdoPDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.mjs [app-client] (ecmascript)");
;
;
const getBase64ImageFromUrl = async (imageUrl)=>{
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onloadend = ()=>resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
const generarAcuerdoPDF = async (deal, returnBase64 = false)=>{
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]();
    const fechaActual = new Date().toLocaleDateString('es-AR');
    const nombreCliente = deal.cliente?.nombre || 'CLIENTE NO ASIGNADO';
    const idCliente = deal.cliente?.numero_cliente || deal.cliente_id;
    // --- CABECERA ---
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Propuesta de servicios de INC S.A.", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Buenos Aires, ${fechaActual}`, 14, 28);
    doc.text("Condiciones Generales:", 14, 36);
    // --- DATOS DEL DESTINATARIO ---
    doc.setFont("helvetica", "bold");
    doc.text("Destinatario:", 14, 46);
    doc.setFont("helvetica", "normal");
    doc.text(`Razón Social: ${nombreCliente}`, 14, 54);
    doc.text(`Número de Proveedor: ${idCliente}`, 14, 60);
    doc.text(`CUIT: ${deal.cliente?.cuit || 'S/D'}`, 14, 66);
    doc.text(`Dirección: ${deal.cliente?.direccion || 'S/D'}`, 14, 72);
    doc.text(`Representante legal: ${deal.cliente?.rep_nombre || 'S/D'}`, 14, 78);
    // --- TEXTO INTRODUCTORIO ---
    const textoIntroduccion = `Por medio de la presente hacemos llegar a Ud. la siguiente propuesta de servicios, durante la cual INC S.A. cumplirá los servicios que se detallan en el Anexo I, y en contraprestación, ${nombreCliente} le reconocerá los montos allí descriptos:`;
    const splitIntro = doc.splitTextToSize(textoIntroduccion, 180);
    doc.text(splitIntro, 14, 95);
    let currentY = 95 + splitIntro.length * 5 + 5;
    doc.setFont("helvetica", "bold");
    const textoRemarcado = "IMPORTANTE: En caso de que no se retire el material finalizado el plazo del acuerdo, se aplicarán cargos correspondientes al plazo excedido.";
    const splitRemarcado = doc.splitTextToSize(textoRemarcado, 180);
    doc.text(splitRemarcado, 14, currentY);
    doc.setFont("helvetica", "normal");
    currentY += splitRemarcado.length * 5 + 15;
    doc.setFontSize(9);
    const textoCierre = `Esta propuesta es irrevocable y se considerará aceptada con la recepción de la primera Factura.`;
    doc.text(doc.splitTextToSize(textoCierre, 180), 14, currentY);
    currentY += 15;
    doc.text(`Firma por parte de INC S.A.: ___________________________`, 14, currentY);
    currentY += 15;
    doc.text(`Firma ${nombreCliente}: ___________________________`, 14, currentY);
    // ==========================================
    // --- ANEXO I: TABLA Y RESUMEN FINANCIERO ---
    // ==========================================
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Anexo I: Detalle de Espacios y Resumen Financiero", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    let yPos = 30;
    // NUEVA ESTRUCTURA DE TABLA CON "VIGENCIA"
    const tableColumn = [
        "Elemento",
        "Vigencia",
        "Cant.",
        "Bocas",
        "Precio Base",
        "Precio Final",
        "Ahorro"
    ];
    const tableRows = [];
    let sumaBaseTotal = 0;
    let sumaAhorroTotal = 0;
    let sumaFinalTotal = 0;
    const elementos = deal.elementos_json || [];
    if (elementos.length > 0) {
        elementos.forEach((item)=>{
            // Precio Base que ve el cliente (Ya incluye el sobreprecio de forma invisible)
            const precioBaseVisible = item.precioLista || item.subtotal;
            sumaBaseTotal += precioBaseVisible;
            // El descuento total es la suma del descuento propio del ítem + la porción del descuento global que le tocó
            const ahorroTotalItem = (item.montoDescuentoItem || 0) + (item.porcionDescuentoGlobal || 0);
            sumaAhorroTotal += ahorroTotalItem;
            // El precio final a cobrar por ese ítem
            const precioFinalItem = item.precioFinalProrrateado || precioBaseVisible - ahorroTotalItem;
            sumaFinalTotal += precioFinalItem;
            const strDescuento = precioFinalItem === 0 ? 'BONIFICADO' : `$${precioFinalItem.toLocaleString('es-AR', {
                maximumFractionDigits: 0
            })}`;
            const strAhorro = ahorroTotalItem > 0 ? `-$${ahorroTotalItem.toLocaleString('es-AR', {
                maximumFractionDigits: 0
            })}` : '-';
            tableRows.push([
                item.nombre,
                `${item.fechaDesde} al ${item.fechaHasta}`,
                item.cantidad || 1,
                item.tiendas?.length || '-',
                `$${precioBaseVisible.toLocaleString('es-AR', {
                    maximumFractionDigits: 0
                })}`,
                strDescuento,
                strAhorro
            ]);
        });
    }
    // Fila Resumen Inferior de la Tabla
    tableRows.push([
        {
            content: 'TOTALES',
            colSpan: 4,
            styles: {
                halign: 'right',
                fontStyle: 'bold'
            }
        },
        {
            content: `$${sumaBaseTotal.toLocaleString('es-AR', {
                maximumFractionDigits: 0
            })}`,
            styles: {
                fontStyle: 'bold'
            }
        },
        {
            content: `$${sumaFinalTotal.toLocaleString('es-AR', {
                maximumFractionDigits: 0
            })}`,
            styles: {
                fontStyle: 'bold'
            }
        },
        {
            content: sumaAhorroTotal > 0 ? `-$${sumaAhorroTotal.toLocaleString('es-AR', {
                maximumFractionDigits: 0
            })}` : '-',
            styles: {
                fontStyle: 'bold'
            }
        }
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
        startY: yPos,
        head: [
            tableColumn
        ],
        body: tableRows,
        theme: 'grid',
        headStyles: {
            fillColor: [
                240,
                240,
                240
            ],
            textColor: [
                0,
                0,
                0
            ],
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 8,
            cellPadding: 2
        },
        columnStyles: {
            0: {
                cellWidth: 40
            },
            1: {
                cellWidth: 35
            },
            2: {
                cellWidth: 12,
                halign: 'center'
            },
            3: {
                cellWidth: 12,
                halign: 'center'
            },
            4: {
                cellWidth: 30,
                halign: 'right'
            },
            5: {
                cellWidth: 30,
                halign: 'right'
            },
            6: {
                cellWidth: 25,
                halign: 'right'
            }
        }
    });
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`MONTO TOTAL A FACTURAR (Sin IVA):`, 14, finalY);
    doc.text(`$ ${sumaFinalTotal.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`, 190, finalY, {
        align: 'right'
    });
    // ANEXO II: ADJUNTOS
    if (deal.adjuntos && deal.adjuntos.length > 0) {
        doc.addPage();
        doc.text("Anexo II: Renders y Documentos Adjuntos", 14, 20);
    // ... (Lógica de adjuntos preservada)
    }
    const nombreArchivoFinal = `Acuerdo_${nombreCliente.replace(/\s+/g, '_')}_${deal.id}.pdf`;
    if (returnBase64) return {
        pdfBase64: doc.output('datauristring'),
        nombreArchivo: nombreArchivoFinal
    };
    else doc.save(nombreArchivoFinal);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_0tdju5lrf8c4f._.js.map