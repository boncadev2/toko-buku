#!/usr/bin/env sh
set -eu

if [ -f .env ]; then
  echo ".env sudah ada; tidak diubah."
  exit 0
fi

generated_key="base64:$(openssl rand -base64 32)"
sed "s|^APP_KEY=$|APP_KEY=$generated_key|" .env.example > .env
echo ".env development berhasil dibuat."
