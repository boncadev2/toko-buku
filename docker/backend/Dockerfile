FROM composer:2 AS composer
FROM php:8.4-fpm-alpine
RUN docker-php-ext-install pdo_mysql
COPY --from=composer /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/backend
CMD ["sh", "-c", "composer install --no-interaction --prefer-dist && php-fpm"]
