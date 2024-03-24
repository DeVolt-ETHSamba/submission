package repository

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/DeVolt-ETHSamba/depin/internal/domain/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
)

type StationRepositoryMongo struct {
	Collection *mongo.Collection
}

func NewStationRepositoryMongo(client *mongo.Client, dbName string, stationsCollection string) *StationRepositoryMongo {
	collection := client.Database(dbName).Collection(stationsCollection)
	return &StationRepositoryMongo{
		Collection: collection,
	}
}

func (s *StationRepositoryMongo) FindAllStations() ([]*entity.Station, error) {
	cur, err := s.Collection.Find(context.TODO(), bson.D{})
	log.Printf("Selecting all stations from the MongoDB collection %s", s.Collection.Name())
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.TODO())

	var stations []*entity.Station
	for cur.Next(context.TODO()) {
		var sensor bson.M
		err := cur.Decode(&sensor)
		if err == mongo.ErrNoDocuments {
			fmt.Printf("No document was found")
		} else if err != nil {
			return nil, err
		}

		jsonStationData, err := json.MarshalIndent(sensor, "", " ")
		if err != nil {
			return nil, err
		}

		var sensorData entity.Station
		err = json.Unmarshal(jsonStationData, &sensorData)
		if err != nil {
			return nil, err
		}
		stations = append(stations, &sensorData)
	}

	if err := cur.Err(); err != nil {
		return nil, err
	}
	return stations, nil
}