![image](https://github.com/user-attachments/assets/e0a1405f-558c-4354-818d-487266695a6b)

## Next 16 - Migration Notes

Os pontos abaixo são "comportamentos inesperados" que ocorreram ao migrar para o Next 16.

### React-Hook-Form `form.watch`

No formulário de criação de categoria, ao alterar a nome, cor do texto e/ou cor de fundo, o preview mudava automaticamente pois o badge recebia esse valor no `style`, como `form.watch("textColor")`, mas como o update isso parou de funcionar, ou seja, o badge não alterava o texto e nem as cores. Esse problema afetou todos os locais onde o `form.watch` estava sendo usando.

Solução: Usar o `<Watch />` do `React-Hook-Form 7.65.0`.
