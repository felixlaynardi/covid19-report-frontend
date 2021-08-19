package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gorilla/mux"
)

type Config struct {
	WriteTimeout time.Duration
	ReadTimeout  time.Duration
	Port         int
}

func Serve(cfg Config, router *mux.Router) {
	srv := &http.Server{
		Handler:      router,
		Addr:         fmt.Sprint(":", cfg.Port),
		WriteTimeout: cfg.WriteTimeout,
		ReadTimeout:  cfg.ReadTimeout,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			log.Fatal("[Server][Serve] unable to listen and serve, err ", err.Error())
		}
	}()

	log.Println("[Server][Serve] HTTP server is running on port ", cfg.Port)

	//make signal
	s := make(chan os.Signal, 1)

	signal.Notify(s, syscall.SIGINT, syscall.SIGTERM, syscall.SIGHUP)
	<-s

	//the reason we use signal is too prevent the shutdown code bellow, we make the signal or s waiting for a signal to come

	//doing gracefuly stoping
	if err := srv.Shutdown(context.Background()); err != nil {
		log.Fatal("[Server][Serve] error in shuttingdown http server, err ", err.Error())
	}

}
