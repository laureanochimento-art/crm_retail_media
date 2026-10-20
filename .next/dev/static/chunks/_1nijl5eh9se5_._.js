(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/facturacion/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FacturacionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prorrateo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prorrateo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function FacturacionPage() {
    _s();
    const [deals, setDeals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mesCierreSeleccionado, setMesCierreSeleccionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [soloActivasEnMes, setSoloActivasEnMes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [itemsCierre, setItemsCierre] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isModalCierreOpen, setIsModalCierreOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [guardandoCierre, setGuardandoCierre] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FacturacionPage.useEffect": ()=>{
            fetchDeals();
        }
    }["FacturacionPage.useEffect"], []);
    const fetchDeals = async ()=>{
        setLoading(true);
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deals').select(`
      *,
      cliente:clientes!cliente_id(*),
      catalogo:catalogo(*),
      vendedor:usuarios!vendedor_id(*)
    `).order('created_at', {
            ascending: false
        });
        if (data) {
            const formattedDeals = data.map((d)=>({
                    ...d,
                    monto_facturado: d.monto_facturado || (d.stage === 'FACTURADO' ? d.amount : 0)
                }));
            setDeals(formattedDeals);
            if (!mesCierreSeleccionado) {
                const hoy = new Date();
                const keyMesActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
                setMesCierreSeleccionado(keyMesActual);
            }
        } else if (error) {
            console.error(error);
        }
        setLoading(false);
    };
    const handleAjustarMontoFacturadoDirecto = async (deal)=>{
        const actual = deal.monto_facturado || 0;
        const nuevoMontoStr = window.prompt(`Reajustar acumulado facturado para "${deal.titulo}"\n(Contrato Total: $${deal.amount.toLocaleString()}):\n\nIngresa el nuevo acumulado total facturado:`, actual.toString());
        if (nuevoMontoStr === null) return;
        const nuevoMonto = parseFloat(nuevoMontoStr);
        if (isNaN(nuevoMonto) || nuevoMonto < 0) {
            alert("Por favor ingresa un monto numérico válido.");
            return;
        }
        let nuevaEtapa = deal.stage;
        if (nuevoMonto >= deal.amount) {
            nuevaEtapa = 'FACTURADO';
        } else if (nuevoMonto > 0) {
            nuevaEtapa = 'POR_FACTURAR';
        } else if (nuevoMonto === 0 && deal.stage === 'FACTURADO') {
            nuevaEtapa = 'POR_FACTURAR';
        }
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deals').update({
                monto_facturado: nuevoMonto,
                stage: nuevaEtapa
            }).eq('id', deal.id);
            if (error) throw error;
            alert(`Acumulado facturado ajustado a $${nuevoMonto.toLocaleString()}`);
            fetchDeals();
        } catch (err) {
            console.error("Error al reajustar facturación:", err);
            alert(`Error al guardar el ajuste: ${err.message}`);
        }
    };
    const prorrateoMensualGlobal = {};
    deals.filter((d)=>d.stage !== 'PERDIDO').forEach((deal)=>{
        const mFacturado = deal.monto_facturado || 0;
        const desglose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prorrateo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcularProrrateoPorDias"])(deal.fecha_desde, deal.fecha_hasta, deal.amount, mFacturado);
        desglose.forEach((item)=>{
            if (!prorrateoMensualGlobal[item.mesClave]) {
                prorrateoMensualGlobal[item.mesClave] = {
                    nombreMes: item.nombreMes,
                    total: 0,
                    facturado: 0,
                    pendiente: 0
                };
            }
            prorrateoMensualGlobal[item.mesClave].total += item.montoTotal;
            prorrateoMensualGlobal[item.mesClave].facturado += item.montoFacturado;
            prorrateoMensualGlobal[item.mesClave].pendiente += item.montoPendiente;
        });
    });
    const listaProyeccionMensual = Object.entries(prorrateoMensualGlobal).sort((a, b)=>a[0].localeCompare(b[0])).map(([clave, data])=>({
            clave,
            ...data
        }));
    // EXCLUYENDO RECLASIFICADOS DE LOS KPIs
    const totalContratado = deals.filter((d)=>d.stage !== 'PERDIDO' && !d.es_reclasificado).reduce((sum, d)=>sum + Number(d.amount), 0);
    const totalFacturadoReal = deals.filter((d)=>d.stage !== 'PERDIDO' && !d.es_reclasificado).reduce((sum, d)=>sum + Number(d.monto_facturado || 0), 0);
    const totalPendienteFacturar = Math.max(0, totalContratado - totalFacturadoReal);
    const obtenerNombreMesFormateado = (claveMes)=>{
        const item = listaProyeccionMensual.find((m)=>m.clave === claveMes);
        if (item) return item.nombreMes;
        if (!claveMes) return "";
        const [anio, mes] = claveMes.split('-');
        const fechaObj = new Date(Number(anio), Number(mes) - 1, 1);
        const nombre = fechaObj.toLocaleDateString('es-AR', {
            month: 'long',
            year: 'numeric'
        });
        return nombre.charAt(0).toUpperCase() + nombre.slice(1);
    };
    const hoyStr = new Date().toISOString().split('T')[0];
    const mesActualKey = hoyStr.substring(0, 7);
    const dealsConProrrateoDelMes = deals.filter((d)=>d.stage !== 'PERDIDO').map((deal)=>{
        const mFacturado = deal.monto_facturado || 0;
        const mPendiente = Math.max(0, deal.amount - mFacturado);
        const desglose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prorrateo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcularProrrateoPorDias"])(deal.fecha_desde, deal.fecha_hasta, deal.amount, mFacturado);
        const itemMes = desglose.find((m)=>m.mesClave === mesCierreSeleccionado);
        const montoProrrateadoMes = itemMes ? itemMes.montoTotal : 0;
        const montoFacturadoMes = itemMes ? itemMes.montoFacturado : 0;
        const esVencidoGlobal = !!(deal.fecha_hasta && deal.fecha_hasta < hoyStr && mPendiente > 0);
        const esMesVencido = mesCierreSeleccionado < mesActualKey && montoProrrateadoMes > 0 && montoFacturadoMes < montoProrrateadoMes;
        const esVencido = esVencidoGlobal || esMesVencido;
        return {
            ...deal,
            mFacturado,
            mPendiente,
            montoProrrateadoMes,
            esVencido,
            activaEnMesSeleccionado: montoProrrateadoMes > 0
        };
    });
    // EXCLUYENDO RECLASIFICADOS DE LA TABLA Y CIERRE DE MES
    const dealsTablaFiltrados = dealsConProrrateoDelMes.filter((deal)=>{
        if (deal.es_reclasificado) return false;
        if (soloActivasEnMes && !deal.activaEnMesSeleccionado && !deal.esVencido) return false;
        return true;
    });
    const handlePrepararCierreMes = ()=>{
        if (!mesCierreSeleccionado) return;
        const itemsProcesados = [];
        dealsConProrrateoDelMes.forEach((deal)=>{
            // Evitamos incluir acuerdos reclasificados en el cierre
            if (!deal.es_reclasificado && deal.mPendiente > 0 && (deal.montoProrrateadoMes > 0 || deal.esVencido)) {
                const sugMontoMes = Math.min(deal.mPendiente, deal.montoProrrateadoMes > 0 ? deal.montoProrrateadoMes : deal.mPendiente);
                itemsProcesados.push({
                    dealId: deal.id,
                    clienteNombre: deal.cliente?.nombre || 'Sin Cliente',
                    dealTitulo: deal.titulo,
                    canal: deal.channel || 'Digital',
                    montoTotalAcuerdo: deal.amount,
                    montoFacturadoActual: deal.mFacturado,
                    montoPendienteGlobal: deal.mPendiente,
                    montoProrrateadoMes: deal.montoProrrateadoMes,
                    montoAFacturarEditado: sugMontoMes,
                    seleccionado: true,
                    esVencido: deal.esVencido
                });
            }
        });
        if (itemsProcesados.length === 0) {
            alert(`No hay acuerdos pendientes para liquidar en ${obtenerNombreMesFormateado(mesCierreSeleccionado)}.`);
            return;
        }
        setItemsCierre(itemsProcesados);
        setIsModalCierreOpen(true);
    };
    const handleToggleSeleccion = (dealId)=>{
        setItemsCierre((prev)=>prev.map((item)=>item.dealId === dealId ? {
                    ...item,
                    seleccionado: !item.seleccionado
                } : item));
    };
    const handleEditMontoFacturar = (dealId, nuevoValor)=>{
        setItemsCierre((prev)=>prev.map((item)=>item.dealId === dealId ? {
                    ...item,
                    montoAFacturarEditado: Math.max(0, nuevoValor)
                } : item));
    };
    const handleToggleSeleccionarTodos = (marcar)=>{
        setItemsCierre((prev)=>prev.map((item)=>({
                    ...item,
                    seleccionado: marcar
                })));
    };
    const generarExcel = (seleccionados)=>{
        const [year, month] = mesCierreSeleccionado.split('-');
        const shortYear = year.slice(-2);
        const nombreMesYAnio = obtenerNombreMesFormateado(mesCierreSeleccionado);
        const asignacionCounter = {};
        const excelData = [
            [
                '',
                `FACTURAS ${nombreMesYAnio} (v.1)`
            ],
            [],
            [
                '',
                'Cliente',
                'Nro de Proveedor',
                'Leyenda',
                'Importe',
                'Asignacion',
                'Material',
                'centro de costo',
                '',
                'FECHA DE FACTURACIÓN',
                'FACTURA',
                'OREDEN DE COMPRA',
                'OC',
                'FACTURACION TOTAL',
                'IIBB'
            ]
        ];
        seleccionados.forEach((item)=>{
            if (!asignacionCounter[item.clienteNombre]) {
                asignacionCounter[item.clienteNombre] = 1;
            } else {
                asignacionCounter[item.clienteNombre]++;
            }
            const asignacion = asignacionCounter[item.clienteNombre];
            const leyenda = `RM-${item.canal}-${month}-${shortYear}`;
            const esDigital = item.canal === 'Digital' || item.canal === 'Omnicanal';
            const material = esDigital ? 703 : '';
            const cdc = esDigital ? 9940 : '';
            excelData.push([
                '',
                item.clienteNombre,
                '',
                leyenda,
                item.montoAFacturarEditado,
                asignacion,
                material,
                cdc,
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ]);
        });
        const ws = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].aoa_to_sheet(excelData);
        ws['!cols'] = [
            {
                wch: 3
            },
            {
                wch: 35
            },
            {
                wch: 18
            },
            {
                wch: 30
            },
            {
                wch: 15
            },
            {
                wch: 12
            },
            {
                wch: 10
            },
            {
                wch: 18
            },
            {
                wch: 5
            },
            {
                wch: 22
            },
            {
                wch: 15
            },
            {
                wch: 22
            },
            {
                wch: 10
            },
            {
                wch: 22
            },
            {
                wch: 10
            }
        ];
        const wb = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(wb, ws, `Cierre_${month}_${shortYear}`);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeFile"](wb, `Lote_Facturacion_${month}_${year}.xlsx`);
    };
    const handleConfirmarCierreMes = async ()=>{
        const seleccionados = itemsCierre.filter((i)=>i.seleccionado && i.montoAFacturarEditado > 0);
        if (seleccionados.length === 0) {
            alert("Selecciona al menos un acuerdo con un monto mayor a 0 para facturar.");
            return;
        }
        setGuardandoCierre(true);
        try {
            for (const item of seleccionados){
                const nuevoMontoFacturado = item.montoFacturadoActual + item.montoAFacturarEditado;
                let nuevaEtapa = 'POR_FACTURAR';
                if (nuevoMontoFacturado >= item.montoTotalAcuerdo) {
                    nuevaEtapa = 'FACTURADO';
                }
                const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('deals').update({
                    monto_facturado: nuevoMontoFacturado,
                    stage: nuevaEtapa
                }).eq('id', item.dealId);
                if (error) throw error;
            }
            generarExcel(seleccionados);
            alert(`¡Cierre de mes procesado exitosamente! Se actualizaron ${seleccionados.length} acuerdos y se descargó el Excel.`);
            setIsModalCierreOpen(false);
            fetchDeals();
        } catch (error) {
            console.error("Error al procesar cierre masivo:", error);
            alert(`Hubo un error al guardar el cierre de mes: ${error.message}`);
        } finally{
            setGuardandoCierre(false);
        }
    };
    const totalProcesandoEnModal = itemsCierre.filter((i)=>i.seleccionado).reduce((acc, i)=>acc + (Number(i.montoAFacturarEditado) || 0), 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full flex flex-col gap-6 p-8 text-white overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold tracking-tight",
                        children: "Módulo de Facturación"
                    }, void 0, false, {
                        fileName: "[project]/app/facturacion/page.tsx",
                        lineNumber: 371,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400 text-sm mt-1",
                        children: "Cierre de mes loteado, prorrateos y control de mora/vencimientos."
                    }, void 0, false, {
                        fileName: "[project]/app/facturacion/page.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/facturacion/page.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-cyan-400 font-semibold animate-pulse",
                    children: "Sincronizando estado financiero..."
                }, void 0, false, {
                    fileName: "[project]/app/facturacion/page.tsx",
                    lineNumber: 377,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/facturacion/page.tsx",
                lineNumber: 376,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-6 animate-fade-in",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1",
                                        children: "Monto Total Contratado"
                                    }, void 0, false, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-3xl font-extrabold text-white",
                                        children: [
                                            "$",
                                            totalContratado.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1",
                                        children: "Total Facturado Emitido"
                                    }, void 0, false, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-3xl font-extrabold text-emerald-400",
                                        children: [
                                            "$",
                                            totalFacturadoReal.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 387,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1",
                                        children: "Pendiente General por Facturar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-3xl font-extrabold text-amber-400",
                                        children: [
                                            "$",
                                            totalPendienteFacturar.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 394,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/facturacion/page.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-700 pb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-emerald-400 text-3xl",
                                                children: "fact_check"
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 401,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-bold text-white",
                                                        children: "Liquidación de Cierre de Mes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 403,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-400",
                                                        children: "Selecciona el período contable para liquidar por lote."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: mesCierreSeleccionado,
                                                onChange: (e)=>setMesCierreSeleccionado(e.target.value),
                                                className: "bg-slate-950 border border-slate-700 text-white text-sm font-semibold rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-400",
                                                children: listaProyeccionMensual.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: m.clave,
                                                        children: [
                                                            m.nombreMes,
                                                            " (Pendiente: $",
                                                            m.pendiente.toLocaleString(),
                                                            ")"
                                                        ]
                                                    }, m.clave, true, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 409,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handlePrepararCierreMes,
                                                className: "bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.2)] text-sm cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: "receipt_long"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 425,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Ejecutar Cierre de Mes"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 421,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 399,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-4 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: soloActivasEnMes,
                                                onChange: (e)=>setSoloActivasEnMes(e.target.checked),
                                                className: "rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Ver solo campañas activas/vencidas en ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-cyan-400",
                                                        children: obtenerNombreMesFormateado(mesCierreSeleccionado)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 61
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400 font-mono",
                                        children: [
                                            "Mostrando ",
                                            dealsTablaFiltrados.length,
                                            " acuerdos"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 441,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 431,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left text-sm text-slate-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "text-xs text-slate-400 uppercase bg-slate-800/50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 rounded-tl-lg",
                                                        children: "Cliente / Campaña"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3",
                                                        children: "Vigencia"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-right",
                                                        children: "Contrato Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-right text-cyan-400 bg-cyan-950/30",
                                                        children: [
                                                            "Prorrateo ",
                                                            obtenerNombreMesFormateado(mesCierreSeleccionado)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-right",
                                                        children: "Acumulado Facturado"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-right",
                                                        children: "Pendiente Global"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-center",
                                                        children: "Estado / Avance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-center rounded-tr-lg",
                                                        children: "Acción"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/facturacion/page.tsx",
                                            lineNumber: 448,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: dealsTablaFiltrados.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 8,
                                                    className: "px-4 py-6 text-center text-slate-500 text-xs italic",
                                                    children: [
                                                        "No hay campañas registradas con días activos o pendientes para ",
                                                        obtenerNombreMesFormateado(mesCierreSeleccionado),
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/facturacion/page.tsx",
                                                    lineNumber: 463,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 21
                                            }, this) : dealsTablaFiltrados.map((deal)=>{
                                                const pct = deal.amount > 0 ? Math.min(100, Math.round(deal.mFacturado / deal.amount * 100)) : 0;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: `border-b border-slate-700 transition-colors ${deal.esVencido ? 'bg-rose-950/20 border-l-4 border-l-rose-500 hover:bg-rose-900/30' : 'hover:bg-slate-800/50'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-bold text-white block",
                                                                    children: deal.cliente?.nombre
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/facturacion/page.tsx",
                                                                    lineNumber: 481,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: deal.titulo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/facturacion/page.tsx",
                                                                    lineNumber: 482,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 480,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-xs",
                                                            children: [
                                                                deal.fecha_desde,
                                                                " al ",
                                                                deal.fecha_hasta
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 484,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 font-mono text-right text-white",
                                                            children: [
                                                                "$",
                                                                deal.amount.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 485,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 font-mono text-right font-bold text-cyan-400 bg-cyan-950/20",
                                                            children: [
                                                                "$",
                                                                deal.montoProrrateadoMes.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 486,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 font-mono text-right text-emerald-400 font-semibold",
                                                            children: [
                                                                "$",
                                                                deal.mFacturado.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 489,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: `px-4 py-3 font-mono text-right font-semibold ${deal.esVencido ? 'text-rose-400 font-extrabold' : 'text-amber-400'}`,
                                                            children: [
                                                                "$",
                                                                deal.mPendiente.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 491,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-center",
                                                            children: deal.esVencido ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-block bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm",
                                                                children: "⚠️ Pendiente Vencido"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/facturacion/page.tsx",
                                                                lineNumber: 497,
                                                                columnNumber: 31
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-16 bg-slate-800 rounded-full h-2 overflow-hidden",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "bg-emerald-400 h-2 rounded-full",
                                                                            style: {
                                                                                width: `${pct}%`
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                                            lineNumber: 503,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                                        lineNumber: 502,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold text-slate-300",
                                                                        children: [
                                                                            pct,
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                                        lineNumber: 505,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/facturacion/page.tsx",
                                                                lineNumber: 501,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleAjustarMontoFacturadoDirecto(deal),
                                                                className: "bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 border border-slate-600 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded transition-all flex items-center gap-1 mx-auto",
                                                                title: "Ajustar manualmente el acumulado facturado",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-symbols-outlined text-xs",
                                                                        children: "edit_note"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                                        lineNumber: 516,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    "Ajustar"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/facturacion/page.tsx",
                                                                lineNumber: 511,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 510,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, deal.id, true, {
                                                    fileName: "[project]/app/facturacion/page.tsx",
                                                    lineNumber: 472,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/facturacion/page.tsx",
                                            lineNumber: 460,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/facturacion/page.tsx",
                                    lineNumber: 447,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 446,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/facturacion/page.tsx",
                        lineNumber: 398,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/facturacion/page.tsx",
                lineNumber: 380,
                columnNumber: 9
            }, this),
            isModalCierreOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/80 backdrop-blur-sm",
                        onClick: ()=>setIsModalCierreOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/app/facturacion/page.tsx",
                        lineNumber: 533,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-900 border border-white/20 rounded-xl shadow-2xl w-full max-w-5xl relative max-h-[90vh] flex flex-col overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center p-6 border-b border-white/10 bg-slate-950",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-xl text-white flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-emerald-400",
                                                        children: "task"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 539,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Confirmación de Cierre: ",
                                                    obtenerNombreMesFormateado(mesCierreSeleccionado)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 538,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400 mt-1",
                                                children: "Revisa, edita o desmarca los montos a facturar para este período."
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 542,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsModalCierreOpen(false),
                                        className: "text-slate-400 hover:text-white",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 547,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 536,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-800/80 px-6 py-2.5 border-b border-slate-700 flex justify-between items-center text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleToggleSeleccionarTodos(true),
                                                className: "text-cyan-400 hover:underline font-bold",
                                                children: "Seleccionar Todos"
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 552,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-600",
                                                children: "|"
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 558,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleToggleSeleccionarTodos(false),
                                                className: "text-slate-400 hover:underline",
                                                children: "Desmarcar Todos"
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 559,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400 font-mono",
                                        children: [
                                            itemsCierre.filter((i)=>i.seleccionado).length,
                                            " de ",
                                            itemsCierre.length,
                                            " acuerdos seleccionados"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 566,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 550,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto p-6 space-y-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left text-sm text-slate-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "text-xs text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "p-3 w-10 text-center",
                                                        children: "Incluir"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "p-3",
                                                        children: "Cliente / Acuerdo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 576,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "p-3 text-right",
                                                        children: "Contrato Total"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 577,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "p-3 text-right",
                                                        children: "Facturado Previo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 578,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "p-3 text-right",
                                                        children: "Sugerido Prorrateo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "p-3 text-center w-48",
                                                        children: "Monto a Facturar hoy ($)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 574,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/facturacion/page.tsx",
                                            lineNumber: 573,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: itemsCierre.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: `border-b border-slate-800 transition-colors ${!item.seleccionado ? 'opacity-40 bg-slate-950' : item.esVencido ? 'bg-rose-950/30 border-l-4 border-l-rose-500' : 'bg-slate-800/40 hover:bg-slate-800/70'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-3 text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: item.seleccionado,
                                                                onChange: ()=>handleToggleSeleccion(item.dealId),
                                                                className: "w-4 h-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/facturacion/page.tsx",
                                                                lineNumber: 596,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 595,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold text-white block",
                                                                            children: item.clienteNombre
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                                            lineNumber: 606,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        item.esVencido && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[9px] bg-rose-500/20 text-rose-400 font-bold px-1.5 py-0.2 rounded border border-rose-500/30",
                                                                            children: "Vencido"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                                            lineNumber: 608,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/facturacion/page.tsx",
                                                                    lineNumber: 605,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-slate-400",
                                                                    children: item.dealTitulo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/facturacion/page.tsx",
                                                                    lineNumber: 613,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 604,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-3 text-right font-mono text-slate-400",
                                                            children: [
                                                                "$",
                                                                item.montoTotalAcuerdo.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 616,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-3 text-right font-mono text-emerald-400",
                                                            children: [
                                                                "$",
                                                                item.montoFacturadoActual.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 617,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-3 text-right font-mono text-cyan-400",
                                                            children: [
                                                                "$",
                                                                item.montoProrrateadoMes.toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 618,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "p-3 text-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "0",
                                                                step: "0.01",
                                                                disabled: !item.seleccionado,
                                                                value: item.montoAFacturarEditado,
                                                                onChange: (e)=>handleEditMontoFacturar(item.dealId, parseFloat(e.target.value) || 0),
                                                                className: "w-full bg-slate-950 border border-slate-700 rounded p-2 text-right font-bold text-emerald-400 text-sm focus:outline-none focus:border-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/facturacion/page.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/facturacion/page.tsx",
                                                            lineNumber: 620,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, item.dealId, true, {
                                                    fileName: "[project]/app/facturacion/page.tsx",
                                                    lineNumber: 585,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/facturacion/page.tsx",
                                            lineNumber: 583,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/facturacion/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-t border-white/10 bg-slate-950 flex flex-col md:flex-row justify-between items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs uppercase font-bold text-slate-400",
                                                children: "Total Lote A Facturar:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 639,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold text-emerald-400 font-mono",
                                                children: [
                                                    "$",
                                                    totalProcesandoEnModal.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 640,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 638,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 w-full md:w-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setIsModalCierreOpen(false),
                                                className: "flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold",
                                                children: "Cancelar"
                                            }, void 0, false, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 646,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                disabled: guardandoCierre || totalProcesandoEnModal === 0,
                                                onClick: handleConfirmarCierreMes,
                                                className: "flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-2.5 rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-sm",
                                                        children: "check_circle"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/facturacion/page.tsx",
                                                        lineNumber: 660,
                                                        columnNumber: 19
                                                    }, this),
                                                    guardandoCierre ? "Procesando Lote..." : "Confirmar y Descargar Excel"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/facturacion/page.tsx",
                                                lineNumber: 654,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/facturacion/page.tsx",
                                        lineNumber: 645,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/facturacion/page.tsx",
                                lineNumber: 637,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/facturacion/page.tsx",
                        lineNumber: 535,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/facturacion/page.tsx",
                lineNumber: 532,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/facturacion/page.tsx",
        lineNumber: 369,
        columnNumber: 5
    }, this);
}
_s(FacturacionPage, "Sf4jo8OV70u5h+AdNtMNeAcWs6Q=");
_c = FacturacionPage;
var _c;
__turbopack_context__.k.register(_c, "FacturacionPage");
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

//# sourceMappingURL=_1nijl5eh9se5_._.js.map