# Controle Financeiro do Décio

Aplicativo PWA de gerenciamento de pagamentos do Colégio Objectivo — Lara & Chloe.

## Arquivos

| Arquivo | Descrição |
|---|---|
| `index.html` | Aplicativo completo (HTML + CSS + JS, single-file) |
| `manifest.json` | Manifesto PWA para instalação como app |
| `sw.js` | Service Worker — cache offline |
| `icon.svg` | Ícone vetorial (qualquer tamanho) |
| `icon-192.png` | Ícone 192×192 px (Android/PWA) |
| `icon-512.png` | Ícone 512×512 px (splash screen) |

## Como usar

### Direto no navegador
Abra `index.html` em qualquer navegador moderno. Todos os dados ficam no IndexedDB local do navegador.

### Como servidor local (recomendado para PWA completo)
```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# Acesse em:
# http://localhost:8080
```

### Instalar como app (PWA)
1. Acesse pelo Chrome/Edge/Safari via servidor local
2. Chrome/Edge: clique no ícone de instalar na barra de endereço
3. Safari (iOS): compartilhar → "Adicionar à tela inicial"

## Funcionalidades

- 🔒 Tela de bloqueio com PIN (padrão: **191291**)
- 📊 Dashboard com KPIs e gráficos interativos
- 💸 Lançamentos: Despesas, Receitas, Previsões futuras
- ⚡ Converter previsão em pagamento realizado
- 📋 Relatório mensal por categoria com impressão PDF
- 📎 Anexo de comprovantes (PDF, JPG, PNG)
- ✉️ Enviar relatório por e-mail
- 🏷️ Categorias e partes personalizáveis
- 🎨 Toggle de categorias nos gráficos
- 💾 Backup/restore JSON
- 📱 Funciona offline (PWA)

## Banco de dados

- Nome: `financeiro-decio-v1` (IndexedDB)  
- Armazenamento: **100% local**, nenhum dado é enviado para servidores

## Nota de separação

Este app usa o banco `financeiro-decio-v1` e a chave de sessão `fd-auth`, **separados** do app original de pagamentos (`school-ledger-v5` / `sl-auth`). Os dois aplicativos coexistem sem conflito no mesmo navegador.
