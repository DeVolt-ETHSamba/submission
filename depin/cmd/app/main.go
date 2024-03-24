package main

import (
	ckafka "github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"github.com/DeVolt-ETHSamba/depin/internal/infra/kafka"
	"log"
	"os"
)

func main() {
	msgChan := make(chan *ckafka.Message)
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers":  os.Getenv("CONFLUENT_BOOTSTRAP_SERVER_SASL"),
		"sasl.mechanisms":    "PLAIN",
		"security.protocol":  "SASL_SSL",
		"sasl.username":      os.Getenv("CONFLUENT_API_KEY"),
		"sasl.password":      os.Getenv("CONFLUENT_API_SECRET"),
		"session.timeout.ms": 6000,
		"group.id":           "orbit-city",
		"auto.offset.reset":  "latest",
	}

	kafkaRepository := kafka.NewKafkaConsumer(configMap, []string{os.Getenv("CONFLUENT_KAFKA_TOPIC_NAME")})
	go func() {
		if err := kafkaRepository.Consume(msgChan); err != nil {
			log.Printf("Error consuming kafka queue: %v", err)
		}
	}()

	for msg := range msgChan {
		log.Printf("Message on %s: %s 2", msg.TopicPartition, string(msg.Value))
	}
}
