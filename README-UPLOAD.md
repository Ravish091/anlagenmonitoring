# ALAB Monitoring Website - Upload Guide

## 📁 Dateien für den Upload

### Desktop-Version (Hauptversion)
- `alab-monitoring-professional.html` - Hauptdatei
- `alab-monitoring-professional.css` - Styles
- `alab-monitoring-professional.js` - Interaktivität

### Mobile-Version (Optimierte Mobile-Ansicht)
- `alab-monitoring-mobile.html` - Mobile Hauptdatei
- `alab-monitoring-mobile.css` - Mobile Styles
- `alab-monitoring-mobile.js` - Mobile Interaktivität

### Zusätzliche Dateien
- `index.html` - Weiterleitung zur Hauptseite

## 🚀 Upload-Anleitung

### Option 1: Netlify (Empfohlen)
1. Gehen Sie zu [netlify.com](https://netlify.com)
2. Ziehen Sie den gesamten Ordner `2048` in das Drop-Zone-Fenster
3. Warten Sie auf den Upload
4. Ihre Website ist sofort online!

### Option 2: FTP/SFTP Upload
1. Verbinden Sie sich mit Ihrem Server via FTP
2. Navigieren Sie zum `public_html` oder `www` Ordner
3. Laden Sie alle Dateien hoch:
   - Alle `.html` Dateien
   - Alle `.css` Dateien
   - Alle `.js` Dateien

### Option 3: cPanel File Manager
1. Loggen Sie sich in cPanel ein
2. Öffnen Sie den File Manager
3. Navigieren Sie zu `public_html`
4. Klicken Sie auf "Upload"
5. Wählen Sie alle Dateien aus

## ⚙️ Konfiguration

### Responsive Design
Die Website erkennt automatisch:
- **Desktop**: Zeigt `alab-monitoring-professional.html`
- **Mobile**: Sie können optional auf `alab-monitoring-mobile.html` verlinken

### Mobile Detection Script (Optional)
Fügen Sie dieses Script in `index.html` ein für automatische Weiterleitung:

```javascript
<script>
// Automatische Mobile-Erkennung
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Mobile Device erkannt - zur Mobile-Version weiterleiten
    if (window.location.pathname !== '/alab-monitoring-mobile.html') {
        window.location.href = 'alab-monitoring-mobile.html';
    }
} else {
    // Desktop - zur Desktop-Version weiterleiten
    if (window.location.pathname !== '/alab-monitoring-professional.html') {
        window.location.href = 'alab-monitoring-professional.html';
    }
}
</script>
```

## ✅ Nach dem Upload

1. **Testen Sie beide Versionen:**
   - Desktop: `ihredomain.de/alab-monitoring-professional.html`
   - Mobile: `ihredomain.de/alab-monitoring-mobile.html`

2. **Prüfen Sie:**
   - ✓ Alle Bilder laden korrekt
   - ✓ Swiper-Funktionen arbeiten
   - ✓ Kontaktformulare senden an Make.com
   - ✓ Navigation funktioniert
   - ✓ 3D-Effekte sind sichtbar

## 🔧 Wichtige Features

### Desktop-Version
- Fixed Header mit Mega-Menü
- 3D Cube Hero Animation
- Swiper mit Coverflow-Effekt
- Animierte FAQ-Section
- Make.com Webhook Integration

### Mobile-Version
- Hamburger-Menü mit Drawer
- 3D Swipecards
- Bewegende Icons & Animationen
- Bottom Navigation
- Touch-optimiert

## 📞 Support

Bei Fragen zur Installation kontaktieren Sie:
- ALAB Energiesysteme Support
- Make.com Webhook: `https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y`

## 🎉 Fertig!

Ihre professionelle ALAB Monitoring Website ist jetzt online und bereit für Ihre Kunden!
