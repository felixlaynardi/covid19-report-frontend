package covidModule

import (
	"database/sql"
	"log"
)

type Module struct {
	Storage *storage
}

func NewCovidModule(db *sql.DB) *Module {
	return &Module{
		Storage: newStorage(db),
	}
}

func (c *Module) AddCase(data InsertCasesRequest) (CasesResponse, error) {
	//response from func [covidModule][storage][addCase]
	resp, err := c.Storage.AddCase(data)
	if err != nil {
		log.Println("[CovidModule][AddCase] problem in getting from storage", err.Error())
		return resp, err
	}
	return resp, nil
}

func (c *Module) GetCovidCase(id int64) (CasesResponse, error) {
	var resp CasesResponse
	var err error

	resp, err = c.Storage.GetCovidCase(id)
	if err != nil {
		log.Println("[CovidModule][GetCase] problem in getting storage data, ", err.Error())
		return resp, err
	}
	return resp, nil
}

func (c *Module) UpdateCovidCase(id int64, data UpdateCasesRequest) (CasesResponse, error) {
	resp, err := c.Storage.UpdateCovidCase(id, data)
	if err != nil {
		log.Println("[CovidModule]UpdateCovidCase] problem in getting storage data, ", err.Error())
		return resp, err
	}
	return resp, nil
}
