# CORTEQS Proje Takibi - İnceleme Notları
## Genel Anlayış
Bu Excel dosyası, bir projenin görev bazlı olarak planlanması, durumunun izlenmesi ve temel kaynak/maliyet bilgilerinin takip edilmesi için hazırlanmış bir **proje takip şablonu**. Yapı, tek sayfada hem üst seviye proje bilgilerini hem de alt seviyedeki görev listelerini bir araya getiriyor.
Dosya, aktif kullanılmış bir operasyon dosyasından çok, örnek verilerle doldurulmuş ve sonradan gerçek projelere uyarlanabilecek bir başlangıç şablonu izlenimi veriyor.
## Üst Seviye Tespitler
- Dosyada **1 sekme** bulunuyor: **Proje Takibi**.
- Üst bölümde proje başlığı, proje yöneticisi, şirket adı ve tarih için ayrı alanlar tanımlanmış.
- Sağ tarafta **durum anahtarı** ve **öncelik anahtarı** bulunuyor.
- Ana görev tablosu; durum, öncelik, tarih, süre, görev adı, atanan kişi, açıklama, materyal, tamamlanma oranı, sabit maliyet ve saat takibini aynı tabloda topluyor.
- Dosyada toplam **2 proje grubu** ve bunların altında **14 görev satırı** var.
- Atanan kişi alanları şu an tamamen boş; yani sahiplik tarafı henüz işlenmemiş.
- Açıklama alanlarının bir kısmında gerçek açıklama yerine örnek metin olarak **"Buraya görev ayrıntılarını girin"** kullanılmış.
## Üst Bilgiler
| Alan | Değer |
| --- | --- |
| Proje başlığı | [Projenin başlığı] |
| Proje yöneticisi | [Proje Yöneticisinin adı] |
| Şirket adı | [Şirketin adı] |
| Tarih | 12.03.2018 |

## Anahtarlar
- **Durumlar:** Beklemede, Henüz Başlamadı, Devam Ediyor, Tamamlandı
- **Öncelikler:** Düşük, Orta, Yüksek

## PROJE 1
Bu bölüm, tek bir proje başlığı altında görevleri gruplayıp bazı özet hücrelerle ilerleme ve kaynak toplamlarını yukarıda göstermeyi hedefliyor. İlgili özet hücreleri formülle çalışıyor.

### Özet Formüller
- Tamamlanan % özeti: `=AVERAGE(K11:K15)`
- Sabit maliyet toplamı: `=SUM(L11:L15)`
- Tahmini toplam saat: `=SUM(M11:M15)`
- Fiili toplam saat: `=SUM(N11:N15)`

### Görevler
| Durum | Öncelik | Başlangıç | Bitiş | Süre | Görev adı | Atanan | Açıklama | Materyal | Tamamlanan % | Sabit maliyet | Tahmini saat | Fiili saat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Beklemede | Yüksek | 09.09.2018 | 10.09.2018 | =DAYS360(D11,E11) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %56 | Boş | Boş | Boş |
| Henüz Başlamadı | Düşük | 10.09.2018 | 14.09.2018 | =DAYS360(D12,E12) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %50 | Boş | Boş | Boş |
| Beklemede | Düşük | 11.09.2018 | Boş | Boş | Boş | Boş | Boş | Boş | Boş | Boş | Boş | Boş |
| Devam Ediyor | Orta | 11.09.2018 | 20.09.2018 | =DAYS360(D14,E14) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %22 | Boş | Boş | Boş |
| Tamamlandı | Orta | 12.09.2018 | 20.09.2018 | =DAYS360(D15,E15) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %11 | Boş | Boş | Boş |

## PROJE 2
Bu bölüm, tek bir proje başlığı altında görevleri gruplayıp bazı özet hücrelerle ilerleme ve kaynak toplamlarını yukarıda göstermeyi hedefliyor. İlgili özet hücreleri formülle çalışıyor.

### Özet Formüller
- Tamamlanan % özeti: `=AVERAGE(K17:K20)`
- Sabit maliyet toplamı: `=SUM(L17:L20)`
- Tahmini toplam saat: `=SUM(M17:M20)`
- Fiili toplam saat: `=SUM(N17:N20)`

### Görevler
| Durum | Öncelik | Başlangıç | Bitiş | Süre | Görev adı | Atanan | Açıklama | Materyal | Tamamlanan % | Sabit maliyet | Tahmini saat | Fiili saat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Beklemede | Yüksek | 09.09.2018 | 10.09.2018 | =DAYS360(D17,E17) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %11 | 400 | 20 | 20 |
| Henüz Başlamadı | Düşük | 10.09.2018 | 14.09.2018 | =DAYS360(D18,E18) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %0 | 200 | 6 | 5 |
| Devam Ediyor | Orta | 11.09.2018 | 20.09.2018 | =DAYS360(D19,E19) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %0 | 50 | 5 | 5 |
| Tamamlandı | Orta | 12.09.2018 | 20.09.2018 | =DAYS360(D20,E20) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %0 | 40 | 2 | 2 |
| Tamamlandı | Orta | 13.09.2018 | 21.09.2018 | =DAYS360(D21,E21) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %0 | 40 | 2 | 2 |
| Tamamlandı | Orta | 14.09.2018 | 22.09.2018 | =DAYS360(D22,E22) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %0 | 40 | 2 | 2 |
| Tamamlandı | Orta | 15.09.2018 | 23.09.2018 | =DAYS360(D23,E23) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %0 | 40 | 2 | 2 |
| Tamamlandı | Orta | 16.09.2018 | 24.09.2018 | =DAYS360(D24,E24) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %0 | 40 | 2 | 2 |
| Tamamlandı | Orta | 17.09.2018 | 25.09.2018 | =DAYS360(D25,E25) | Görev | Boş | Buraya görev ayrıntılarını girin | Boş | %0 | 40 | 2 | 2 |

## Ne Anlıyorum?
Bu dosyanın ana amacı, proje yönetimini çok karmaşık hale getirmeden tek sayfada görünür kılmak. Yani buradaki mantık şu:

1. Üstte proje kimliği bilgileri var.
2. Ortada proje bazlı görev listeleri var.
3. Her görev için durum ve öncelik takibi yapılıyor.
4. İlerleme yüzdesi, maliyet ve saat toplamları proje seviyesinde formülle özetleniyor.
5. Sağ taraftaki anahtar alanları sayesinde durum ve öncelik değerleri standardize ediliyor.

## Eksik veya Taslak Kalan Noktalar
- Proje başlığı, yönetici ve şirket alanları gerçek bilgiler yerine placeholder metin içeriyor.
- Görev adları büyük ölçüde sadece **Görev** olarak bırakılmış.
- **Atanan** sütununda doldurulmuş kayıt yok.
- **Materyal** alanları boş.
- Proje 1 tarafında maliyet ve saat alanları neredeyse tamamen boş; Proje 2 tarafında ise örnek veri girişi yapılmış.
- Bazı satırlar yarım bırakılmış; örneğin başlangıç tarihi var ama görev içeriği boş olan satırlar mevcut.

## Sonuç
Bu dosya, gerçek bir proje operasyon raporundan çok, **Corteqs tarafında kullanılabilecek örnek bir proje takip şablonu** gibi okunuyor. En güçlü yanı, görev takibi ile maliyet/saat takibini aynı yerde birleştirmesi. En zayıf yanı ise veri girişlerinin henüz büyük ölçüde taslak seviyesinde olması.

Gerçek kullanıma alınacaksa özellikle şu alanlar doldurulmalı:
- net proje adı ve proje yöneticisi
- gerçek görev isimleri
- görev sahipleri
- açıklamalar ve materyaller
- maliyet ve tahmini/fiili saat verileri
- tamamlanma yüzdelerinin düzenli güncellenmesi
