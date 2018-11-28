package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func Auth(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var json_data map[string]interface{}
	decoder.Decode(&json_data)
	username := json_data["username"]
	password := json_data["password"]
	if username == Username && password == Password {
		fmt.Fprintf(response,"{\"token\": \"%s\"}", Token)
	} else {
		response.WriteHeader(401)
		fmt.Fprintf(response,"{\"token\": null, \"message\":\"Not valid login or password\"}")
	}
}

func ErrorMessage(message string, code int, response http.ResponseWriter) {
	response.WriteHeader(code)
	fmt.Fprintf(response, "{\"message\":\"%s\"}", message)
}


var Username string
var Password string
var Token string

