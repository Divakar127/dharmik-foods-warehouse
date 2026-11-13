export type Slide = { id: string; title: string; description: string; image_url: string; alt: string; href: string; link_label: string; enabled: boolean };
export type Homepage = { version: number; interval_seconds: number; banner_width?: number; banner_height?: number; slides: Slide[] };
export type DeliverySettings = { version: number; enabled: boolean; areas: { pincode: string; label: string; enabled: boolean }[] };
export type DeliveryCheck = { pincode: string; available: boolean; status: "available" | "unavailable" | "unconfigured"; area: string; message: string };
export type Dashboard = { timezone: string; daily: { date: string; orders: number; bill_value: string; paid_value: string }[]; today_orders: number; today_bill_value: string; today_paid_value: string; total_customers: number; unpaid_orders: number; active_carts: number; newsletter_subscribers: number; low_stock_products: number; out_of_stock_products: number };
export type Customers = { items: { id: string; name: string; email: string; phone: string; phone_verified: boolean; created_at: string; order_count: number }[]; total: number; page: number; page_size: number };
