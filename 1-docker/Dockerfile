FROM python:3.10-rc-slim-buster

WORKDIR /app

# Copia los archivos de la app.
COPY . .

RUN apt-get update && apt-get install -y \
    python3-pip

RUN pip3 install -r /app/requirements.txt

EXPOSE 5000

CMD ["python", "/app/app.py"]