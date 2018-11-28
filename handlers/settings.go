package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/robot-lab/docker-hub-webhook/data"
	"net/http"
	"regexp"
	"strings"
)

func Settings(response http.ResponseWriter, request *http.Request) {
	token, ok:= request.Header["Authorization"]
	if !ok || token[0] != Token{
		fmt.Println(token)
		response.WriteHeader(401)
		fmt.Fprintf(response,"{\"token\": null, \"message\":\"Not valid login or password\"}")
		return
	}
	url := request.URL
	fmt.Println(url.Path)
	path := []byte(url.Path)
	if validSetting.Match(path) && request.Method == "POST" {
		decoder := json.NewDecoder(request.Body)
		var jsonData map[string]string
		decoder.Decode(&jsonData)
		SettingsData.AddSettings(jsonData["key"], jsonData["command"], jsonData["service_name"])
		SettingsData.Save("settings.json")
		settings := SettingsData.GetSetting(jsonData["key"])
		fmt.Fprint(response, settings)
		return
	}
	if validSetting.Match(path) && request.Method == "GET" {
		SettingsData.Load("settings.json")
		settings := SettingsData.GetSettings()
		fmt.Fprint(response, settings)
		return
	}
	if validSettingKey.Match(path) && request.Method == "GET" {
		key := strings.Split(url.Path, "/api/admin/")[1]
		SettingsData.Load("settings.json")
		setting := SettingsData.GetSetting(key)
		fmt.Fprint(response, setting)
		return
	}
	if validSettingKey.Match(path) && request.Method == "PUT" {
		return
	}
	if validSettingKey.Match(path) && request.Method == "DELETE" {
		key := strings.Split(url.Path, "/api/admin/")[1]
		SettingsData.DeleteSettings(key)
		SettingsData.Save("settings.json")
		return
	}
	ErrorMessage("Page not found.", 404, response)
}

var validSetting = regexp.MustCompile("^/api/admin$")
var validSettingKey = regexp.MustCompile("^/api/admin/[a-z 0-9 A-Z]+$")

var SettingsData = new(data.Data)