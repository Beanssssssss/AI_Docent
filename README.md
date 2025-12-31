# AI Docent

AI 기반 미술관 도슨트 애플리케이션

## 프로젝트 구조

```
AI_Docent/
├── backend/          # FastAPI 백엔드
├── frontend-mobile/  # React Native (Expo) 모바일 앱
└── frontend-web/     # Next.js 웹 프론트엔드
```

## 환경 설정

### 백엔드

1. Python 가상환경 생성 및 활성화
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. 의존성 설치
```bash
pip install -r requirements.txt
```

3. 환경변수 설정
**`backend/app/` 디렉토리**에 `.env` 또는 `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
CLIP_MODEL=ViT-B/32
```

**파일 위치:**
- 로컬 개발: `backend/app/.env` 또는 `backend/app/.env.local`
- Docker 사용 시: `docker-compose.yml`에서 `./backend/app/.env.local` 경로를 참조합니다

**참고:** `config.py`에서 `.env`와 `.env.local` 파일을 모두 읽습니다. `.env.local` 파일을 사용하는 것을 권장합니다 (Git에 업로드되지 않음).

4. 서버 실행
```bash
uvicorn app.main:app --reload --port 8000
```

### 모바일 앱 (frontend-mobile)

1. 의존성 설치
```bash
cd frontend-mobile
npm install
```

2. 환경변수 설정
프로젝트 루트에 `.env` 파일을 생성하거나, `app.json`의 `extra` 섹션에 환경변수를 추가하세요:

**방법 1: .env 파일 사용 (권장)**
```bash
# frontend-mobile/.env
EXPO_PUBLIC_API_BASE=http://localhost:8000
```

**방법 2: app.json에 추가**
```json
{
  "expo": {
    "extra": {
      "apiBase": "http://localhost:8000"
    }
  }
}
```

그리고 `services/api.ts`를 다음과 같이 수정:
```typescript
import Constants from 'expo-constants';
export const API_BASE = Constants.expoConfig?.extra?.apiBase || "http://127.0.0.1:8000";
```

3. 앱 실행
```bash
# iOS 시뮬레이터
npm run ios

# Android 에뮬레이터
npm run android

# 웹
npm run web
```

### 웹 프론트엔드 (frontend-web)

1. 의존성 설치
```bash
cd frontend-web
npm install
```

2. 환경변수 설정
`.env.local` 파일을 생성:
```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

3. 개발 서버 실행
```bash
npm run dev
```

## API 주소 변경

### 모바일 앱

**로컬 개발:**
- 기본값: `http://127.0.0.1:8000` (이미 설정됨)
- 변경 필요 시: `.env` 파일에 `EXPO_PUBLIC_API_BASE` 설정

**프로덕션 배포:**
- `.env` 파일에 실제 API 서버 주소 설정
- 예: `EXPO_PUBLIC_API_BASE=https://api.yourdomain.com`

**중요:** `.env` 파일은 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다. 각 개발자는 자신의 환경에 맞게 `.env` 파일을 생성해야 합니다.

### 웹 프론리엔드

**로컬 개발:**
- `.env.local` 파일에 `NEXT_PUBLIC_API_BASE=http://localhost:8000` 설정

**프로덕션 배포:**
- 배포 플랫폼(Vercel, Netlify 등)의 환경변수 설정에서 `NEXT_PUBLIC_API_BASE` 설정

## 주요 기능

- 🎨 갤러리 및 전시회 선택
- 🤖 AI 도슨트 채팅
- 📸 작품 사진으로 질문하기
- 🔍 이미지 기반 작품 검색

## 기술 스택

### 백엔드
- FastAPI
- Supabase
- Python 3.10+

### 모바일
- React Native (Expo)
- TypeScript
- Zustand (상태 관리)
- Expo Router

### 웹
- Next.js
- TypeScript
- Tailwind CSS

## 개발 가이드

### API 엔드포인트

- `GET /galleries` - 갤러리 목록
- `GET /exhibitions?gallery_id={id}` - 전시회 목록
- `GET /artworks/{id}` - 작품 상세 정보
- `POST /image-search/` - 이미지 기반 작품 검색

자세한 API 문서는 백엔드 서버 실행 후 `http://localhost:8000/docs`에서 확인할 수 있습니다.

## 라이선스

MIT
