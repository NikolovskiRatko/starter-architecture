# Use PHP 8.3 with Apache
FROM php:8.3-apache

LABEL maintainer="Ratko Nikolovski"

ARG DEBIAN_FRONTEND=noninteractive

# Build arguments for www-data UID and GID
ARG WWW_DATA_UID=33
ARG WWW_DATA_GID=33

# Update and install base packages
RUN apt-get update --fix-missing && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        apt-utils \
        nano \
        wget \
        dialog \
        vim \
        libpq-dev \
        libmemcached-dev \
        curl \
        htop \
        libsqlite3-dev \
        libsqlite3-0 \
        default-mysql-client \
        zlib1g-dev \
        libzip-dev \
        libicu-dev \
        build-essential \
        git \
        libonig-dev \
        libcurl4 \
        libcurl4-openssl-dev \
        zip \
        openssl \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libmagickwand-dev \
        libmagickcore-dev \
        pkg-config \
        autoconf && \
    rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

# Install Redis PHP extension
RUN pecl install redis && \
    docker-php-ext-enable redis

# Install xdebug
RUN pecl install xdebug-3.3.0 && \
    docker-php-ext-enable xdebug

# Install Imagick from source
RUN git clone https://github.com/Imagick/imagick.git && \
    cd imagick && \
    phpize && \
    ./configure && \
    make && \
    make install && \
    docker-php-ext-enable imagick && \
    cd .. && rm -rf imagick

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install \
        pdo_mysql \
        pdo_sqlite \
        mysqli \
        curl \
        zip \
        intl \
        mbstring \
        gettext \
        calendar \
        exif \
        gd

# Enable Apache modules
RUN a2enmod rewrite headers proxy_http proxy ssl

# Modify www-data user UID and GID to match host
RUN groupmod -g ${WWW_DATA_GID} www-data && \
    usermod -u ${WWW_DATA_UID} -g ${WWW_DATA_GID} www-data && \
    # Ensure ownership of the web directory
    chown -R www-data:www-data /var/www/html

# Generate self-signed SSL certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/ssl-cert-snakeoil.key \
    -out /etc/ssl/certs/ssl-cert-snakeoil.pem \
    -subj "/C=AT/ST=Vienna/L=Vienna/O=Security/OU=Development/CN=example.com"

WORKDIR /var/www/html