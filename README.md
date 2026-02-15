# UCC Events - Frontend

Állásinterjúhoz tartozó projektfeladat frontendjének repository-ja.

[![Made by Molnár Márton](https://img.shields.io/badge/Made%20by-Molnár%20Márton-orange)](https://cybrcrime.hu)

## Projekt elindítása saját gépen

- Clone-ozd le a repot a saját gépedre
- Készíts egy másolatot a .env.example állományról .env néven `cp .env.example .env`
- Állítsd be a kötelező környezeti változókat az alábbiak szerint
```dotenv
APP_TITLE= # Az alkalkmazás neve, ami megjelenik a felületen
CLIENT_ID= # Az alkalmazás backendje által előállított Laravel Passport client id
CLIENT_SECRET= # Az alkalmazás backendje által előállított Laravel Passport client secret
LOGIN_URL= # A backend azon URL-je, ami a felhasználók bejelentkeztetésére szolgál, általában: http://backend-ip:port/oauth/token
API_URL= # A backend API URL-je, általában: http://backend-ip:port/api

NEXT_PUBLIC_REVERB_APP_KEY= # A backend által elfogadott, a frontend azonosítására szolgáló Reverb APP key
NEXT_PUBLIC_REVERB_HOST= # A reverb szolgáltatást futtató szerver IP címe (pl.: localhost)
NEXT_PUBLIC_REVERB_PORT= # A reverb szolgáltatás portja (pl.: 8080)
NEXT_PUBLIC_REVERB_SCHEME= # A reverb szolgáltatás típusa: http vagy https
NEXT_PUBLIC_REVERB_AUTH_ENDPOINT= # A backend azon végpontja, amin keresztül a Reverb azonosítani tudja a felhasználót, általában http://localhost:8000/broadcasting/auth
```
- Futtasd az alábbi parancsot
```shell
npm i && npm run dev
```
- Az alkalmazás elérhető a http://localhost:3000 porton keresztül

