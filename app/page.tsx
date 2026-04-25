import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, Trash2, X, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LOGO = "/mnt/data/logo ness(1).jpg";

const products = [
  { id: "top-lara", name: "Top Lara", category: "Tops", price: 139, image: "/mnt/data/ness_assets/top_lara.jpg", sizes: ["P", "M", "G", "GG"], desc: "Top minimalista em tecido canelado, com sustentação e visual clean." },
  { id: "top-bella", name: "Top Bella", category: "Tops", price: 139, image: "/mnt/data/ness_assets/top_bella.jpg", sizes: ["P", "M", "G"], desc: "Top versátil para treino e rotina, com estética leve e feminina." },
  { id: "top-lume", name: "Top Lume", category: "Tops", price: 159, image: "/mnt/data/ness_assets/top_lume.jpg", sizes: ["P", "M", "G"], desc: "Top premium com conforto, compressão e presença sofisticada." },
  { id: "legging-basic", name: "Legging Basic", category: "Legging", price: 219, image: "/mnt/data/ness_assets/legging_basic.jpg", sizes: ["P", "M", "G", "GG"], desc: "Legging essencial com caimento confortável e acabamento premium." },
  { id: "short-basic", name: "Short Basic", category: "Short", price: 179, image: "/mnt/data/ness_assets/short_basic.jpg", sizes: ["P", "M", "G"], desc: "Short meia coxa, prático e elegante para movimentos livres." },
  { id: "macacao-long", name: "Macacão Long", category: "Macacão", price: 359, image: "/mnt/data/ness_assets/macacao_long.jpg", sizes: ["P", "M", "G"], desc: "Peça única com presença, conforto e visual sofisticado." },
  { id: "blusa-flow", name: "Blusa Flow", category: "Blusa", price: 149, image: "/mnt/data/ness_assets/blusa_flow.jpg", sizes: ["Único"], desc: "Blusa leve para sobreposição, feita para transitar entre treino e lifestyle." },
];

const categories = ["Todos", "Tops", "Legging", "Short", "Macacão", "Blusa"];
const WHATSAPP_NUMBER = "5511999999999"; // Troque pelo WhatsApp oficial da NESS WEAR, com DDI e DDD.

function currency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function NessWearStore() {
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => (
    category === "Todos" ? products : products.filter((p) => p.category === category)
  ), [category]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product) {
    const size = selectedSizes[product.id] || product.sizes[0];
    const key = `${product.id}-${size}`;
    setCart((current) => {
      const found = current.find((item) => item.key === key);
      if (found) return current.map((item) => item.key === key ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { key, id: product.id, name: product.name, price: product.price, size, qty: 1 }];
    });
    setCartOpen(true);
  }

  function changeQty(key, delta) {
    setCart((current) => current.map((item) => item.key === key ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  }

  function removeItem(key) {
    setCart((current) => current.filter((item) => item.key !== key));
  }

  function whatsappLink() {
    const lines = [
      "Olá, NESS WEAR! Quero fazer um pedido:",
      "",
      ...cart.map((item) => `• ${item.qty}x ${item.name} | Tam. ${item.size} | ${currency(item.price * item.qty)}`),
      "",
      `Total: ${currency(total)}`,
      "",
      "Pode me confirmar disponibilidade, cores e formas de pagamento?"
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <div className="min-h-screen bg-[#f6efe8] text-[#151313]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6efe8]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#home" className="flex items-center gap-3">
            <img src={LOGO} alt="NESS WEAR" className="h-10 w-auto rounded-sm" />
          </a>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.22em] text-black/65 md:flex">
            <a href="#lookbook">Lookbook</a>
            <a href="#loja">Loja</a>
            <a href="#tamanhos">Tamanhos</a>
            <a href="#conceito">Conceito</a>
          </nav>
          <button onClick={() => setCartOpen(true)} className="relative rounded-full bg-black px-5 py-3 text-xs uppercase tracking-[0.18em] text-white">
            Carrinho
            {cart.length > 0 && <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[#cdb49d] text-xs text-black">{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </button>
        </div>
      </header>

      <section id="home" className="grid min-h-[86vh] md:grid-cols-2">
        <div className="flex items-center justify-center bg-black p-8">
          <motion.img initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} src={LOGO} alt="Logo NESS WEAR" className="w-full max-w-md" />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 md:px-20">
          <p className="mb-7 text-xs uppercase tracking-[0.35em] text-black/45">Primeiro drop</p>
          <h1 className="max-w-xl text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
            Para mulheres reais, em movimento.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-black/65">
            NESS WEAR é sobre leveza, movimento e confiança. Peças que acompanham seu corpo, sua rotina e sua melhor versão — todos os dias.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#loja" className="rounded-full bg-black px-8 py-4 text-center text-sm uppercase tracking-[0.2em] text-white">Comprar o drop</a>
            <a href="#lookbook" className="rounded-full border border-black/20 px-8 py-4 text-center text-sm uppercase tracking-[0.2em]">Ver lookbook</a>
          </div>
        </div>
      </section>

      <section id="conceito" className="bg-[#151313] px-6 py-20 text-center text-white">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/45">Conceito da marca</p>
        <h2 className="mx-auto max-w-4xl text-3xl font-light leading-tight md:text-5xl">
          Mais que roupa, é sobre como você se sente quando se escolhe.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-white/62">
          NESS WEAR veste mulheres que buscam leveza e performance com estilo. Do treino ao dia a dia, nossas peças transitam com naturalidade e elevam a autoestima.
        </p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-4">
          {[
            ["Movimento", "que transforma"],
            ["Leveza", "que acompanha"],
            ["Confiança", "que impulsiona"],
            ["Equilíbrio", "que completa"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.18em]">{title}</p>
              <p className="mt-2 text-sm text-white/45">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="lookbook" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-black/45">Lookbook</p>
            <h2 className="text-4xl font-light md:text-5xl">O primeiro estoque da NESS</h2>
          </div>
          <p className="max-w-md text-black/60">Modelos selecionados para uma loja fitness premium, com estética clean e peças de alta circulação.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {products.slice(0, 4).map((p, idx) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: idx * 0.06 }} className="group overflow-hidden rounded-[2rem] bg-white shadow-sm">
              <img src={p.image} alt={p.name} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-black/40">{p.category}</p>
                <h3 className="mt-2 text-xl font-medium">{p.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="loja" className="bg-white px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-black/45">Loja</p>
              <h2 className="text-4xl font-light md:text-5xl">Escolha suas peças</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={`rounded-full px-4 py-2 text-sm transition ${category === cat ? "bg-black text-white" : "bg-[#f6efe8] text-black/65 hover:bg-[#eaded2]"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden rounded-[2rem] border-black/5 bg-[#fbf8f5] shadow-sm">
                <div className="relative overflow-hidden bg-[#eee5dc]">
                  <img src={product.image} alt={product.name} className="h-72 w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1 text-xs text-white backdrop-blur">{product.category}</span>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-medium">{product.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-black/55">{product.desc}</p>
                  <p className="mt-4 text-2xl font-medium">{currency(product.price)}</p>

                  <div className="mt-5">
                    <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-black/45"><Ruler size={14} /> Tamanho</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button key={size} onClick={() => setSelectedSizes((s) => ({ ...s, [product.id]: size }))} className={`min-w-10 rounded-full border px-3 py-2 text-sm ${(selectedSizes[product.id] || product.sizes[0]) === size ? "border-black bg-black text-white" : "border-black/15 bg-white text-black/70"}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={() => addToCart(product)} className="mt-5 w-full rounded-full bg-black py-6 text-white hover:bg-[#2a2623]">
                    <ShoppingBag className="mr-2" size={18} /> Adicionar ao pedido
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="tamanhos" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 rounded-[2rem] bg-[#151313] p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/45">Guia rápido</p>
            <h2 className="text-3xl font-light">Escolha o tamanho com mais segurança</h2>
            <p className="mt-5 text-white/60">As peças trabalham com grade P, M, G e algumas opções GG. Para a Blusa Flow, o tamanho é único.</p>
          </div>
          <div className="grid gap-3 text-sm">
            {[
              ["Leggings e shorts", "P 34–36 • M 38–40 • G 42–44 • GG 46–48"],
              ["Tops", "P 40–42 • M 42–44 • G 46–48 • GG 50–52"],
              ["Blusa Flow", "Tamanho único"],
            ].map(([a,b]) => (
              <div key={a} className="rounded-2xl bg-white/8 p-4">
                <p className="font-medium">{a}</p>
                <p className="mt-1 text-white/55">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black px-5 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <img src={LOGO} alt="NESS WEAR" className="h-16 w-auto" />
            <p className="mt-4 text-white/45">Move your way.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={cart.length ? whatsappLink() : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, NESS WEAR! Quero conhecer o primeiro drop.")}`} target="_blank" rel="noreferrer" className="rounded-full bg-white px-7 py-4 text-center text-sm uppercase tracking-[0.18em] text-black">
              Comprar pelo WhatsApp
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-7 py-4 text-center text-sm uppercase tracking-[0.18em] text-white/85">
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
          <motion.aside initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} transition={{ type: "spring", damping: 28, stiffness: 260 }} onClick={(e) => e.stopPropagation()} className="ml-auto flex h-full w-full max-w-md flex-col bg-[#f6efe8] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-black/45">Pedido</p>
                <h3 className="text-2xl font-light">Seu carrinho</h3>
              </div>
              <button onClick={() => setCartOpen(false)} className="rounded-full bg-white p-3"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-auto p-5">
              {cart.length === 0 ? (
                <div className="grid h-full place-items-center text-center text-black/55">
                  <div>
                    <ShoppingBag className="mx-auto mb-4" />
                    <p>Seu pedido ainda está vazio.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.key} className="rounded-3xl bg-white p-4">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="mt-1 text-sm text-black/50">Tamanho {item.size} • {currency(item.price)}</p>
                        </div>
                        <button onClick={() => removeItem(item.key)} className="text-black/40 hover:text-black"><Trash2 size={18} /></button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full bg-[#f6efe8] p-1">
                          <button onClick={() => changeQty(item.key, -1)} className="rounded-full bg-white p-2"><Minus size={14} /></button>
                          <span className="w-8 text-center">{item.qty}</span>
                          <button onClick={() => changeQty(item.key, 1)} className="rounded-full bg-white p-2"><Plus size={14} /></button>
                        </div>
                        <p className="font-medium">{currency(item.qty * item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-black/10 p-5">
              <div className="mb-4 flex justify-between text-lg">
                <span>Total</span>
                <strong>{currency(total)}</strong>
              </div>
              <a href={cart.length ? whatsappLink() : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, NESS WEAR! Quero fazer um pedido.")}`} target="_blank" rel="noreferrer" className="block rounded-full bg-black px-6 py-4 text-center text-sm uppercase tracking-[0.18em] text-white">
                Enviar pedido no WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-black/45">Você poderá confirmar cores, disponibilidade e pagamento no atendimento.</p>
            </div>
          </motion.aside>
        </div>
      )}
    </div>
  );
}
