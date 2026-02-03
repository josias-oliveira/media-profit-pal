

# Esconder Tema Dark e Definir BMS como Padrão

## Resumo

Remover a opção de alternância de tema e manter apenas o tema BMS habilitado por padrão.

## Mudanças Necessárias

### 1. Arquivo: `src/pages/Index.tsx`

**Alteração no estado inicial (linha 52):**
- Mudar `useState(false)` para `useState(true)` para que o tema BMS seja o padrão

**Remoção do ThemeToggle:**
- Remover o componente `ThemeToggle` da navegação desktop (linha 208)
- Remover o componente `ThemeToggle` do menu mobile (linhas 251-253)
- Remover a linha separadora (`<div className="w-px h-6 bg-border" />`) que fica ao lado do toggle

**Limpeza de imports:**
- Remover o import do `ThemeToggle` se não for mais usado

### 2. Arquivo: `src/components/calculator/ThemeToggle.tsx`

**Opção:** Manter o arquivo para uso futuro ou remover completamente

## Resultado

| Antes | Depois |
|-------|--------|
| Toggle de tema visível | Toggle removido |
| Tema Dark por padrão | Tema BMS por padrão |
| Usuário pode alternar | Apenas tema BMS disponível |

## Arquivos Afetados

- `src/pages/Index.tsx` - Remover ThemeToggle e alterar estado inicial
- `src/components/calculator/ThemeToggle.tsx` - Pode ser mantido para uso futuro

