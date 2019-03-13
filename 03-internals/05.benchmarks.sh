if ! [ -x "$(command -v ab)" ]; then
  apt-get update
  apt-get install -y apache2-utils
else
  ab -n 100000 -c 50 -k -H "Accept-Encoding: gzip, deflate" http://localhost:8081/
fi



