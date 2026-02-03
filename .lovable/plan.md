

# Correção do Problema de Arredondamento do CPM

## Problema Identificado

O sistema calcula as impressões usando valores decimais completos, mas exibe o CPM de Venda arredondado. Isso cria uma inconsistência: se alguém verificar multiplicando o CPM exibido pelas impressões, o resultado não bate com o orçamento total.

**Exemplo concreto:**
- CPM exato: R$ 9,5919079177 → Impressões: 52.127.273
- CPM arredondado: R$ 9,59 → Impressões: 52.137.643
- Diferença: ~10.000 impressões

## Soluções Propostas

### Opção 1: Exibir Todas as Casas Decimais

**Abordagem:** Mostrar o CPM de Venda com 4-6 casas decimais para manter precisão.

| Prós | Contras |
|------|---------|
| Implementação simples | Visual poluído |
| Matematicamente correto | Difícil de comunicar ao cliente |
| Não altera a lógica | Pouco prático para negociações |

**Resultado visual:** CPM Venda: R$ 9,5919 (ou R$ 9,591908)

---

### Opção 2: Arredondar CPM e Recalcular Impressões (Recomendada)

**Abordagem:** Primeiro arredondar o CPM de Venda para 2 casas decimais, depois recalcular as impressões baseado nesse CPM arredondado.

**Novo fluxo de cálculo:**
```text
1. Calcular CPM bruto (exato)
2. Calcular impressões brutas (usando CPM exato)  
3. Calcular CPM de Venda exato
4. ARREDONDAR CPM de Venda para 2 casas → R$ 9,59
5. RECALCULAR impressões: (Budget / CPM arredondado) × 1000
```

| Prós | Contras |
|------|---------|
| CPM limpo para proposta comercial | Pequena variação no orçamento de mídia efetivo |
| Impressões batem com a conta inversa | Ligeiramente mais complexo |
| Matematicamente consistente | |

**Resultado:** CPM R$ 9,59 × 52.137.643 impressões = R$ 500.000,00 ✓

---

### Opção 3: Sistema Híbrido com Toggle

**Abordagem:** Adicionar um switch para o usuário escolher entre "Modo Preciso" (casas decimais completas) e "Modo Comercial" (valores arredondados com recálculo).

| Prós | Contras |
|------|---------|
| Flexibilidade total | Interface mais complexa |
| Atende diferentes casos de uso | Pode confundir usuários |

---

## Recomendação

**Opção 2 (Arredondar e Recalcular)** é a mais adequada para uso comercial porque:

1. Propostas comerciais usam valores arredondados
2. Clientes podem verificar a matemática facilmente
3. Evita questionamentos sobre decimais estranhos
4. Mantém consistência entre CPM e Impressões

---

## Mudanças Técnicas (Opção 2)

### Arquivo: `src/pages/Index.tsx`

**Alteração no bloco de cálculos (linhas 77-85):**

```typescript
// Antes (atual):
const totalImpressions = (availableMediaBudget / grossCpmBrl) * 1000;
const sellingCpm = (totalBudget / totalImpressions) * 1000;

// Depois (proposto):
// Passo 1: Calcular CPM de venda exato
const rawSellingCpm = availableMediaBudget > 0 && grossCpmBrl > 0
  ? (totalBudget / ((availableMediaBudget / grossCpmBrl) * 1000)) * 1000
  : 0;

// Passo 2: Arredondar CPM para 2 casas decimais
const sellingCpm = Math.round(rawSellingCpm * 100) / 100;

// Passo 3: Recalcular impressões usando CPM arredondado
const totalImpressions = sellingCpm > 0
  ? (totalBudget / sellingCpm) * 1000
  : 0;
```

---

## Impacto nos Valores

Com Budget de R$ 500.000:

| Métrica | Valor Atual | Valor Novo |
|---------|-------------|------------|
| CPM Venda (exibido) | R$ 9,59 | R$ 9,59 |
| CPM Venda (interno) | R$ 9,5919... | R$ 9,59 |
| Impressões | 52.127.273 | 52.137.643 |
| Verificação matemática | ✗ Não bate | ✓ Bate |

---

## Próximos Passos

1. Confirme qual opção prefere (1, 2 ou 3)
2. Implementarei a alteração no código
3. Testaremos com os valores da planilha para validar

