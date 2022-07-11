<p align="center">
  <h2 align="center">
    :credit_card: Valex API
  </h2>
</p>

## Usage

```bash
$ git clone https://github.com/ACFernanda/valex-api

$ cd valex-api

$ npm install

$ npm run start
```

API:

```
• POST /new-card (autenticada)
    - Rota para cadastrar um novo cartão
    - headers: { "x-api-key": $api-key }
    - body: {
        "employeeId": $number,
        "cardType": 'groceries' | 'restaurants' | 'transport' | 'education' | 'health'
        }

• POST /activate-card
    - Rota para ativar um cartão (gerar uma senha para o cartão)
    - headers: {}
    - body: {
        "cardId": $integer,
        "securityCode": "xxx",
        "password": "xxxx"
      }

• POST /balance-transactions
    - Rota para visualizar o saldo de um cartão e as transações do mesmo
    - headers: {}
    - body: { "cardId": $integer }

• POST /block-card
    - Rota para bloquear cartão
    - headers: {}
    - body: {
        "cardId": $integer,
        "password": "xxxx"
      }

• POST /unblock-card
    - Rota para desbloquear cartão
    - headers: {}
    - body: {
        "cardId": $integer,
        "password": "xxxx"
      }

• POST /recharge (autenticada)
    - Rota para recarregar um cartão
    - headers: { "x-api-key": $api-key }
    - body: {
        "cardId": $integer,
        "amount": $integer
      }

• POST /pos-payment
    - Rota para comprar em Points of Sale (maquininhas)
    - headers: {}
    - body: {
        "cardId": $integer,
        "password": "xxxx",
        "businessId: $integer,
        "amount": $integer
      }
```
