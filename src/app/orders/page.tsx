"use client";
import { useCallback, useEffect, useState } from "react";
import { request } from "../../lib/api";
import { WarehouseBrand } from "../../components/brand";
import { money } from "../../shared/catalog";
type Summary = { id: string; number: string; created_at: string; customer_name: string; item_count: number; total: string; payment_status: string; fulfillment_status: string };
export default function WarehouseOrders() {
  const [orders, setOrders] = useState<Summary[]>([]), [error, setError] = useState(""), [busy, setBusy] = useState(true);
  const load = useCallback(async () => { setBusy(true); setError(""); try { setOrders(await request<Summary[]>("/api/warehouse/orders")); } catch(e) { setError((e as Error).message); } finally { setBusy(false); } }, []);
  useEffect(() => { void load(); }, [load]);
  return <main className="warehouse-orders"><WarehouseBrand/><a href="/" className="back-catalog">← Food catalog / staff sign-in</a><p className="eyebrow">CUSTOMER COMMERCE</p><div className="title-row"><div><h1>Prepared orders.</h1><p>Unpaid order summaries. All orders stay on hold until a payment gateway is connected.</p></div><button className="primary" disabled={busy} onClick={() => void load()}>Refresh orders</button></div>{error && <p className="alert" role="alert">{error} <a href="/">Open warehouse sign-in →</a></p>}<section className="catalog-panel"><div className="table-wrap" aria-busy={busy}><table><caption className="sr-only">Latest 100 prepared order summaries</caption><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Fulfillment</th></tr></thead><tbody>{orders.map(o => <tr key={o.id}><td><strong>{o.number}</strong><small>{new Date(o.created_at).toLocaleString("en-IN")}</small></td><td>{o.customer_name}</td><td>{o.item_count}</td><td>{money(o.total)}</td><td><span className="badge draft">{o.payment_status}</span></td><td>On hold</td></tr>)}</tbody></table>{busy ? <p className="empty" role="status">Loading orders…</p> : orders.length === 0 && <p className="empty">No prepared orders yet. Customer order summaries will appear here.</p>}</div></section><p className="warehouse-note">No stock is reserved or dispatched for unpaid bills. Product changes continue to be managed in the warehouse catalog.</p></main>;
}
