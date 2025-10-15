// script.js
document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('questionText');
    const answerText = document.getElementById('answerText');
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const heartContainer = document.querySelector('.heart-container');
    const container = document.querySelector('.container');
    
    // Hayır mesajları listesi - İSİM DEĞİŞTİRİLDİ
    const noMessages = [
        "EMİN MİSİN?",
        "GERÇEKTEN Mİ?",
        "BİR DAHA DÜŞÜN!",
        "SON KARARIN MI!",
        "HAYIR OLAMAZ!",
        "KALBİMİ KIRACAKSIN...",
        "TOPRAK ÜZÜLÜR!", // İSİM DEĞİŞTİRİLDİ
        "TEKRAR DENE!",
        "YANLIŞ BUTON SEÇİLİ!",
        "BÖYLE KOLAY VAZGEÇİLMEZ!",
        "ONU SEVİYORSUN, BİLİYORUM!",
        "BU BİR HATAYDI!"
    ];
    let attempts = 0; 
    
    const maxMoveRange = 150; 

    // HAYIR butonuna fare yaklaştığında veya tıklandığında tetiklenecek olay
    noButton.addEventListener('mouseover', handleNoAttempt);
    noButton.addEventListener('click', handleNoAttempt);

    function handleNoAttempt(event) {
        if (answerText.classList.contains('show')) return; 

        // 1. Metni Güncelle
        if (attempts < noMessages.length) {
            questionText.textContent = noMessages[attempts];
        } else {
            const randomIndex = Math.floor(Math.random() * noMessages.length);
            questionText.textContent = noMessages[randomIndex];
        }
        
        attempts++;

        // 2. Butonu Kaçır
        const randomFactorX = Math.random() * 2 - 1;
        const randomFactorY = Math.random() * 2 - 1;
        
        const currentMoveRange = Math.min(maxMoveRange + attempts * 15, 300); 
        
        const randomX = randomFactorX * currentMoveRange;
        const randomY = randomFactorY * currentMoveRange;

        noButton.style.transition = `transform 0.2s ease-out`; 
        noButton.style.transform = `translate(calc(-50% + ${randomX}px), ${randomY}px)`;
        
        noButton.style.boxShadow = `0 10px 25px rgba(244, 67, 54, 0.6)`; 
    }

    // EVET butonuna tıklandığında tetiklenecek olay
    yesButton.addEventListener('click', () => {
        // 1. Görüntüyü değiştir
        questionText.classList.add('hidden');
        noButton.classList.add('hidden');
        yesButton.classList.add('hidden');
        
        answerText.textContent = "BEN DE SENİ SEVİYORUM <3"; // CEVAP MESAJI AYNI KALDI
        answerText.classList.remove('hidden');
        answerText.classList.add('show');
        
        // Arka planı değiştir
        document.body.style.backgroundColor = '#f0f8ff'; // Açık Mavi yapalım
        container.style.backgroundColor = '#ffffff';

        // 2. Kalp animasyonunu başlat
        startHeartAnimation();
    });

    // Kalp animasyonu fonksiyonları
    function startHeartAnimation() {
        let heartInterval = setInterval(() => {
            createHeart();
        }, 100);

        setTimeout(() => {
            clearInterval(heartInterval);
        }, 3000); 
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        const randomLeft = Math.random() * 100 + 'vw'; 
        heart.style.left = randomLeft; 
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's'; 
        heart.style.animationDelay = Math.random() * 0.5 + 's'; 

        heartContainer.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
});