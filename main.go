package main

import (
	"github.com/robot-lab/docker-hub-webhook/handlers"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/webhook", handlers.WebHooks)
	http.HandleFunc("/admin", handlers.Settings)
	http.HandleFunc("/auth", handlers.Auth)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
