# TODO: Add Global Background Music and Audio Controls

## 1. Move Background Music to App.js
- [x] Add bgMusic audio element to App.js JSX
- [x] Add useRef for bgMusic in App.js
- [x] Add useEffect to initialize and play bgMusic on app load
- [x] Update mute logic to control bgMusic in App.js

## 2. Add Global Mute Button
- [x] Add fixed floating mute button in App.js JSX
- [x] Style the button to be positioned fixed, e.g., top-right corner
- [x] Connect button to toggle isMuted state

## 3. Update Home.js
- [x] Remove bgMusic audio element from Home.js
- [x] Remove bgMusic refs and useEffects from Home.js
- [x] Remove unused whooshSound audio element (whoosh.mp3 not needed)

## 4. Add CSS for global mute button
- [x] Add CSS for .global-mute-btn in App.css

## 5. Verify Quote Sounds
- [x] Whoosh.mp3 removed as not used; TTS remains for quote completion
- [x] Changed quote TTS to manual toggle button (🔊 to 🔇)
- [x] Removed automatic TTS on quote completion
- [x] Changed quote card background to white (removed green)
- [x] Test manual TTS toggle on quote (run app to verify)

## 6. Testing
- [x] Run app and navigate between pages to test audio persistence
- [x] Background music attempts autoplay on load, falls back to first click if blocked, with full volume (1.0)
- [x] Test mute button functionality across pages (sets volume to 0 or 1)

## 7. ATS Checker Enhancements
- [x] Add animated inspirational messages below title with typing effect
- [x] Messages rotate every 7 seconds, pause on hover
- [x] PDF upload automatically extracts text for resume input
- [x] Enable OCR for image uploads using Tesseract.js
- [x] Add OCR fallback for scanned PDFs (render first page as image and extract text)
- [x] Improve ATS score accuracy with better keyword matching and expanded stop words
