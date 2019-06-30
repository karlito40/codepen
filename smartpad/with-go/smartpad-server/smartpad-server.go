package main

import (
	"fmt"
	"github.com/go-vgo/robotgo"
	"github.com/gorilla/websocket"
	"log"
	"math"
	"net/http"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

var x, y = robotgo.GetMousePos()
var mouseX, mouseY = float64(x), float64(y)

type msg struct {
	subject string
}

func reader(conn *websocket.Conn) {
	for {
		var msg map[string]interface{}
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Println(err)
			return
		}

		log.Println("Got message", msg)
		data := msg["data"].(map[string]interface{})

		mouseX += data["x"].(float64)
		mouseY += data["y"].(float64)

		robotgo.MoveMouse(int(math.Round(mouseX)), int(math.Round(mouseY)))

		// if err := conn.WriteMessage(messageType, p); err != nil {
		// 	log.Println(err)
		// 	return
		// }
	}
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	log.Println("Client Successfully Connected...")

	reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/", wsEndpoint)
}

func main() {
	fmt.Println("Hello World")
	setupRoutes()
	log.Fatal(http.ListenAndServe(":8081", nil))
}
