## 1) WhatsApp bot entegrasyonunun genel amacı nedir?

- WhatsApp botu, grup içinde tanıtım ve bilgilendirme akışını düzenlemek için kullanılır.  
- Amaç sadece reklam yapmak değil, kullanıcıya fayda sunan bir temas noktası oluşturmaktır.  
- Bot grup deneyimini destekleyen yardımcı bir rol üstlenmelidir.  
- Botun dili ve mesaj sıklığı grup akışını bozmayacak şekilde kurgulanmalıdır.  
- Meta’nın spam ve otomasyon kurallarına uygun bir yapı kurulmalıdır.  

---

## 2) WhatsApp botu için teknik altyapı nasıl seçilir?

- Resmi yol olarak WhatsApp Business API kullanılabilir.  
- Twilio, WATI ve Interakt resmi sağlayıcı örnekleridir.  
- Resmi yol güvenli ve ücretlidir.  
- Gayriresmi yol olarak whatsapp-web.js veya Baileys kullanılabilir.  
- Gayriresmi yol ücretsiz ve esnektir.  
- Gayriresmi yol yüksek ban riski taşır.  
- Maliyet, esneklik ve risk karşılaştırması yapılmalıdır.  
- Tek bir teknik yaklaşım seçilerek pilot kurulum yapılmalıdır.  

---

## 3) Grup içi tanıtım senaryoları nasıl çalışır?

- Tetikleyici komutlar ile kullanıcı isteğe bağlı içerik alır.  
- Kullanıcı !kampanyalar veya !katalog yazarak bilgi talep eder.  
- Zamanlanmış mesajlar belirli gün ve saatlerde paylaşılır.  
- Cron job ile haftalık kampanya mesajları gönderilir.  
- DM yönlendirme ile kullanıcı özel mesajlara çekilir.  
- Grup spamden korunur ve birebir iletişim sağlanır.  
- Tetikleyici komutlar ve mesaj şablonları önceden tanımlanmalıdır.  

---

## 4) WhatsApp bot kurulumu nasıl yapılır?

- Bot için ayrı bir telefon numarası tahsis edilmelidir.  
- Platform veya yazılım kurulumu yapılmalıdır.  
- Chatfuel ve ManyChat gibi araçlar kullanılabilir.  
- Bot gruba eklenmeli ve gerekirse admin yetkisi verilmelidir.  
- WhatsApp Business katalog entegrasyonu yapılmalıdır.  
- Katalog linkleri bot üzerinden paylaşılmalıdır.  

---

## 5) Bot kullanımında dikkat edilmesi gereken kritik noktalar nelerdir?

- Aynı mesaj kısa sürede tekrar tekrar gönderilmemelidir.  
- Mesaj gönderimine random delay eklenmelidir.  
- Bot insan davranışına benzer şekilde hareket etmelidir.  
- Grup sadece reklam içeren bir yapıya dönüşmemelidir.  
- Bot müşteri hizmetleri asistanı gibi konumlandırılmalıdır.  
- Kullanıcıların botu kullanma nedeni net olmalıdır.  

---

## 6) Opt-in ve DM stratejisi nasıl çalışır?

- Bot kullanıcıya opt-in çağrısı yapar.  
- Kullanıcı KAZAN yazarak sisteme dahil olur.  
- Bot kullanıcıyı hedefli mesaj listesine ekler.  
- Tanıtımlar sadece bu listeye DM olarak gönderilir.  
- Grup üyeleri gereksiz mesaj görmez.  
- Kullanıcı DUR yazarak sistemden çıkabilir.  
- Opt-in ve opt-out mekanizmaları test edilmelidir.  

---

## 7) WhatsApp topluluk modeli nasıl kurgulanır?

- Ana grup sohbet ve genel iletişim için kullanılır.  
- Alt grup fırsatlar ve ödüller için oluşturulur.  
- Kullanıcılar isteğe bağlı olarak alt gruba katılır.  
- Bot sadece alt gruba mesaj gönderir.  
- Ana grup spamden korunur.  
- Topluluk yapısı kullanıcı deneyimini iyileştirir.  

---

## 8) Token kazanım sistemi nasıl çalışır?

- Kullanıcının WhatsApp numarası wallet ile eşleştirilir.  
- Her kullanıcıya benzersiz link oluşturulur.  
- Kullanıcı linke tıkladığında sistem tetiklenir.  
- Backend tıklamayı algılar ve token aktarımı yapar.  
- Kullanıcı anında ödül aldığını görür.  
- Tekrar tıklama limitleri belirlenir.  
- Sahte tıklama ve kötüye kullanım engellenir.  
- Günlük maksimum ödül kuralları tanımlanır.  

---

## 9) Genel aksiyon ve TODO listesi nedir?

- Teknik altyapı seçilmelidir.  
- Bot için ayrı numara belirlenmelidir.  
- Yazılım kurulumu yapılmalıdır.  
- Grup içi ve DM akışları tanımlanmalıdır.  
- Opt-in ve opt-out sistemi kurulmalıdır.  
- Topluluk veya alt grup modeli değerlendirilmelidir.  
- Wallet eşleme sistemi tasarlanmalıdır.  
- Kişiye özel link üretimi kurulmalıdır.  
- Tıklama takibi ve token sistemi geliştirilmelidir.  
- Spam ve ban riskleri azaltılmalıdır.  
- Mesaj limitleri ve delay kuralları belirlenmelidir.  
- Veritabanı ve API yapısı tanımlanmalıdır.  