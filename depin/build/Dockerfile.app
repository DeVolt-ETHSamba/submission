FROM golang:1.21.6

WORKDIR /src

COPY .. .

RUN apt-get update && apt-get install -y librdkafka-dev

RUN go mod download -x

CMD ["go", "run", "./cmd/app/"]