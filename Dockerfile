FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef

########################
# planner              #
########################

# Prepare cargo dependencies
FROM chef AS planner
WORKDIR /build

# Install toolchains
RUN rustup toolchain install nightly

# Prepare recipe
COPY . .
RUN cargo +nightly chef prepare --recipe-path recipe.json

########################
# wasm-builder         #
########################

# Build wasm
FROM chef AS wasm-builder
WORKDIR /build

# Install nightly toolchain
RUN rustup toolchain install nightly
RUN rustup target add wasm32-unknown-unknown --toolchain nightly

# Install wasm-pack
RUN cargo install wasm-pack

# Retrieve dependencies
COPY --from=planner /build/recipe.json recipe.json
RUN cargo +nightly chef cook --target wasm32-unknown-unknown --release --package wasm-lib --recipe-path recipe.json

COPY Cargo.toml .
COPY Cargo.toml Cargo.lock* ./
COPY wasm-lib/ ./wasm-lib/
COPY server/ ./server/

# Build wasm
RUN wasm-pack build ./wasm-lib --target web --out-dir pkg

########################
# spa-builder          #
########################

# Build js
FROM node:16-alpine AS spa-builder

WORKDIR /build

COPY package.json .
COPY package-lock.json .

COPY --from=wasm-builder /build/wasm-lib/pkg wasm-lib/pkg

RUN npm i

COPY . .

RUN npm run build:no-wasm

########################
# server-builder       #
########################

# Build server
FROM chef AS server-builder
WORKDIR /build

# Install nightly toolchain
RUN rustup toolchain install nightly

# Retrieve dependencies
COPY --from=planner /build/recipe.json recipe.json
RUN cargo +nightly chef cook --release --bin server --recipe-path recipe.json

COPY Cargo.toml Cargo.lock* ./
COPY wasm-lib/ ./wasm-lib/
COPY server/ ./server/

ENV DOCKER_BUILD=1

COPY --from=spa-builder /build/build ./build

# Build server
RUN cargo +nightly build --release --bin server

########################
# production           #
########################

FROM nginx as production

WORKDIR /app

RUN apt-get update && apt install -y openssl

COPY --from=spa-builder /build/build/ ./build
COPY --from=server-builder /build/target/release/server ./server/server
COPY LICENSE.md .

ENV SPA_DIR=/app/build

# redirect to index.html if the file or directory isn't found
CMD  server/server
