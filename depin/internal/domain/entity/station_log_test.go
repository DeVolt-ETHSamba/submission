package entity

import (
	"testing"
	"time"
)

func TestNewLog(t *testing.T) {
	log := NewStationLog("id", map[string]interface{}{"key": "value"}, time.Now())
	if log.Sensor_ID != "id" {
		t.Errorf("Sensor_ID should be id")
	}
	if log.Data["key"] != "value" {
		t.Errorf("Data should be value")
	}
}