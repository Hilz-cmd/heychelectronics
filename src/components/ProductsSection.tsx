import React, { useState } from 'react';
import { ShoppingBag, Plus, Check, X, Minus, ArrowRight, Cpu } from 'lucide-react';
import lumineCoreImg from '../assets/images/product_lumine_core_node_1791486026734.jpg';
import neonePulseImg from '../assets/images/product_neone_pulse_dock_1791486039855.jpg';
import aetherFiberImg from '../assets/images/product_aether_fiber_bridge_1791486049720.jpg';
import chronosSyncImg from '../assets/images/product_chronos_sync_key_1791486059501.jpg';
import raydiantDisplayImg from '../assets/images/product_raydiant_display_hub_1791486069740.jpg';
import kinetixArrayImg from '../assets/images/product_kinetix_array_module_1791486079891.jpg';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'lumine-core-node',
    title: 'Lumine Core Node',
    description:
      'Dedicated local neural compute cube that synthesizes distributed workflow streams with zero cloud latency.',
    price: 890,
    image: lumineCoreImg,
  },
  {
    id: 'neone-pulse-dock',
    title: 'Neone Pulse Controller',
    description:
      'Precision-milled dark titanium desktop dial for real-time pipeline throttling, state scrubbing, and instant rollback.',
    price: 420,
    image: neonePulseImg,
  },
  {
    id: 'aether-fiber-bridge',
    title: 'Aether Optical Bridge',
    description:
      'Ultra-low-loss 100GbE fiber-optic ingestion switch with hardware-level schema normalization and packet tagging.',
    price: 640,
    image: aetherFiberImg,
  },
  {
    id: 'chronos-sync-key',
    title: 'Chronos Biometric Key',
    description:
      'Pocket-sized gunmetal cryptographic hardware key for zero-trust deployment signing and production gate approval.',
    price: 180,
    image: chronosSyncImg,
  },
  {
    id: 'raydiant-display-hub',
    title: 'Raydiant Horizon Display',
    description:
      'Frameless smoked-glass ambient desk display rendering live workflow health, throughput arcs, and anomaly alerts.',
    price: 540,
    image: raydiantDisplayImg,
  },
  {
    id: 'kinetix-array-module',
    title: 'Kinetix Neural Array',
    description:
      'Modular six-blade carbon-fiber processing cluster engineered for high-concurrency enterprise DAG execution.',
    price: 1490,
    image: kinetixArrayImg,
  },
];

export const ProductsSection: React.FC = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
  const subtotal = PRODUCTS.reduce(
    (sum, p) => sum + p.price * (cart[p.id] || 0),
    0
  );

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    setCheckoutSuccess(false);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1400);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[productId] || 0) + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: nextQty };
    });
  };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative z-20 w-full bg-[#030511] py-20 sm:py-28 px-4 sm:px-8 border-t border-[#6c8eff]/10"
    >
      {/* Ambient background glow behind product grid */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[420px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(65, 108, 235, 0.12) 0%, rgba(25, 45, 120, 0.04) 55%, transparent 80%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-[1220px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14">
          <div>
            <p className="text-xs font-medium tracking-[0.04em] text-[#8ba8ff] mb-2.5">
              Lumine Hardware Ecosystem
            </p>
            <h2
              id="products-heading"
              className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-white"
            >
              Engineered for <span className="text-lumine-gradient">Tactile Velocity</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="hidden md:block text-sm text-[#c8d6f5]/65 max-w-xs">
              Precision hardware modules that pair seamlessly with your NEONE workspace.
            </p>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="btn-neone-secondary inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-[#9cb5ff]" />
              <span>Bag</span>
              <span className="tabular-nums text-[#a8c1ff] font-semibold">
                ({totalItems})
              </span>
            </button>
          </div>
        </div>

        {/* Product Grid: 2 in a row for mobile view (grid-cols-2), 3 for desktop (lg:grid-cols-3), 6 products total */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((product) => {
            const isAdded = justAddedId === product.id;
            const hasImgError = imageErrors[product.id];

            return (
              <article
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group relative flex flex-col rounded-2xl bg-[#070b1e]/90 border border-[#6c8eff]/18 hover:border-[#8ba8ff]/45 transition-all duration-200 overflow-hidden cursor-pointer hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              >
                {/* Product Image Container (4:3 aspect ratio) */}
                <div className="relative w-full aspect-[4/3] bg-[#050816] overflow-hidden border-b border-[#6c8eff]/12">
                  {!hasImgError ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [product.id]: true }))
                      }
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                    />
                  ) : (
                    /* Resilient Fallback Container */
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0d1536] to-[#050816] text-[#8ba8ff]">
                      <Cpu className="w-8 h-8 mb-2 opacity-80" />
                      <span className="text-xs font-medium text-white/80 text-center">
                        {product.title}
                      </span>
                    </div>
                  )}

                  {/* Subtle bottom vignette for seamless transition into card body */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(7, 11, 30, 0.75) 0%, transparent 100%)',
                    }}
                  />
                </div>

                {/* Product Card Body: Title, Description, and Price */}
                <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-5 lg:p-6">
                  <div>
                    <h3 className="font-display text-sm sm:text-base lg:text-[17px] font-semibold text-white tracking-[-0.01em] group-hover:text-[#b8ceff] transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="mt-1.5 text-[11.5px] sm:text-[13px] leading-[1.55] text-[#c8d6f5]/68 line-clamp-2 sm:line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Quick-Add Row */}
                  <div className="mt-4 pt-3.5 border-t border-white/[0.07] flex items-center justify-between gap-2">
                    <span className="font-display text-sm sm:text-base lg:text-[17px] font-semibold text-white tabular-nums">
                      ${product.price.toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        isAdded
                          ? 'bg-[#6d8cf8]/25 text-[#c5d6ff] border border-[#8ba8ff]/50'
                          : 'bg-white/[0.07] hover:bg-white/[0.14] text-white/90 border border-white/10'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#a8c1ff]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#9cb5ff]" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Product Detail Quick-View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02040d]/80 backdrop-blur-md"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#090e24] border border-[#789aff]/30 shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer"
              aria-label="Close product detail"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/3] w-full bg-[#050816] overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-white">
                  {selectedProduct.title}
                </h3>
                <span className="font-display text-xl font-semibold text-[#a8c1ff] tabular-nums">
                  ${selectedProduct.price.toLocaleString()}
                </span>
              </div>
              <p className="mt-2.5 text-sm text-[#c8d6f5]/75 leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 btn-neone-primary py-3 rounded-xl text-sm font-semibold text-[#080c1a] cursor-pointer whitespace-nowrap"
                >
                  Add to Bag — ${selectedProduct.price.toLocaleString()}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="btn-neone-secondary px-4 py-3 rounded-xl text-sm font-medium text-white/80 cursor-pointer whitespace-nowrap"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Over Cart Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#02040d]/75 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="relative w-full max-w-md h-full bg-[#080d21] border-l border-[#789aff]/25 p-6 flex flex-col justify-between text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#9cb5ff]" />
                <h3 className="font-display text-base font-semibold">
                  Your NEONE Bag ({totalItems})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close bag"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {checkoutSuccess ? (
                <div className="my-12 p-6 rounded-2xl bg-[#10193a]/90 border border-[#7c9aff]/35 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#6d8cf8]/20 border border-[#8ba8ff]/40 flex items-center justify-center mx-auto mb-3 text-[#a8c1ff]">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-white">
                    Order #1084 Confirmed
                  </h4>
                  <p className="mt-1.5 text-xs text-[#c8d6f5]/75 leading-relaxed">
                    Your Lumine hardware modules are being provisioned and pre-linked to your workspace.
                  </p>
                </div>
              ) : totalItems === 0 ? (
                <div className="my-16 text-center text-sm text-[#c8d6f5]/50">
                  Your bag is currently empty. Select any product card to add hardware modules.
                </div>
              ) : (
                PRODUCTS.filter((p) => cart[p.id] > 0).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-[#0d1430]/80 border border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-12 rounded-lg object-cover bg-[#050816] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#a8c1ff] tabular-nums mt-0.5">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium tabular-nums w-4 text-center">
                        {cart[item.id]}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {totalItems > 0 && !checkoutSuccess && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#c8d6f5]/70">Subtotal</span>
                  <span className="font-display text-base font-semibold text-white tabular-nums">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutSuccess(true);
                    setCart({});
                  }}
                  className="w-full btn-neone-primary py-3 rounded-xl text-sm font-semibold text-[#080c1a] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Complete Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
