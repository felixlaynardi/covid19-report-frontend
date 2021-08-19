package main

import (
	"log"

	"github.com/felixlaynardi/covid19-report/backend/rest/database"
)

func main() {
	dbConfig := database.Config{
		User:     "covid",
		Password: "admin",
		DBName:   "covid19_data",
		Port:     9001,
		Host:     "localhost",
		SSLMode:  "disable",
	}

	db := database.GetDatabaseConnection(dbConfig)
	if err := db.Ping(); err != nil {
		log.Fatal("[Main] database is unreachable", err.Error())
	}
	//pm := covidModule.NewCovidModule(db)

}
