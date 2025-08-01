# 🚨 Women Safety Project  

## 📌 Overview  
The **Women Safety Project** is a simple web-based solution built using **HTML, CSS, and JavaScript**.  
It allows a user to quickly send an **emergency alert via WhatsApp** to a trusted contact along with their **real-time location**.  

This ensures that in case of danger, friends or family can instantly know where the user is located.  

---

## ✨ Features  
- 📱 Enter a **trusted phone number** (with country code).  
- 🆘 Click **Alert Button** to trigger emergency action.  
- 📍 Uses **Geolocation API** to fetch the user’s latitude & longitude.  
- 💬 Redirects to **WhatsApp** with a pre-filled message containing a **Google Maps location link**.  
- 🔒 100% client-side — no backend, data privacy preserved.  

---

## 🛠️ Tech Stack  
- **Frontend:** HTML, CSS, JavaScript  
- **APIs Used:**  
  - Browser Geolocation API  
  - WhatsApp `wa.me` URL scheme  

---

## 🚀 How It Works  
1. Open the project in a browser.  
2. Enter a **phone number** (with country code, e.g., `+91XXXXXXXXXX`).  
3. Click on the **Alert button**.  
4. The browser asks for **location permission** → once allowed, location is fetched.  
5. WhatsApp (web/app) opens with a pre-filled message like:  

Emergency! I need help. My current location: https://www.google.com/maps/search/?api=1&query=17.3850,78.4867

yaml
Copy
Edit

6. User just needs to **press send** to notify the contact.  

---

## 📂 Project Structure  
women-safety/
│-- index.html # Main webpage
│-- styles.css # Styling
│-- script.js # Logic for geolocation + WhatsApp redirection
│-- README.md # Documentation

yaml
Copy
Edit

---

## ⚙️ Setup & Usage  
1. Download or clone the project:  
   ```bash
   git clone https://github.com/your-username/women-safety.git
   cd women-safety
Open index.html in a browser.

Enter a trusted phone number.

Press Alert and allow location access.

WhatsApp will open with the emergency message ready to send.

🧪 Sample Code Snippet (JavaScript)
javascript
Copy
Edit
function sendAlert() {
  const phone = document.getElementById('phoneInput').value.trim();
  if (!phone) {
    alert("Please enter a phone number with country code");
    return;
  }
  if (!navigator.geolocation) {
    alert("Geolocation not supported by this browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const message = `Emergency! I need help. My current location: ${mapsLink}`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  }, () => {
    alert("Unable to retrieve your location. Please allow access.");
  });
}
📈 Future Enhancements
Add multiple emergency contacts.

Auto-send via WhatsApp Business API.

Shake-to-Alert or voice-activated trigger.

Panic button integration with wearables.
