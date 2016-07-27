FROM mashape/kong

RUN yum install -y -q nodejs npm
RUN yum clean all

RUN npm install -g --silent nconf nconf-yaml merge sprintf-js js-yaml wait-on

ADD ./conf-merge.js ./conf-database-resource.js ./wait-on-resource.js /usr/local/bin/

COPY docker-entrypoint.sh /docker-entrypoint.sh
