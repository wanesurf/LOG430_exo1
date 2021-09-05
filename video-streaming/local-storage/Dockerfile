FROM httpd:2.4.33-alpine
RUN apk update; \
    apk upgrade;
# Copy apache vhost file to proxy php requests to php-fpm container

COPY ./videos /usr/local/apache2/htdocs/
COPY demo.apache.conf /usr/local/apache2/conf/demo.apache.conf
WORKDIR /var/www/html
COPY ./videos/index.html index.html
COPY ./videos/SampleVideo_1280x720_1mb.mp4 ./SampleVideo_1280x720_1mb.mp4
RUN rm -rf /etc/apache2/sites-enabled/000-default.conf
RUN chmod -R 775 /var/www/html 
RUN echo "Include /usr/local/apache2/conf/demo.apache.conf" \
    >> /usr/local/apache2/conf/httpd.conf 

