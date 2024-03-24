package ethereum

import (
	"encoding/json"
	"github.com/DeVolt-ETHSamba/depin/internal/infra/ethereum/contracts"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"math/big"
	"time"
)

type Data struct {
	StationId string    `json:"station_id"`
	Battery   int       `json:"battery"`
	Percent   float64   `json:"percent"`
	Timestamp time.Time `json:"timestamp"`
}

type EthereumService struct {
	ethClient     *ethclient.Client
	writeOpts     *bind.TransactOpts
	readOpts      *bind.CallOpts
	tokenContract *contracts.Token
}

func NewEthereumService(nodeUrl, privateKey, contractAddress string) (*EthereumService, error) {
	client, err := ethclient.Dial(nodeUrl)
	if err != nil {
		return nil, err
	}

	chainID := big.NewInt(534351)
	pk, err := crypto.HexToECDSA(privateKey)
	if err != nil {
		return nil, err
	}

	opts, err := bind.NewKeyedTransactorWithChainID(pk, chainID)
	if err != nil {
		return nil, err
	}

	instance, err := contracts.NewToken(common.HexToAddress(contractAddress), client)
	if err != nil {
		return nil, err
	}

	return &EthereumService{
		ethClient:     client,
		writeOpts:     opts,
		readOpts:      &bind.CallOpts{},
		tokenContract: instance,
	}, nil
}

func (e *EthereumService) Insert(input string) error {
	_, err := e.tokenContract.InputData(e.writeOpts, input)
	return err
}

func (e *EthereumService) Get() ([]Data, error) {
	logs, _ := e.tokenContract.GetData(e.readOpts)

	var data []Data
	for _, log := range logs {
		if !json.Valid([]byte(log)) {
			data = append(data, Data{})
			continue
		}
		var d Data
		err := json.Unmarshal([]byte(log), &d)
		if err != nil {
			return nil, err
		}
		data = append(data, d)
	}

	return data, nil
}
