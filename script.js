// Countdown to Christmas
const countdownElement = document.getElementById('countdown');
const countdownMessage = document.getElementById('countdown-message');

function updateCountdown() {
  const now = new Date();
  const christmas = new Date(now.getFullYear(), 11, 25); // December 25th
  const timeRemaining = christmas - now;

  if (timeRemaining <= 0) {
    countdownMessage.textContent = "🎄 Merry Christmas! 🎅";
    countdownElement.textContent = "";
  } else {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
setInterval(updateCountdown, 1000);

// Real-time Card Preview
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const senderInput = document.getElementById('sender-name');
const previewName = document.getElementById('preview-name');
const previewMessage = document.getElementById('preview-message');
const previewFrom = document.getElementById('preview-from');

nameInput.addEventListener('input', () => previewName.textContent = nameInput.value || "Recipient's Name");
messageInput.addEventListener('input', () => previewMessage.textContent = messageInput.value || 'Your heartfelt message here...');
senderInput.addEventListener('input', () => previewFrom.textContent = `From: ${senderInput.value}`);

// Card Image
const cardImageInput = document.getElementById('card-image');
const previewImageContainer = document.getElementById('preview-image-container');

cardImageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImageContainer.innerHTML = `<img src="${e.target.result}" alt="Card Image" style="max-width: 100%; border-radius: 10px;">`;
    };
    reader.readAsDataURL(file);
  }
});

// Download as PDF (Full Page)
document.getElementById('download-pdf').addEventListener('click', () => {
  const cardContainer = document.getElementById('card-container');
  html2canvas(cardContainer, { scale: 3 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth(); // Width of A4
    const pdfHeight = pdf.internal.pageSize.getHeight(); // Height of A4

    // Calculate image dimensions for full-page fit
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight > pdfHeight ? pdfHeight : imgHeight);
    pdf.save('christmas_card.pdf');
  });
});

