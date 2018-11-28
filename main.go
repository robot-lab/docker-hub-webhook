package main

import (
	"encoding/json"
	"github.com/robot-lab/docker-hub-webhook/handlers"
	"github.com/robot-lab/docker-hub-webhook/router"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	loadUsers()
	handlers.SettingsData.Load("settings.json")
	http.HandleFunc("/", router.Router)
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}


func loadUsers() {
	jsonFile, err := os.Open("user.json")
	if err != nil {
		log.Fatalln(err.Error())
	}
	defer jsonFile.Close()
	var jsonData map[string]interface{}
	byteValue, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal([]byte(byteValue), &jsonData)
	handlers.Username = jsonData["username"].(string)
	handlers.Password = jsonData["password"].(string)
	handlers.Token = jsonData["token"].(string)
}