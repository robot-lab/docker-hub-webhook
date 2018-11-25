package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func Settings(response http.ResponseWriter, request *http.Request) {

}

func Auth(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var json_data map[string]interface{}
	decoder.Decode(&json_data)
	fmt.Println(json_data)
	username := json_data["username"]
	password := json_data["password"]
	if username == "korwin" && password=="axcaxs123QWE#@!" {
		fmt.Fprintf(response,"{\"token\": \"good_auth\"}")
	} else {
		fmt.Fprintf(response,"{\"token\": null}")
	}
}