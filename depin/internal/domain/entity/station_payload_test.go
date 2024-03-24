package entity

// import (
// 	"testing"
// 	"time"
// )

// func TestEntropy(t *testing.T) {
// 	entropy := Entropy(0, 100)
// 	if entropy <= 0 || entropy >= 100 {
// 			t.Errorf("Entropy should be between 0 and 100")
// 	}
// }

// func TestNewStationPayload(t *testing.T) {
// 	timestamp := time.Now()
// 	interval := map[string]interface{}{
// 			"interval": map[string]float64{
// 					"min": 0,
// 					"max": 100,
// 			},
// 	}
// 	stationPayload := NewStationPayload("id", interval, timestamp)
// 	if stationPayload.Station_ID != "id" {
// 			t.Errorf("Station_ID should be id")
// 	}
// 	if stationPayload.Battery < 0 || stationPayload.Battery > 100 {
// 			t.Errorf("Battery value should be between 0 and 100")
// 	}
// 	if stationPayload.Percent < 0 || stationPayload.Percent > 1 {
// 			t.Errorf("Percent value should be between 0 and 1")
// 	}
// }