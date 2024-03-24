package main

import (
	"context"
	"encoding/json"
	"fmt"
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/DeVolt-ETHSamba/depin/internal/domain/entity"
	"github.com/DeVolt-ETHSamba/depin/internal/infra/repository"
	"github.com/DeVolt-ETHSamba/depin/internal/usecase"
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

	repository := repository.NewStationRepositoryMongo(client, "mongodb", "stations")
	findAllStationsUseCase := usecase.NewFindAllStationsUseCase(repository)

	stations, err := findAllStationsUseCase.Execute()
	if err != nil {
		log.Fatalf("Failed to find all stations: %v", err)
	}

	var wg sync.WaitGroup
	for _, station := range stations {
		wg.Add(1)
		log.Printf("Starting station: %v", station)
		go func(station usecase.FindAllStationsOutputDTO) {
			defer wg.Done()
			opts := MQTT.NewClientOptions().AddBroker(
				fmt.Sprintf("ssl://%s:%s",
					os.Getenv("BROKER_TLS_URL"),
					os.Getenv("BROKER_PORT"))).SetUsername(
				os.Getenv("BROKER_USERNAME")).SetPassword(
				os.Getenv("BROKER_PASSWORD")).SetClientID(station.ID)
			client := MQTT.NewClient(opts)
			if session := client.Connect(); session.Wait() && session.Error() != nil {
				log.Fatalf("Failed to connect to MQTT broker: %v", session.Error())
			}
			for {
				payload, err := entity.NewStationPayload(
					station.ID,
					station.Params,
					time.Now(),
				)
				if err != nil {
					log.Fatalf("Failed to create payload: %v", err)
				}

				jsonBytesPayload, err := json.Marshal(payload)
				if err != nil {
					log.Println("Error converting to JSON:", err)
				}

				token := client.Publish("stations", 1, false, string(jsonBytesPayload))
				log.Printf("Published: %s, on topic: %s", string(jsonBytesPayload), "stations")
				token.Wait()
				time.Sleep(120 * time.Second)
			}
		}(station)
	}
	wg.Wait()
}
