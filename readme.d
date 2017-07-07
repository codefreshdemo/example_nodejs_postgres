# install postgres
sudo apt-get install postgresql

# set the password for user postgres
sudo -u postgres psql template1
ALTER USER postgres with encrypted password 'your_password';
sudo /etc/init.d/postgresql restart

# create db
sudo -u postgres createdb my_db