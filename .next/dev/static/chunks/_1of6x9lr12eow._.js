(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/crm/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CRMPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormularioAcuerdo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FormularioAcuerdo.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const STAGES = [
    "OPORTUNIDAD",
    "COTIZADO",
    "POR_FACTURAR",
    "FACTURADO",
    "PERDIDO"
];
function CRMPage() {
    _s();
    const [deals, setDeals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [clientes, setClientes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [filtroCanal, setFiltroCanal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TODOS");
    const [filtroTipoCliente, setFiltroTipoCliente] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TODOS");
    const [filtroClienteId, setFiltroClienteId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("TODOS");
    const [busquedaGeneral, setBusquedaGeneral] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [draggedDealId, setDraggedDealId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalMode, setModalMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('CREATE');
    const [editingDealId, setEditingDealId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CRMPage.useEffect": ()=>{
            fetchDeals();
            fetchClientes();
            fetchCurrentUser();
        }
    }["CRMPage.useEffect"], []);
    const fetchCurrentUser = async ()=>{
        const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
        if (session?.user?.email) {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('usuarios').select('*').eq('email', session.user.email).single();
            if (data) setCurrentUser(data);
        }
    };
    const fetchDeals = async ()=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deals').select(`
      *,
      cliente:clientes!cliente_id(*),
      marca_auspiciante:clientes!auspiciante_id(*),
      catalogo:catalogo(*),
      deal_tiendas(tiendas(*)),
      vendedor:usuarios!vendedor_id(*)
    `);
        if (data) {
            const formattedDeals = data.map((d)=>({
                    ...d,
                    tiendas: d.deal_tiendas ? d.deal_tiendas.map((dt)=>dt.tiendas) : [],
                    adjuntos: d.adjuntos || []
                }));
            setDeals(formattedDeals);
        }
    };
    const fetchClientes = async ()=>{
        const { data: dataClientes } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('clientes').select('*');
        if (dataClientes) setClientes(dataClientes);
    };
    const isJefe = currentUser?.rol === 'JEFE_VENTAS';
    const isVendedor = currentUser?.rol === 'VENDEDOR';
    const isAdministrativo = currentUser?.rol === 'ADMINISTRATIVO';
    const canCreate = !isAdministrativo;
    const canEditDeal = (deal)=>{
        if (isJefe) return true;
        const etapasBloqueadas = [
            "POR_FACTURAR",
            "FACTURADO",
            "PERDIDO"
        ];
        if (etapasBloqueadas.includes(deal.stage)) return false;
        if (isAdministrativo) return true;
        if (isVendedor) {
            if (!deal.vendedor_id || deal.vendedor_id === currentUser?.id) return true;
        }
        return false;
    };
    const dealsFiltrados = deals.filter((deal)=>{
        if (filtroCanal !== "TODOS" && deal.channel !== filtroCanal) return false;
        if (filtroClienteId !== "TODOS" && deal.cliente_id?.toString() !== filtroClienteId) return false;
        if (filtroTipoCliente !== "TODOS") {
            const clienteObj = clientes.find((c)=>c.id === deal.cliente_id);
            if (filtroTipoCliente === "AGENCIA" && !clienteObj?.es_agencia) return false;
            if (filtroTipoCliente === "DIRECTO" && clienteObj?.es_agencia) return false;
        }
        if (busquedaGeneral.trim() !== "") {
            const termino = busquedaGeneral.toLowerCase();
            const matchTitulo = deal.titulo?.toLowerCase().includes(termino);
            const matchCliente = deal.cliente?.nombre.toLowerCase().includes(termino);
            const matchMarca = deal.marca_auspiciante?.nombre?.toLowerCase().includes(termino);
            const matchElemento = deal.catalogo?.elemento.toLowerCase().includes(termino);
            const matchVendedor = deal.vendedor?.nombre.toLowerCase().includes(termino);
            if (!matchTitulo && !matchCliente && !matchMarca && !matchElemento && !matchVendedor) {
                return false;
            }
        }
        return true;
    });
    const totalPipeline = dealsFiltrados.filter((d)=>d.stage !== "PERDIDO" && !d.es_reclasificado).reduce((sum, d)=>sum + (Number(d.amount) || 0), 0);
    const totalPerdido = dealsFiltrados.filter((d)=>d.stage === "PERDIDO" && !d.es_reclasificado).reduce((sum, d)=>sum + (Number(d.amount) || 0), 0);
    const totalCerrado = dealsFiltrados.filter((d)=>d.stage === "FACTURADO" && !d.es_reclasificado).reduce((sum, d)=>sum + (Number(d.amount) || 0), 0);
    const totalConcluidos = totalCerrado + totalPerdido;
    const ratioPerdida = totalConcluidos > 0 ? (totalPerdido / totalConcluidos * 100).toFixed(1) : "0.0";
    const handleDragStart = (e, deal)=>{
        if (!canEditDeal(deal)) {
            e.preventDefault();
            return;
        }
        setDraggedDealId(deal.id);
        e.dataTransfer.setData("text/plain", deal.id.toString());
    };
    const handleDragOver = (e)=>e.preventDefault();
    const handleDrop = async (e, targetStage)=>{
        e.preventDefault();
        if (!draggedDealId) return;
        setDeals((prevDeals)=>prevDeals.map((deal)=>deal.id === draggedDealId ? {
                    ...deal,
                    stage: targetStage
                } : deal));
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deals').update({
            stage: targetStage
        }).eq('id', draggedDealId);
        if (error) {
            console.error(error);
            fetchDeals();
        }
        setDraggedDealId(null);
    };
    const handleDeleteDeal = async (dealId)=>{
        if (!window.confirm("¿Estás seguro de que deseas eliminar este acuerdo?")) return;
        setDeals((prevDeals)=>prevDeals.filter((d)=>d.id !== dealId));
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deals').delete().eq('id', dealId);
        if (error) {
            console.error(error);
            fetchDeals();
        }
    };
    const openCreateModal = ()=>{
        setModalMode('CREATE');
        setEditingDealId(null);
        setIsModalOpen(true);
    };
    const openEditModal = (deal)=>{
        setModalMode('EDIT');
        setEditingDealId(deal.id);
        setIsModalOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full flex flex-col gap-6 p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-white tracking-tight",
                                children: "Pipeline CRM"
                            }, void 0, false, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-400 text-sm",
                                children: "Monitoreo de oportunidades y tasa de conversión."
                            }, void 0, false, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/crm/page.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 bg-slate-900/80 border border-white/10 p-3 rounded-xl backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 border-r border-slate-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] uppercase font-bold text-slate-400 block",
                                        children: "Total Pipeline"
                                    }, void 0, false, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-bold text-cyan-400",
                                        children: [
                                            "$",
                                            totalPipeline.toLocaleString(undefined, {
                                                maximumFractionDigits: 0
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 border-r border-slate-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] uppercase font-bold text-slate-400 block",
                                        children: "Facturado"
                                    }, void 0, false, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-bold text-emerald-400",
                                        children: [
                                            "$",
                                            totalCerrado.toLocaleString(undefined, {
                                                maximumFractionDigits: 0
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] uppercase font-bold text-slate-400 block",
                                        children: "Ratio de Pérdida"
                                    }, void 0, false, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-bold text-rose-400",
                                        children: [
                                            ratioPerdida,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            canCreate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: openCreateModal,
                                className: "ml-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(34,211,238,0.2)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-sm",
                                        children: "add"
                                    }, void 0, false, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this),
                                    " Nueva Oportunidad"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/crm/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/crm/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-md flex flex-wrap gap-4 items-end justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-end gap-4 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-[200px] max-w-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[10px] uppercase font-bold text-slate-400 block mb-1",
                                        children: "Buscar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Ej: Samsung, Banner...",
                                                value: busquedaGeneral,
                                                onChange: (e)=>setBusquedaGeneral(e.target.value),
                                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 pl-8 pr-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 177,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-slate-500 absolute left-2 top-1.5 text-sm",
                                                children: "search"
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[10px] uppercase font-bold text-slate-400 block mb-1",
                                        children: "Canal"
                                    }, void 0, false, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filtroCanal,
                                        onChange: (e)=>setFiltroCanal(e.target.value),
                                        className: "bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TODOS",
                                                children: "Todos"
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 184,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Digital",
                                                children: "Digital"
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "InStore",
                                                children: "InStore"
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/crm/page.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-slate-400",
                        children: [
                            "Mostrando ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-white",
                                children: dealsFiltrados.length
                            }, void 0, false, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 190,
                                columnNumber: 60
                            }, this),
                            " oportunidades"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/crm/page.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/crm/page.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 overflow-x-auto pb-4 flex-1",
                children: STAGES.map((stage)=>{
                    const dealsEtapa = dealsFiltrados.filter((d)=>d.stage === stage);
                    const montoEtapa = dealsEtapa.reduce((sum, d)=>sum + (Number(d.amount) || 0), 0);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onDragOver: handleDragOver,
                        onDrop: (e)=>handleDrop(e, stage),
                        className: `flex-1 min-w-[280px] bg-slate-900/60 border rounded-xl flex flex-col max-h-[70vh] backdrop-blur-md transition-all ${stage === "PERDIDO" ? 'border-rose-500/30 bg-rose-950/10' : 'border-slate-800'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b border-slate-800 bg-slate-900/80 rounded-t-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: `font-bold text-xs tracking-wider uppercase ${stage === "PERDIDO" ? 'text-rose-400' : 'text-slate-300'}`,
                                                children: stage
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-slate-800 text-[10px] font-mono px-2 py-0.5 rounded-full text-slate-400",
                                                children: dealsEtapa.length
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-extrabold text-cyan-400 mt-1",
                                        children: [
                                            "$",
                                            montoEtapa.toLocaleString(undefined, {
                                                maximumFractionDigits: 0
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 199,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 flex-1 overflow-y-auto space-y-3",
                                children: dealsEtapa.map((deal)=>{
                                    const hasPermission = canEditDeal(deal);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        draggable: hasPermission,
                                        onDragStart: (e)=>handleDragStart(e, deal),
                                        onClick: ()=>{
                                            if (hasPermission) openEditModal(deal);
                                        },
                                        className: `bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl shadow-md transition-all relative group ${hasPermission ? 'cursor-pointer hover:border-cyan-500/50 hover:scale-[1.01]' : 'opacity-80 cursor-not-allowed'}`,
                                        children: [
                                            hasPermission && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            openEditModal(deal);
                                                        },
                                                        className: "text-slate-500 hover:text-cyan-400",
                                                        title: "Editar acuerdo",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined text-sm",
                                                            children: "edit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/crm/page.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/crm/page.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            handleDeleteDeal(deal.id);
                                                        },
                                                        className: "text-slate-500 hover:text-rose-400",
                                                        title: "Eliminar acuerdo",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined text-sm",
                                                            children: "delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/crm/page.tsx",
                                                            lineNumber: 233,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/crm/page.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-1 pr-10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-sm text-white",
                                                    children: deal.titulo
                                                }, void 0, false, {
                                                    fileName: "[project]/app/crm/page.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 23
                                            }, this),
                                            deal.es_reclasificado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded mb-1",
                                                children: "Reclasificado"
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 mb-1",
                                                children: deal.cliente?.nombre
                                            }, void 0, false, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 248,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-slate-500 mb-2 flex items-center gap-1 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-[12px]",
                                                        children: "person"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/crm/page.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 25
                                                    }, this),
                                                    deal.vendedor?.nombre || 'Sin asignar'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 249,
                                                columnNumber: 23
                                            }, this),
                                            deal.adjuntos && deal.adjuntos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 text-[10px] text-cyan-400 font-semibold mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-[12px]",
                                                        children: "attachment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/crm/page.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 27
                                                    }, this),
                                                    deal.adjuntos.length,
                                                    " Archivos"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center mt-3 pt-3 border-t border-slate-700/50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-cyan-400 text-sm",
                                                        children: [
                                                            "$",
                                                            Number(deal.amount).toLocaleString(undefined, {
                                                                maximumFractionDigits: 0
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/crm/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] font-extrabold px-2 py-0.5 rounded uppercase bg-slate-800 text-slate-300",
                                                        children: deal.channel
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/crm/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/crm/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, deal.id, true, {
                                        fileName: "[project]/app/crm/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/crm/page.tsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, this)
                        ]
                    }, stage, true, {
                        fileName: "[project]/app/crm/page.tsx",
                        lineNumber: 198,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/crm/page.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormularioAcuerdo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                origen: "CRM",
                modo: modalMode,
                dealAEditar: editingDealId ? deals.find((d)=>d.id === editingDealId) : null,
                onCerrar: ()=>{
                    setIsModalOpen(false);
                    setEditingDealId(null);
                },
                onGuardadoExitoso: ()=>{
                    setIsModalOpen(false);
                    setEditingDealId(null);
                    fetchDeals();
                }
            }, void 0, false, {
                fileName: "[project]/app/crm/page.tsx",
                lineNumber: 274,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/crm/page.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_s(CRMPage, "Utsv4YeXrVns3ctTkF1UrCBfph4=");
_c = CRMPage;
var _c;
__turbopack_context__.k.register(_c, "CRMPage");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prorrateo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prorrateo.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
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
    // Inflación Mensual Compuesta
    const [inflacionGlobalPromedio, setInflacionGlobalPromedio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [multiplesValoresInflacion, setMultiplesValoresInflacion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tasasPorMes, setTasasPorMes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Control de Edición de Ítem Individual
    const [idItemEnEdicion, setIdItemEnEdicion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Estados del Ítem Individual
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
        setDescuentoGlobalTipo(deal.descuento_global_tipo || '%');
        setDescuentoGlobalValor(deal.descuento_global_valor ?? (deal.descuento_porcentaje || 0));
        setInflacionGlobalPromedio(deal.tasa_inflacion || 0);
        const infGuardada = deal.inflacion_mensual || [];
        if (Array.isArray(infGuardada) && infGuardada.length > 0) {
            const mapa = {};
            infGuardada.forEach((i)=>{
                mapa[i.mesClave] = i.tasa;
            });
            setTasasPorMes(mapa);
            setMultiplesValoresInflacion(true);
        }
        if (deal.elementos_json && deal.elementos_json.length > 0) {
            const elementosNormalizados = deal.elementos_json.map((el)=>({
                    ...el,
                    fechaDesde: el.fechaDesde || deal.fecha_desde || new Date().toISOString().split('T')[0],
                    fechaHasta: el.fechaHasta || deal.fecha_hasta || new Date().toISOString().split('T')[0]
                }));
            setElementosAcuerdo(elementosNormalizados);
        }
    };
    const obtenerListaElementosConsolidada = ()=>{
        let lista = [
            ...elementosAcuerdo
        ];
        if (idItemEnEdicion && elementoSeleccionado) {
            const itemCat = catalogo.find((c)=>c.id.toString() === elementoSeleccionado);
            if (itemCat && itemFechaDesde && itemFechaHasta) {
                const d1 = new Date(`${itemFechaDesde}T00:00:00`);
                const d2 = new Date(`${itemFechaHasta}T00:00:00`);
                const diffDays = Math.max(1, Math.ceil(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1);
                const periodo = itemCat.periodo || 'Mensual';
                let multiplicadorTiempo = 1;
                let labelPeriodo = 'Campaña Única';
                if (periodo === 'Semanal') {
                    multiplicadorTiempo = diffDays / 7;
                    labelPeriodo = `${diffDays} día(s) (Semanal)`;
                } else if (periodo === 'Mensual') {
                    multiplicadorTiempo = diffDays / 30;
                    labelPeriodo = `${diffDays} día(s) (Base 30)`;
                }
                const cantTiendas = canal === 'InStore' ? tiendasSeleccionadas.length || 1 : 1;
                const cantUnidades = canal === 'InStore' ? cantidad || 1 : 1;
                const subtotalOriginal = itemCat.precio_base * multiplicadorTiempo * cantTiendas * cantUnidades;
                const montoSobreprecio = sobreprecioTipo === '%' ? subtotalOriginal * (sobreprecioValor / 100) : sobreprecioValor;
                const precioLista = subtotalOriginal + montoSobreprecio;
                const montoDescuento = descuentoItemTipo === '%' ? precioLista * (descuentoItemValor / 100) : descuentoItemValor;
                const subtotal = Math.max(0, precioLista - montoDescuento);
                const itemActualizado = {
                    idUnico: idItemEnEdicion,
                    catalogoId: itemCat.id,
                    nombre: itemCat.elemento,
                    canal,
                    periodo,
                    fechaDesde: itemFechaDesde,
                    fechaHasta: itemFechaHasta,
                    diasActivos: diffDays,
                    tiendas: tiendasSeleccionadas,
                    cantidad: cantUnidades,
                    precioUnitarioCatalogo: itemCat.precio_base,
                    sobreprecioTipo,
                    sobreprecioValor,
                    descuentoItemTipo,
                    descuentoItemValor,
                    precioLista,
                    montoDescuentoItem: montoDescuento,
                    subtotal,
                    adjuntos: adjuntosItemActual
                };
                lista = lista.map((i)=>i.idUnico === idItemEnEdicion ? itemActualizado : i);
            }
        }
        return lista;
    };
    const listaMesesCampana = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FormularioAcuerdo.useMemo[listaMesesCampana]": ()=>{
            const listaActual = obtenerListaElementosConsolidada();
            const fechas = listaActual.flatMap({
                "FormularioAcuerdo.useMemo[listaMesesCampana].fechas": (i)=>[
                        i.fechaDesde,
                        i.fechaHasta
                    ]
            }["FormularioAcuerdo.useMemo[listaMesesCampana].fechas"]).filter(Boolean);
            if (fechas.length === 0) return [];
            const fMin = fechas.reduce({
                "FormularioAcuerdo.useMemo[listaMesesCampana].fMin": (min, cur)=>cur < min ? cur : min
            }["FormularioAcuerdo.useMemo[listaMesesCampana].fMin"]);
            const fMax = fechas.reduce({
                "FormularioAcuerdo.useMemo[listaMesesCampana].fMax": (max, cur)=>cur > max ? cur : max
            }["FormularioAcuerdo.useMemo[listaMesesCampana].fMax"]);
            const claves = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prorrateo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["obtenerMesesRango"])(fMin, fMax);
            return claves.map({
                "FormularioAcuerdo.useMemo[listaMesesCampana]": (mesClave, idx)=>({
                        mesClave,
                        nombre: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prorrateo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatearNombreMes"])(mesClave),
                        tasa: idx === 0 ? 0 : tasasPorMes[mesClave] !== undefined ? tasasPorMes[mesClave] : inflacionGlobalPromedio
                    })
            }["FormularioAcuerdo.useMemo[listaMesesCampana]"]);
        }
    }["FormularioAcuerdo.useMemo[listaMesesCampana]"], [
        elementosAcuerdo,
        idItemEnEdicion,
        itemFechaDesde,
        itemFechaHasta,
        elementoSeleccionado,
        tasasPorMes,
        inflacionGlobalPromedio
    ]);
    const handleInflacionGlobalChange = (valor)=>{
        setInflacionGlobalPromedio(valor);
        if (!multiplesValoresInflacion) {
            const nuevoMapa = {};
            listaMesesCampana.forEach((m, idx)=>{
                nuevoMapa[m.mesClave] = idx === 0 ? 0 : valor;
            });
            setTasasPorMes(nuevoMapa);
        }
    };
    const handleTasaMesChange = (mesClave, valor)=>{
        const nuevoMapa = {
            ...tasasPorMes,
            [mesClave]: valor
        };
        setTasasPorMes(nuevoMapa);
        const mesesConTasa = listaMesesCampana.filter((_, idx)=>idx > 0);
        if (mesesConTasa.length > 0) {
            const suma = mesesConTasa.reduce((acc, m)=>acc + (m.mesClave === mesClave ? valor : nuevoMapa[m.mesClave] ?? inflacionGlobalPromedio), 0);
            setInflacionGlobalPromedio(Math.round(suma / mesesConTasa.length * 10) / 10);
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
        setIdItemEnEdicion(null);
    };
    const limpiarFormularioItem = ()=>{
        setElementoSeleccionado("");
        setItemFechaDesde("");
        setItemFechaHasta("");
        setTiendasSeleccionadas([]);
        setAdjuntosItemActual([]);
        setCantidad(1);
        setSobreprecioValor(0);
        setDescuentoItemValor(0);
        setIdItemEnEdicion(null);
    };
    const handleEditarElemento = (item)=>{
        setIdItemEnEdicion(item.idUnico);
        setCanal(item.canal || 'Digital');
        setElementoSeleccionado(item.catalogoId ? item.catalogoId.toString() : "");
        setItemFechaDesde(item.fechaDesde || "");
        setItemFechaHasta(item.fechaHasta || "");
        setCantidad(item.cantidad || 1);
        setTiendasSeleccionadas(item.tiendas || []);
        setSobreprecioTipo(item.sobreprecioTipo || '%');
        setSobreprecioValor(item.sobreprecioValor || 0);
        setDescuentoItemTipo(item.descuentoItemTipo || '%');
        setDescuentoItemValor(item.descuentoItemValor || 0);
        setAdjuntosItemActual(item.adjuntos || []);
    };
    const handleGuardarElemento = ()=>{
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
        const d1 = new Date(`${itemFechaDesde}T00:00:00`);
        const d2 = new Date(`${itemFechaHasta}T00:00:00`);
        if (d2 < d1) {
            alert("La fecha Hasta no puede ser anterior a la fecha Desde.");
            return;
        }
        const diffDays = Math.ceil(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const periodo = itemCatalogo.periodo || 'Mensual';
        let multiplicadorTiempo = 1;
        let labelPeriodo = 'Campaña Única';
        if (periodo === 'Semanal') {
            multiplicadorTiempo = diffDays / 7;
            labelPeriodo = `${diffDays} día(s) (Semanal)`;
        } else if (periodo === 'Mensual') {
            multiplicadorTiempo = diffDays / 30;
            labelPeriodo = `${diffDays} día(s) (Base 30)`;
        } else {
            multiplicadorTiempo = 1;
            labelPeriodo = 'Campaña Única (Fijo)';
        }
        const multiplicadorTiendas = canal === 'InStore' ? tiendasSeleccionadas.length : 1;
        const multiplicadorCantidad = canal === 'InStore' ? cantidad : 1;
        const multiplicadorVolumen = multiplicadorTiendas * multiplicadorCantidad;
        const subtotalOriginal = itemCatalogo.precio_base * multiplicadorTiempo * multiplicadorVolumen;
        const montoSobreprecio = sobreprecioTipo === '%' ? subtotalOriginal * (sobreprecioValor / 100) : sobreprecioValor;
        const precioLista = subtotalOriginal + montoSobreprecio;
        const montoDescuento = descuentoItemTipo === '%' ? precioLista * (descuentoItemValor / 100) : descuentoItemValor;
        const subtotal = Math.max(0, precioLista - montoDescuento);
        const itemDatos = {
            idUnico: idItemEnEdicion || Date.now(),
            catalogoId: itemCatalogo.id,
            nombre: itemCatalogo.elemento,
            canal: canal,
            periodo: periodo,
            fechaDesde: itemFechaDesde,
            fechaHasta: itemFechaHasta,
            diasActivos: diffDays,
            tiendas: tiendasSeleccionadas,
            cantidad: multiplicadorCantidad,
            precioUnitarioCatalogo: itemCatalogo.precio_base,
            sobreprecioTipo,
            sobreprecioValor,
            descuentoItemTipo,
            descuentoItemValor,
            precioLista,
            montoDescuentoItem: montoDescuento,
            subtotal,
            adjuntos: adjuntosItemActual
        };
        if (idItemEnEdicion) {
            setElementosAcuerdo(elementosAcuerdo.map((i)=>i.idUnico === idItemEnEdicion ? itemDatos : i));
        } else {
            setElementosAcuerdo([
                ...elementosAcuerdo,
                itemDatos
            ]);
        }
        limpiarFormularioItem();
    };
    const eliminarElemento = (idUnico)=>{
        setElementosAcuerdo(elementosAcuerdo.filter((item)=>item.idUnico !== idUnico));
        if (idItemEnEdicion === idUnico) limpiarFormularioItem();
    };
    const factoresCompuestosGlobales = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FormularioAcuerdo.useMemo[factoresCompuestosGlobales]": ()=>{
            const mapa = {};
            let factor = 1.0;
            listaMesesCampana.forEach({
                "FormularioAcuerdo.useMemo[factoresCompuestosGlobales]": (m, idx)=>{
                    if (idx === 0) {
                        mapa[m.mesClave] = 1.0;
                    } else {
                        const tasa = tasasPorMes[m.mesClave] !== undefined ? tasasPorMes[m.mesClave] : inflacionGlobalPromedio;
                        factor = factor * (1 + tasa / 100);
                        mapa[m.mesClave] = factor;
                    }
                }
            }["FormularioAcuerdo.useMemo[factoresCompuestosGlobales]"]);
            return mapa;
        }
    }["FormularioAcuerdo.useMemo[factoresCompuestosGlobales]"], [
        listaMesesCampana,
        tasasPorMes,
        inflacionGlobalPromedio
    ]);
    const listaConsolidada = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FormularioAcuerdo.useMemo[listaConsolidada]": ()=>{
            return obtenerListaElementosConsolidada();
        }
    }["FormularioAcuerdo.useMemo[listaConsolidada]"], [
        elementosAcuerdo,
        idItemEnEdicion,
        elementoSeleccionado,
        itemFechaDesde,
        itemFechaHasta,
        cantidad,
        tiendasSeleccionadas,
        sobreprecioTipo,
        sobreprecioValor,
        descuentoItemTipo,
        descuentoItemValor
    ]);
    const totalConInflacion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FormularioAcuerdo.useMemo[totalConInflacion]": ()=>{
            if (listaConsolidada.length === 0) return 0;
            let suma = 0;
            listaConsolidada.forEach({
                "FormularioAcuerdo.useMemo[totalConInflacion]": (item)=>{
                    const periodo = item.periodo || 'Mensual';
                    const fDesde = item.fechaDesde;
                    const fHasta = item.fechaHasta;
                    if (!fDesde || !fHasta) {
                        suma += item.subtotal;
                        return;
                    }
                    const inicio = new Date(`${fDesde}T00:00:00`);
                    const fin = new Date(`${fHasta}T00:00:00`);
                    if (periodo === 'Único' || periodo === 'único') {
                        const mesInicio = `${inicio.getFullYear()}-${String(inicio.getMonth() + 1).padStart(2, '0')}`;
                        const fact = factoresCompuestosGlobales[mesInicio] || 1.0;
                        suma += item.subtotal * fact;
                    } else {
                        const dias = item.diasActivos || 1;
                        const tarifaDiaria = item.subtotal / dias;
                        const curr = new Date(inicio);
                        while(curr <= fin){
                            const keyMes = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}`;
                            const fact = factoresCompuestosGlobales[keyMes] || 1.0;
                            suma += tarifaDiaria * fact;
                            curr.setDate(curr.getDate() + 1);
                        }
                    }
                }
            }["FormularioAcuerdo.useMemo[totalConInflacion]"]);
            return suma;
        }
    }["FormularioAcuerdo.useMemo[totalConInflacion]"], [
        listaConsolidada,
        factoresCompuestosGlobales
    ]);
    const subtotalPuroSinInflacion = listaConsolidada.reduce((acc, i)=>acc + i.subtotal, 0);
    const montoImpactoInflacion = Math.max(0, totalConInflacion - subtotalPuroSinInflacion);
    const montoDescuentoGlobal = descuentoGlobalTipo === '%' ? totalConInflacion * (descuentoGlobalValor / 100) : descuentoGlobalValor;
    const totalFinal = Math.max(0, totalConInflacion - montoDescuentoGlobal);
    const armarObjetoDealPreliminar = (listaFinal)=>{
        const clienteObj = clientes.find((c)=>c.id.toString() === clienteSeleccionado) || dealAEditar?.cliente;
        const todasFechasMillis = listaFinal.flatMap((i)=>[
                i.fechaDesde ? new Date(`${i.fechaDesde}T12:00:00Z`).getTime() : null,
                i.fechaHasta ? new Date(`${i.fechaHasta}T12:00:00Z`).getTime() : null
            ]).filter((t)=>t !== null && !isNaN(t));
        const fechaMinima = todasFechasMillis.length > 0 ? new Date(Math.min(...todasFechasMillis)).toISOString().split('T')[0] : dealAEditar?.fecha_desde || new Date().toISOString().split('T')[0];
        const fechaMaxima = todasFechasMillis.length > 0 ? new Date(Math.max(...todasFechasMillis)).toISOString().split('T')[0] : dealAEditar?.fecha_hasta || new Date().toISOString().split('T')[0];
        const elementosProcesados = listaFinal.map((item)=>{
            const peso = totalConInflacion > 0 ? item.subtotal / totalConInflacion : 0;
            const porcionDescuentoGlobal = montoDescuentoGlobal * peso;
            const precioFinalProrrateado = Math.max(0, item.subtotal - porcionDescuentoGlobal);
            return {
                ...item,
                porcionDescuentoGlobal,
                precioFinalProrrateado
            };
        });
        const arrayInflacionMensual = listaMesesCampana.map((m)=>({
                mesClave: m.mesClave,
                nombre: m.nombre,
                tasa: m.tasa
            }));
        const dealPreliminar = {
            id: dealAEditar?.id || 0,
            titulo: titulo || dealAEditar?.titulo || "Propuesta Comercial",
            amount: Math.round(totalFinal),
            channel: listaFinal.some((i)=>i.canal === 'Digital') && listaFinal.some((i)=>i.canal === 'InStore') ? 'Omnicanal' : listaFinal[0].canal,
            cliente_id: Number(clienteSeleccionado) || dealAEditar?.cliente_id || 0,
            cliente: clienteObj,
            catalogo_id: Number(elementosProcesados[0].catalogoId),
            descuento_global_tipo: descuentoGlobalTipo,
            descuento_global_valor: descuentoGlobalValor,
            descuento_porcentaje: totalConInflacion > 0 ? Math.round(montoDescuentoGlobal / totalConInflacion * 100) : 0,
            tasa_inflacion: inflacionGlobalPromedio,
            inflacion_mensual: arrayInflacionMensual,
            fecha_desde: fechaMinima,
            fecha_hasta: fechaMaxima,
            adjuntos: elementosProcesados.flatMap((i)=>i.adjuntos || []),
            elementos_json: elementosProcesados,
            es_reclasificado: esReclasificado,
            stage: dealAEditar?.stage || 'COTIZADO'
        };
        return {
            dealPreliminar,
            clienteObj
        };
    };
    const handleDescargarPdfPreliminar = async ()=>{
        const listaFinal = obtenerListaElementosConsolidada();
        if (listaFinal.length === 0) {
            alert("Agrega al menos un elemento para descargar el borrador en PDF.");
            return;
        }
        setGenerandoPdf(true);
        try {
            const { dealPreliminar } = armarObjetoDealPreliminar(listaFinal);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generadorPdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generarAcuerdoPDF"])(dealPreliminar);
        } catch (error) {
            console.error("Error al generar PDF:", error);
            alert(`Hubo un error al generar el PDF borrador: ${error?.message || error}`);
        } finally{
            setGenerandoPdf(false);
        }
    };
    const handleEnviarCorreo = async ()=>{
        const listaFinal = obtenerListaElementosConsolidada();
        if (listaFinal.length === 0) {
            alert("Agrega al menos un elemento para enviar la propuesta.");
            return;
        }
        const { dealPreliminar, clienteObj } = armarObjetoDealPreliminar(listaFinal);
        const emailSugerido = clienteObj?.contacto_email || dealAEditar?.cliente?.contacto_email || "";
        const emailDestino = window.prompt("Ingresa el correo del destinatario:", emailSugerido);
        if (!emailDestino || emailDestino.trim() === "") return;
        setEnviandoCorreo(true);
        try {
            const resultadoPdf = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$generadorPdf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generarAcuerdoPDF"])(dealPreliminar, true);
            if (!resultadoPdf) throw new Error("No se pudo generar el PDF para el envío.");
            const { pdfBase64, nombreArchivo } = resultadoPdf;
            const nombreVendedor = currentUser?.nombre || 'Equipo Comercial';
            const emailVendedor = currentUser?.email || 'ar_carrefourmedia@carrefour.com';
            const tituloAcuerdo = dealPreliminar.titulo || 'Propuesta Comercial';
            const res = await fetch('/api/enviar-acuerdo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    destinatario: emailDestino.trim(),
                    asunto: `Propuesta de Servicios Carrefour Media - ${tituloAcuerdo}`,
                    mensaje: `Hola ${clienteObj?.nombre || ''},\n\nAdjunto a este correo enviamos la propuesta de servicios para la campaña "${tituloAcuerdo}".\n\nQuedamos a disposición por cualquier consulta.\n\nSaludos cordiales,\n${nombreVendedor}\nEquipo de Carrefour Media.`,
                    pdfBase64: pdfBase64,
                    nombreArchivo: nombreArchivo,
                    remitenteNombre: nombreVendedor,
                    remitenteEmail: emailVendedor
                })
            });
            if (!res.ok) {
                const errData = await res.json().catch(()=>({}));
                throw new Error(errData.error || "Error al enviar el correo.");
            }
            alert("¡Acuerdo enviado exitosamente por correo electrónico!");
        } catch (error) {
            console.error("Error al enviar acuerdo:", error);
            alert(`Hubo un error al enviar el correo: ${error?.message || error}`);
        } finally{
            setEnviandoCorreo(false);
        }
    };
    const handleSaveDeal = async ()=>{
        const listaFinal = obtenerListaElementosConsolidada();
        if (!titulo.trim() || !clienteSeleccionado || listaFinal.length === 0) {
            alert("Faltan datos obligatorios o elementos para guardar el acuerdo.");
            return;
        }
        setGuardando(true);
        try {
            const todasFechasMillis = listaFinal.flatMap((i)=>[
                    i.fechaDesde ? new Date(`${i.fechaDesde}T12:00:00Z`).getTime() : null,
                    i.fechaHasta ? new Date(`${i.fechaHasta}T12:00:00Z`).getTime() : null
                ]).filter((t)=>t !== null && !isNaN(t));
            const fechaMinima = todasFechasMillis.length > 0 ? new Date(Math.min(...todasFechasMillis)).toISOString().split('T')[0] : dealAEditar?.fecha_desde || new Date().toISOString().split('T')[0];
            const fechaMaxima = todasFechasMillis.length > 0 ? new Date(Math.max(...todasFechasMillis)).toISOString().split('T')[0] : dealAEditar?.fecha_hasta || new Date().toISOString().split('T')[0];
            const tieneDigital = listaFinal.some((i)=>i.canal === 'Digital');
            const tieneInStore = listaFinal.some((i)=>i.canal === 'InStore');
            const canalPrincipal = tieneDigital && tieneInStore ? 'Omnicanal' : tieneDigital ? 'Digital' : 'InStore';
            const elementosProcesados = listaFinal.map((item)=>{
                const peso = totalConInflacion > 0 ? item.subtotal / totalConInflacion : 0;
                const porcionDescuentoGlobal = montoDescuentoGlobal * peso;
                const precioFinalProrrateado = Math.max(0, item.subtotal - porcionDescuentoGlobal);
                return {
                    ...item,
                    porcionDescuentoGlobal,
                    precioFinalProrrateado
                };
            });
            const todosLosAdjuntos = elementosProcesados.flatMap((item)=>(item.adjuntos || []).map((adj)=>({
                        ...adj,
                        catalogo_id: item.catalogoId,
                        elemento_nombre: item.nombre
                    })));
            const arrayInflacionMensual = listaMesesCampana.map((m)=>({
                    mesClave: m.mesClave,
                    nombre: m.nombre,
                    tasa: m.tasa
                }));
            const stageToSave = modo === 'EDIT' ? dealAEditar?.stage || 'OPORTUNIDAD' : origen === 'CRM' ? 'OPORTUNIDAD' : 'COTIZADO';
            const dealData = {
                titulo: titulo,
                amount: Math.round(totalFinal),
                channel: canalPrincipal,
                cliente_id: Number(clienteSeleccionado),
                auspiciante_id: auspicianteSeleccionado ? Number(auspicianteSeleccionado) : null,
                catalogo_id: Number(elementosProcesados[0].catalogoId),
                descuento_global_tipo: descuentoGlobalTipo,
                descuento_global_valor: descuentoGlobalValor,
                descuento_porcentaje: totalConInflacion > 0 ? Math.round(montoDescuentoGlobal / totalConInflacion * 100) : 0,
                tasa_inflacion: inflacionGlobalPromedio,
                inflacion_mensual: arrayInflacionMensual,
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deal_tiendas').insert(registrosTiendas);
            }
            onGuardadoExitoso();
        } catch (error) {
            console.error("Error al guardar acuerdo:", error);
            alert(`Error al guardar: ${error?.message || "Error al conectar con la base de datos"}`);
        } finally{
            setGuardando(false);
        }
    };
    const opcionesClientes = clientes.map((c)=>({
            id: c.id,
            label: c.nombre
        }));
    const opcionesCatalogo = catalogo.filter((c)=>c.canal === canal).map((c)=>({
            id: c.id,
            label: `${c.elemento} ($${c.precio_base.toLocaleString()}) - ${c.periodo || 'Mensual'}`
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
                        lineNumber: 656,
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
                            lineNumber: 657,
                            columnNumber: 101
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 657,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormularioAcuerdo.tsx",
                lineNumber: 655,
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
                                        lineNumber: 664,
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
                                                                lineNumber: 668,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: titulo,
                                                                onChange: (e)=>setTitulo(e.target.value),
                                                                className: "w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 669,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 667,
                                                        columnNumber: 17
                                                    }, this),
                                                    currentUser?.rol === 'JEFE_VENTAS' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                children: "Responsable / Vendedor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 673,
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
                                                                        lineNumber: 675,
                                                                        columnNumber: 42
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 674,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 672,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 666,
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
                                                                lineNumber: 682,
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
                                                                lineNumber: 683,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 681,
                                                        columnNumber: 17
                                                    }, this),
                                                    esAgencia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs font-semibold text-cyan-400 block mb-1",
                                                                children: "Anunciante Final"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 687,
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
                                                                lineNumber: 688,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 686,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 680,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 665,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-4 border-b border-white/10 pb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-cyan-400 font-semibold",
                                                children: "2. Configurar Espacios y Precios"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 698,
                                                columnNumber: 15
                                            }, this),
                                            idItemEnEdicion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded animate-pulse",
                                                children: "Modificando elemento en edición"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 700,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 697,
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
                                                                lineNumber: 708,
                                                                columnNumber: 79
                                                            }, this),
                                                            " Digital"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 708,
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
                                                                lineNumber: 709,
                                                                columnNumber: 79
                                                            }, this),
                                                            " InStore"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 709,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 707,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchableSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                options: opcionesCatalogo,
                                                value: elementoSeleccionado,
                                                onChange: setElementoSeleccionado,
                                                placeholder: `Buscar espacio ${canal}...`
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 712,
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
                                                                        lineNumber: 717,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "date",
                                                                        value: itemFechaDesde,
                                                                        onChange: (e)=>setItemFechaDesde(e.target.value),
                                                                        className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 717,
                                                                        columnNumber: 108
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 717,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-semibold text-slate-400 block mb-1",
                                                                        children: "Hasta *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 718,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "date",
                                                                        value: itemFechaHasta,
                                                                        onChange: (e)=>setItemFechaHasta(e.target.value),
                                                                        className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 718,
                                                                        columnNumber: 108
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 718,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 716,
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
                                                                    lineNumber: 723,
                                                                    columnNumber: 28
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    min: "1",
                                                                    value: cantidad,
                                                                    onChange: (e)=>setCantidad(Number(e.target.value)),
                                                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-amber-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                    lineNumber: 723,
                                                                    columnNumber: 119
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 723,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 722,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4 p-3 bg-slate-900 border border-slate-700 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[10px] font-bold text-slate-400 uppercase block mb-1",
                                                                        children: "Sobreprecio Base (Oculto)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 729,
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
                                                                                        lineNumber: 732,
                                                                                        columnNumber: 27
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: "$",
                                                                                        children: "$"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                        lineNumber: 733,
                                                                                        columnNumber: 27
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                lineNumber: 731,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: sobreprecioValor,
                                                                                onChange: (e)=>setSobreprecioValor(Number(e.target.value)),
                                                                                className: "w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-2 text-white text-sm focus:border-cyan-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                lineNumber: 735,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 730,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 728,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-[10px] font-bold text-slate-400 uppercase block mb-1",
                                                                        children: "Descuento al Ítem"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 739,
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
                                                                                        lineNumber: 742,
                                                                                        columnNumber: 27
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                        value: "$",
                                                                                        children: "$"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                        lineNumber: 743,
                                                                                        columnNumber: 27
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                lineNumber: 741,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: descuentoItemValor,
                                                                                onChange: (e)=>setDescuentoItemValor(Number(e.target.value)),
                                                                                className: "w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-2 text-white text-sm focus:border-cyan-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                                lineNumber: 745,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 740,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 738,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 715,
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
                                                        lineNumber: 754,
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
                                                                        lineNumber: 758,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-amber-400",
                                                                        children: t.numero
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 759,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    " ",
                                                                    t.nombre
                                                                ]
                                                            }, t.id, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 757,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 753,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 mt-4",
                                                children: [
                                                    idItemEnEdicion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: limpiarFormularioItem,
                                                        className: "px-4 bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 rounded py-2 text-sm font-semibold",
                                                        children: "Cancelar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 768,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: handleGuardarElemento,
                                                        disabled: !elementoSeleccionado,
                                                        className: "flex-1 bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-600/40 rounded py-2 text-sm font-bold disabled:opacity-40",
                                                        children: idItemEnEdicion ? "✓ Actualizar Elemento" : "+ Agregar Elemento a la Cotización"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 766,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 706,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 696,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 661,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-[400px] bg-slate-950 p-6 flex flex-col justify-between border-l border-white/10 overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-white mb-4 border-b border-white/10 pb-2",
                                        children: "Resumen Cotización"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 783,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-48 overflow-y-auto space-y-2 mb-4",
                                        children: listaConsolidada.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3 rounded border text-sm relative group transition-colors ${idItemEnEdicion === item.idUnico ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-800 border-slate-700'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-start pr-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-white text-xs leading-tight",
                                                                children: item.nombre
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 789,
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
                                                                lineNumber: 790,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 788,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-slate-400 mt-1",
                                                        children: [
                                                            item.fechaDesde,
                                                            " al ",
                                                            item.fechaHasta,
                                                            " (",
                                                            item.periodo,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 792,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-2 right-2 flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleEditarElemento(item),
                                                                title: "Editar este elemento",
                                                                className: "p-1 text-slate-400 hover:text-cyan-400 transition-colors",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "material-symbols-outlined text-sm",
                                                                    children: "edit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                    lineNumber: 801,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 795,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>eliminarElemento(item.idUnico),
                                                                title: "Eliminar elemento",
                                                                className: "p-1 text-slate-400 hover:text-rose-400 transition-colors",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "material-symbols-outlined text-sm",
                                                                    children: "close"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                    lineNumber: 809,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 803,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, item.idUnico, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 787,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 785,
                                        columnNumber: 13
                                    }, this),
                                    listaMesesCampana.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900 border border-slate-700 rounded-xl p-3 mb-4 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-bold text-amber-400 uppercase",
                                                        children: "Inflación Compuesta"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 819,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400 font-mono",
                                                        children: [
                                                            listaMesesCampana.length,
                                                            " meses"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 818,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-300",
                                                            children: "Promedio Mensual (%):"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 825,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "0.1",
                                                            value: inflacionGlobalPromedio,
                                                            onChange: (e)=>handleInflacionGlobalChange(Number(e.target.value)),
                                                            className: "w-20 bg-slate-950 border border-slate-700 rounded p-1 text-right text-xs text-white focus:border-amber-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 826,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                    lineNumber: 824,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 823,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: multiplesValoresInflacion,
                                                            onChange: (e)=>setMultiplesValoresInflacion(e.target.checked),
                                                            className: "rounded border-slate-600 bg-slate-950 text-amber-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 838,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Ingresar múltiples valores de inflación"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                            lineNumber: 844,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                    lineNumber: 837,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 836,
                                                columnNumber: 17
                                            }, this),
                                            multiplesValoresInflacion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 pt-2 border-t border-slate-800",
                                                children: listaMesesCampana.map((mes, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: [
                                                                    mes.nombre,
                                                                    " ",
                                                                    idx === 0 ? '(Mes Base)' : '',
                                                                    ":"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 25
                                                            }, this),
                                                            idx === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-500 font-mono font-bold",
                                                                children: "0% (Base)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 856,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        step: "0.1",
                                                                        value: tasasPorMes[mes.mesClave] !== undefined ? tasasPorMes[mes.mesClave] : inflacionGlobalPromedio,
                                                                        onChange: (e)=>handleTasaMesChange(mes.mesClave, Number(e.target.value)),
                                                                        className: "w-16 bg-slate-950 border border-slate-700 rounded p-1 text-right text-xs text-amber-300 focus:border-amber-400 font-mono"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 859,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-slate-500 text-[10px]",
                                                                        children: "%"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                        lineNumber: 866,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 858,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, mes.mesClave, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 851,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 849,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 817,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 782,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 pt-3 border-t border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400",
                                                children: "Subtotal Espacios:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 879,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-mono",
                                                children: [
                                                    "$",
                                                    subtotalPuroSinInflacion.toLocaleString(undefined, {
                                                        maximumFractionDigits: 0
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 880,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 878,
                                        columnNumber: 13
                                    }, this),
                                    montoImpactoInflacion > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center text-xs text-amber-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Impacto Inflación Acumulada:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 885,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono",
                                                children: [
                                                    "+$",
                                                    montoImpactoInflacion.toLocaleString(undefined, {
                                                        maximumFractionDigits: 0
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 886,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 884,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-900 p-2.5 rounded-lg border border-slate-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[10px] font-bold text-slate-400 uppercase block mb-1",
                                                children: "Descuento Global"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 891,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: descuentoGlobalTipo,
                                                        onChange: (e)=>setDescuentoGlobalTipo(e.target.value),
                                                        className: "bg-slate-800 border border-slate-700 rounded-l p-1.5 text-white text-xs focus:outline-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "%",
                                                                children: "%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 894,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "$",
                                                                children: "$"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                                lineNumber: 895,
                                                                columnNumber: 22
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 893,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: descuentoGlobalValor,
                                                        onChange: (e)=>setDescuentoGlobalValor(Number(e.target.value)),
                                                        className: "w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-1.5 text-white text-xs focus:border-cyan-400 text-right font-mono"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                        lineNumber: 897,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 892,
                                                columnNumber: 16
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 890,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-end bg-cyan-950/30 p-3 rounded-xl border border-cyan-500/50 shadow-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-semibold text-sm",
                                                children: "Total Final"
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 902,
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
                                                lineNumber: 903,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 901,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: generandoPdf || listaConsolidada.length === 0,
                                        onClick: handleDescargarPdfPreliminar,
                                        className: "w-full bg-slate-800 border border-cyan-500/40 text-cyan-400 hover:bg-slate-700 font-bold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2 mt-2 transition-colors disabled:opacity-40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm",
                                                children: generandoPdf ? 'hourglass_empty' : 'picture_as_pdf'
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 913,
                                                columnNumber: 15
                                            }, this),
                                            generandoPdf ? 'Generando borrador...' : 'Descargar Contrato PDF (Vista Previa)'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 907,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: enviandoCorreo || generandoPdf || listaConsolidada.length === 0,
                                        onClick: handleEnviarCorreo,
                                        className: "w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2 mt-1 transition-colors disabled:opacity-40 shadow-[0_0_15px_rgba(99,102,241,0.2)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm",
                                                children: enviandoCorreo ? 'hourglass_empty' : 'send'
                                            }, void 0, false, {
                                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                                lineNumber: 924,
                                                columnNumber: 15
                                            }, this),
                                            enviandoCorreo ? 'Enviando acuerdo...' : 'Enviar Acuerdo por Correo'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 918,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleSaveDeal,
                                        disabled: guardando,
                                        className: "w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold rounded-lg py-3 text-sm mt-1 transition-colors disabled:opacity-40",
                                        children: guardando ? "Guardando..." : "Guardar Cotización"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                                        lineNumber: 928,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FormularioAcuerdo.tsx",
                                lineNumber: 877,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormularioAcuerdo.tsx",
                        lineNumber: 781,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormularioAcuerdo.tsx",
                lineNumber: 660,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormularioAcuerdo.tsx",
        lineNumber: 654,
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
                lineNumber: 942,
                columnNumber: 108
            }, this),
            FormularioContent
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormularioAcuerdo.tsx",
        lineNumber: 942,
        columnNumber: 32
    }, this);
    return FormularioContent;
}
_s(FormularioAcuerdo, "1UkdjtOd9JlwVCttyw9uw2PDgk8=");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prorrateo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prorrateo.ts [app-client] (ecmascript)");
;
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
    const idCliente = deal.cliente?.numero_cliente || deal.cliente_id || '-';
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
    const yPos = 30;
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
            const precioBaseVisible = item.precioLista || item.subtotal || 0;
            sumaBaseTotal += precioBaseVisible;
            const ahorroTotalItem = (item.montoDescuentoItem || 0) + (item.porcionDescuentoGlobal || 0);
            sumaAhorroTotal += ahorroTotalItem;
            const precioFinalItem = item.precioFinalProrrateado !== undefined ? item.precioFinalProrrateado : precioBaseVisible - ahorroTotalItem;
            sumaFinalTotal += precioFinalItem;
            const strDescuento = precioFinalItem === 0 ? 'BONIFICADO' : `$${precioFinalItem.toLocaleString('es-AR', {
                maximumFractionDigits: 0
            })}`;
            const strAhorro = ahorroTotalItem > 0 ? `-$${ahorroTotalItem.toLocaleString('es-AR', {
                maximumFractionDigits: 0
            })}` : '-';
            const vigenciaTexto = item.fechaDesde && item.fechaHasta ? `${item.fechaDesde} al ${item.fechaHasta}` : deal.fecha_desde && deal.fecha_hasta ? `${deal.fecha_desde} al ${deal.fecha_hasta}` : '-';
            tableRows.push([
                item.nombre || 'Elemento',
                vigenciaTexto,
                item.cantidad || 1,
                item.tiendas?.length || (item.canal === 'InStore' ? '1' : '-'),
                `$${precioBaseVisible.toLocaleString('es-AR', {
                    maximumFractionDigits: 0
                })}`,
                strDescuento,
                strAhorro
            ]);
        });
    }
    tableRows.push([
        {
            content: 'SUBTOTAL ESPACIOS',
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
    const prorrateo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prorrateo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcularProrrateoDeal"])(deal);
    const sumaTotalConInflacion = prorrateo.reduce((acc, m)=>acc + m.montoConInflacion, 0);
    const totalMontoInflacion = Math.max(0, sumaTotalConInflacion - sumaBaseTotal);
    let resumenY = doc.lastAutoTable.finalY + 12;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal Espacios:`, 14, resumenY);
    doc.text(`$ ${sumaBaseTotal.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`, 160, resumenY, {
        align: 'right'
    });
    if (totalMontoInflacion > 0) {
        resumenY += 6;
        doc.text(`Ajuste por Inflación Acumulada:`, 14, resumenY);
        doc.text(`+$ ${totalMontoInflacion.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`, 160, resumenY, {
            align: 'right'
        });
    }
    if (sumaAhorroTotal > 0) {
        resumenY += 6;
        doc.text(`Ahorro Total por Descuentos / Bonificaciones:`, 14, resumenY);
        doc.text(`-$ ${sumaAhorroTotal.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`, 160, resumenY, {
            align: 'right'
        });
    }
    resumenY += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`MONTO TOTAL A FACTURAR (Sin IVA):`, 14, resumenY);
    doc.text(`$ ${deal.amount.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`, 160, resumenY, {
        align: 'right'
    });
    if (prorrateo.length > 1) {
        resumenY += 10;
        doc.setFontSize(8);
        doc.setFont("helvetica", "italic");
        const detalleMeses = prorrateo.map((m)=>`${m.nombreMes}: ${m.tasaInflacionMes}%`).join(' | ');
        doc.text(`Cronograma de Inflación mensual aplicada: ${detalleMeses}`, 14, resumenY);
    }
    // ANEXO II: ADJUNTOS
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
            if (adj.tipo && adj.tipo.includes('image')) {
                try {
                    const base64Data = await getBase64ImageFromUrl(adj.url);
                    doc.setFont("helvetica", "bold");
                    doc.text(`Adjunto ${i + 1} (${tipoLabel}): ${adj.nombre}`, 14, yAdj);
                    doc.setFont("helvetica", "normal");
                    yAdj += 6;
                    doc.addImage(base64Data, 'JPEG', 14, yAdj, 120, 70, undefined, 'FAST');
                    yAdj += 80;
                } catch  {
                    doc.text(`Adjunto ${i + 1}: ${adj.nombre}`, 14, yAdj);
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
    const nombreLimpio = nombreCliente.replace(/\s+/g, '_');
    const sufijoId = deal.id ? deal.id : 'Borrador';
    const nombreArchivoFinal = `Propuesta_${nombreLimpio}_${sufijoId}.pdf`;
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
"[project]/lib/prorrateo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calcularProrrateoDeal",
    ()=>calcularProrrateoDeal,
    "calcularProrrateoPorDias",
    ()=>calcularProrrateoPorDias,
    "formatearNombreMes",
    ()=>formatearNombreMes,
    "obtenerMesesRango",
    ()=>obtenerMesesRango
]);
const obtenerMesesRango = (desdeStr, hastaStr)=>{
    const meses = [];
    if (!desdeStr || !hastaStr) return meses;
    const inicio = new Date(`${desdeStr}T00:00:00`);
    const fin = new Date(`${hastaStr}T00:00:00`);
    if (isNaN(inicio.getTime()) || isNaN(fin.getTime()) || fin < inicio) return meses;
    const curr = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
    const finMes = new Date(fin.getFullYear(), fin.getMonth(), 1);
    while(curr <= finMes){
        const key = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}`;
        meses.push(key);
        curr.setMonth(curr.getMonth() + 1);
    }
    return meses;
};
const formatearNombreMes = (claveMes)=>{
    if (!claveMes) return "";
    const [anio, mes] = claveMes.split('-');
    const fechaObj = new Date(Number(anio), Number(mes) - 1, 1);
    const nombre = fechaObj.toLocaleDateString('es-AR', {
        month: 'long',
        year: 'numeric'
    });
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
};
const calcularProrrateoDeal = (deal)=>{
    if (!deal) return [];
    const elementos = deal.elementos_json || [];
    if (elementos.length === 0) return [];
    const fechasTodas = elementos.flatMap((i)=>[
            i.fechaDesde || deal.fecha_desde,
            i.fechaHasta || deal.fecha_hasta
        ]).filter((f)=>Boolean(f) && !isNaN(new Date(`${f}T00:00:00`).getTime()));
    if (fechasTodas.length === 0) return [];
    const fechaMin = fechasTodas.reduce((min, cur)=>cur < min ? cur : min);
    const fechaMax = fechasTodas.reduce((max, cur)=>cur > max ? cur : max);
    const mesesCronologicos = obtenerMesesRango(fechaMin, fechaMax);
    const inflacionConfig = {};
    const inflacionGuardada = deal.inflacion_mensual || [];
    if (Array.isArray(inflacionGuardada) && inflacionGuardada.length > 0) {
        inflacionGuardada.forEach((inf)=>{
            inflacionConfig[inf.mesClave] = Number(inf.tasa || 0);
        });
    }
    const factoresCompuestos = {};
    let factorAcumulado = 1.0;
    mesesCronologicos.forEach((mesKey, index)=>{
        if (index === 0) {
            factoresCompuestos[mesKey] = {
                tasa: 0,
                factor: 1.0
            };
        } else {
            const tasaMes = inflacionConfig[mesKey] !== undefined ? inflacionConfig[mesKey] : deal.tasa_inflacion || 0;
            factorAcumulado = factorAcumulado * (1 + tasaMes / 100);
            factoresCompuestos[mesKey] = {
                tasa: tasaMes,
                factor: factorAcumulado
            };
        }
    });
    const desgloseMeses = {};
    mesesCronologicos.forEach((m)=>{
        desgloseMeses[m] = {
            diasSet: new Set(),
            montoBase: 0
        };
    });
    elementos.forEach((item)=>{
        const fDesde = item.fechaDesde || deal.fecha_desde;
        const fHasta = item.fechaHasta || deal.fecha_hasta;
        if (!fDesde || !fHasta) return;
        const inicio = new Date(`${fDesde}T00:00:00`);
        const fin = new Date(`${fHasta}T00:00:00`);
        if (isNaN(inicio.getTime()) || isNaN(fin.getTime()) || fin < inicio) return;
        const cantTiendas = item.canal === 'InStore' && item.tiendas && item.tiendas.length > 0 ? item.tiendas.length : 1;
        const cantUnidades = item.cantidad || 1;
        const multiplicadorFisico = cantTiendas * cantUnidades;
        // Se toma el precio calculado del ítem sin duplicar el multiplicador físico
        const precioBaseElemento = item.precioLista !== undefined ? Number(item.precioLista) : Number(item.precioUnitario || item.precio_base || 0) * multiplicadorFisico;
        const periodo = item.periodo || 'Mensual';
        if (periodo === 'Único' || periodo === 'único' || periodo === 'Unico') {
            const mesInicioKey = `${inicio.getFullYear()}-${String(inicio.getMonth() + 1).padStart(2, '0')}`;
            if (desgloseMeses[mesInicioKey]) {
                desgloseMeses[mesInicioKey].montoBase += precioBaseElemento;
                desgloseMeses[mesInicioKey].diasSet.add(fDesde);
            }
        } else {
            const tarifaDiaria = periodo === 'Semanal' ? precioBaseElemento / 7 : precioBaseElemento / 30;
            const curr = new Date(inicio);
            while(curr <= fin){
                const keyMes = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}`;
                const keyDia = curr.toISOString().split('T')[0];
                if (desgloseMeses[keyMes]) {
                    desgloseMeses[keyMes].diasSet.add(keyDia);
                    desgloseMeses[keyMes].montoBase += tarifaDiaria;
                }
                curr.setDate(curr.getDate() + 1);
            }
        }
    });
    const montoFacturadoTotal = Number(deal.monto_facturado) || 0;
    const montoTotalAcuerdo = Number(deal.amount) || 1;
    const ratioFacturado = Math.min(1, Math.max(0, montoFacturadoTotal / montoTotalAcuerdo));
    return mesesCronologicos.map((mesClave)=>{
        const data = desgloseMeses[mesClave] || {
            diasSet: new Set(),
            montoBase: 0
        };
        const factorInfo = factoresCompuestos[mesClave] || {
            tasa: 0,
            factor: 1.0
        };
        const montoBaseMes = Math.round(data.montoBase * 100) / 100;
        const montoConInflacionMes = Math.round(montoBaseMes * factorInfo.factor * 100) / 100;
        const descuentoPrc = deal.descuento_porcentaje || 0;
        const totalMesFinal = Math.max(0, Math.round(montoConInflacionMes * (1 - descuentoPrc / 100) * 100) / 100);
        const facturadoMes = Math.round(totalMesFinal * ratioFacturado * 100) / 100;
        const pendienteMes = Math.round((totalMesFinal - facturadoMes) * 100) / 100;
        return {
            mesClave,
            nombreMes: formatearNombreMes(mesClave),
            diasActivos: data.diasSet.size,
            montoBase: montoBaseMes,
            tasaInflacionMes: factorInfo.tasa,
            factorInflacionAcumulado: factorInfo.factor,
            montoConInflacion: montoConInflacionMes,
            montoTotal: totalMesFinal,
            montoFacturado: facturadoMes,
            montoPendiente: pendienteMes
        };
    });
};
const calcularProrrateoPorDias = (fechaDesdeStr, fechaHastaStr, montoTotal = 0, montoFacturadoTotal = 0)=>{
    return calcularProrrateoDeal({
        id: 0,
        cliente_id: 0,
        catalogo_id: 0,
        amount: montoTotal,
        channel: 'Digital',
        stage: 'OPORTUNIDAD',
        descuento_porcentaje: 0,
        monto_facturado: montoFacturadoTotal,
        fecha_desde: fechaDesdeStr,
        fecha_hasta: fechaHastaStr,
        elementos_json: [
            {
                nombre: 'Campaña',
                periodo: 'Mensual',
                precioLista: montoTotal,
                fechaDesde: fechaDesdeStr,
                fechaHasta: fechaHastaStr,
                subtotal: montoTotal
            }
        ]
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=_1of6x9lr12eow._.js.map