## Installation

### Install dependencies:
- Python 3 (Mac: brew install python3)
- Node.js (> 6.x) (via nvm)
- Yarn
- The Theodo Stack Generator

#### Quality check:

  - Run `yo` and see `Theodo Stack` in your console
  - Run `yarn –version` and see a version.
  - Run `python`
  - Import sys

   - `print(sys.version_info)`

  - See major = 3

  - *Good time to check you have an up to date version of openssl on your laptop and it`s linked through to your python. (It can cause issues with libraries requiring secure connections => slow you down later)*

### Generate:
- `cd` into your project repo
- Run `yo theodo-stack`
- Answer the questions:
- Select: ‘Django (Python)’
- Select: ‘none’ for frontend (coming)
- Wait…

  - A python virtual environment is created
  - The django generator is being used to create your project
  - Settings files are being adjusted to allow multiple environments
  - Django-Rest-Framework is being added.

#### Quality Check:

- Enter your python virtual environment

  - `source ./venv/bin/activate`
- Run database migrations

  - `./{project}/manage.py migrate`
- Run the server

  - `./{project}/manage.py runserver`
- Go to `localhost:8000`
- See “it worked”

