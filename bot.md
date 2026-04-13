# WHATSAPP BOT

## 1. Genel Çerçeve
- WhatsApp grubunda bot ile reklam ve tanıtım yapmak, topluluk yönetimi ve doğrudan pazarlama açısından etkili bir yöntemdir.
- Meta'nın spam ve otomatik mesajlaşma kuralları nedeniyle süreç stratejik ve teknik olarak doğru kurgulanmalıdır.
- Temel ilke: bot önce "değer" sunmalı, reklam bu değerin içine yerleştirilmelidir.
- Yanlış kurgu spam algısı yaratır ve topluluğu dağıtır.

### TODO
- [ ] Reklam modelinin spam algısı yaratmadan nasıl işleyeceğini netleştir
- [ ] Teknik kurgu ile topluluk deneyimini birlikte düşün

---

## 2. Teknik Altyapı Seçenekleri

### Resmi Yol: WhatsApp Business API
- Twilio, WATI, Interakt, MessageBird gibi sağlayıcılar üzerinden çalışır
- Avantajlar:
  - Ban riski yok
  - Güvenilir
  - Kurumsal yapı (yeşil tik mümkün)
- Dezavantajlar:
  - Ücretli
  - Şablon mesaj onayı gerekir

### Gayriresmi Yol: Web Otomasyonu
- whatsapp-web.js / Baileys ile WhatsApp Web simüle edilir
- Avantajlar:
  - Ücretsiz
  - Esnek
  - Onaysız mesaj gönderimi
- Dezavantajlar:
  - Yüksek ban riski
  - Numara kalıcı kapanabilir
  - Küçük topluluklar için uygun

### TODO
- [ ] Maliyet / esneklik / risk önceliklendirmesi yap
- [ ] Sağlayıcı veya kütüphane shortlist oluştur

---

## 3. Grup İçi Tanıtım Senaryoları

### Tetikleyici Komutlar
- Bot kendiliğinden mesaj atmaz
- Kullanıcı komut yazınca çalışır (!kampanyalar, !katalog)
- Spam algısını düşürür

### Zamanlanmış Paylaşım
- Cron Job ile belirli gün/saatlerde paylaşım
- Örnek: Cuma fırsatları
- Tek ve kaliteli mesaj

### DM Yönlendirme (En Sağlıklısı)
- Grupta teaser mesaj
- Detay için DM'e yönlendirme
- Grup temiz kalır, conversion artar

### TODO
- [ ] Komut listesini belirle
- [ ] Zamanlama kurallarını yaz
- [ ] DM mesaj şablonlarını oluştur

---

## 4. Uygulama Adımları

### Numara Tahsisi
- Bot için ayrı numara kullan
- Tercihen sanal numara

### Platform Kurulumu
- Resmi API veya web automation seç
- Chatfuel / ManyChat kullanılabilir

### Gruba Ekleme
- Botu gruba ekle
- Gerekirse admin yap
- Duyuru grubunda aktif kullan

### Katalog Entegrasyonu
- WhatsApp katalog yükle
- Bot mesajlarında katalog link kullan

### TODO
- [ ] Numara edin
- [ ] Test ortamı kur
- [ ] Katalog akışını test et

---

## 5. Kritik Dikkat Noktaları

### Ban Önleme
- Aynı mesajı spam gibi gönderme
- Random delay kullan
- İnsan davranışı simülasyonu

### Grup Dinamiği
- Sadece reklam yapan grup ölür
- Bot = müşteri asistanı olmalı
- Örnek: !kargo, !destek

### TODO
- [ ] Mesaj limit kuralları yaz
- [ ] Faydalı komutlar ekle
- [ ] Kullanım değerini netleştir

---

## 6. Opt-in ve DM Stratejisi

### Akış
- Grup duyurusu:
  - "KAZAN yaz, fırsatları kaçırma"
- Kullanıcı KAZAN → listeye eklenir
- Kampanyalar sadece DM'den gider
- Kullanıcı DUR → listeden çıkar

### Avantajlar
- Spam yok
- Hedefli iletişim
- Daha yüksek etkileşim

### TODO
- [ ] Opt-in metni yaz
- [ ] KAZAN / DUR komutlarını tanımla
- [ ] DM akışını kur
- [ ] Opt-out test et

---

## 7. WhatsApp Community Modeli

### Yapı
- Ana grup: sohbet
- Alt grup: fırsatlar

### İşleyiş
- Ana grupta sadece yönlendirme
- Bot sadece alt grupta aktif

### Faydalar
- Ana grup temiz kalır
- Reklam isteyen ayrı toplanır

### TODO
- [ ] Community yapısını değerlendir
- [ ] Alt grup oluştur
- [ ] Yönlendirme mesajı hazırla

---

## 8. Token Kazanım Sistemi (Tıkla-Kazan)

### Hesap Eşleme
- WhatsApp numarası ↔ wallet eşleşir

### Kişiye Özel Link
- Her kullanıcıya unique URL
- Örnek:
  - /kampanya?user=9055...&ref=01

### Webhook + Token
- Tıklama → backend tetiklenir
- Token gönderilir
- Kullanıcıya başarı mesajı gösterilir

### Suistimal Önleme
- Tıklama limiti
- Fake detection
- Günlük ödül sınırı

### TODO
- [ ] Wallet mapping kur
- [ ] Link generator geliştir
- [ ] Webhook yaz
- [ ] Token API bağla

---

## 9. Genel Özet

### Teknik
- Altyapı seç
- Bot numarası ayır
- Sistemi kur

### Topluluk
- Grup + DM akışını belirle
- Opt-in sistemi kur
- Community modelini değerlendir

### Token
- Wallet sistemi kur
- Link üret
- Tracking + reward sistemi geliştir

### Güvenlik
- Spam riskini azalt
- Rate limit koy
- DB + API mimarisi oluştur

### TODO
- [ ] Altyapı seç
- [ ] Bot numarası ayır
- [ ] Sistemi kur
- [ ] Grup + DM akışını belirle
- [ ] Opt-in sistemi kur
- [ ] Community modelini değerlendir
- [ ] Wallet sistemi kur
- [ ] Link üret
- [ ] Tracking + reward sistemi geliştir
- [ ] Spam riskini azalt
- [ ] Rate limit koy
- [ ] DB + API mimarisi oluştur
