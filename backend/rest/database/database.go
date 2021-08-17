package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type Config struct {
	User     string
	Password string
	DBName   string
	Host     string
	Port     int
	SSLMode  string
}

const (
	DBCredentialFormat = "user=%s password=%s dbname=%s host=%s port=%d sslmode=%s"
)

func GetDatabaseConnection(cfg Config) *sql.DB {
	address := fmt.Sprintf(DBCredentialFormat,
		cfg.User,
		cfg.Password,
		cfg.DBName,
		cfg.Host,
		cfg.Port,
		cfg.SSLMode,
	)

	//init db connection
	db, err := sql.Open("postgres", address)
	if err != nil {
		log.Fatal("[Database] failed connecting DB: " + address + ", err" + err.Error())
	}

	if err := db.Ping(); err != nil {
		log.Fatal("[Database] db is unreachable: " + address + ", err: " + err.Error())
	}

	return db
}
