<div align="center">
  <img src="assets/icons/mertos.svg" alt="MertOS Launcher" width="92" />

  <h1>MertOS Launcher</h1>

  <p>
    Kişisel projeler, geliştirme araçları ve önemli bağlantılar için hazırlanmış
    modern bir Electron masaüstü launcher uygulaması.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Electron-42-47848F?logo=electron&logoColor=white" alt="Electron" />
    <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Windows-Installer-0078D4?logo=windows&logoColor=white" alt="Windows Installer" />
    <img src="https://img.shields.io/badge/electron--builder-NSIS-31A8FF" alt="electron-builder" />
  </p>
</div>

---

## Genel Bakış

MertOS Launcher; GitHub repolarına, canlı proje bağlantılarına, geliştirme panellerine ve sık kullanılan araçlara tek ekrandan ulaşmak için geliştirilmiş kişisel bir masaüstü uygulamasıdır.

Arayüz HTML, CSS ve JavaScript ile hazırlanır; Electron ile Windows masaüstü uygulaması olarak çalışır. Installer çıktısı `electron-builder` ile alınır.

## Özellikler

- Proje kartları ve geliştirici araçları
- Arama ve kategori filtreleme
- Lokal SVG/PNG ikon sistemi
- `data.js` üzerinden ayrılmış proje ve araç verileri
- Electron içinde güvenli lokal `index.html` yükleme
- Dış bağlantıları varsayılan tarayıcıda açma
- Dark, neon ve glassmorphism tabanlı arayüz
- Windows için NSIS installer üretimi

## Teknolojiler

| Katman | Kullanılanlar |
| --- | --- |
| Arayüz | HTML, CSS, JavaScript |
| Masaüstü | Electron |
| Paketleme | electron-builder |
| İkon üretimi | Python, Pillow |

## Kurulum

Projeyi klonladıktan sonra bağımlılıkları yükle:

```bash
npm install
```

Uygulamayı geliştirme modunda başlat:

```bash
npm start
```

Windows installer üret:

```bash
npm run dist
```

Installer ve paketleme çıktıları `dist/` klasörüne oluşturulur.

## Proje Yapısı

```text
MertOS-Launcher/
├── assets/
│   └── icons/
├── build/
│   └── icon.ico
├── scripts/
│   └── create_icon.py
├── index.html
├── style.css
├── data.js
├── script.js
├── main.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Dosya Rolleri

| Dosya | Açıklama |
| --- | --- |
| `main.js` | Electron ana process dosyasıdır. Pencereyi oluşturur ve dış linkleri varsayılan tarayıcıya yönlendirir. |
| `index.html` | Uygulamanın temel HTML iskeletidir. |
| `style.css` | Arayüz tasarımı, responsive yapı ve kart stillerini içerir. |
| `data.js` | Proje ve geliştirici araçları verilerini tutar. |
| `script.js` | Kart oluşturma, arama ve filtreleme davranışlarını yönetir. |
| `build/icon.ico` | Windows uygulama ikonudur. |
| `scripts/create_icon.py` | Uygulama ikonunu yeniden üretmek için kullanılan yardımcı scriptir. |

## Veri Yönetimi

Proje ve araç listeleri `data.js` içinde tutulur:

```js
window.launcherData = {
  projects: [],
  tools: []
};
```

Arayüz bu verileri `script.js` içinden okuyarak kartları oluşturur. Bu sayede içerik değişiklikleri ile arayüz davranışları birbirinden ayrılmış olur.

## Electron Davranışı

Uygulama lokal `index.html` dosyasını Electron penceresi içinde yükler.

`http` ve `https` bağlantıları Electron içinde açılmaz; kullanıcının varsayılan tarayıcısına yönlendirilir. Bu davranış `main.js` içinde `shell.openExternal` ile yönetilir.

## İkon Üretimi

Uygulama ikonu `build/icon.ico` dosyasında bulunur.

İkonu yeniden üretmek için:

```bash
python scripts/create_icon.py
```

Bu script için Python tarafında `Pillow` paketinin kurulu olması gerekir:

```bash
pip install pillow
```

## Git Dışı Bırakılanlar

Aşağıdaki klasörler repoya eklenmemelidir:

```text
node_modules/
dist/
```

Bu klasörler `.gitignore` içinde hariç tutulur.

## Lisans

Bu proje kişisel kullanım için geliştirilmiştir.
