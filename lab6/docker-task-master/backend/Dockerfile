FROM python:3.11

RUN mkdir -p /app
COPY ./requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt

COPY ./ /app/

ENTRYPOINT ["python", "app.py"]