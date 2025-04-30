# Используем образ Python 3.10-slim в качестве базового
FROM python:3.10-slim

# Установка зависимостей для uWSGI с PCRE
RUN apt-get update && \
    apt-get install -y gcc python3-dev libpcre3-dev && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -u 1000 -m appuser && mkdir -p /web_bb && chown appuser:appuser /web_bb

# Копирование файлов приложения
COPY web_bb/ /web_bb/
WORKDIR /web_bb

# Устанавливаем зависимости Python
RUN pip install --no-cache-dir -r requirements.txt uwsgi

# Установка зависимостей приложения
#ENV $(cat /project_tg_diet_bot/.env | xargs)
ENV DATABASE_URL=mysql+pymysql://root:123321@db:3306/web_bb

USER appuser

# Указываем главный скрипт для запуска
CMD ["uwsgi", "--ini", "uwsgi.ini"]