# Squad Romeo - Teste Nível Pleno

### Tecnologias presentes no projeto:

- TYPESCRIPT
- EXPRESS
- MONGO DB
- REDIS
- DOCKER
- DOCKER-COMPOSE

#### Instalacao do projeto (Baseado na distro: Pop!\_OS/Debian Linux):

> [Node.JS v16.15+](https://nodejs.org/en/download/) Obrigatório (Recomendável usar com [NVM](https://github.com/nvm-sh/nvm))
> [Docker (v20.10.14 Recommended)](https://docs.docker.com/engine/install/) Obrigatório
> [Docker Compose (v1.29.2 Recommended)](https://docs.docker.com/compose/install/) Obrigatório

```sh
$ git clone git@github.com:BlackSnowden/romeo-pleno-test.git
$ cd ./romeo-pleno-test
$ cp ./.env.example ./.env && vi ./.env
$ npm install
$ npm run compose:up
$ npm run start
```

> Não esqueca de configurar o arquivo `.env` antes de executar o comando `npm install`

#### Configurando `.env`

> Esta configuracão é obrigatória para a criacão de instâncias do `NodeJS`, `Redis` e `MongoDB`.

```sh
$ vi ./.env
```

| Variável                       | Descricão                                                       | Exemplo                   |
| ------------------------------ | --------------------------------------------------------------- | ------------------------- |
| SERVER_PORT                    | Porta em que o servidor irá escutar requisicões                 | 3000                      |
| LINKAPI_GATEWAY_USERNAME       | Credencial do API Gateway da LinkAPI                            | username-credential-123   |
| LINKAPI_GATEWAY_PASSWORD       | Credencial do API Gateway da LinkAPI                            | password-credential-123   |
| GOFILE_TOKEN                   | Token de acesso a API GoFile                                    | gofile-token-abc          |
| GOFILE_FOLDERNAME_USERS_REPORT | Nome padrao da pasta de relatórios de usuários                  | Users Report              |
| GOFILE_FOLDERID_ROOT           | ID da pasta ROOT em seu GoFile                                  | root-contentId-123        |
| OUTPUT_PATH                    | Local da pasta de saída para geracao de logs                    | output/                   |
| MONGO_PROTOCOL                 | Se for local use `mongodb` ou `mongodb+srv` para conexão remota | mongodb                   |
| MONGO_HOST                     | Endereco para conexão com MongoDB                               | cluster0.abcd.mongodb.net |
| MONGO_COLLECTION               | Nome do banco de dados no MongoDB                               | my-database               |
| MONGO_PORT                     | Porta para conexão com MongoDB                                  | 27017                     |
| MONGO_USERNAME                 | Credencial de usuário para autenticacão no MongoDB              | user-mongo-2022           |
| MONGO_PASSWORD                 | Credencial de senha para autenticacão no MongoDB                | pass-mongo-2022           |
| REDIS_HOST                     | Endereco para conexão com Redis                                 | localhost                 |
| REDIS_PORT                     | Porta para conexão com Redis                                    | 6379                      |
| REDIS_PASSWORD                 | Credencial senha para autenticacao com Redis                    | pass-redis-2022           |

#### Automacões

##### Usuários

A responsabilidade desta automacão é listar os usuários do endpoint /users do gateway da LinkAPI de forma paginada, sendo limitada a 30req/min.
Em seguida será criado um subprocesso para cada usuário para que uma transformacão do objeto seja feita antes da insercão na colecão `users` no MongoDB.

`ATENCÃO`: Esta automacão está configurada a rodar a cada `10 segundos`. Para alterar este comportamento, vá até `src/app/schedules/user.schedule.ts` e altere o parâmetros `interval.time` e `interval.unit`.

##### Criacão de relátios de usuários

A responsabilidade desta automacão é lista todos os usuários da colecão `users` no MongoDB, posteriormente efetuar uma transformacão no objeto para cada usuário antes da conversão para `CSV`.
Após a conversão para `CSV`, será efetuado o upload do arquivo para o GoFile na pasta padrão definida na variável de ambiente `GOFILE_FOLDERNAME_USERS_REPORT`.

Caso a variável `GOFILE_FOLDERNAME_USERS_REPORT` não esteja configurada, a automacao não poderá prosseguir com o upload.
Além da configuracão da varável de ambiente, será necessário também a criacão da pasta no GoFile no endpoit `POST /gofile/folder`

###### Dependências:

- Configuracão da variável `GOFILE_FOLDERNAME_USERS_REPORT`
- Criacão da pasta com o exato nome no GoFile através do endpoint `POST /gofile/folder`

`ATENCÃO`: Esta automacão está configurada a rodar a cada `10 segundos`. Para alterar este comportamento, vá até `src/app/schedules/user-export-csv.schedule.ts` e altere o parâmetros `interval.time` e `interval.unit`.

#### Endpoints

##### POST /gofile/folder

Criacão de pasta no GoFile.

###### Parâmetros:

| Variável   | Descricão                  | Exemplo      |
| ---------- | -------------------------- | ------------ |
| folderName | Nome da pasta a ser criada | Minhas Fotos |

##### POST /gofile/:folderName/file

Upload de arquivos no GoFile.

###### Parâmetros:

| Variável   | Descricão                                                                         | Exemplo            |
| ---------- | --------------------------------------------------------------------------------- | ------------------ |
| folderName | Nome da pasta para onde o arquivo deverá ser salvo                                | Minhas Fotos       |
| file       | Arquivo a ser enviado para o GoFile. O tipo deste campo será um Buffer do arquivo | foto-amsterdam.jpg |

##### DELETE /gofile/:folderName/:filename

Deletar arquivo no GoFile.

###### Parâmetros:

| Variável   | Descricão                                     | Exemplo            |
| ---------- | --------------------------------------------- | ------------------ |
| folderName | Nome da pasta de onde o arquivo será deletado | Minhas Fotos       |
| filename   | Nome do arquivo a ser deletado                | foto-amsterdam.jpg |

#### Estrutura de pastas

Este projeto possui a seguinte estrutura:
output
-- logs
src
-- app
---- modules
---- schedules
---- shared
-- server.ts

`OUTPUT`: Documentos de saída da aplicacão, tal como logs.
`SRC`: Raiz de código do projeto.
`SRC/APP`: Raiz da aplicacão.
`SRC/APP/MODULES`: Interfaces de interacão ou automacões.
`SRC/APP/SCHEDULES`: Agendadores de execucão. Para cada automacão crie 1 arquivo: `nomeAutomacao.schedule.ts`
`SRC/APP/SHARED`: Pasta de funcões reaproveitadas no código, tal como: config, helpers, utils etc.
`SRC/SERVER.TS`: Ponto de entrada da instância NodeJS.

## License

MIT
