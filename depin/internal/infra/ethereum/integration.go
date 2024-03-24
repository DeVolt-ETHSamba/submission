package ethereum

// import (
// 	"context"
// 	"github.com/DeVolt-ETHSamba/depin/internal/domain/entity"
// 	"go.mongodb.org/mongo-driver/mongo"
// )

// type StationRepositoryGoEthereum struct {
// 	Contract string

// }

// func NewStationLogRepositoryGoEthereum(client *mongo.Client, dbName string, collection string) *StationRepositoryGoEthereum {
// 	sensorsColl := client.Database(dbName).Collection(collection)
// 	return &StationRepositoryGoEthereum{
// 		Collection: sensorsColl,
// 	}
// }

// func (s *StationRepositoryGoEthereum) AddInput(data *entity.StationLog) error {
// 	_, err := s.Collection.InsertOne(context.TODO(), data)
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }
