# CorteQS Ajanlar ve Komutlar

Bu belge CorteQS projesi için kullanılabilir ajanları ve slash komutlarını tanımlar.

## Ajanlar

Ajanlar, karmaşık görevleri otomatikleştirmek için tasarlanmıştır. `.kilo/agent/` dizininde `.md` dosyaları olarak tanımlanır.

### Mevcut Ajanlar

- **Dev Agent** - Geliştirme görevlerini yönetir (kurulum, build, deployment)
- **Code Review Agent** - Kod incelemesi ve quality checks
- **Docs Agent** - Dokümantasyon oluşturma ve güncelleme

## Slash Komutları

Slash komutları `.kilo/command/` dizininde `.md` dosyaları olarak tanımlanır.

### Mevcut Komutlar

#### `/setup`
Projeyi baştan kurar ve tüm bağımlılıkları yükler.
```
/setup
```

#### `/dev`
Geliştirme sunucusunu başlatır.
```
/dev
```

#### `/build`
Production build oluşturur.
```
/build
```

#### `/type-check`
TypeScript hatalarını kontrol eder.
```
/type-check
```

## Kilo MCP Sunucuları

Proje için yapılandırılan MCP sunucuları `kilo.json` içinde tanımlanır.

## Özel Konfigürasyon

Proje-spesifik konfigürasyonlar `.kilo/` dizininde tutulur.

---

Daha fazla bilgi için: [Kilo Dokumentasyonu](https://kilo.ai/docs)
