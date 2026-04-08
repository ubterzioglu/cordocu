# Session 06 - Visual Polish and Responsive Refinement

## Objective
- Hub arayuzunu temel iskeletten urun kalitesine tasiyan gorsel iyilestirmeleri planla.
- Responsive kirilimlarda spacing, density ve state gorunurlugunu netlestir.

## In Scope
- Tipografi, spacing, state renkleri ve hover/focus gorunumu
- Card yogunlugu, sidebar okunabilirligi ve content rhythm
- Mobile ve desktop kirilimlarinda gorunum ayari
- Arayuzun daha tamamlanmis hissettirmesi

## Out of Scope
- Yeni veri modeli
- Yeni route davranisi
- Gercek search veya Supabase islevi
- Tam accessibility kapanis kontrolu

## Current Baseline
- `Header`, `Sidebar`, `MainContent` ve `ContentCard` ayni acik gri-beyaz yuzey dilini kullaniyor; hiyerarsi daha cok spacing ile kuruluyor, yuzey farklari ve state ayrimi zayif kaliyor.
- Header sabit ama marka alani, version chip ve mobile menu butonu ayni gorsel agirlikta kaldigi icin ust bar "urun kabugu" gibi degil "gecici scaffold" gibi hissettiriyor.
- Sidebar aktif durumunu sadece acik mavi zemin ile gosteriyor; category basligi, aktif item ve hover item birbirinden daha net ayrismali.
- Main content hero blogu, section heading'leri ve kart grid'i ayni ritimde aktigi icin overview ve detail ekranlari yeterince farkli ton tasimiyor.
- Mobile overlay davranisi var, ancak backdrop, drawer yuzeyi ve content bosluklari daha bilincli ayarlanmadigi icin ekran gecisi sert hissedebilir.

## Design Direction
- Mevcut repo stiline sadik kal: acik tema, mavi primary ailesi ve sade urun dili korunacak.
- Hedef "daha suslu" degil, "daha bilincli urun arayuzu" olmali: yumusak katman farklari, daha net bilgi hiyerarsisi ve daha olgun spacing sistemi.
- Steril gorunumu azaltmak icin renk patlamasi degil, ton farki, daha belirgin border, kontrollu shadow ve secili yuzeyler kullan.
- Hover ve active state'lerde sadece renk degisimi degil; zemin, border, icon ve metin agirligi birlikte degismeli.

## Tasks
- `src/styles/globals.css` icindeki shell ve component token'larini polish odakli hale getir:
  - header yuksekligi, content gutter ve block padding token'larini breakpoint bazli daha tutarli kullan
  - yuzey, border, shadow ve focus icin tekrar kullanilabilir siniflar veya degiskenler tanimla
- `src/components/layout/Header.tsx` icin ust hiyerarsiyi guclendir:
  - marka alani, version badge ve mobile toggle arasinda daha net agirlik farki kur
  - header arka plani ve alt border'i shell'den hafif ayrisan bir yuzey hissi vermeli
- `src/components/layout/Sidebar.tsx`, `SidebarCategory.tsx` ve `SidebarItem.tsx` icin navigation okunabilirligini arttir:
  - category label, aktif kategori ve aktif item state'leri birbirine karismamali
  - hover state aktif state'i taklit etmemeli; daha hafif bir vurgu olmali
  - mobile overlay ve drawer yuzeyi backdrop ile birlikte daha yumusak ama belirgin ayrismali
- `src/components/layout/MainContent.tsx` ve `src/components/ui/SectionHeading.tsx` icin content rhythm'i ayarla:
  - hero blogu, section heading ve card grid arasindaki bosluklar bilincli kademelenmeli
  - hub overview ile category detail ayni sistem icinde ama farkli yogunlukta hissettirmeli
- `src/components/ui/ContentCard.tsx` icin density ve polish kararlarini netlestir:
  - compact, default ve detail varyantlarinin padding ve bilgi yogunlugu farki daha belirgin olmali
  - card hover, active benzeri CTA ve static kart gorunumleri birbirinden ayrilmali

## Component Decisions
### Header
- Desktop'ta header daha ince bir utility bar gibi degil, shell'in ust capasi gibi hissettirmeli.
- Brand link daha guclu tipografik anchor olmali; version badge ikinci planda kalmali.
- Mobile menu button hover/focus durumlari kart ve sidebar state diliyle uyumlu olmali.

### Sidebar
- Category satirlari kucuk ama daha okunur olmali; ikon ve label ayni satirda kaybolmamali.
- Aktif category basliginda sadece metin rengi degil, ikon ve disclosure control da vurgulanmali.
- Aktif item icin hafif tint + ince border veya ic golge benzeri bir secim dili kullanilabilir; yalnizca `bg-primary-50` yeterli kabul edilmemeli.
- Hover item, aktif item'in daha zayif bir versiyonu olmali; active ile birebir ayni tonal aralik kullanilmamali.
- Mobile drawer tam ekran agirligi tasimadan, icerik ustune gelen kontrollu bir panel gibi davranmali.

### Main Content Hero
- Hero blogu sayfanin en guclu yuzeyi olmaya devam etmeli, ancak beyaz kart hissi biraz daha rafine edilmeli.
- Eyebrow, title, description ve meta badge satiri arasinda daha net dikey ritim kurulacak.
- Search placeholder blogu hero icinde kalabilir, fakat ayri bir alt bolum gibi hissedebilmesi icin separator ve spacing daha net olacak.

### Sections and Cards
- Section heading ile kart grid'i arasinda sabit ama cihaza gore olceklenen bir bosluk sistemi kullan.
- Hub overview'da kartlar taranabilirlik odakli; category detail'de ise okuma ritmi daha rahat olmali.
- Icon kutulari, badge'ler ve CTA satiri ayni gorsel dilde toparlanmali; biri cok yumusak, biri cok sert kalmamali.

## Responsive Decisions
### Mobile (`<768px`)
- `docs-shell-content` yatay padding'i sikisilmis ama nefes alan bir aralikta kalmali; hero ve section bloklari cok genis beyaz kutular gibi durmamali.
- Hero padding'i kartlardan biraz daha buyuk kalmali, ancak mevcut desktop hissini minik ekrana tasiyacak kadar kompakt olmalidir.
- Tum kart grid'leri tek kolonda kalir; kart padding'i compact ve default arasinda dengeli bir orta noktaya cekilebilir.
- Sidebar overlay backdrop'u daha yumusak opaklik + blur hissi ile gelmeli; drawer golgesi drawer'in icerigi kapladigini net gostermeli.

### Tablet (`768px-1023px`)
- Content alaninda hero ve section spacing'i mobile'a gore acilir, ama desktop kadar yayilmaz.
- Iki kolonlu grid sadece yeterli nefes varsa kullanilmali; dar tablet genisliklerinde kart yukseklik farklari ritmi bozmamali.
- Sidebar hala overlay olabilir; drawer genisligi sabit deger yerine ekranin anlamli bir yuzdesine yaslanabilir.

### Desktop (`>=1024px`)
- Shell offset mantigi korunur; polish bu offset'i bozmamali.
- Content max width ve section spacing'i daha editorial bir ritme cekilebilir: hero ile ilk section arasinda en buyuk bosluk burada olmali.
- Uc kolonlu alanlarda kart yogunlugu artarken kart ici padding gereksiz ferahliga kacmamali.

## State Rules
- `default`: notr zemin, notr border, okunur ama sakin metin tonu
- `hover`: hafif zemin farki + border belirginlesmesi + gerekiyorsa icon/label tonunda artis
- `active`: hover'dan daha kuvvetli tint, daha belirgin metin tonu ve secili oldugunu gosteren ek isaret
- `focus-visible`: Session 08'e alan birakacak sekilde simdiden gorunur olmali; yalnizca renk degisimi ile gecistirilmemeli
- `placeholder/disabled-like UI`: search alani gibi yuzeylerde okunurluk korunurken interaktif ozellik izlenimi verilmemeli

## Breakpoint and Density Matrix
- Header:
  - mobile: kompakt yatay padding, toggle daha gorunur
  - desktop: daha rafine yatay bosluk, brand alani baskin
- Sidebar item:
  - mobile/tablet: biraz daha buyuk tap hedefi
  - desktop: daha sik ama hala rahat taranabilir
- Content card:
  - compact: overview grid icin en sik varyant
  - default: standart kategori ve overview karti
  - detail: category detail icinde daha uzun metinli kartlar
- Section spacing:
  - mobile: sik ama ust uste binmeyen ritim
  - tablet: belirgin kademelenme
  - desktop: hero, section heading ve grid arasinda en rafine bosluk sistemi

## Acceptance Criteria
- Hub desktop ve mobile'da daha tutarli, daha okunabilir ve daha bitmis hissedecek.
- Active ve hover state'ler accessibility calismasi oncesinde bile net ayirt edilebilir olacak.
- Responsive spacing kararlari bilesen bazinda celismeyecek.
- Polish asamasi yapisal sorumluluklari degistirmeyecek.
- Header, sidebar ve content hero ayni urunun parcalari gibi gorunecek; birbirinden kopuk "varsayilan Tailwind bloklari" gibi hissettirmeyecek.

## Verification Notes
- Desktop ve mobile ekranlarda header, sidebar ve hero arasinda istenmeyen cakisilan shadow veya border olmamali.
- Hub overview ve category detail sayfalari ayni stil sistemini paylasirken yogunluk olarak farkli okunmali.
- Hover, active ve focus gorunumu en az su yuzeylerde kontrol edilmeli: mobile menu button, sidebar category trigger, sidebar item, content card, search placeholder input.
- Session sonunda yeni route, yeni veri modeli veya gercek arama davranisi eklenmemis olmali.

## Dependencies
- Giris bagimliligi: `1775646829603-playful-cactus-session-05-main-content-cards.md`
- Sonraki session referansi: `1775646829603-playful-cactus-session-08-accessibility-qa.md`

## Handoff Notes
- Session icinde yeni ozellik eklemekten kacinilmali; bu oturum salt gorsel kalite isi olarak kalmali.
- Session 08 contrast ve focus degerlendirmelerini burada secilen yuzey, tint ve state farklari uzerinden tamamlayacak.
- Eger yeni utility siniflari veya CSS token'lari eklenirse, bunlar route veya veri katmanina sizmamali; yalnizca shell ve presentational component seviyesinde kalmali.
