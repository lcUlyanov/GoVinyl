package models

import "time"

type Product struct {
	ID          int     `json:"id"`
	Album       string  `json:"album"`
	Artist      string  `json:"artist"`
	Description string  `json:"description"`
	Year        int     `json:"year"`
	Condition   string  `json:"condition"`
	Stock       int     `json:"stock"`
	Genre       string  `json:"genre"`
	Price       float64 `json:"price"`
	Image       string  `json:"image"`
}

// Raw database model
type ProductDB struct {
	ID           int
	Title        string
	Artist       string
	Description  string
	ReleaseDate  time.Time
	Condition    string
	Availability bool
	Genre        string
	Price        float64
	ImageURL     string
}

func (pdb ProductDB) ToProduct() Product {
	return Product{
		ID:          pdb.ID,
		Album:       pdb.Title,
		Artist:      pdb.Artist,
		Description: pdb.Description,
		Year:        pdb.ReleaseDate.Year(),
		Condition:   pdb.Condition,
		Stock:       map[bool]int{true: 1, false: 0}[pdb.Availability],
		Genre:       pdb.Genre,
		Price:       pdb.Price,
		Image:       pdb.ImageURL,
	}
}
