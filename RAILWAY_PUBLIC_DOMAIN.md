# Como mostrar o site na Railway

A tela "Unexposed service" significa que o deploy foi concluído, mas a Railway ainda não criou uma URL pública para o serviço. O código já sobe o servidor com `npm start`; falta gerar o domínio público no painel.

## Passo a passo

1. Abra o projeto na Railway.
2. Clique no serviço `Portif-rio_`.
3. Abra a aba **Settings**.
4. Em **Networking**, procure **Public Networking**.
5. Clique em **Generate Domain**.
6. Abra a URL `*.up.railway.app` gerada.
7. Teste também `https://sua-url.up.railway.app/health` para confirmar que o servidor está online.

## O que este repositório já entrega

- `npm start` inicia o servidor Node sem dependências externas.
- `server.js` escuta a porta `PORT` fornecida pela Railway.
- `railway.json` aponta o start command e o healthcheck `/health`.
- `nixpacks.toml` evita etapa de instalação desnecessária.
- O front completo está em `index.html` e `styles.css`.

Sem clicar em **Generate Domain**, a Railway mantém o serviço privado, exatamente como aparece na tela "Unexposed service".
