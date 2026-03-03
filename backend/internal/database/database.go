package database

import (
	"context"
	"fmt"
	"os"
	"time"

	"govinyl/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool

func Init(ctx context.Context, dsn string) error {
	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		return fmt.Errorf("failed to parse config: %w", err)
	}

	config.MaxConns = 10
	config.MinConns = 2
	config.MaxConnLifetime = time.Hour

	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return fmt.Errorf("failed to create connection pool: %w", err)
	}

	err = pool.Ping(ctx)
	if err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	Pool = pool
	fmt.Println("Connected to database successfully")
	return nil
}

func InitFromEnv(ctx context.Context) error {
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
	}
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "5432"
	}
	dbUser := os.Getenv("DB_USER")
	if dbUser == "" {
		dbUser = "db_user"
	}
	dbPassword := os.Getenv("DB_PASSWORD")
	if dbPassword == "" {
		dbPassword = "db_password"
	}
	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		dbName = "govinyl_db"
	}

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPassword, dbHost, dbPort, dbName)
	fmt.Printf("Connecting to database: %s\n", dsn)

	// Retry logic for database connection
	maxRetries := 10
	retryDelay := time.Second * 2

	for attempt := 1; attempt <= maxRetries; attempt++ {
		err := Init(ctx, dsn)
		if err == nil {
			return nil
		}
		if attempt < maxRetries {
			fmt.Printf("Failed to connect to database (attempt %d/%d): %v\n", attempt, maxRetries, err)
			fmt.Printf("Retrying in %v...\n", retryDelay)
			time.Sleep(retryDelay)
		} else {
			fmt.Printf("Failed to connect to database after %d attempts: %v\n", maxRetries, err)
			return err
		}
	}

	return nil
}

func GetAllProducts(ctx context.Context) ([]models.Product, error) {
	if Pool == nil {
		return nil, fmt.Errorf("database pool is not initialized")
	}

	rows, err := Pool.Query(ctx, "SELECT id, title, artist, description, release_date, condition, availability, genre, price, image_url FROM products")
	if err != nil {
		fmt.Printf("Error querying products: %v\n", err)
		return make([]models.Product, 0), err
	}
	defer rows.Close()

	products := make([]models.Product, 0)
	for rows.Next() {
		var pdb models.ProductDB
		err := rows.Scan(&pdb.ID, &pdb.Title, &pdb.Artist, &pdb.Description, &pdb.ReleaseDate, &pdb.Condition, &pdb.Availability, &pdb.Genre, &pdb.Price, &pdb.ImageURL)
		if err != nil {
			fmt.Printf("Error scanning product: %v\n", err)
			return make([]models.Product, 0), err
		}
		products = append(products, pdb.ToProduct())
	}

	fmt.Printf("Retrieved %d products from database\n", len(products))
	return products, rows.Err()
}
