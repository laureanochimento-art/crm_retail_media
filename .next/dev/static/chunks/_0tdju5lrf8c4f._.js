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
    // Estados de datos base
    const [clientes, setClientes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [catalogo, setCatalogo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tiendas, setTiendas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usuarios, setUsuarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Estados del Formulario
    const [titulo, setTitulo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [vendedorSeleccionado, setVendedorSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [clienteSeleccionado, setClienteSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [esAgencia, setEsAgencia] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [auspicianteSeleccionado, setAuspicianteSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fechaDesde, setFechaDesde] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fechaHasta, setFechaHasta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [canal, setCanal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Digital");
    const [elementoSeleccionado, setElementoSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tiendasSeleccionadas, setTiendasSeleccionadas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [busquedaTienda, setBusquedaTienda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [cantidad, setCantidad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [descuentoItem, setDescuentoItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [elementosAcuerdo, setElementosAcuerdo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tasaInflacion, setTasaInflacion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [descuentoGlobal, setDescuentoGlobal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [adjuntosItemActual, setAdjuntosItemActual] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [esReclasificado, setEsReclasificado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Estados de carga y procesos
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
        // Usuario Actual
        const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
        let userLogged = null;
        if (session?.user?.email) {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('*').eq('email', session.user.email).single();
            if (data) {
                userLogged = data;
                setCurrentUser(userLogged);
                // Por defecto, asignar al usuario actual
                if (modo === 'CREATE') {
                    setVendedorSeleccionado(data.id.toString());
                }
            }
        }
        // Listas
        const { data: dataClientes } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('clientes').select('*');
        if (dataClientes) setClientes(dataClientes);
        const { data: dataCatalogo } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('catalogo').select('*');
        if (dataCatalogo) setCatalogo(dataCatalogo);
        const { data: dataTiendas } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('tiendas').select('*').order('numero', {
            ascending: true
        });
        if (dataTiendas) setTiendas(dataTiendas);
        // Solo cargamos usuarios si es Jefe de Ventas para poder asignarlos
        if (userLogged?.rol === 'JEFE_VENTAS') {
            const { data: dataUsuarios } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('*');
            if (dataUsuarios) setUsuarios(dataUsuarios);
        }
    };
    const cargarDatosEdicion = (deal)=>{
        setTitulo(deal.titulo || "");
        setVendedorSeleccionado(deal.vendedor_id ? deal.vendedor_id.toString() : "");
        setClienteSeleccionado(deal.cliente_id ? deal.cliente_id.toString() : "");
        const clienteObj = clientes.find((c)=>c.id === deal.cliente_id);
        setEsAgencia(clienteObj?.es_agencia || false);
        setAuspicianteSeleccionado(deal.auspiciante_id ? deal.auspiciante_id.toString() : "");
        setFechaDesde(deal.fecha_desde || "");
        setFechaHasta(deal.fecha_hasta || "");
        setDescuentoGlobal(deal.descuento_porcentaje || 0);
        setTasaInflacion(deal.tasa_inflacion || 0);
        setEsReclasificado(deal.es_reclasificado || false);
        if (deal.elementos_json && deal.elementos_json.length > 0) {
            setElementosAcuerdo(deal.elementos_json);
        } else if (deal.catalogo) {
            // Reconstrucción por compatibilidad hacia atrás
            const tiendasIds = deal.tiendas ? deal.tiendas.map((t)=>t.id) : [];
            let subtotalEstimado = deal.amount;
            if (deal.descuento_porcentaje > 0) subtotalEstimado = subtotalEstimado / (1 - deal.descuento_porcentaje / 100);
            if (deal.tasa_inflacion > 0) subtotalEstimado = subtotalEstimado / (1 + deal.tasa_inflacion / 100);
            setElementosAcuerdo([
                {
                    idUnico: Date.now(),
                    catalogoId: deal.catalogo_id,
                    nombre: deal.catalogo.elemento,
                    canal: deal.catalogo.canal,
                    precioUnitario: deal.catalogo.precio_base,
                    tiendas: tiendasIds,
                    cantidad: 1,
                    labelPeriodo: "Periodo Original",
                    descuento: 0,
                    subtotal: subtotalEstimado,
                    adjuntos: deal.adjuntos || []
                }
            ]);
        }
    };
    const handleClienteChange = (id)=>{
        setClienteSeleccionado(id);
        const cliente = clientes.find((c)=>c.id.toString() === id);
        if (cliente) {
            setEsAgencia(cliente.es_agencia);
            if (!cliente.es_agencia) setAuspicianteSeleccionado("");
        } else {
            setEsAgencia(false);
        }
    };
    const handleCanalChange = (nuevoCanal)=>{
        setCanal(nuevoCanal);
        setElementoSeleccionado("");
        setTiendasSeleccionadas([]);
        setBusquedaTienda("");
        setAdjuntosItemActual([]);
        setCantidad(1);
        setDescuentoItem(0);
    };
    const handleTiendaToggle = (idTienda)=>{
        setTiendasSeleccionadas((prev)=>prev.includes(idTienda) ? prev.filter((id)=>id !== idTienda) : [
                ...prev,
                idTienda
            ]);
    };
    const handleFileUploadItem = async (e, categoria)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setSubiendoArchivo(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('adjuntos').upload(fileName, file);
            if (uploadError) throw new Error(uploadError.message);
            const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('adjuntos').getPublicUrl(fileName);
            const nuevoAdjunto = {
                id: fileName,
                nombre: file.name,
                url: data.publicUrl,
                tipo: file.type,
                tamaño: file.size,
                categoria: categoria
            };
            setAdjuntosItemActual((prev)=>[
                    ...prev,
                    nuevoAdjunto
                ]);
        } catch (error) {
            alert(`Error subiendo archivo: ${error.message}`);
        } finally{
            setSubiendoArchivo(false);
        }
    };
    const removeAdjuntoItemActual = (id)=>setAdjuntosItemActual((prev)=>prev.filter((a)=>a.id !== id));
    const handleAgregarElemento = ()=>{
        if (!elementoSeleccionado) return;
        if (!fechaDesde || !fechaHasta) {
            alert("Debes establecer la 'Vigencia Desde' y 'Vigencia Hasta' antes de agregar elementos para calcular los periodos.");
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
        const d1 = new Date(`${fechaDesde}T12:00:00Z`);
        const d2 = new Date(`${fechaHasta}T12:00:00Z`);
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
        const subtotalItem = itemCatalogo.precio_base * multiplicadorTiendas * multiplicadorTiempo * multiplicadorCantidad;
        const nuevoItem = {
            idUnico: Date.now(),
            catalogoId: itemCatalogo.id,
            nombre: itemCatalogo.elemento,
            canal: canal,
            precioUnitario: itemCatalogo.precio_base,
            tiendas: tiendasSeleccionadas,
            cantidad: multiplicadorCantidad,
            multiplicadorTiempo,
            labelPeriodo,
            descuento: descuentoItem,
            subtotal: subtotalItem,
            adjuntos: adjuntosItemActual
        };
        setElementosAcuerdo([
            ...elementosAcuerdo,
            nuevoItem
        ]);
        setElementoSeleccionado("");
        setTiendasSeleccionadas([]);
        setBusquedaTienda("");
        setAdjuntosItemActual([]);
        setCantidad(1);
        setDescuentoItem(0);
    };
    const eliminarElemento = (idUnico)=>setElementosAcuerdo(elementosAcuerdo.filter((item)=>item.idUnico !== idUnico));
    // Matemáticas Generales
    const subtotalBaseGlobal = elementosAcuerdo.reduce((acc, item)=>acc + item.subtotal, 0);
    const sumaItemsFinal = elementosAcuerdo.reduce((acc, item)=>{
        const baseInflada = item.subtotal * (1 + tasaInflacion / 100);
        const montoDesc = baseInflada * ((item.descuento || 0) / 100);
        return acc + (baseInflada - montoDesc);
    }, 0);
    const montoDescuentoGlobal = sumaItemsFinal * (descuentoGlobal / 100);
    const totalFinal = sumaItemsFinal - montoDescuentoGlobal;
    const handleSaveDeal = async ()=>{
        if (!titulo.trim() || !clienteSeleccionado || elementosAcuerdo.length === 0 || !fechaDesde || !fechaHasta) {
            alert("Faltan datos obligatorios para guardar el acuerdo.");
            return;
        }
        setGuardando(true);
        try {
            const tieneDigital = elementosAcuerdo.some((i)=>i.canal === 'Digital');
            const tieneInStore = elementosAcuerdo.some((i)=>i.canal === 'InStore');
            const canalPrincipal = tieneDigital && tieneInStore ? 'Omnicanal' : tieneDigital ? 'Digital' : 'InStore';
            const catalogoIdPrincipal = elementosAcuerdo[0].catalogoId;
            const todosLosAdjuntos = elementosAcuerdo.flatMap((item)=>(item.adjuntos || []).map((adj)=>({
                        ...adj,
                        catalogo_id: item.catalogoId,
                        elemento_nombre: item.nombre
                    })));
            // Regla de Etapas (Oportunidad para CRM, Cotizado para Cotizador)
            const stageToSave = modo === 'EDIT' ? dealAEditar?.stage || 'OPORTUNIDAD' : origen === 'CRM' ? 'OPORTUNIDAD' : 'COTIZADO';
            const dealData = {
                titulo: titulo,
                amount: totalFinal,
                channel: canalPrincipal,
                cliente_id: Number(clienteSeleccionado),
                auspiciante_id: auspicianteSeleccionado ? Number(auspicianteSeleccionado) : null,
                catalogo_id: Number(catalogoIdPrincipal),
                descuento_porcentaje: descuentoGlobal,
                tasa_inflacion: tasaInflacion,
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                adjuntos: todosLosAdjuntos,
                elementos_json: elementosAcuerdo,
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
            elementosAcuerdo.forEach((item)=>{
                if (item.tiendas) item.tiendas.forEach((tId)=>tiendasUnicas.add(tId));
            });
            if (dealIdToUse && tiendasUnicas.size > 0) {
                const registrosTiendas = Array.from(tiendasUnicas).map((tId)=>({
                        deal_id: dealIdToUse,
                        tienda_id: tId
                    }));
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deal_tiendas').insert(registrosTiendas);
            }
            onGuardadoExitoso();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al guardar el acuerdo.");
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
                    mensaje: `Hola ${dealAEditar.cliente?.nombre || ''},\n\nAdjunto a este correo enviamos la propuesta de servicios para la campaña "${dealAEditar.titulo}".\n\nQuedamos a disposición por cualquier consulta.\n\nSaludos cordiales,\n${nombreVendedor}\nEquipo de Carrefour Media.`,
                    pdfBase64: pdfBase64,
                    nombreArchivo: nombreArchivo,
                    remitenteNombre: nombreVendedor,
                    remitenteEmail: emailVendedor
                })
            });
            if (!res.ok) throw new Error("Error desconocido al enviar.");
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
    const opcionesAnunciantes = clientes.filter((c)=>!c.es_agencia).map((c)=>({
            id: c.id,
            label: c.nombre
        }));
    const opcionesCatalogo = catalogo.filter((c)=>c.canal === canal).map((c)=>({
            id: c.id,
            label: `${c.elemento} ($${c.precio_base.toLocaleString()}) - ${c.periodo || 'Único'}`
        }));
    const tiendasFiltradas = tiendas.filter((t)=>t.numero.includes(busquedaTienda) || t.nombre.toLowerCase().includes(busquedaTienda.toLowerCase()) || t.formato.toLowerCase().includes(busquedaTienda.toLowerCase()));
    // CONTENIDO VISUAL DEL FORMULARIO
    const FormularioContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-slate-900 ${origen === 'CRM' ? 'border border-white/20 rounded-xl shadow-2xl w-full max-w-6xl relative max-h-[95vh]' : 'w-full h-full'} overflow-hidden flex flex-col`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/80",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-xl text-white",
                        children: modo === 'CREATE' ? origen === 'CRM' ? 'Nueva Oportunidad' : 'Nueva Cotización' : 'Editar Acuerdo'
                    }, void 0, false, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 377,
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
                            lineNumber: 381,
                            columnNumber: 82
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormularioAcuerdo.tsx",
                lineNumber: 376,
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
                                        children: "1. Datos y Vigencia"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 390,
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
                                                                lineNumber: 394,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: titulo,
                                                                onChange: (e)=>setTitulo(e.target.value),
                                                                className: "w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 395,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 17
                                                    }, this),
                                                    currentUser?.rol === 'JEFE_VENTAS' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                children: "Responsable / Vendedor *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: vendedorSeleccionado,
                                                                onChange: (e)=>setVendedorSeleccionado(e.target.value),
                                                                className: "w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-cyan-400 appearance-none",
                                                                children: usuarios.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: u.id,
                                                                        children: [
                                                                            u.nombre,
                                                                            " - ",
                                                                            u.rol
                                                                        ]
                                                                    }, u.id, true, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 402,
                                                                        columnNumber: 42
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 401,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 392,
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
                                                                lineNumber: 409,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchableSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                options: opcionesClientes,
                                                                value: clienteSeleccionado,
                                                                onChange: handleClienteChange,
                                                                placeholder: "Buscar cliente..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 17
                                                    }, this),
                                                    esAgencia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 bg-cyan-500/10 border border-cyan-500/30 rounded",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-cyan-400 block mb-1",
                                                                children: "Anunciante Final"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchableSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                options: opcionesAnunciantes,
                                                                value: auspicianteSeleccionado,
                                                                onChange: setAuspicianteSeleccionado,
                                                                placeholder: "Buscar marca..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 415,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 407,
                                                columnNumber: 15
                                            }, this),
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
                                                                lineNumber: 420,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                value: fechaDesde,
                                                                onChange: (e)=>setFechaDesde(e.target.value),
                                                                className: "w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 420,
                                                                columnNumber: 104
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                children: "Hasta *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                value: fechaHasta,
                                                                onChange: (e)=>setFechaHasta(e.target.value),
                                                                className: "w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 104
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 419,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 391,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2",
                                        children: "2. Configurar Elementos"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 428,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-4 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 text-sm text-white cursor-pointer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "radio",
                                                                        checked: canal === 'Digital',
                                                                        onChange: ()=>handleCanalChange('Digital'),
                                                                        className: "text-cyan-500 bg-slate-900 border-slate-700"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 432,
                                                                        columnNumber: 96
                                                                    }, this),
                                                                    " Digital"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 text-sm text-white cursor-pointer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "radio",
                                                                        checked: canal === 'InStore',
                                                                        onChange: ()=>handleCanalChange('InStore'),
                                                                        className: "text-amber-500 bg-slate-900 border-slate-700"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 433,
                                                                        columnNumber: 96
                                                                    }, this),
                                                                    " InStore"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 433,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 mb-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer w-fit p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: esReclasificado,
                                                                    onChange: (e)=>setEsReclasificado(e.target.checked),
                                                                    className: "rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                    lineNumber: 437,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: " Espacio Reclasificado"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                    lineNumber: 438,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 430,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchableSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    options: opcionesCatalogo,
                                                    value: elementoSeleccionado,
                                                    onChange: setElementoSeleccionado,
                                                    placeholder: `Buscar espacio ${canal}...`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 443,
                                                columnNumber: 15
                                            }, this),
                                            elementoSeleccionado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4 mt-2",
                                                children: [
                                                    canal === 'InStore' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-slate-400 block mb-2",
                                                                children: "Unidades por tienda *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 451,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "1",
                                                                value: cantidad,
                                                                onChange: (e)=>setCantidad(Number(e.target.value)),
                                                                className: "w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-amber-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-slate-400 block mb-2",
                                                                children: "Descuento aplicado al ítem (%)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 456,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "0",
                                                                max: "100",
                                                                value: descuentoItem,
                                                                onChange: (e)=>setDescuentoItem(Number(e.target.value)),
                                                                className: "w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 448,
                                                columnNumber: 17
                                            }, this),
                                            canal === 'InStore' && elementoSeleccionado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-slate-800/50 rounded border border-slate-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: busquedaTienda,
                                                        onChange: (e)=>setBusquedaTienda(e.target.value),
                                                        placeholder: "Buscar tienda...",
                                                        className: "w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "max-h-32 overflow-y-auto space-y-1",
                                                        children: tiendasFiltradas.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        checked: tiendasSeleccionadas.includes(t.id),
                                                                        onChange: ()=>handleTiendaToggle(t.id),
                                                                        className: "rounded bg-slate-900"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 468,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-amber-400",
                                                                        children: t.numero
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 469,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    " ",
                                                                    t.nombre
                                                                ]
                                                            }, t.id, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 467,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 465,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 463,
                                                columnNumber: 17
                                            }, this),
                                            elementoSeleccionado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 bg-slate-950/80 border border-cyan-500/30 rounded-lg space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-bold text-cyan-400 uppercase block",
                                                        children: "Adjuntos para este Elemento"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 19
                                                    }, this),
                                                    canal === 'Digital' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-3 text-center relative hover:border-cyan-500/50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-symbols-outlined text-xl text-slate-400",
                                                                        children: "desktop_windows"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 483,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-300 font-bold mt-1",
                                                                        children: "Diseño Desktop"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 484,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        onChange: (e)=>handleFileUploadItem(e, 'DISEÑO_DESKTOP'),
                                                                        disabled: subiendoArchivo,
                                                                        className: "absolute inset-0 opacity-0 cursor-pointer"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 485,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 482,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-3 text-center relative hover:border-cyan-500/50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-symbols-outlined text-xl text-slate-400",
                                                                        children: "smartphone"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-300 font-bold mt-1",
                                                                        children: "Diseño Mobile"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 489,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        onChange: (e)=>handleFileUploadItem(e, 'DISEÑO_MOBILE'),
                                                                        disabled: subiendoArchivo,
                                                                        className: "absolute inset-0 opacity-0 cursor-pointer"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-3 text-center relative hover:border-cyan-500/50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-symbols-outlined text-xl text-slate-400",
                                                                        children: "list_alt"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 493,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-300 font-bold mt-1",
                                                                        children: "EANs (CSV)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 494,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        onChange: (e)=>handleFileUploadItem(e, 'EAN'),
                                                                        disabled: subiendoArchivo,
                                                                        className: "absolute inset-0 opacity-0 cursor-pointer"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 495,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-4 text-center relative hover:border-amber-500/50 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined text-2xl text-amber-400",
                                                                children: "view_in_ar"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 500,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-300 font-bold mt-1",
                                                                children: "Subir Render / Foto InStore"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 501,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "file",
                                                                onChange: (e)=>handleFileUploadItem(e, 'RENDER'),
                                                                disabled: subiendoArchivo,
                                                                className: "absolute inset-0 opacity-0 cursor-pointer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 21
                                                    }, this),
                                                    subiendoArchivo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-cyan-400 animate-pulse text-center",
                                                        children: "Subiendo..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 39
                                                    }, this),
                                                    adjuntosItemActual.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 space-y-1",
                                                        children: adjuntosItemActual.map((adj)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between bg-slate-900 border border-slate-800 p-2 rounded text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-cyan-300 truncate max-w-[150px]",
                                                                            children: adj.nombre
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                            lineNumber: 512,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 511,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>removeAdjuntoItemActual(adj.id),
                                                                        className: "text-slate-500 hover:text-rose-400",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "material-symbols-outlined text-sm",
                                                                            children: "close"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                            lineNumber: 514,
                                                                            columnNumber: 144
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, adj.id, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 510,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 478,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleAgregarElemento,
                                                disabled: !elementoSeleccionado,
                                                className: "w-full bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded py-2 text-sm font-semibold disabled:opacity-50",
                                                children: "+ Agregar Elemento"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 522,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 429,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-[350px] bg-slate-950 p-6 flex flex-col justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-4 border-b border-white/10 pb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-cyan-400 text-lg",
                                                children: "shopping_cart"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 531,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-white",
                                                children: "Resumen"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 532,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 530,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-60 overflow-y-auto space-y-2 mb-4",
                                        children: elementosAcuerdo.map((item)=>{
                                            const baseInflada = item.subtotal * (1 + tasaInflacion / 100);
                                            const mDesc = baseInflada * ((item.descuento || 0) / 100);
                                            const precioItemFinal = baseInflada - mDesc;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-slate-800/80 p-2 rounded border border-slate-700 relative group text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-start mb-1 pr-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-white text-xs leading-tight",
                                                                children: item.nombre
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-cyan-400 font-semibold text-xs",
                                                                children: [
                                                                    "$",
                                                                    precioItemFinal.toLocaleString(undefined, {
                                                                        maximumFractionDigits: 0
                                                                    })
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 543,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 541,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-end mt-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-slate-400",
                                                                children: [
                                                                    item.canal,
                                                                    " | ",
                                                                    item.canal === 'InStore' ? `${item.cantidad}x ${item.tiendas.length} tiendas` : '1x'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 546,
                                                                columnNumber: 23
                                                            }, this),
                                                            item.descuento > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30",
                                                                children: [
                                                                    "-",
                                                                    item.descuento,
                                                                    "% OFF"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 46
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>eliminarElemento(item.idUnico),
                                                        className: "absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined text-sm",
                                                            children: "close"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 549,
                                                            columnNumber: 158
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, item.idUnico, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 540,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 534,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 529,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 pt-4 border-t border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400",
                                                children: "Suma Base"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 558,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white",
                                                children: [
                                                    "$",
                                                    subtotalBaseGlobal.toLocaleString(undefined, {
                                                        maximumFractionDigits: 0
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 559,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 557,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center bg-slate-800 p-2 rounded",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-300",
                                                children: "Inflación General (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 562,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "0.1",
                                                value: tasaInflacion,
                                                onChange: (e)=>setTasaInflacion(Number(e.target.value)),
                                                className: "w-16 bg-slate-900 text-white border border-slate-700 rounded p-1 text-right focus:outline-none focus:border-cyan-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 563,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 561,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400",
                                                children: "Descuento Global (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 566,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: descuentoGlobal,
                                                onChange: (e)=>setDescuentoGlobal(Number(e.target.value)),
                                                className: "w-16 bg-slate-800 border border-slate-700 rounded p-1 text-white text-right focus:outline-none focus:border-cyan-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 567,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 565,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-end bg-slate-900 p-3 rounded border border-cyan-500/20 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-semibold text-xs",
                                                children: "Total Final"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 570,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-bold text-cyan-400",
                                                children: [
                                                    "$",
                                                    totalFinal.toLocaleString(undefined, {
                                                        maximumFractionDigits: 0
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 571,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 569,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleSaveDeal,
                                        disabled: guardando,
                                        className: "w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold rounded py-2 text-sm mt-2",
                                        children: guardando ? "Guardando..." : "Guardar Acuerdo"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 574,
                                        columnNumber: 13
                                    }, this),
                                    modo === 'EDIT' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                disabled: generandoPdf,
                                                onClick: async ()=>{
                                                    if (dealAEditar) {
                                                        setGenerandoPdf(true);
                                                        try {
                                                            const dealParaPDF = {
                                                                ...dealAEditar,
                                                                adjuntos: elementosAcuerdo.flatMap((i)=>i.adjuntos || []),
                                                                elementos_json: elementosAcuerdo
                                                            };
                                                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generadorPdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generarAcuerdoPDF"])(dealParaPDF);
                                                        } catch (error) {
                                                            alert("Error al generar PDF.");
                                                        } finally{
                                                            setGenerandoPdf(false);
                                                        }
                                                    }
                                                },
                                                className: "w-full bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 font-bold rounded py-2 text-sm flex items-center justify-center gap-2 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: generandoPdf ? 'hourglass_empty' : 'picture_as_pdf'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 19
                                                    }, this),
                                                    generandoPdf ? 'Procesando...' : 'Descargar Acuerdo PDF'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 580,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                disabled: enviandoCorreo || guardando,
                                                onClick: handleEnviarCorreo,
                                                className: "w-full bg-indigo-600 border border-indigo-500 text-white hover:bg-indigo-500 font-bold rounded py-2 text-sm flex items-center justify-center gap-2 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: enviandoCorreo ? 'hourglass_empty' : 'send'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 19
                                                    }, this),
                                                    enviandoCorreo ? 'Enviando...' : 'Enviar por Correo'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 596,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 556,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 528,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormularioAcuerdo.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormularioAcuerdo.tsx",
        lineNumber: 374,
        columnNumber: 5
    }, this);
    // Lógica del contenedor: Modal si es CRM, Bloque normal si es Cotizador
    if (origen === 'CRM') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                    onClick: onCerrar
                }, void 0, false, {
                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                    lineNumber: 612,
                    columnNumber: 9
                }, this),
                FormularioContent
            ]
        }, void 0, true, {
            fileName: "[project]/components/FormularioAcuerdo.tsx",
            lineNumber: 611,
            columnNumber: 7
        }, this);
    }
    return FormularioContent;
}
_s(FormularioAcuerdo, "ZLJbudLcL2MhhgABzXhdOaVNyS4=");
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
// Función para descargar y convertir la imagen de Supabase
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
    doc.text(`Razón Social / Nombre y Apellido: ${nombreCliente}`, 14, 54);
    doc.text(`Número de Proveedor en INC S.A.: ${idCliente}`, 14, 60);
    doc.text(`CUIT: ${deal.cliente?.cuit || 'S/D'}`, 14, 66);
    doc.text(`Dirección: ${deal.cliente?.direccion || 'S/D'}`, 14, 72);
    doc.text(`Teléfonos: ${deal.cliente?.telefono || 'S/D'}`, 14, 78);
    doc.text(`Representante legal: ${deal.cliente?.rep_nombre || 'S/D'}`, 14, 84);
    doc.text(`Documento: ${deal.cliente?.rep_dni || 'S/D'}`, 14, 90);
    doc.text(`Cargo: ${deal.cliente?.rep_cargo || 'S/D'}`, 14, 96);
    // --- VIGENCIA ---
    doc.text(`Período de Vigencia desde: ${deal.fecha_desde || ''} | Hasta: ${deal.fecha_hasta || ''}`, 14, 106);
    // --- TEXTO INTRODUCTORIO ---
    // Modificado para referenciar el Anexo I
    const textoIntroduccion = `Por medio de la presente hacemos llegar a Ud. la siguiente propuesta de servicios con vigencia para el período previamente indicado, durante la cual INC S.A. cumplirá los servicios que se detallan en el Anexo I, y en contraprestación, ${nombreCliente} le reconocerá los montos en pesos o porcentajes allí descriptos:`;
    const splitIntro = doc.splitTextToSize(textoIntroduccion, 180);
    doc.text(splitIntro, 14, 114);
    let currentY = 114 + splitIntro.length * 5 + 5;
    // --- TEXTO REMARCADO (NUEVO) ---
    doc.setFont("helvetica", "bold");
    const textoRemarcado = "IMPORTANTE: En caso de que no se retire el material finalizado el plazo del acuerdo, se aplicarán cargos correspondientes al plazo excedido.";
    const splitRemarcado = doc.splitTextToSize(textoRemarcado, 180);
    doc.text(splitRemarcado, 14, currentY);
    doc.setFont("helvetica", "normal");
    currentY += splitRemarcado.length * 5 + 10;
    // --- CIERRE Y FIRMAS (MOVIDO A LA PRIMERA PÁGINA) ---
    doc.setFontSize(9);
    const textoCierre = `Esta propuesta es irrevocable y se considerará aceptada con la recepción y posterior aceptación de la primera Factura o Nota de débito emitida por INC S.A. conforme a lo aquí dispuesto.`;
    const splitCierre = doc.splitTextToSize(textoCierre, 180);
    doc.text(splitCierre, 14, currentY);
    currentY += splitCierre.length * 5 + 20;
    doc.text(`Firma por parte de INC S.A.: ___________________________`, 14, currentY);
    currentY += 15;
    const aceptacion = `Por la presente, acuso recibo de la propuesta de servicios de INC S.A. con fecha ${fechaActual}, aceptando la misma.`;
    const splitAceptacion = doc.splitTextToSize(aceptacion, 180);
    doc.text(splitAceptacion, 14, currentY);
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
    const tableColumn = [
        "Elemento",
        "Cantidad",
        "Tiendas",
        "Precio base",
        "Precio c/ desc",
        "Ahorro"
    ];
    const tableRows = [];
    let sumaBaseTotal = 0;
    let sumaAhorroItems = 0;
    let sumaTotalConDescuentoItems = 0;
    const elementos = deal.elementos_json || [];
    const inflacion = deal.tasa_inflacion || 0;
    const descuentoGlobal = deal.descuento_porcentaje || 0;
    if (elementos.length > 0) {
        elementos.forEach((item)=>{
            // Se absorbe la inflación en el precio base para mostrarlo como un todo
            const precioBase = item.subtotal * (1 + inflacion / 100);
            sumaBaseTotal += precioBase;
            const descuentoPrc = item.descuento || 0;
            const montoDescuentoItem = precioBase * (descuentoPrc / 100);
            const precioConDescuento = precioBase - montoDescuentoItem;
            sumaTotalConDescuentoItems += precioConDescuento;
            sumaAhorroItems += montoDescuentoItem;
            const strDescuento = descuentoPrc === 100 ? 'BONIFICADO' : `$${precioConDescuento.toLocaleString('es-AR', {
                maximumFractionDigits: 2
            })}`;
            const strAhorro = montoDescuentoItem > 0 ? `-$${montoDescuentoItem.toLocaleString('es-AR', {
                maximumFractionDigits: 2
            })}` : '-';
            tableRows.push([
                item.nombre,
                item.cantidad || 1,
                item.tiendas?.length || '-',
                `$${precioBase.toLocaleString('es-AR', {
                    maximumFractionDigits: 2
                })}`,
                strDescuento,
                strAhorro
            ]);
        });
    } else {
        // Fallback de seguridad calculando desde el monto final
        let precioBase = deal.amount;
        if (descuentoGlobal > 0) precioBase = precioBase / (1 - descuentoGlobal / 100);
        // Ya no restamos la inflación visiblemente, asumimos que está en el precioBase
        sumaBaseTotal = precioBase;
        tableRows.push([
            deal.catalogo?.elemento || "Campaña Única",
            "1",
            deal.tiendas?.length || "-",
            `$${precioBase.toLocaleString('es-AR', {
                maximumFractionDigits: 2
            })}`,
            `$${precioBase.toLocaleString('es-AR', {
                maximumFractionDigits: 2
            })}`,
            "-"
        ]);
        sumaTotalConDescuentoItems = precioBase;
    }
    // Fila de Total de Items
    tableRows.push([
        {
            content: 'SUBTOTAL ITEMS',
            colSpan: 4,
            styles: {
                halign: 'right',
                fontStyle: 'bold'
            }
        },
        {
            content: `$${sumaTotalConDescuentoItems.toLocaleString('es-AR', {
                maximumFractionDigits: 2
            })}`,
            styles: {
                fontStyle: 'bold'
            }
        },
        {
            content: sumaAhorroItems > 0 ? `-$${sumaAhorroItems.toLocaleString('es-AR', {
                maximumFractionDigits: 2
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
            cellPadding: 3
        },
        columnStyles: {
            0: {
                cellWidth: 40
            },
            1: {
                cellWidth: 15,
                halign: 'center'
            },
            2: {
                cellWidth: 15,
                halign: 'center'
            },
            3: {
                cellWidth: 40,
                halign: 'right'
            },
            4: {
                cellWidth: 40,
                halign: 'right'
            },
            5: {
                cellWidth: 30,
                halign: 'right'
            }
        }
    });
    // --- RESUMEN FINANCIERO FINAL ---
    const finalY = doc.lastAutoTable.finalY + 10;
    let resumenY = finalY;
    const montoDescuentoGlobal = sumaTotalConDescuentoItems * (descuentoGlobal / 100);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Suma Base Total:`, 14, resumenY);
    doc.text(`$ ${sumaBaseTotal.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`, 150, resumenY, {
        align: 'right'
    });
    // (Línea de inflación eliminada a pedido)
    if (sumaAhorroItems > 0) {
        resumenY += 6;
        doc.text(`Ahorro por Bonificaciones de Ítems:`, 14, resumenY);
        doc.text(`-$ ${sumaAhorroItems.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`, 150, resumenY, {
            align: 'right'
        });
    }
    if (descuentoGlobal > 0) {
        resumenY += 6;
        doc.text(`Descuento General Aplicado - ${descuentoGlobal}%:`, 14, resumenY);
        doc.text(`-$ ${montoDescuentoGlobal.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`, 150, resumenY, {
            align: 'right'
        });
    }
    resumenY += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`MONTO TOTAL FINAL (Sin IVA):`, 14, resumenY);
    doc.text(`$ ${deal.amount.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`, 150, resumenY, {
        align: 'right'
    });
    // ==========================================
    // --- ANEXO II: HOJA DE ADJUNTOS / RENDERS ---
    // ==========================================
    if (deal.adjuntos && deal.adjuntos.length > 0) {
        doc.addPage();
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Anexo II: Renders y Documentos Adjuntos", 14, 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        let yAdj = 30;
        for(let i = 0; i < deal.adjuntos.length; i++){
            const adj = deal.adjuntos[i];
            const tipoLabel = adj.categoria ? adj.categoria.replace('_', ' ') : 'General';
            if (adj.tipo.includes('image')) {
                try {
                    const base64Data = await getBase64ImageFromUrl(adj.url);
                    doc.setFont("helvetica", "bold");
                    doc.text(`Adjunto ${i + 1} (${tipoLabel}): ${adj.nombre}`, 14, yAdj);
                    doc.setFont("helvetica", "normal");
                    yAdj += 6;
                    doc.addImage(base64Data, 'JPEG', 14, yAdj, 120, 70, undefined, 'FAST');
                    yAdj += 80;
                } catch (e) {
                    doc.setTextColor(255, 0, 0);
                    doc.text(`Error al cargar la previsualización de la imagen.`, 14, yAdj);
                    doc.setTextColor(0, 0, 0);
                    yAdj += 10;
                }
            } else {
                doc.setFont("helvetica", "bold");
                doc.text(`Adjunto ${i + 1} (${tipoLabel}): ${adj.nombre}`, 14, yAdj);
                doc.setFont("helvetica", "normal");
                yAdj += 6;
                doc.text(`Enlace: ${adj.url}`, 14, yAdj);
                yAdj += 12;
            }
            if (yAdj > 250 && i < deal.adjuntos.length - 1) {
                doc.addPage();
                yAdj = 20;
            }
        }
    }
    const nombreArchivoFinal = `Acuerdo_${nombreCliente.replace(/\s+/g, '_')}_${deal.id}.pdf`;
    if (returnBase64) {
        return {
            pdfBase64: doc.output('datauristring'),
            nombreArchivo: nombreArchivoFinal
        };
    } else {
        doc.save(nombreArchivoFinal);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_0tdju5lrf8c4f._.js.map