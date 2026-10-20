# G DANCE - Prémium Táncakadémia & Menedzsment Platform

> **Mozdulat. Ritmus. Közösség.**  
> Modern, prémium, fekete-arany arculatú táncközösségi webalkalmazás és komplett csoportmenedzsment rendszer.

---

## 🌟 Főbb Jellemzők

### 1. Nyilvános Weboldal & Bemutatkozás
- **Főoldal**: Teljes képernyős hero szekció, kör alakú arany táncos motívum, statisztikai számlálók, csoportok, események és hírek ízelítője.
- **Bemutatkozás**: Történet, filozófia, művészeti vezetés és akadémiai értékek.
- **Tánccsoportok**: Korosztályos és szint szerinti bontás (G-Force Felnőtt, Junior Modern, Mini Stars, Kezdő Girly) órarendi leírásokkal.
- **Oktatók**: Részletes szakmai bemutatkozások, végzettségek, stílusok és kiemelt elismerések.
- **Események & Fellépések**: Országos bajnokságok, táncgálák, színházi előadások és nemzetközi workshopok.
- **Hírek & Cikkek**: Beépített cikkolvasó modállal, kategóriákkal és kereséssel.
- **Galéria**: Tematikus fotóalbumok (Versenyek, Fellépések, Táborok, Kulisszák mögött) teljes képernyős Lightbox megjelenítővel.
- **Videótár**: Nyilvános fellépések és védett, **kizárólag tagok számára elérhető privát gyakorló- és oktatóvideók**.
- **Eredmények**: Évek szerinti szűrés (2026, 2025, 2024...) érmekkel, kupákkal és különdíjakkal.
- **Kapcsolat & Jelentkezés**: Interaktív próbaóra jelentkezési lap azonnali konfetti visszajelzéssel és stúdió elérhetőségekkel.

### 2. Tagi Rendszer & Többszintű Jogosultságok
- **ADMIN**: Teljes körű hozzáférés, csoportáthelyezés, hírek, értesítések, videók, eredmények és Firebase Firestore szinkronizáció.
- **OKTATÓ**: Csoportok kezelése, edzések kiírása, interaktív jelenléti ív vezetése.
- **TÁNCOS**: Személyre szabott dashboard („Szia, Anna! 👋”), edzés-visszaszámláló, jelenléti statisztika (pl. 94%), esemény RSVP, privát videók elérése.
- **SZÜLŐ**: Családi profil, gyermek programjainak és edzéslátogatottságának áttekintése.
- **DEMO SZEREPKÖRVÁLTÓ**: A fejléc feletti lebegő sávval egy kattintással tesztelhető az összes jogosultsági szint.

### 3. Edzésnaptár & Jelenléti Ív
- **Naptár**: Havi, heti és listás nézet szűréssel, új edzés kiírási modállal.
- **Jelenléti Ív**: Oktatók által vezethető jelenléti státuszok (*Jelen*, *Hiányzik*, *Igazolt*), megjegyzésekkel és valós idejű százalékos statisztikaszámítással.
- **Esemény RSVP**: Táncosok egy kattintással jelezhetik részvételi szándékukat (*Ott leszek*, *Nem tudok menni*, *Még nem tudom*).

---

## 🚀 Technológiai Stack

- **Frontend**: React 19 + Vite 8
- **Stílus & Design Rendszer**: Kézzel formált Vanilla CSS luxury design tokens (`Cinzel`, `Playfair Display`, `Plus Jakarta Sans`, arany gradiensek és fekete üveg textúrák)
- **Ikonok**: Lucide React
- **Adatbázis & Felhő**: Firebase Firestore, Firebase Authentication, Firebase Storage, Firebase Hosting
  - Projekt azonosító: `tancweboldal`
  - Projekt szám: `73848932343`
- **CI/CD**: GitHub Actions automatikus fordítás és GitHub Pages / Firebase Hosting deployment (`.github/workflows/deploy.yml`)

---

## 💻 Helyi Futtatás (Localhost)

A fejlesztői szerver indítása:

```bash
# Függőségek telepítése
npm install --legacy-peer-deps

# Fejlesztői szerver indítása localhoston
npm run dev
```

A weboldal azonnal elérhető a böngészőben:  
👉 **http://localhost:5173/**

---

## 📦 Termelési Csomag Készítése (Production Build)

```bash
npm run build
```

A build a `dist/` mappába kerül, készen a feltöltésre.

---

## 🔒 Firebase Konfiguráció & Szabályok

A projekt tartalmazza a teljes Firebase infrastruktúra fájlokat:
- `firebase.json` – Hosting és Firestore beállítások
- `.firebaserc` – `tancweboldal` alapértelmezett projekt kapcsolat
- `firestore.rules` – Kiszolgálóoldali szerepkör-alapú biztonsági szabályok (Admin, Oktató, Táncos, Szülő, Vendég)
- `firestore.indexes.json` – Összetett indexek a hatékony lekérdezésekhez
- `storage.rules` – Fotó- és videótár biztonsági szabályok

### Kezdő adatok feltöltése a felhőbe:
Lépj be **Adminisztrátorként**, válaszd az **Admin Vezérlőpult -> Firebase & Felhő** fület, majd kattints a **„Kezdő adatok feltöltése a Firebase Firestore-ba”** gombra!

---

## 🌐 GitHub Actions Automatikus Deployment

A repóban konfigurálva van a `.github/workflows/deploy.yml` workflow, amely minden `main` ágra történő push esetén automatikusan lefordítja és publikálja a projektet.
