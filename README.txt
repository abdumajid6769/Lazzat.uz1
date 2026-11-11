Lazzat — sotuvchi paneli (birinchi demo versiya)

OCHISH
dist/index.html faylini zamonaviy Chrome yoki Edge brauzerida oching.
O‘rnatish va build kerak emas. Internet bo‘lmasa Arial shrifti ishlaydi.
Ma’lumotlar faqat ochilgan brauzer profilida saqlanadi. Sozlamalar > Zaxira nusxa orqali JSON nusxa oling.

9 BO‘LIM
1. Buyurtmalar: yangi / tayyorlanmoqda / tayyor / tarix; qabul, rad etish sababi, tayyorlash vaqti, demo buyurtma va ovoz, brauzer orqali demo chek chiqarish.
2. Menyu: kategoriya yaratish/nomlash/o‘chirish, mahsulot qo‘shish/tahrirlash/o‘chirish, modifikatorlar, narx, rasm, stop-list, XLSX/CSV import va tekshirilgan oldindan ko‘rish.
3. Ish vaqti: har filial uchun 7 kunlik jadval, filial qo‘shish/tahrirlash/ochish/yopish, barcha filiallar uchun band rejimi.
4. Aksiyalar: chegirma, promokod, kombo konfiguratsiyasi, muddat, minimal buyurtma, yoqish/o‘chirish. Mijoz checkoutiga hali ulanmagan.
5. Moliya: yakunlangan demo buyurtmalar savdosi, komissiya, sof tushum, davr filtri, CSV hisobot, bo‘sh to‘lovlar tarixi. Haqiqiy pul o‘tkazish yo‘q.
6. Analitika: haqiqiy saqlangan demo buyurtmalar asosida 7/14 kunlik savdo, top mahsulotlar, gavjum soatlar. Sun’iy o‘sish ko‘rsatkichlari yo‘q.
7. Sharhlar: baholar, javob yozish/tahrirlash, filtrlash, shikoyat belgilash. Shikoyat moderatorga yuborilmaydi.
8. Xodimlar: xodimlar, rollar, bo‘lim ruxsatlari konfiguratsiyasi, faol holati. Login, SMS va serverdagi ruxsat nazorati yo‘q.
9. Sozlamalar: profil, logotip, aloqa, tayyorlash vaqti, demo komissiya stavkasi, ovoz/bildirishnoma, JSON zaxira va tekshirilgan tiklash.

CHEGARALAR
Bu frontend prototip. Bir nechta foydalanuvchi/qurilma uchun sinxronlash, autentifikatsiya va RBAC, mijoz ilovasi, jonli buyurtmalar, to‘lovlar, fiskal chek, kuryer, SMS/push va moderator serveri hali ulanmagan.
"Kuryerga berildi" demo savdoni yakunlaydi; yetkazib berish kuzatuvi yo‘q.
Excel import: .xlsx, birinchi varaq, birinchi qator ustun nomlari. Kerakli ustunlar: nomi, kategoriya, narx. Qo‘shimcha: tavsif, mavjud (1/0). 2 MB / 2000 mahsulot gacha. Brauzer deflate-raw qo‘llamasa CSV ishlating. Eski .xls format qo‘llanmaydi.
Rasmlar: PNG/JPG/WebP, 1 MB gacha; umumiy hajm brauzer localStorage kvotasiga bog‘liq.

TEKSHIRISH
verify.cjs: Node.js 22+ bilan `node verify.cjs`.
Buyurtma holatlari, tushum, komissiya, saqlash, CSV, noto‘g‘ri nusxa va kvota xatolari tekshiriladi.
Brauzer vizual tekshiruvi va native XLSX importi ushbu muhitda tekshirilmagan.
Internet hostingga Git ulanishi muhitda bloklangan, shuning uchun sayt nashr qilinmagan.
