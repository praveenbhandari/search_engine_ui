#!/bin/bash
sudo service apache2 stop
sudo service nginx start
cd search-engine-api/
python3 -m uvicorn yantraapi:app