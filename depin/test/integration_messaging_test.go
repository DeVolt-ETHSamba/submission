package test

// import (
// 	"context"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"os"
// 	"testing"
// 	"time"

// 	ckafka "github.com/confluentinc/confluent-kafka-go/v2/kafka"
// 	"github.com/henriquemarlon/hipercongo/internal/infra/kafka"
// 	"github.com/henriquemarlon/hipercongo/internal/usecase"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// 	"github.com/joho/godotenv"
// )

// func TestIntegration(t *testing.T) {
// 	err := godotenv.Load("../config/.env")
// 	if err != nil {
// 		t.Errorf("Error loading .env file: %v", err)
// 	}

// 	options := options.Client().ApplyURI(fmt.Sprintf("mongodb+srv://%s:%s@%s/?retryWrites=true&w=majority&appName=%s", os.Getenv("MONGODB_ATLAS_USERNAME"), os.Getenv("MONGODB_ATLAS_PASSWORD"), os.Getenv("MONGODB_ATLAS_CLUSTER_HOSTNAME"), os.Getenv("MONGODB_ATLAS_APP_NAME")))
// 	client, err := mongo.Connect(context.Background(), options)
// 	if err != nil {
// 		t.Errorf("Failed to connect to MongoDB: %v", err)
// 	}

// 	err = client.Ping(context.Background(), nil)
// 	if err != nil {
// 		t.Errorf("Failed to ping MongoDB: %v", err)
// 	}

// 	msgChan := make(chan *ckafka.Message)

// 	configMap := &ckafka.ConfigMap{
// 		"bootstrap.servers":  os.Getenv("CONFLUENT_BOOTSTRAP_SERVER_SASL"),
// 		"sasl.mechanisms":    "PLAIN",
// 		"security.protocol":  "SASL_SSL",
// 		"sasl.username":      os.Getenv("CONFLUENT_API_KEY"),
// 		"sasl.password":      os.Getenv("CONFLUENT_API_SECRET"),
// 		"session.timeout.ms": 6000,
// 		"group.id":           "hipercongo",
// 		"auto.offset.reset":  "latest",
// 	}

// 	kafkaRepository := kafka.NewKafkaConsumer(configMap, []string{os.Getenv("CONFLUENT_KAFKA_TOPIC_NAME")})

// 	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
// 	defer cancel()

// 	go func() {
// 		if err := kafkaRepository.Consume(msgChan); err != nil {
// 			log.Printf("Error consuming kafka queue: %v", err)
// 		}
// 	}()

// ProcessingLoop:
// 	for {
// 		select {
// 		case msg, ok := <-msgChan:
// 			if !ok {
// 				break ProcessingLoop
// 			}

// 			dto := usecase.CreateSensorLogInputDTO{}
// 			err := json.Unmarshal(msg.Value, &dto)
// 			log.Printf("Unmarshalling msg into JSON: %v", dto)
// 			if err != nil {
// 				t.Errorf("Failed to unmarshal JSON: %v", err)
// 			}

// 			// TODO: Add your processing logic here

// 		case <-ctx.Done():
// 			log.Println("Timeout reached, terminating...")
// 			break ProcessingLoop
// 		}
// 	}

// 	client.Disconnect(context.Background())
// }

