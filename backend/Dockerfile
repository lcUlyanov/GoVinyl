# backend/Dockerfile — простой Go-сервис

# сборочный слой
FROM golang:1.25.3 AS builder
WORKDIR /app

# копируем модули, go.sum может отсутствовать
COPY go.mod go.sum* ./

# скачиваем зависимости (go.sum будет сгенерирован автоматически, если его нет)
RUN go mod tidy

# копируем исходники из backend
COPY . .

# компилируем статический бинарник
RUN CGO_ENABLED=0 GOOS=linux go build -mod=mod -o govinyl-backend ./cmd

# минимальный рантайм образ
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/govinyl-backend .

EXPOSE 8080
ENTRYPOINT ["./govinyl-backend"]
