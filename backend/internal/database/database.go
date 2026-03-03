package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	ctx := context.Background()

	dsn := "postgres://db_user:db_password@localhost:5432/govinyl_db?sslmode=disable"

	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		log.Fatalf("failed to parse config: %v", err)
	}

	config.MaxConns = 10
	config.MinConns = 2
	config.MaxConnLifetime = time.Hour

	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		log.Fatalf("failed to create connection pool: %v", err)
	}
	defer pool.Close()

	err = pool.Ping(ctx)
	if err != nil {
		log.Fatalf("failed to ping database: %v", err)
	}

	fmt.Println("Connected successfully")
}
