package data

import "errors"

type CommandInterface interface {
	Execute() error
}

type Command struct {
	cText string
}

func GenCommand(text string) CommandInterface {
	command := new(Command)
	command.cText = text
	return command
}

func (c *Command) Execute() error {
	return errors.New("Not implement")
}