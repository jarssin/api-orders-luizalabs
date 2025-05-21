# 📦 LuizaLabs - Desafio Técnico (Vertical Logística)

Este projeto foi desenvolvido como parte do processo seletivo da **LuizaLabs**, com foco na vertical de **Logística**. O objetivo principal é criar uma API REST capaz de receber arquivos legados com registros de pedidos desnormalizados e retornar os dados no formato normalizado.

---

## 🧠 Descrição do Desafio

A API deve:

- Receber um arquivo `.txt` via **upload**
- Processar os dados brutos, normalizando-os
- Expor os dados processados por meio de um endpoint REST
- Suportar **filtros por ID de pedido** e **intervalo de datas**

---

## 📄 Estrutura do Arquivo de Entrada

Cada linha representa uma parte de um pedido, com campos fixos em tamanho:

| Campo         | Tamanho | Tipo                       |
| ------------- | ------- | -------------------------- |
| id usuário    | 10      | Numérico (zero à esquerda) |
| nome          | 45      | Texto (espaço à esquerda)  |
| id pedido     | 10      | Numérico                   |
| id produto    | 10      | Numérico                   |
| valor produto | 12      | Decimal                    |
| data compra   | 8       | Numérico (yyyymmdd)        |

---

## ✅ Exemplo de Saída Esperada

```json
[
  {
    "user_id": 1,
    "name": "Zarelli",
    "orders": [
      {
        "order_id": 123,
        "total": "1024.48",
        "date": "2021-12-01",
        "products": [
          { "product_id": 111, "value": "512.24" },
          { "product_id": 122, "value": "512.24" }
        ]
      }
    ]
  }
]
```

---

## 🚀 Como executar o projeto

1. **Instale as dependências localmente:**

   ```sh
   npm install
   ```

2. **Execute a aplicação em modo desenvolvimento:**

   ```sh
   npm run start:dev
   ```

3. **Ou execute via Docker Compose:**

   ```sh
   docker-compose up
   ```

   A aplicação estará disponível em `http://localhost:3000`.

4. **Acesse a API:**

   - Por padrão, a API estará disponível em `http://localhost:3000`.

5. **Rodando os testes:**
   ```sh
   npm run test
   ```

---

## 📥 Como utilizar a API

- **Upload do arquivo:**  
  Envie um arquivo `.txt` contendo os registros desnormalizados via endpoint REST (exemplo: `POST /upload`).

- **Consulta dos pedidos:**  
  Após o processamento, consulte os pedidos normalizados via endpoint REST (exemplo: `GET /orders`).

- **Filtros disponíveis:**
  - `order_id`: filtra por ID do pedido.
  - `start_date` e `end_date`: filtra por intervalo de datas (formato `yyyy-mm-dd`).

---

## 📬 Exemplos de uso via cURL

### Consultar pedidos com filtros

```sh
curl --request GET \
  --url 'http://localhost:3000/users/orders?order_id=146&start_date=2021-06-02&end_date=2021-10-18' \
```

### Importar arquivo de pedidos

```sh
curl --request POST \
  --url http://localhost:3000/users/orders/import \
  --header 'Content-Type: multipart/form-data' \
  --form 'file=@CAMINHO/DO/SEU/ARQUIVO.txt'
```

> Substitua `CAMINHO/DO/SEU/ARQUIVO.txt` pelo caminho do arquivo de pedidos na sua máquina.

---

## 🛠️ Decisões técnicas e arquitetura

- **Framework:** [NestJS](https://nestjs.com/) com TypeScript, escolhido por sua robustez, modularidade e suporte a boas práticas.
- **Padrões:**
  - SOLID aplicado na separação de responsabilidades (camadas de domínio, aplicação, infraestrutura e entrada).
  - Testes automatizados (unitários) utilizando Jest.
  - Lint e formatação automática com ESLint e Prettier.
- **Persistência (In-Memory):**
  - Optei por utilizar um armazenamento em memória baseado em `Map` para garantir alta performance e fácil manipulação dos dados durante o processamento dos arquivos. O uso de `Map` permite lidar eficientemente com colisões de chaves (por exemplo, múltiplas linhas referentes ao mesmo usuário ou pedido), facilitando operações de upsert e agregação de produtos e totais por pedido.
  - Para expor os dados via API e aplicar filtros (por `order_id` e intervalo de datas), utilizamos parsers que convertem os dados do `Map` para arrays, permitindo aplicar facilmente as funcionalidades de filtragem e formatação exigidas pela resposta da API.
- **Automação:**
  - Scripts para build, testes, lint e cobertura de código disponíveis no `package.json`.

---

## 📂 Estrutura do Projeto

```
src/
  application/   # Casos de uso e lógica de aplicação
  domain/        # Entidades e regras de negócio
  entry-point/   # Controllers e rotas da API
  infra/         # Serviços de infraestrutura (ex: leitura de arquivo)
  main.ts        # Bootstrap da aplicação
  module.ts      # Módulo principal do NestJS
test/            # Testes automatizados
```

---

## 📝 Observações

- Todos os campos numéricos no arquivo de entrada são preenchidos com zeros à esquerda.
- Campos de texto são preenchidos com espaços à esquerda.
- A formatação das colunas é fixa e padronizada.
- O projeto pode ser facilmente adaptado para diferentes formas de persistência (arquivo, banco de dados, etc).

## ❓ Dúvidas

Em caso de dúvidas, fique à vontade para abrir uma issue ou entrar em contato.

---
