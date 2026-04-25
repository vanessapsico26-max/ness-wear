"use client";

import React, { useState } from "react";

const produtos = [
  { nome: "Top Lara", preco: 139, tamanhos: ["P", "M", "G"] },
  { nome: "Top Bella", preco: 139, tamanhos: ["P", "M", "G"] },
  { nome: "Top Lume", preco: 159, tamanhos: ["P", "M", "G"] },
  { nome: "Legging Basic", preco: 219, tamanhos: ["P", "M", "G", "GG"] },
  { nome: "Short Basic", preco: 179, tamanhos: ["P", "M", "G"] },
  { nome: "Macacão Long", preco: 359, tamanhos: ["P", "M", "G"] },
  { nome: "Blusa Flow", preco: 149, tamanhos: ["Único"] },
];

export default function Page() {
  const [carrinho, setCarrinho] = useState<any[]>([]);

  function adicionarProduto(produto: any, tamanho: string) {
    setCarrinho([...carrinho, { ...produto, tamanho }]);
  }

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  function linkWhatsApp() {
    const mensagem =
      "Olá, NESS WEAR! Quero fazer um pedido:%0A%0A" +
      carrinho
        .map(
          (item) =>
            `• ${item.nome} | Tam. ${item.tamanho} | R$ ${item.preco}`
        )
        .join("%0A") +
      `%0A%0ATotal: R$ ${total}%0A%0APode me confirmar disponibilidade, cores e pagamento?`;

    return `https://wa.me/5511999999999?text=${mensagem}`;
  }

  return (
    <main style={{ background: "#f6efe8", color: "#151313", minHeight: "100vh" }}>
      <section style={{ background: "#000", color: "#fff", padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: 56, letterSpacing: 18, fontWeight: 300 }}>NESS</h1>
        <p style={{ letterSpacing: 14 }}>WEAR</p>
        <p style={{ marginTop: 30, letterSpacing: 8 }}>MOVE YOUR WAY</p>
      </section>

      <section style={{ padding: "60px 20px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 36, fontWeight: 300 }}>Para mulheres reais, em movimento.</h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#555" }}>
          NESS WEAR é sobre leveza, movimento e confiança. Peças que acompanham
          seu corpo, sua rotina e sua melhor versão — todos os dias.
        </p>
      </section>

      <section style={{ padding: "40px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 300 }}>Loja</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {produtos.map((produto) => (
            <div key={produto.nome} style={{ background: "#fff", padding: 24, borderRadius: 24 }}>
              <h3>{produto.nome}</h3>
              <p style={{ fontSize: 24 }}>R$ {produto.preco}</p>

              <p>Tamanho:</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {produto.tamanhos.map((tamanho) => (
                  <button
                    key={tamanho}
                    onClick={() => adicionarProduto(produto, tamanho)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 30,
                      border: "1px solid #111",
                      background: "#111",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {tamanho}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 20px", maxWidth: 900, margin: "0 auto" }}>
        <h2>Carrinho</h2>

        {carrinho.length === 0 && <p>Nenhum produto selecionado ainda.</p>}

        {carrinho.map((item, index) => (
          <p key={index}>
            {item.nome} | Tam. {item.tamanho} | R$ {item.preco}
          </p>
        ))}

        <h3>Total: R$ {total}</h3>

        {carrinho.length > 0 && (
          <a href={linkWhatsApp()} target="_blank">
            <button
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                padding: "16px 28px",
                borderRadius: 30,
                cursor: "pointer",
              }}
            >
              Finalizar pedido no WhatsApp
            </button>
          </a>
        )}
      </section>
    </main>
  );
}
