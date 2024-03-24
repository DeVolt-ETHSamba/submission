# Hipercongo

O código contido neste repositório representa o sistema de simulação, mensageria, visualização (Metabase), servidor web e banco de dados NoSQL ( MongoDB ) de um projeto de **Hiperconectividade para Cidades Inteligentes**. Este projeto foi construído conforme as [golang-standards](https://github.com/golang-standards/project-layout) [^1]. Ademais, também foi implementada, dado requisito de alta escalabilidade definido para o projeto, a arquitetura [hexagonal](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749) [^2]

## Dependências e Serviços

Antes de continuar, é necessário instalar as dependências e criar os serviços listados para a execução dos comandos posteriores. Para isso siga as seguintes instruções:

- Cluster Kafka - [Confluent Cloud](https://docs.confluent.io/cloud/current/clusters/create-cluster.html#create-ak-clusters)
- Cluster MQTT - [HiveMQ Cloud](https://www.hivemq.com/article/step-by-step-guide-using-hivemq-cloud-starter-iot/)
- Cluster MongoDB - [MongoDB Atlas](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup)
- Instância PostgresSQL - [RDS](https://aws.amazon.com/getting-started/hands-on/create-connect-postgresql-db/) 
- Docker engine - [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- Build Essential - [What is Build Essential Package in Ubuntu?](https://itsfoss.com/build-essential-ubuntu/)

## Como rodar o sistema

Siga as intruções abaixo para rodar o sistema junto a todos os seus recortes, simulação, mensageria, banco de dados e vicualização com o Metabase.

### Definir as variáveis de ambiente:
Rode o comando abaixo e preecha com as respectivas variáveis de ambiente o arquivo `.env` criado dentro da pasta `/config`.

#### Comando:
```shell
make env
```

#### Output:
```shell
cp ./config/.env.develop.tmpl ./config/.env
```

> [!NOTE]
> Antes de preencher o arquivo `.env` é necessário criar os serviços de cloud presentes nas seção [#Dependências e Serviços](https://github.com/henriquemarlon/hipercongo/edit/main/README.md#depend%C3%AAncias-e-servi%C3%A7os)

### Rodar as migrações:
As migrações, referem-se ao conjunto "queries" criadas com o objetivo de trazer agilidade ao processo de desevolvimento, que criam sensores no banco de dados que por sua vez servirão para contruir a simulação. 

#### Comando:
```shell
make migrations
```

#### Output:
```shell
migrations  | Connection established successfully
migrations  | Documents inserted. IDs: [ObjectID("65f0575382f1be93d94ae2c6") ObjectID("65f0575382f1be93d94ae2c7") ObjectID("65f0575382f1be93d94ae2c8") ObjectID("65f0575382f1be93d94ae2c9") ObjectID("65f0575382f1be93d94ae2ca")]
migrations  | Connection to MongoDB closed.
migrations exited with code 0
```

> [!NOTE]
> Em uma cenário real, não precisaríamos de um arquivo como esse porque os sensores seriam criados por um frontend+backend que inseriria no banco de dados dos sensores

### Rodar testes:

Aqui, todos os comandos necessários estão sendo abstraídos por um arquivo Makefile. Se você tiver curiosidade para saber o que o comando abaixo faz, basta conferir [aqui]().

#### Comando:

```shell
make tests
```

#### Output:

```shell
✔ Container simulation  Started                                                                                                      0.0s 
?       github.com/henriquemarlon/hipercongo/cmd/app    [no test files]
?       github.com/henriquemarlon/hipercongo/cmd/simulation     [no test files]
?       github.com/henriquemarlon/hipercongo/internal/infra/kafka       [no test files]
?       github.com/henriquemarlon/hipercongo/internal/infra/repository  [no test files]
?       github.com/henriquemarlon/hipercongo/internal/infra/web [no test files]
?       github.com/henriquemarlon/hipercongo/internal/usecase   [no test files]
?       github.com/henriquemarlon/hipercongo/tools      [no test files]
=== RUN   TestNewAlert
--- PASS: TestNewAlert (0.00s)
=== RUN   TestNewLog
--- PASS: TestNewLog (0.00s)
=== RUN   TestEntropy
--- PASS: TestEntropy (0.00s)
=== RUN   TestNewSensor
--- PASS: TestNewSensor (0.00s)
=== RUN   TestNewSensorPayload
--- PASS: TestNewSensorPayload (0.00s)
PASS
coverage: 100.0% of statements
ok      github.com/henriquemarlon/hipercongo/internal/domain/entity     0.005s  coverage: 100.0% of statements
=== RUN   TestMqttIntegration
2024/03/12 10:33:48 Selecting all sensors from the MongoDB collection sensors
--- PASS: TestMqttIntegration (152.76s)
PASS
coverage: [no statements]
ok      github.com/henriquemarlon/hipercongo/test       152.771s        coverage: [no statements]
```

> [!NOTE]
> A esteira de testes definida aqui é responsável popr testar as entitdade do ssistema e por realizar um teste de integração garantindo a entrega, e integridade e a frequência de envio dos dados, assim como o QoS da msg.

### Rodar a visualização da cobertura de testes:

Novamente, todos os comandos necessários estão sendo abstraídos por um arquivo Makefile. Se você tiver curiosidade para saber o que o comando abaixo faz, basta conferir [aqui]().

#### Comando:

```bash
make coverage 
```

#### Output:
![output_coverage](https://github.com/henriquemarlon/hipercongo/assets/89201795/95767c00-44dd-4852-9d63-956e9947c4c6)

> [!NOTE]
>  - Este comando está criando, a partir do arquivo `coverage_sheet.md`, uma visualização da cobertura de testes nos principais arquivos Go.

### Rodar o sistema:

Mais uma vez, todos os comandos necessários estão sendo abstraídos por um arquivo Makefile. Se você tiver curiosidade para saber o que o comando abaixo faz, basta conferir [aqui]().

#### Comando:

```bash
make run
```

#### Output:

```shell
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f042d4b6b032e6b873d320","data":{"co":10,"co2":488,"mp10":120,"mp25":68,"no2":571,"rad":644},"timestamp":"2024-03-12T14:03:36.65569959Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f0575382f1be93d94ae2ca","data":{"co":8,"co2":485,"mp10":118,"mp25":59,"no2":577,"rad":641},"timestamp":"2024-03-12T14:03:36.656197113Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f0503d1c30b0c1222d3b99","data":{"co":6,"co2":488,"mp10":117,"mp25":66,"no2":575,"rad":656},"timestamp":"2024-03-12T14:03:36.656816178Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f052819aaa09e60a915e1f","data":{"co":10,"co2":504,"mp10":133,"mp25":59,"no2":567,"rad":649},"timestamp":"2024-03-12T14:03:36.657669417Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f0575382f1be93d94ae2c7","data":{"co":9,"co2":484,"mp10":125,"mp25":61,"no2":562,"rad":638},"timestamp":"2024-03-12T14:03:36.657775884Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f042d4b6b032e6b873d31f","data":{"co":5,"co2":487,"mp10":126,"mp25":58,"no2":574,"rad":626},"timestamp":"2024-03-12T14:03:36.658284966Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f052819aaa09e60a915e1e","data":{"co":5,"co2":490,"mp10":134,"mp25":61,"no2":561,"rad":650},"timestamp":"2024-03-12T14:03:36.658663385Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f041fe2cb67aaec8b1ea69","data":{"co":7,"co2":485,"mp10":128,"mp25":59,"no2":570,"rad":624},"timestamp":"2024-03-12T14:03:36.658784378Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65ef0e8426d3e11550dcc2e6","data":{"co":8,"co2":500,"mp10":125,"mp25":63,"no2":565,"rad":641},"timestamp":"2024-03-12T14:03:36.661013772Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f0503d1c30b0c1222d3b9c","data":{"co":6,"co2":483,"mp10":129,"mp25":62,"no2":583,"rad":634},"timestamp":"2024-03-12T14:03:36.661013772Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f041fe2cb67aaec8b1ea6c","data":{"co":8,"co2":517,"mp10":130,"mp25":66,"no2":562,"rad":636},"timestamp":"2024-03-12T14:03:36.661014855Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f0503d1c30b0c1222d3b98","data":{"co":6,"co2":505,"mp10":116,"mp25":59,"no2":549,"rad":654},"timestamp":"2024-03-12T14:03:36.661306844Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f0575382f1be93d94ae2c8","data":{"co":8,"co2":513,"mp10":124,"mp25":67,"no2":572,"rad":624},"timestamp":"2024-03-12T14:03:36.66132675Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f0503d1c30b0c1222d3b9b","data":{"co":6,"co2":494,"mp10":121,"mp25":66,"no2":580,"rad":626},"timestamp":"2024-03-12T14:03:36.6612992Z"}, on topic: sensors
simulation  | 2024/03/12 14:03:36 Published: {"sensor_id":"65f052819aaa09e60a915e1d","data":{"co":8,"co2":512,"mp10":118,"mp25":57,"no2":580,"rad":660},"timestamp":"2024-03-12T14:03:36.661400558Z"}, on topic: sensors
metabase-1  | 2024-03-12 14:03:43,218 INFO metabase.util :: Maximum memory available to JVM: 1.9 GB
metabase-1  | 2024-03-12 14:03:47,354 INFO util.encryption :: Saved credentials encryption is DISABLED for this Metabase instance. 🔓 
metabase-1  |  For more information, see https://metabase.com/docs/latest/operations-guide/encrypting-database-details-at-rest.html
metabase-1  | 2024-03-12 14:03:56,673 INFO driver.impl :: Registered abstract driver :sql  🚚
metabase-1  | 2024-03-12 14:03:56,691 INFO driver.impl :: Registered abstract driver :sql-jdbc (parents: [:sql]) 🚚
metabase-1  | 2024-03-12 14:03:56,699 INFO metabase.util :: Load driver :sql-jdbc took 122.6 ms
metabase-1  | 2024-03-12 14:03:56,701 INFO driver.impl :: Registered driver :h2 (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:03:56,992 INFO driver.impl :: Registered driver :mysql (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:03:57,033 INFO driver.impl :: Registered driver :postgres (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:03:58,955 INFO metabase.core :: 
metabase-1  | Metabase v0.48.8 (a900c85) 
metabase-1  | 
metabase-1  | Copyright © 2024 Metabase, Inc. 
metabase-1  | 
metabase-1  | Metabase Enterprise Edition extensions are NOT PRESENT.
metabase-1  | 2024-03-12 14:03:58,965 INFO metabase.core :: Starting Metabase in STANDALONE mode
metabase-1  | 2024-03-12 14:03:59,029 INFO metabase.server :: Launching Embedded Jetty Webserver with config:
metabase-1  |  {:port 3000, :host "0.0.0.0"}
metabase-1  | 
metabase-1  | 2024-03-12 14:03:59,098 INFO metabase.core :: Starting Metabase version v0.48.8 (a900c85) ...
metabase-1  | 2024-03-12 14:03:59,102 INFO metabase.core :: System info:
metabase-1  |  {"file.encoding" "UTF-8",
metabase-1  |  "java.runtime.name" "OpenJDK Runtime Environment",
metabase-1  |  "java.runtime.version" "11.0.22+7",
metabase-1  |  "java.vendor" "Eclipse Adoptium",
metabase-1  |  "java.vendor.url" "https://adoptium.net/",
metabase-1  |  "java.version" "11.0.22",
metabase-1  |  "java.vm.name" "OpenJDK 64-Bit Server VM",
metabase-1  |  "java.vm.version" "11.0.22+7",
metabase-1  |  "os.name" "Linux",
metabase-1  |  "os.version" "6.5.11-linuxkit",
metabase-1  |  "user.language" "en",
metabase-1  |  "user.timezone" "GMT"}
metabase-1  | 
metabase-1  | 2024-03-12 14:03:59,104 INFO metabase.plugins :: Loading plugins in /plugins...
metabase-1  | 2024-03-12 14:03:59,256 INFO util.files :: Extract file /modules/bigquery-cloud-sdk.metabase-driver.jar -> /plugins/bigquery-cloud-sdk.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,410 INFO util.files :: Extract file /modules/redshift.metabase-driver.jar -> /plugins/redshift.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,416 INFO util.files :: Extract file /modules/mongo.metabase-driver.jar -> /plugins/mongo.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,432 INFO util.files :: Extract file /modules/presto-jdbc.metabase-driver.jar -> /plugins/presto-jdbc.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,480 INFO util.files :: Extract file /modules/oracle.metabase-driver.jar -> /plugins/oracle.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,483 INFO util.files :: Extract file /modules/sqlite.metabase-driver.jar -> /plugins/sqlite.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,507 INFO util.files :: Extract file /modules/sqlserver.metabase-driver.jar -> /plugins/sqlserver.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,516 INFO util.files :: Extract file /modules/sparksql.metabase-driver.jar -> /plugins/sparksql.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,564 INFO util.files :: Extract file /modules/druid.metabase-driver.jar -> /plugins/druid.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,569 INFO util.files :: Extract file /modules/vertica.metabase-driver.jar -> /plugins/vertica.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,571 INFO util.files :: Extract file /modules/athena.metabase-driver.jar -> /plugins/athena.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,644 INFO util.files :: Extract file /modules/googleanalytics.metabase-driver.jar -> /plugins/googleanalytics.metabase-driver.jar
metabase-1  | 2024-03-12 14:03:59,653 INFO util.files :: Extract file /modules/snowflake.metabase-driver.jar -> /plugins/snowflake.metabase-driver.jar
metabase-1  | 2024-03-12 14:04:00,087 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :snowflake...
metabase-1  | 2024-03-12 14:04:00,089 INFO driver.impl :: Registered driver :snowflake (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:04:00,102 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :athena...
metabase-1  | 2024-03-12 14:04:00,104 INFO driver.impl :: Registered driver :athena (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:04:00,118 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :mongo...
metabase-1  | 2024-03-12 14:04:00,119 INFO driver.impl :: Registered driver :mongo  🚚
metabase-1  | 2024-03-12 14:04:00,127 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :redshift...
metabase-1  | 2024-03-12 14:04:00,128 INFO driver.impl :: Registered driver :redshift (parents: [:postgres]) 🚚
metabase-1  | 2024-03-12 14:04:00,161 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :hive-like...
metabase-1  | 2024-03-12 14:04:00,163 INFO driver.impl :: Registered abstract driver :hive-like (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:04:00,164 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :sparksql...
metabase-1  | 2024-03-12 14:04:00,165 INFO driver.impl :: Registered driver :sparksql (parents: [:hive-like]) 🚚
metabase-1  | 2024-03-12 14:04:00,169 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :sqlite...
metabase-1  | 2024-03-12 14:04:00,170 INFO driver.impl :: Registered driver :sqlite (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:04:00,175 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :sqlserver...
metabase-1  | 2024-03-12 14:04:00,176 INFO driver.impl :: Registered driver :sqlserver (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:04:00,184 INFO plugins.dependencies :: Metabase cannot initialize plugin Metabase Oracle Driver due to required dependencies. Metabase requires the Oracle JDBC driver in order to connect to Oracle databases, but we can't ship it as part of Metabase due to licensing restrictions. See https://metabase.com/docs/latest/administration-guide/databases/oracle.html for more details.
metabase-1  | 
metabase-1  | 2024-03-12 14:04:00,187 INFO plugins.dependencies :: Metabase Oracle Driver dependency {:class oracle.jdbc.OracleDriver} satisfied? false
metabase-1  | 2024-03-12 14:04:00,188 INFO plugins.dependencies :: Plugins with unsatisfied deps: ["Metabase Oracle Driver"]
metabase-1  | 2024-03-12 14:04:00,192 INFO plugins.dependencies :: Metabase cannot initialize plugin Metabase Vertica Driver due to required dependencies. Metabase requires the Vertica JDBC driver in order to connect to Vertica databases, but we can't ship it as part of Metabase due to licensing restrictions. See https://metabase.com/docs/latest/administration-guide/databases/vertica.html for more details.
metabase-1  | 
metabase-1  | 2024-03-12 14:04:00,193 INFO plugins.dependencies :: Metabase Vertica Driver dependency {:class com.vertica.jdbc.Driver} satisfied? false
metabase-1  | 2024-03-12 14:04:00,194 INFO plugins.dependencies :: Plugins with unsatisfied deps: ["Metabase Oracle Driver" "Metabase Vertica Driver"]
metabase-1  | 2024-03-12 14:04:00,198 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :druid...
metabase-1  | 2024-03-12 14:04:00,199 INFO driver.impl :: Registered driver :druid  🚚
metabase-1  | 2024-03-12 14:04:00,205 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :googleanalytics...
metabase-1  | 2024-03-12 14:04:00,206 INFO driver.impl :: Registered driver :googleanalytics  🚚
metabase-1  | 2024-03-12 14:04:00,218 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :bigquery-cloud-sdk...
metabase-1  | 2024-03-12 14:04:00,219 INFO driver.impl :: Registered driver :bigquery-cloud-sdk (parents: [:sql]) 🚚
metabase-1  | 2024-03-12 14:04:00,234 DEBUG plugins.lazy-loaded-driver :: Registering lazy loading driver :presto-jdbc...
metabase-1  | 2024-03-12 14:04:00,235 INFO driver.impl :: Registered driver :presto-jdbc (parents: [:sql-jdbc]) 🚚
metabase-1  | 2024-03-12 14:04:00,261 INFO metabase.core :: Setting up and migrating Metabase DB. Please sit tight, this may take a minute...
metabase-1  | 2024-03-12 14:04:00,264 INFO db.setup :: Verifying postgres Database Connection ...
metabase-1  | 2024-03-12 14:04:02,893 INFO db.setup :: Successfully verified PostgreSQL 16.1 application database connection. ✅
metabase-1  | 2024-03-12 14:04:02,894 INFO db.setup :: Checking if a database downgrade is required...
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4743: {"sensor_id":"65f0503d1c30b0c1222d3b99","data":{"co":9,"co2":492,"mp10":118,"mp25":68,"no2":567,"rad":658},"timestamp":"2024-03-12T13:48:02.880256815Z"}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4744: {"sensor_id":"65f042d4b6b032e6b873d321","data":{"co":9,"co2":490,"mp10":126,"mp25":65,"no2":564,"rad":628},"timestamp":"2024-03-12T13:48:02.879628481Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dc5")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4745: {"sensor_id":"65f052819aaa09e60a915e1c","data":{"co":7,"co2":483,"mp10":122,"mp25":58,"no2":569,"rad":658},"timestamp":"2024-03-12T13:48:02.881239788Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dc6")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4746: {"sensor_id":"65ef0e8426d3e11550dcc2e6","data":{"co":8,"co2":500,"mp10":125,"mp25":63,"no2":565,"rad":641},"timestamp":"2024-03-12T13:48:02.879403424Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dc7")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4747: {"sensor_id":"65f052819aaa09e60a915e1d","data":{"co":8,"co2":486,"mp10":125,"mp25":61,"no2":547,"rad":635},"timestamp":"2024-03-12T13:48:02.88726991Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dc8")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4748: {"sensor_id":"65f0575382f1be93d94ae2ca","data":{"co":9,"co2":505,"mp10":128,"mp25":60,"no2":561,"rad":637},"timestamp":"2024-03-12T13:48:02.897612184Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dc9")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4749: {"sensor_id":"65f041fe2cb67aaec8b1ea6a","data":{"co":7,"co2":489,"mp10":118,"mp25":62,"no2":550,"rad":659},"timestamp":"2024-03-12T13:48:02.897691275Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dca")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4750: {"sensor_id":"65f0575382f1be93d94ae2c7","data":{"co":9,"co2":495,"mp10":128,"mp25":59,"no2":573,"rad":635},"timestamp":"2024-03-12T13:48:02.898943864Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dcb")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4751: {"sensor_id":"65f042d4b6b032e6b873d320","data":{"co":9,"co2":502,"mp10":117,"mp25":63,"no2":569,"rad":634},"timestamp":"2024-03-12T13:48:02.89903667Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dcc")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4752: {"sensor_id":"65f0575382f1be93d94ae2c8","data":{"co":8,"co2":514,"mp10":121,"mp25":60,"no2":555,"rad":634},"timestamp":"2024-03-12T13:48:02.901332048Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dcd")}
app         | 2024/03/12 14:04:04 Message on sensors_log_queue[4]@4753: {"sensor_id":"65f052819aaa09e60a915e1f","data":{"co":7,"co2":517,"mp10":119,"mp25":68,"no2":561,"rad":642},"timestamp":"2024-03-12T13:48:02.912210756Z"}
app         | 2024/03/12 14:04:04 Inserting log into the MongoDB collection with id: &{ObjectID("65f060d4ea77e1a1709a9dce")}
```

> [!NOTE]
> O comando responsável por rodar o sistema cria contianer para a simulação, visualização com Metabase, e para o app, que é composto por um consumer kafka e por uma interface responsável por armazenar os logs no banco de dados ( MongoDB ).

## Características do sistema

### Simulação:
O sistema de simulução é responsável por hidratar entidades do tipo retratado abaixo passando os seus respectivos parâmetros. Nesse sentido, temos, para cada sensor, um payload criado a partir de uma relação que calcula o [intervalo de confiaça](https://en.wikipedia.org/wiki/Confidence_interval) entre o intervalo do dados fornecido a partir do [z-crítico](https://pt.wikipedia.org/wiki/Testes_de_hip%C3%B3teses) também definido nos parâmetros da função "NewSensorPayload".

```golang
package main

import (
	"context"
	"encoding/json"
	"fmt"
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/henriquemarlon/hipercongo/internal/domain/entity"
	"github.com/henriquemarlon/hipercongo/internal/infra/repository"
	"github.com/henriquemarlon/hipercongo/internal/usecase"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"sync"
	"time"
)

func main() {
	options := options.Client().ApplyURI(
		fmt.Sprintf("mongodb+srv://%s:%s@%s/?retryWrites=true&w=majority&appName=%s",
			os.Getenv("MONGODB_ATLAS_USERNAME"),
			os.Getenv("MONGODB_ATLAS_PASSWORD"),
			os.Getenv("MONGODB_ATLAS_CLUSTER_HOSTNAME"),
			os.Getenv("MONGODB_ATLAS_APP_NAME")))
	client, err := mongo.Connect(context.TODO(), options)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	repository := repository.NewSensorRepositoryMongo(client, "mongodb", "sensors")
	findAllSensorsUseCase := usecase.NewFindAllSensorsUseCase(repository)

	sensors, err := findAllSensorsUseCase.Execute()
	if err != nil {
		log.Fatalf("Failed to find all sensors: %v", err)
	}

	var wg sync.WaitGroup
	for _, sensor := range sensors {
		wg.Add(1)
		log.Printf("Starting sensor: %v", sensor)
		go func(sensor usecase.FindAllSensorsOutputDTO) {
			defer wg.Done()
			opts := MQTT.NewClientOptions().AddBroker(
				fmt.Sprintf("ssl://%s:%s",
					os.Getenv("BROKER_TLS_URL"),
					os.Getenv("BROKER_PORT"))).SetUsername(
				os.Getenv("BROKER_USERNAME")).SetPassword(
				os.Getenv("BROKER_PASSWORD")).SetClientID(sensor.ID)
			client := MQTT.NewClient(opts)
			if session := client.Connect(); session.Wait() && session.Error() != nil {
				log.Fatalf("Failed to connect to MQTT broker: %v", session.Error())
			}
			for {
				payload, err := entity.NewSensorPayload(
					sensor.ID,
					sensor.Params,
					time.Now(),
				)
				if err != nil {
					log.Fatalf("Failed to create payload: %v", err)
				}

				jsonBytesPayload, err := json.Marshal(payload)
				if err != nil {
					log.Println("Error converting to JSON:", err)
				}

				token := client.Publish("sensors", 1, false, string(jsonBytesPayload))
				log.Printf("Published: %s, on topic: %s", string(jsonBytesPayload), "sensors")
				token.Wait()
				time.Sleep(120 * time.Second)
			}
		}(sensor)
	}
	wg.Wait()
}
```

### Mensageria:
Para interagir com a mensageira, existe aqui uma implementação de um consumer kafka que utiliza o pacote [confluent-kafka-go](https://github.com/confluentinc/confluent-kafka-go/v2/kafka) para receber as mensagens que foram enviadas pela simulação, na figura dos sensores, e, pela integração entre o Confluentic Cloud e o HiveMQ Cloud, foram enfileiradas na fila correspondente.

```golang
package kafka

import (
	"fmt"
	"log"

	ckafka "github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

type KafkaConsumer struct {
	ConfigMap *ckafka.ConfigMap
	Topics    []string
}

func NewKafkaConsumer(configMap *ckafka.ConfigMap, topics []string) *KafkaConsumer {
	return &KafkaConsumer{
		ConfigMap: configMap,
		Topics:    topics,
	}
}

func (c *KafkaConsumer) Consume(msgChan chan *ckafka.Message) error {
	consumer, err := ckafka.NewConsumer(c.ConfigMap)
	if err != nil {
		log.Printf("Error creating kafka consumer: %v", err)
	}
	err = consumer.SubscribeTopics(c.Topics, nil)
	if err != nil {
		log.Printf("Error subscribing to topics: %v", err)
	}
	for {
		msg, err := consumer.ReadMessage(-1)
		log.Printf("Message on %s: %s", msg.TopicPartition, string(msg.Value))
		if err == nil {
			msgChan <- msg
		} else {
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}
}
```

### Servidor WEB:
O servidor contém rotas de criação de sensores, criação de alertas e para pegar todos os alertas do banco de dados. Essa implementação utiliza o [chi](https://github.com/go-chi/chi) que é um roteador idiomático e combinável para construir serviços Go HTTP.

```golang
sensorsLogRepository := repository.NewSensorLogRepositoryMongo(client, "mongodb", "sensors_log")
createSensorLogUseCase := usecase.NewCreateSensorLogUseCase(sensorsLogRepository)
sensorsRepository := repository.NewSensorRepositoryMongo(client, "mongodb", "sensors")
createSensorUseCase := usecase.NewCreateSensorUseCase(sensorsRepository)
sensorHandlers := web.NewSensorHandlers(createSensorUseCase)

alertRepository := repository.NewAlertRepositoryMongo(client, "mongodb", "alerts")
createAlertUseCase := usecase.NewCreateAlertUseCase(alertRepository)
findAllAlertsUseCase := usecase.NewFindAllAlertsUseCase(alertRepository)
alertHandlers := web.NewAlertHandlers(createAlertUseCase, findAllAlertsUseCase)

//TODO: this is the best way to do this? need to refactor or find another way to start the server
router := chi.NewRouter()
router.Get("/alerts", alertHandlers.FindAllAlertsHandler)
router.Post("/alerts", alertHandlers.CreateAlertHandler)
router.Post("/sensors", sensorHandlers.CreateSensorHandler)
go http.ListenAndServe(":8080", router)
```
 
### Banco de dados:

Este recorte implementa um repositório para operações CRUD relacionadas a alertas em um banco de dados MongoDB. Ele utiliza a biblioteca oficial do MongoDB para Go, define uma estrutura AlertRepositoryMongo com métodos para criar alertas e recuperar todos os alertas armazenados. A função CreateAlert insere um alerta no MongoDB, enquanto a função FindAllAlerts recupera todos os alertas da coleção, decodificando os documentos BSON para a estrutura de dados apropriada. Em resumo, o código oferece uma abstração para interagir eficientemente com o MongoDB no contexto do gerenciamento de alertas:

```golang
package repository

import (
	"context"
	"log"
	"fmt"
	"encoding/json"
	"github.com/henriquemarlon/hipercongo/internal/domain/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type AlertRepositoryMongo struct {
	Collection *mongo.Collection
}

func NewAlertRepositoryMongo(client *mongo.Client, dbName string, collectionName string) *AlertRepositoryMongo {
	collection := client.Database(dbName).Collection(collectionName)
	return &AlertRepositoryMongo{
		Collection: collection,
	}
}

func (a *AlertRepositoryMongo) CreateAlert(alert *entity.Alert) (*mongo.InsertOneResult, error) {
	result, err := a.Collection.InsertOne(context.TODO(), alert)
	log.Printf("Inserting alert into the MongoDB collection")
	return result, err
}

func (a *AlertRepositoryMongo) FindAllAlerts() ([]*entity.Alert, error) {
	cur, err := a.Collection.Find(context.TODO(), bson.D{})
	log.Printf("Selecting all alerts from the MongoDB collection %s", a.Collection.Name())
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.TODO())

	var alerts []*entity.Alert
	for cur.Next(context.TODO()) {
		var alert bson.M
		err := cur.Decode(&alert)
		if err == mongo.ErrNoDocuments {
			fmt.Printf("No document was found")
			continue
		} else if err != nil {
			return nil, err
		}

		jsonAlertData, err := json.MarshalIndent(alert, "", " ")
		if err != nil {
			return nil, err
		}

		var alertData entity.Alert
		err = json.Unmarshal(jsonAlertData, &alertData)
		if err != nil {
			return nil, err
		}
		alerts = append(alerts, &alertData)
	}

	if err := cur.Err(); err != nil {
		return nil, err
	}

	return alerts, nil
}
```
Este outro recorte para interação com o banco de dados, implementa um repositório para logs de sensores no MongoDB. Ele fornece métodos para criar e armazenar logs no banco de dados, simplificando a interação entre o programa e o MongoDB:

```golang
package repository

import (
	"context"
	"github.com/henriquemarlon/hipercongo/internal/domain/entity"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
)

type SensorLogRepositoryMongo struct {
	Collection *mongo.Collection
}

func NewSensorLogRepositoryMongo(client *mongo.Client, dbName string, collection string) *SensorRepositoryMongo {
	sensorsColl := client.Database(dbName).Collection(collection)
	return &SensorRepositoryMongo{
		Collection: sensorsColl,
	}
}

func (s *SensorRepositoryMongo) CreateSensorLog(sensorLog *entity.Log) error {
	result, err := s.Collection.InsertOne(context.TODO(), sensorLog)
	log.Printf("Inserting log into the MongoDB collection with id: %s", result)
	return err
}
```

Este, por sua vez, implementa um repositório para interagir com um banco de dados MongoDB, permitindo criar sensores e recuperar informações sobre todos os sensores armazenados. Ele encapsula operações de criação e leitura, facilitando a interação entre o programa e o MongoDB:

```golang
package repository

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/henriquemarlon/hipercongo/internal/domain/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
)

type SensorRepositoryMongo struct {
	Collection *mongo.Collection
}

func NewSensorRepositoryMongo(client *mongo.Client, dbName string, sensorsCollection string) *SensorRepositoryMongo {
	collection := client.Database(dbName).Collection(sensorsCollection)
	return &SensorRepositoryMongo{
		Collection: collection,
	}
}

func (s *SensorRepositoryMongo) CreateSensor(sensor *entity.Sensor) (*mongo.InsertOneResult, error) {
	result, err := s.Collection.InsertOne(context.TODO(), sensor)
	log.Printf("Inserting sensor %s into the MongoDB collection: %s", result, s.Collection.Name())
	return result, err
}

func (s *SensorRepositoryMongo) FindAllSensors() ([]*entity.Sensor, error) {
	cur, err := s.Collection.Find(context.TODO(), bson.D{})
	log.Printf("Selecting all sensors from the MongoDB collection %s", s.Collection.Name())
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.TODO())

	var sensors []*entity.Sensor
	for cur.Next(context.TODO()) {
		var sensor bson.M
		err := cur.Decode(&sensor)
		if err == mongo.ErrNoDocuments {
			fmt.Printf("No document was found")
		} else if err != nil {
			return nil, err
		}

		jsonSensorData, err := json.MarshalIndent(sensor, "", " ")
		if err != nil {
			return nil, err
		}

		var sensorData entity.Sensor
		err = json.Unmarshal(jsonSensorData, &sensorData)
		if err != nil {
			return nil, err
		}
		sensors = append(sensors, &sensorData)
	}

	if err := cur.Err(); err != nil {
		return nil, err
	}
	return sensors, nil
}
```

### Visualização:

O Metabase é uma ferramenta de análise e visualização de dados de código aberto. Ele permite que usuários explorem, visualizem e compartilhem insights a partir de conjuntos de dados, sem a necessidade de conhecimento avançado em SQL ou programação. O Metabase facilita a criação de painéis interativos e consultas personalizadas, tornando a análise de dados mais acessível para uma variedade de usuários. Nesse projeto, ele é utilizado para a visualização das entidades presentes no banco de dados, criando gráficos, mapas e outros insights. Abaixo uma visão geral do dashboard criado: 

![image](https://github.com/henriquemarlon/hipercongo/assets/89201795/077ca06b-59d9-483b-9d9f-7969dcf851b8)

## Desenvolvimento Orientado a Testes
A adoção do TDD (Desenvolvimento Orientado a Testes) é uma prática que oferece inúmeros benefícios no processo de desenvolvimento de software. Além de proporcionar feedback imediato sobre as novas funcionalidades, como mencionado anteriormente, o TDD promove a criação de um código mais limpo. Isso ocorre porque os desenvolvedores escrevem códigos simples, focados na passagem dos testes, resultando em uma base de código mais clara e fácil de manter. Essa abordagem não apenas acelera o ciclo de desenvolvimento, mas também contribui para a sustentabilidade e qualidade a longo prazo do software. Segue abaixo uma breve explicação de como esse projeto implementa isso.

### Testes unitários:

O teste TestEntropy avalia se a função Entropy retorna valores dentro do intervalo esperado. O teste TestNewSensor verifica a criação correta de um Sensor. O teste TestNewSensorPayload assegura que a criação de um SensorPayload inicialize corretamente os atributos e que os valores estejam nos intervalos adequados. Há também planos futuros (TODO) para adicionar testes que lidem com casos específicos e parâmetros inválidos.

```golang
package entity

import (
	"testing"
	"time"
)

func TestEntropy(t *testing.T) {
	entropy := Entropy([]float64{0, 100})
	if entropy <= 0 && entropy >= 100 {
		t.Errorf("Entropy should be between 0 and 100")
	}
}

func TestNewSensor(t *testing.T) {
	sensor := NewSensor("name", 0, 0, map[string]Param{"key": {Min: 0, Max: 100, Factor: 0.5}})
	if sensor.Name != "name" {
		t.Errorf("Name should be name")
	}
	if sensor.Latitude != 0 {
		t.Errorf("Latitude should be 0")
	}
	if sensor.Longitude != 0 {
		t.Errorf("Longitude should be 0")
	}
}

func TestNewSensorPayload(t *testing.T) {
	sensorPayload, _ := NewSensorPayload("id", map[string]Param{"key": {Min: 0, Max: 100, Factor: 0.5}}, time.Now())
	if sensorPayload.Sensor_ID != "id" {
			t.Errorf("Sensor_ID should be id")
	}
	if value, ok := sensorPayload.Data["key"].(float64); ok {
			if !(value <= 180 && value >= 0) {
					t.Errorf("Invalid value for Data['key'], expected outside the range %v and %v, got %v", 0, 100, value)
			}
	} else {
			t.Errorf("Invalid type for Data['key']")
	}
}


//TODO: add test for NewSensorPayload() with invalid params

//TODO: add test for NewSensorPayload() with invalid sensor_id

//TODO: add test for NewSensorPayload() with invalid data

//TODO: add test for NewSensorPayload() testing confidence interval

//TODO: add test for NewSensorPayload() with invalid timestamp
```
Este teste avalia a função NewLog do pacote entity. Ele cria uma instância de Log com valores específicos e, em seguida, verifica se os atributos Sensor_ID e Data são inicializados corretamente. Se algum desses valores não estiver de acordo com as expectativas, o teste emite uma mensagem de erro indicando a discrepância. O teste tem como objetivo assegurar que a função de criação de logs esteja produzindo objetos com os valores desejados.

```golang
package entity

import (
	"testing"
	"time"
)

func TestNewLog(t *testing.T) {
	log := NewLog("id", map[string]interface{}{"key": "value"}, time.Now())
	if log.Sensor_ID != "id" {
		t.Errorf("Sensor_ID should be id")
	}
	if log.Data["key"] != "value" {
		t.Errorf("Data should be value")
	}
}
```

Este teste verifica a função NewAlert do pacote entity. Ele cria uma instância de Alert com valores específicos e, em seguida, verifica se os atributos Latitude, Longitude e Option são inicializados corretamente. Se algum desses valores não estiver de acordo com as expectativas, o teste emite uma mensagem de erro indicando a discrepância. O teste tem o objetivo de garantir que a função de criação de alertas esteja produzindo objetos com os valores desejados.

```golang
package entity

import (
	"testing"
)

func TestNewAlert(t *testing.T) {
	alert := NewAlert(0, 0, "")
	if alert.Latitude != 0 {
		t.Errorf("Latitude should be 0")
	}
	if alert.Longitude != 0 {
		t.Errorf("Longitude should be 0")
	}
	if alert.Option != "" {
		t.Errorf("Option should be empty")
	}
}
```

### Testes de integração:
Os testes de integração até agora implementados, tem como objetivo avaliar os seguintes pontos: QoS ( Se a mensagem é transmitida dentro do sistema com o QoS definido inicialmente ), Frequência de envio das mensagens ( As mensagens estão sendo enviadas na frequência definida, com uma margem de erro razoável? ), Integridade das mensagens ( A estrutura as mensagens se modifica durante a o processo transmissão? ). Para encontrar mais detalhes sobre a implementação dos testes de integração, acesse o [arquivo](https://github.com/henriquemarlon/hipercongo/blob/main/test/integration_mqtt_test.go).

## Demonstração do Sistema
https://www.loom.com/share/5f4feeed73f441d893af32ac05482f0e?sid=a648845d-7078-47ab-ac55-19d776d9bcc5

[^1]: A estrutura de pastas escolhida para este projeto está de acordo com as convenções e padrões utilizados pela comunidade de desenvolvedores Golang.

[^2]: As entidades, repositórios e usecases estão de acordo com os padrões previstos para a arquitetura hexagonal.
