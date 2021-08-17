package covidModule

import (
	"database/sql"
	"errors"
	"log"
)

type storage struct {
	ReportDB *sql.DB
}

func newStorage(db *sql.DB) *storage {
	return &storage{
		ReportDB: db,
	}
}

func (s *storage) AddCase(data InsertCasesRequest) (CasesResponse, error) {
	var resp CasesResponse
	var id int64

	if err := s.ReportDB.QueryRow(addCaseQuery,
		data.Country,
		data.CountryCode,
		data.Province,
		data.Lat,
		data.Lon,
		data.Confirmed,
		data.Deaths,
		data.Recovered,
		data.Active,
	).Scan(&id); err != nil {
		log.Println("[CovidModule][AddCase][storage] problem querying to db, err ", err.Error())
		return resp, err
	}

	resp = CasesResponse{
		ID: id,
	}
	return resp, nil
}

func (s *storage) GetCovidCase(id int64) (CasesResponse, error) {
	var resp CasesResponse

	if err := s.ReportDB.QueryRow(getCovidCaseQuery, id).Scan(
		&resp.Country,
		&resp.Province,
		&resp.Confirmed,
		&resp.Deaths,
		&resp.Recovered,
		&resp.Active,
	); err != nil {
		log.Println("[CovidModule][GetCovidCase][storage] problem querying to db, err ", err.Error())
		return resp, err
	}

	resp.ID = id
	return resp, nil
}

func (s *storage) UpdateCovidCase(id int64, data UpdateCasesRequest) (CasesResponse, error) {
	var resp CasesResponse
	query, values := data.BuildQuery(id)
	res, err := s.ReportDB.Exec(query, values...)
	if err != nil {
		log.Println("[ProductModule][UpdateCovidCase] problem querying to db, err ", err.Error())
		return resp, err
	}
	rowEffected, err := res.RowsAffected()
	if err != nil {
		log.Println("[ProductModule][UpdateCovidCase] problem querying to db, err ", err.Error())
		return resp, err
	}
	if rowEffected == 0 {
		log.Println("[ProductModule][UpdateCovidCase] problem querying to db, err ", err.Error())
		return resp, errors.New("now rows effected in db")
	}

	return CasesResponse{
		ID: id,
	}, nil
}
