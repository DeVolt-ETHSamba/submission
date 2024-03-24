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