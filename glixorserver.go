package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/olahol/melody"
	"gopkg.in/gin-gonic/gin.v1"
)

func main() {
	r := gin.Default()
	m := melody.New()

	r.GET("/", func(c *gin.Context) {
		http.ServeFile(c.Writer, c.Request, findFile("views/index.html"))
	})

	r.GET("/ws", func(c *gin.Context) {
		m.HandleRequest(c.Writer, c.Request)
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		m.Broadcast(msg)
	})

	r.Static("/public", "public")
	fmt.Printf(fmt.Sprintf("path: %s", findFile("views/")))

	r.Run(":5000")
}

func findFile(path string) string {
	var checkPath string
	var err error
	var rootDir string
	_, err = os.Stat(path)
	if err == nil {
		return path
	}
	rootDir, err = filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
	}
	checkPath = fmt.Sprintf("%s/%s", rootDir, path)
	_, err = os.Stat(checkPath)
	if err == nil {
		return checkPath
	}
	checkPath = fmt.Sprintf("%s/../%s", rootDir, path)
	_, err = os.Stat(checkPath)
	if err == nil {
		return checkPath
	}
	return path

}
