package main

import (
	"fmt"
	"log"
	"net/http"
)

func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message":"pong"}`))
}

func productsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`[]`))
}

func main() {
	http.HandleFunc("/api/ping", pingHandler)
	http.HandleFunc("/api/products", productsHandler)

	port := "8080"
	fmt.Printf("backend listening on %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
