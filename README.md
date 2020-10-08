# Remi Test project

> React/Redux : Front-end, Django, DRF : Back-end(Python3), SQLITE : Database

## Start project

### Install react dependencies
- In `frontend` directory, run this line.
`npm install`

### Instll django packages
- In `root` directory, run this line.
`pip3 install -r requirements.txt`

### Run project
- In `frontend` directory, run this line.
`npm run dev`
- In `root` directory, run this line.
`python3 manage.py runserver`

### Setup virtualenv and run project
- In parent directory of `root`, run this line.
`virtualenv venv -p python3`
`source venv/bin/activate`
- In `root` directory, run this line.
`pip install -r requirements.txt`
- In `root` directory, run this line.
`python manage.py runserver`