    function herinneringPopup() {
        var huidigeDatum = new Date();
        var terugbrengDatum = new Date('2024-02-01');

        if (huidigeDatum > terugbrengDatum) {
            document.getElementById('reminderPopup').style.display = 'block';
        }
    }
    window.onload = herinneringPopup;

    // Wacht 5 seconden en verberg dan het element met id 'reminderPopup'
    setTimeout(() => {
        const reminderPopup = document.getElementById('reminderPopup');
        if (reminderPopup) {
            reminderPopup.style.display = 'none';
        }
    }, 2000);

