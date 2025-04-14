# Full-Stack JS engineer test assessment - the Recipe book

## 🔨 Installing
### Backend
```
cd backend/
npm i
```
### Frontend
```
cd frontend
npm i
```

## 📃 Necessary environment variables
### Backend (./backend/.env)
| Variable  | Default value | Description |
| ------------- | ------------- | ------------- |
| FRONTEND_URL  | http://localhost:3001  | URL to Frontend for CORS |
| THEMEALDB_API_URL  | https://www.themealdb.com/api/json/v1/1  | URL to Themealdb API |

### Frontend (./frontend/.env.local)
| Variable  | Default value | Description |
| ------------- | ------------- | ------------- |
| NEXT_PUBLIC_API_URL  | http://localhost:3000  | URL to Backend |


## 🚀 Running & Linting
### Backend
```
npm run start:dev
npm run lint
```

### Frontend
```
npm run dev
npm run lint
```