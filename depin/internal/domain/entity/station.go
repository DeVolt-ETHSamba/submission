package entity

import (
	"math"
	"math/rand"
	"time"
)

type StationRepository interface {
	FindAllStations() ([]*Station, error)
}

type StationLogRepository interface {
	AddInput(data *StationLog) error
}

type Station struct {
	ID        string                 `json:"_id"`
	Latitude  float64                `json:"latitude"`
	Longitude float64                `json:"longitude"`
	Params    map[string]interface{} `json:"params"`
}

type StationLog struct {
	Sensor_ID string                 `json:"sensor_id"`
	Data      map[string]interface{} `json:"data"`
	Timestamp time.Time              `json:"timestamp"`
}

type StationPayload struct {
	Station_ID string    `json:"station_id"`
	Battery    float64   `json:"battery"`
	Percent    float64   `json:"percent"`
	Timestamp  time.Time `json:"timestamp"`
}

func NewStationLog(id string, data map[string]interface{}, timestamp time.Time) *StationLog {
	return &StationLog{Sensor_ID: id, Data: data, Timestamp: timestamp}
}

func Entropy(min float64, max float64) float64 {
	rand.NewSource(time.Now().UnixNano())
	return math.Round(rand.Float64()*(max-min) + min)
}

func NewStationPayload(id string, params map[string]interface{}, timestamp time.Time) (*StationPayload, error) {
	min, ok := params["min"].(float64)
	if !ok {
			panic("min value not found or not a float64")
	}
	max, ok := params["max"].(float64)
	if !ok {
			panic("max value not found or not a float64")
	}

	batteryValue := Entropy(min, max)
	batteryPercent := (batteryValue - min) / (max - min) * 100

	return &StationPayload{
			Station_ID: id,
			Battery:    batteryValue,
			Percent:    batteryPercent,
			Timestamp:  timestamp,
	}, nil
}