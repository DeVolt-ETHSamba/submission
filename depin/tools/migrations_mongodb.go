// init-mongo.go
package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
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
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connection established successfully")
	db := client.Database("mongodb")
	collection := db.Collection("stations")
	documents := []interface{}{
		map[string]interface{}{
			"latitude":  -23.562387,
			"longitude": -46.711777,
			"params":    map[string]interface{}{"min": 0.0, "max": 1000.5},
		},
		map[string]interface{}{
			"latitude":  -23.562387,
			"longitude": -46.711777,
			"params":    map[string]interface{}{"min": 0.0, "max": 1000.5},
		},
		map[string]interface{}{
			"latitude":  -23.562387,
			"longitude": -46.711777,
			"params":    map[string]interface{}{"min": 0.0, "max": 1000.5},
		},
		map[string]interface{}{
			"latitude":  -23.562387,
			"longitude": -46.711777,
			"params":    map[string]interface{}{"min": 0.0, "max": 1000.5},
		},
		map[string]interface{}{
			"latitude":  -23.562387,
			"longitude": -46.711777,
			"params":    map[string]interface{}{"min": 0.0, "max": 1000.5},
		},
		map[string]interface{}{
			"latitude":  -23.562387,
			"longitude": -46.711777,
			"params":    map[string]interface{}{"min": 0.0, "max": 1000.5},
		},
	}
	insertResult, err := collection.InsertMany(context.TODO(), documents)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Documents inserted. IDs: %v\n", insertResult.InsertedIDs)

	err = client.Disconnect(context.TODO())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connection to MongoDB closed.")
}
