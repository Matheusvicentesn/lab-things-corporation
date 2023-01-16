<p align="center">
  <img src="readmeFiles/logo.png" width="500" alt="logo" />
</p>

  <h3 align="center">Projeto 2 Modulo backend DEVInHouse (Intelbras)</h3>
<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="" />
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="" />
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="" />

</p>

## Rodando o projeto

### Clonando repositório

```bash
git clone https://github.com/Matheusvicentesn/lab-things-corporation.git.
```

### Instalando dependências
Dentro da pasta do projeto siga os comandos:
```bash
npm install
```
## Rodando Docker para subir Postgre e PGAdmin
```bash
docker-compose up
```
## Realizando migrações para o banco de dados
```bash
npm run migration:run
```

## Populando banco de dados
```bash
npm run seed
```

## Iniciando aplicação

```bash
npm run start:dev
```


## EndPoints do projeto
#

### Cadastrar um usuário:

```
POST: localhost:3000/auth/signup
Headers: {
	"Content-Type": "application/json"
}

Body: { 
	"name": "Teste",
	"email": "teste@teste.com",
	"password": "@Teste123",
	"confirm_password": "@Teste123",
    "profile_pic": "wwww.google.com.br",
	"address": { 
		"zip_code": "55",
		"street": "Rua teste",
		"number": "85",
		"neighborhood": "Bairro teste",
		"city": "Cidade teste",
		"state": "Estado teste",
		"complement": "Casa 9"
	}
}
```

**Retorno**
```
{
	"message": "user created successfully"
}
```

### Logar na aplicação:

```
POST: localhost:3000/auth/signin
Headers: {
	"Content-Type": "application/json"
}

Body: { 
	"email": "teste@teste.com",
	"password": "@Teste123"
}
```

**Retorno**
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IlRlc3RlIiwicGljIjoid3d3dy5nb29nbGUuY29tLmJyIiwiZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJpYXQiOjE2NzM4MzUyOTcsImV4cCI6MTY3MzgzNTY1N30.uc92qcrnEmtVAsvZDcHfpNmCBTeBYB7KS0wYfSlhI14",
	"user": {
		"id": 3,
		"name": "Teste",
		"profile_pic": "wwww.google.com.br",
		"email": "teste@teste.com",
		"password": "$2b$12$AO1/Jid3SHJB/06GaCQMD.9d9FMweccdTtD7cG8tqlXO64aEIxNEi",
		"salt": "$2b$12$AO1/Jid3SHJB/06GaCQMD.",
		"confirmationToken": "",
		"recoverToken": "",
		"phone": null,
		"address": {
			"id": 3,
			"zip_code": "55",
			"street": "Rua teste",
			"number": "85",
			"neighborhood": "Bairro teste",
			"city": "Cidade teste",
			"state": "Estado teste",
			"complement": "Casa 9"
		}
	}
}
```

### Modificar a senha:

```
PUT: localhost:3000/auth/updatepassword
Headers: {
	"Content-Type": "application/json",
    "Authorization": "Bearer token"
}

Body: {
	"email": "teste@teste.com.br",
	"password": "@Teste123",
	"new_password": "@Teste1234",
	"confirm_password": "@Teste1234"
}
```

**Retorno**
```
{
	"message": "updated password"
}
```

### Atualizar dados do usuário:

```
PUT: localhost:3000/auth/updateuser
Headers: {
	"Content-Type": "application/json",
    "Authorization": "Bearer token"
}

Body: { 
	"name": "Teste",
	"email": "teste@teste.com.br",
	"password": "@Teste1234",
	"newpassword": "@Teste1234",
    "profile_pic": "wwww.google.com.br",
	"address": { 
		"zip_code": "55",
		"street": "Rua teste",
		"number": "85",
		"neighborhood": "Bairro teste",
		"city": "Cidade teste",
		"state": "Estado teste",
		"complement": "Casa 9"
	}
}
```

**Retorno**
```
{
	"message": "user Updated"
}
```

### Retornar dados do usuário:

```
GET: localhost:3000/auth/userinfo
Headers: {
    "Authorization": "Bearer token"
}

```

**Retorno**
```
{
	"pic": "wwww.google.com.br",
	"name": "Teste",
	"email": "teste@teste.com.br",
	"address": {
		"zip_code": "55",
		"street": "Rua teste",
		"number": "85",
		"neighborhood": "Bairro teste",
		"city": "Cidade teste",
		"state": "Estado teste",
		"complement": "Casa 9"
	}
}
```

### Vincular dispositivo ao usuário:

```
POST: localhost:3000/auth/linkdevice
Headers: {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
}
Body: {
	"device_id": 1,
	"local": "escritório",
	"is_on": true,
	"room": "Quarto do teste 2"
}

```

**Retorno**
```
{
	"message": "successfully linked device"
}
```

### Buscar dispositivos do usuário:

```
GET: localhost:3000/auth/searchdevices/
Headers: {
    "Authorization": "Bearer token",
}

```
**Retorno**
```
{
		"id": 3,
		"name": "Interruptor conector inteligente",
		"type": "Energia",
		"photoUrl": "https://iili.io/LDBxlS.png",
		"local": {
			"description": "escritório"
		},
		"room": "Quarto do teste 2",
		"madeBy": "Intelbras",
		"isOn": true,
		"info": {
			"virtual_id": "abcd4321",
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-40dBm"
		}
	}
```

### Detalhes do dispositivos do usuário:

```
GET: localhost:3000/auth/userDeviceInfo/:id
Headers: {
    "Authorization": "Bearer token",
}

```
**Retorno**
```
{
	"name": "Interruptor conector inteligente",
	"type": "Energia",
	"madeBy": "Intelbras",
	"isOn": true,
	"info": {
		"id": 1,
		"virtual_id": "abcd4321",
		"ip_address": "127.0.0.1",
		"mac_address": "127.0.0.1",
		"signal": "-40dBm"
	}
}
```

### Apagar dispositivo do usuário:

```
DELETE: localhost:3000/auth/deleteuserdevice/:id
Headers: {
    "Authorization": "Bearer token",
}

```
**Retorno**
```
{
	"message": "device deleted"
}
```

### Ligar/Desligar dispositivo do usuário

```
PUT: localhost:3000/auth/switchdevice/:id
Headers: {
    "Authorization": "Bearer token",
}

```
**Retorno**
```
{
	"id": 1,
	"user": 1,
	"device": 1,
	"local": 3,
	"isOn": true,
	"room": "Quarto do teste 2"
}
```

### Listar todos os dispositivos

```
GET: localhost:3000/devices
Headers: {
    "Authorization": "Bearer token",
}

```
**Retorno**
```
[
	{
		"id": 1,
		"name": "Interruptor conector inteligente",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://iili.io/LDBxlS.png",
		"info": {
			"virtual_id": "abcd4321",
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-40dBm"
		}
	},
	{
		"id": 2,
		"name": "Interruptor inteligente soquete",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://iili.io/LDBzU7.png",
		"info": {
			"virtual_id": "dbcd4321",
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-80dBm"
		}
	}, ...
```

### Buscar dispositivo por ID

```
GET: localhost:3000/devices
Headers: {
    "Authorization": "Bearer token",
}

```
**Retorno**
```
[
	{
		"id": 1,
		"name": "Interruptor conector inteligente",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://iili.io/LDBxlS.png",
		"info": {
			"virtual_id": "abcd4321",
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-40dBm"
		}
	},
	{
		"id": 2,
		"name": "Interruptor inteligente soquete",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://iili.io/LDBzU7.png",
		"info": {
			"virtual_id": "dbcd4321",
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-80dBm"
		}
	}, ...
```


Caso queiram importar o arquivo Insomina com todos endpoints configurados basta importar a configuração.

Ir na opção de importar coleção por arquivo:

<p align="center">
  <img src="readmeFiles/img1.jpg" width="500" alt="" />
</p>

Selecionar o arquivo que está na pasta clonada do projeto, readmeFiles>labCAR_Endpoints.json

<p align="center">
  <img src="readmeFiles/img2.jpg" width="500" alt="" />
</p>

Pronto, todos os endPoints estarão configurados

<p align="center">
  <img src="readmeFiles/img3.jpg" width="500" alt="" />
</p>

## Credênciais
Vocês pode mudar as portas através do `docker-compose.yml`

```bash
POSTGRES
'banco': 'db'
'usuário do banco': 'postgres'
'senha do banco':  'postgres'
'porta': ['docker': 5432, 'local': 3333]

PGADMIN
'usuário': 'admin@admin.com'
'senha':  'admin'
'porta': ['docker': 80, 'local': 8000]

```

### Melhorias que poderão ser feitas no projeto posteriormente.

- [ ] Realizar documentação via Swagger
- [ ] Rodar todo o projeto incluindo front-end via docker
- [ ] Realizar deploy da aplicação.

### Contato

Projeto desenvolvido com base na atividade do curso DEVinHouse
Qualquer dúvida ou sugestão estou disponível no e-mail:
<a href="mailto:contato@matheusvicente.dev.br?subject=Questions" title=""> contato@matheusvicente.dev.br</a>