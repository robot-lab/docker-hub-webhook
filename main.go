package main

import (
	"github.com/robot-lab/docker-hub-webhook/handlers"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/webhook", handlers.WebHooks)
	http.HandleFunc("/api/admin", handlers.Settings)
	http.HandleFunc("/api/login", handlers.Auth)
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
