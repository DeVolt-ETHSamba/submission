package test

// import (
// 	"context"
// 	"encoding/json"
// 	"fmt"
// 	MQTT "github.com/eclipse/paho.mqtt.golang"
// 	"github.com/henriquemarlon/hipercongo/internal/infra/repository"
// 	"github.com/henriquemarlon/hipercongo/internal/usecase"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// 	"log"
// 	"os"
// 	"sort"
// 	"testing"
// 	"time"
// 	"github.com/joho/godotenv"
// )

// type DTO struct {
// 	ID        string                 `json:"sensor_id"`
// 	Data      map[string]interface{} `json:"data"`
// 	Timestamp time.Time              `json:"timestamp"`
// }

// func TestMqttIntegration(t *testing.T) {
// 	err := godotenv.Load("../config/.env")
// 	if err != nil {
// 		t.Errorf("Error loading .env file: %v", err)
// 	}
// 	options := options.Client().ApplyURI(
// 		fmt.Sprintf("mongodb+srv://%s:%s@%s/?retryWrites=true&w=majority&appName=%s",
// 			os.Getenv("MONGODB_ATLAS_USERNAME"),
// 			os.Getenv("MONGODB_ATLAS_PASSWORD"),
// 			os.Getenv("MONGODB_ATLAS_CLUSTER_HOSTNAME"),
// 			os.Getenv("MONGODB_ATLAS_APP_NAME")))
// 	mongoClient, err := mongo.Connect(context.TODO(), options)
// 	if err != nil {
// 		log.Fatalf("Failed to connect to MongoDB: %v", err)
// 	}

// 	err = mongoClient.Ping(context.TODO(), nil)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	var receipts []DTO
// 	var timestamps []time.Time

// 	repository := repository.NewSensorRepositoryMongo(mongoClient, "mongodb", "sensors")
// 	findAllSensorsUseCase := usecase.NewFindAllSensorsUseCase(repository)

// 	sensors, err := findAllSensorsUseCase.Execute()
// 	if err != nil {
// 		log.Fatalf("Failed to find all sensors: %v", err)
// 	}

// 	var firstSensorID string

// 	if len(sensors) > 0 {
// 		firstSensorID = sensors[0].ID
// 	} else {
// 		log.Fatal("No sensors found")
// 	}

// 	var handler MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
// 		if msg.Qos() != 1 {
// 			t.Errorf("Expected QoS 1, got %d", msg.Qos())
// 		}
// 		var dto DTO
// 		err := json.Unmarshal(msg.Payload(), &dto)
// 		if err != nil {
// 			t.Errorf("Error unmarshalling payload: %s", err)
// 		}
// 		receipts = append(receipts, dto)
// 		if dto.ID == firstSensorID {
// 			timestamps = append(timestamps, dto.Timestamp)
// 		}
// 	}

// 	opts := MQTT.NewClientOptions().AddBroker(
// 		fmt.Sprintf("ssl://%s:%s", os.Getenv("BROKER_TLS_URL"),
// 			os.Getenv("BROKER_PORT"))).SetUsername(
// 		os.Getenv("BROKER_USERNAME")).SetPassword(
// 		os.Getenv("BROKER_PASSWORD")).SetClientID("test-id")
// 	opts.SetDefaultPublishHandler(handler)

// 	mqttClient := MQTT.NewClient(opts)

// 	if token := mqttClient.Connect(); token.Wait() && token.Error() != nil {
// 		panic(token.Error())
// 	}

// 	go func() {
// 		if token := mqttClient.Subscribe("sensors", 1, nil); token.Wait() && token.Error() != nil {
// 			fmt.Println(token.Error())
// 			return
// 		}
// 	}()

// 	defer mqttClient.Disconnect(500)

// 	time.Sleep(300 * time.Second)

// 	if len(receipts) < len(sensors) {
// 		t.Errorf("Messages receipts received less than expected %v", len(receipts))
// 	} else {
// 		if len(timestamps) >= 2 {
// 			if len(timestamps) < 2 {
// 				t.Error("Less than 2 timestamps provided")
// 			} else {
// 				sort.Slice(timestamps, func(i, j int) bool {
// 					return timestamps[i].Before(timestamps[j])
// 				})
// 				totalDifference := timestamps[len(timestamps)-1].Sub(timestamps[0])
// 				errorMargin := 5 * time.Second
// 				desiredDifference := 2 * time.Minute
// 				isLessThanOneMinutePlusError := totalDifference.Seconds()/float64(len(timestamps)-1) >= (desiredDifference.Seconds()-errorMargin.Seconds()) && totalDifference.Seconds()/float64(len(timestamps)-1) <= (desiredDifference.Seconds()+errorMargin.Seconds())
// 				if !isLessThanOneMinutePlusError {
// 					t.Error("No matching messages found with a 1-minute timestamp difference")
// 				}
// 			}
// 		}
// 	}
// }
