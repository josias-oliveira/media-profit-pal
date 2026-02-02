

# Substituir Ícone Calculator pelo Logo BMS

## Contexto

O elemento selecionado (linha 174-176) é o ícone Calculator com fundo gradiente que aparece no tema padrão (dark). O usuário quer substituí-lo pelo logo BMS (cubo 3D) que já está sendo usado no tema BMS.

## Mudança Necessária

### Antes (atual)
```text
{isBmsTheme ? (
  <img src={bmsLogo} ... />    // BMS theme: mostra logo
) : (
  <div className="p-2 rounded-xl bg-gradient-primary...">
    <Calculator ... />          // Default theme: mostra ícone
  </div>
)}
```

### Depois (proposto)
Remover a condicional e usar sempre o logo BMS em ambos os temas, mantendo o mesmo tamanho do elemento original (~40x40 pixels):

```text
<img 
  src={bmsLogo} 
  alt="BMS Logo" 
  className="w-10 h-10 object-contain" 
/>
```

## Arquivo a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/pages/Index.tsx` | Linha 171-177: Remover condicional e usar apenas `<img src={bmsLogo}>` |

## Resultado Visual

O logo BMS (cubo 3D em tons de azul) aparecerá no header em ambos os temas, com tamanho de 40x40 pixels (mesmo tamanho do elemento original).

