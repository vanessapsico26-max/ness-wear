"use client";

import React, { useState } from "react";

const products = [
  { id: 1, name: "Top Lara", price: 139, sizes: ["P", "M", "G"] },
  { id: 2, name: "Top Bella", price: 139, sizes: ["P", "M", "G"] },
  { id: 3, name: "Top Lume", price: 159, sizes: ["P", "M", "G"] },
  { id: 4, name: "Legging Basic", price: 219, sizes: ["P", "M", "G"] },
  { id: 5, name: "Short Basic", price: 179, sizes: ["P", "M", "G"] },
  { id: 6, name: "Macacão Long", price: 359, sizes: ["P", "M", "G"] },
  { id: 7, name: "Blusa Flow", price: 149, sizes: ["Único"] },
];

export default function Page() {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any, size: string) {
    setCart([...cart, { ...product, size }]);
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }

  function whatsappLink() {
    let message = "Olá, quero comprar:%0A";
    cart.forEach((item) => {
      message += `- ${item.name} (${item.size}) - R$${item.price}%0A`;
    });
    message += `%0ATotal: R$${getTotal()}`;
    return `https://wa.me/5511999999999?text=${message}`;
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      
      <h1>NESS WEAR</h1>
      <p>Move your way</p>

      <h2>Produtos</h2>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <h3>{p.name}</h3>
          <p>R$ {p.price}</p>

          {p.sizes.map((size) => (
            <button
              key={size}
              onClick={() => addToCart(p, size)}
              style={{ marginRight: 5 }}
            >
              {size}
            </button>
          ))}
        </div>
      ))}

      <h2>Carrinho</h2>

      {cart.map((item, i) => (
        <div key={i}>
          {item.name} - {item.size} - R$ {item.price}
        </div>
      ))}

      <h3>Total: R$ {getTotal()}</h3>

      {cart.length > 0 && (
        <a href={whatsappLink()} target="_blank">
          <button>Finalizar no WhatsApp</button>
        </a>
      )}
    </div>
  );
}
