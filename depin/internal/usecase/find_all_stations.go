package usecase

import (
	"github.com/DeVolt-ETHSamba/depin/internal/domain/entity"
)

type FindAllStationsUseCase struct {
	StationRepository entity.StationRepository
}

type FindAllStationsOutputDTO struct {
	ID        string                 `json:"sensor_id"`
	Name      string                 `json:"name"`
	Latitude  float64                `json:"latitude"`
	Longitude float64                `json:"longitude"`
	Params    map[string]interface{} `json:"params"`
}

func NewFindAllStationsUseCase(stationRepository entity.StationRepository) *FindAllStationsUseCase {
	return &FindAllStationsUseCase{StationRepository: stationRepository}
}

func (f *FindAllStationsUseCase) Execute() ([]FindAllStationsOutputDTO, error) {
	stations, err := f.StationRepository.FindAllStations()
	if err != nil {
		return nil, err
	}
	var output []FindAllStationsOutputDTO
	for _, station := range stations {
		output = append(output, FindAllStationsOutputDTO{
			ID:        station.ID,
			Latitude:  station.Latitude,
			Longitude: station.Longitude,
			Params:    station.Params,
		})
	}
	return output, nil
}
