# Depin

The code contained in this repository represents the simulation system, messaging, visualization (Metabase), web server, and NoSQL database (MongoDB) of a **Hyperconnectivity for Smart Cities** project. This project was built according to the [golang-standards](https://github.com/golang-standards/project-layout) [^1]. Furthermore, the [hexagonal](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749) architecture was also implemented, given the high scalability requirement defined for the project [^2].

## Dependencies and Services

Before proceeding, it is necessary to install the dependencies and set up the listed services for executing the subsequent commands. Follow the instructions below:

- Kafka Cluster - [Confluent Cloud](https://docs.confluent.io/cloud/current/clusters/create-cluster.html#create-ak-clusters)
- MQTT Cluster - [HiveMQ Cloud](https://www.hivemq.com/article/step-by-step-guide-using-hivemq-cloud-starter-iot/)
- MongoDB Cluster - [MongoDB Atlas](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup)
- PostgresSQL Instance - [RDS](https://aws.amazon.com/getting-started/hands-on/create-connect-postgresql-db/) 
- Docker Engine - [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- Build Essential - [What is Build Essential Package in Ubuntu?](https://itsfoss.com/build-essential-ubuntu/)

## Running the System

Follow the instructions below to run the system along with all its components, simulation, messaging, database, and visualization with Metabase.

### Define environment variables:
Run the command below and fill in the respective environment variables in the `.env` file created inside the `/config` folder.

#### Command:
```shell
make env
```

> [!NOTE]
> Before filling in the `.env` file, it's necessary to create the cloud services mentioned in the [Dependencies and Services](https://github.com/henriquemarlon/hipercongo/edit/main/README.md#dependencies-and-services) section.

### Run migrations:
Migrations refer to the set of "queries" created to bring agility to the development process, which create sensors in the database that will be used to build the simulation.

#### Command:
```shell
make migrations
```

> [!NOTE]
> In a real scenario, we wouldn't need a file like this because the sensors would be created by a frontend+backend that would insert them into the sensor database.

### Run tests:

Here, all necessary commands are being abstracted by a Makefile. If you're curious about what the command below does, you can check it [here]().

#### Command:

```shell
make tests
```

> [!NOTE]
> The test pipeline defined here is responsible for testing the system's entities and for performing an integration test ensuring delivery, integrity, and data transmission frequency, as well as message QoS.

### Run test coverage visualization:

Once again, all necessary commands are being abstracted by a Makefile. If you're curious about what the command below does, you can check it [here]().

#### Command:

```bash
make coverage 
```

> [!NOTE]
> - This command is creating a visualization of test coverage in the main Go files from the `coverage_sheet.md` file.

### Run the system:

Once again, all necessary commands are being abstracted by a Makefile. If you're curious about what the command below does, you can check it [here]().

#### Command:

```bash
make run
```

> [!NOTE]
> The command responsible for running the system creates containers for the simulation, visualization with Metabase, and for the app, which consists of a Kafka consumer and an interface responsible for storing logs in the database (MongoDB).

[^1]: The folder structure chosen for this project complies with the conventions and standards used by the Golang developer community.

[^2]: The entities, repositories, and use cases comply with the standards provided for the hexagonal architecture.
