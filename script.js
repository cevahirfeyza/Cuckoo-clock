function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    const hourDegree = ((hours % 12) * 30) + (minutes / 60) * 30; // Saati 30 dereceye çevir
    const minuteDegree = (minutes * 6) + (seconds / 60) * 6; // Dakikayı 6 dereceye çevir
    const secondDegree = (seconds * 6); // Saniyeyi 6 dereceye çevir

    hourHand.style.transform = `rotate(${hourDegree}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
    secondHand.style.transform = `rotate(${secondDegree}deg)`;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    document.getElementById('time').textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    if (formattedMinutes === '00' && formattedSeconds === '00') {
        cuckoo();
        openWindows();
        playCuckooSound();
    } else {
        playClockSound();
    }
}

function cuckoo() {
    const cuckoo = document.getElementById('cuckoo');
    const cuckooSound = document.getElementById('cuckoo-sound');
    const leftDoor = document.querySelector('.left-door');
    const rightDoor = document.querySelector('.right-door');

    leftDoor.classList.add('open-left');
    rightDoor.classList.add('open-right');

    cuckooSound.play();

    setTimeout(() => {
        cuckoo.style.display = 'block';
        setTimeout(() => {
            cuckoo.classList.add('show'); // Kuşun pencereden çıkmasını sağlar

            setTimeout(() => {
                cuckoo.classList.remove('show'); // Kuşun tekrar yukarı çıkmasını sağlar
                setTimeout(() => {
                    cuckoo.style.display = 'none';
                    leftDoor.classList.remove('open-left');
                    rightDoor.classList.remove('open-right');
                }, 500);
            }, 7000);
        }, 100);
    }, 1000);
}

function openWindows() {
    const leftDoor = document.querySelector('.left-door');
    const rightDoor = document.querySelector('.right-door');

    leftDoor.classList.add('open-left');
    rightDoor.classList.add('open-right');

    setTimeout(() => {
        leftDoor.classList.remove('open-left');
        rightDoor.classList.remove('open-right');
    }, 8000);
}

function playCuckooSound() {
    const cuckooSound = document.getElementById('cuckoo-sound');
    cuckooSound.play();
}

function playClockSound() {
    const clockSound = document.getElementById('clock-sound');
    if (clockSound.paused) {
        clockSound.play();
    }
}

setInterval(updateTime, 1000);
updateTime();
