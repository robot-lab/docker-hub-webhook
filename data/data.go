package data

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"sync"
)

type Data struct {
	settings map[string]*Settings
	mutex    sync.Mutex
}

func (d *Data) Load(filename string) {
	d.mutex.Lock()
	jsonFile, err := os.OpenFile(filename, os.O_RDONLY, 0666)
	if err != nil {
		os.Create(filename)
		log.Fatalln(err.Error())
		return
	}
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &d.settings)
	jsonFile.Close()
	d.mutex.Unlock()
}

func (d *Data) Save(filename string) {
	byteValue, _ := json.Marshal(d.settings)
	d.mutex.Lock()
	err := ioutil.WriteFile(filename, byteValue, 0666)
	if err != nil {
		log.Fatal(err)
	}
	d.mutex.Unlock()
}

func (d *Data) AddSettings(key string, cText string, serviceName string) {
	d.settings[key] = GenSettings(key, cText, serviceName)
}

func (d *Data) EditSettings(mainKey string, key string, cText string, serviceName string) {
	d.DeleteSettings(mainKey)
	d.settings[key] = GenSettings(key, cText, serviceName)
}

func (d *Data) DeleteSettings(key string) {
	if _, ok := d.settings[key]; ok {
		delete(d.settings, key)
	}
}

func (d *Data) GetSettings() string {
	result := []SettingsInterface{}
	for _, value := range d.settings {
		result = append(result, value)
	}
	jsonData, err := json.Marshal(&result)
	if err != nil {
		log.Fatalln(err.Error())
	}
	return string(jsonData)
}
func (d *Data) GetSetting(key string) string {
	result := d.settings[key]
	jsonData, err := json.Marshal(&result)
	if err != nil {
		log.Fatalln(err.Error())
	}
	return string(jsonData)
}
