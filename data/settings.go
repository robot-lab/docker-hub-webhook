package data

type SettingsInterface interface {
	GetCommand() CommandInterface
	GetKey() string
	GetServiceName() string
}

type Settings struct {
	Key string					`json:"key"`
	Command string				`json:"command"`
	ServiceName string			`json:"service_name"`
}

func GenSettings(key string, cText string, serviceName string) *Settings{
	settings := new(Settings)
	settings.ServiceName = serviceName
	settings.Command = cText
	settings.Key = key
	return settings
}

func (s *Settings) GetCommand() CommandInterface {
	return GenCommand(s.Command)
}

func (s *Settings) GetServiceName() string {
	return s.ServiceName
}

func (s *Settings) GetKey() string {
	return s.Key
}
