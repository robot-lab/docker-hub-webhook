package router

import (
	"github.com/robot-lab/docker-hub-webhook/handlers"
	"net/http"
	"regexp"
)

func Router(response http.ResponseWriter, request *http.Request) {
	path := []byte(request.URL.Path)
	if validSetting.Match(path) {
		handlers.Settings(response, request)
		return
	}
	if validLogin.Match(path) {
		handlers.Auth(response, request)
		return
	}
	if validWebHook.Match(path) {
		handlers.WebHooks(response, request)
		return
	}
	handlers.ErrorMessage("Page not found.", 404, response)
}

var validSetting = regexp.MustCompile("^/api/admin")
var validLogin = regexp.MustCompile("^/api/login")
var validWebHook= regexp.MustCompile("^/api/webhook")
