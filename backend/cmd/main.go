package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"govinyl/internal/database"
)

func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte(`{"message":"pong"}`))
}

func productsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	products, err := database.GetAllProducts(ctx)
	if err != nil {
		log.Printf("Error fetching products: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	log.Printf("Returning %d products", len(products))
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(products)
}

func main() {
	ctx := context.Background()

	err := database.InitFromEnv(ctx)
	if err != nil {
		log.Fatalf("failed to initialize database: %v", err)
	}

	http.HandleFunc("/api/ping", pingHandler)
	http.HandleFunc("/api/products", productsHandler)

	// Serve static files (images) from the ./static directory at /static/
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	port := "8080"
	fmt.Printf("backend listening on %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
