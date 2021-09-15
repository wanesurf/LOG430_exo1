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
RUN chmod 777 /var/www/html -R
RUN chown -R www-data:www-data /var/www/
RUN chmod -R g+rw /var/www/

RUN echo "Include /usr/local/apache2/conf/demo.apache.conf" \
    >> /usr/local/apache2/conf/httpd.conf 

