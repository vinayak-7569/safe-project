let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Load saved contacts on page load
document.addEventListener("DOMContentLoaded", () => {
    displayContacts();
});

function saveContact() {
    let name = document.getElementById("contactName").value.trim();
    let number = document.getElementById("contactNumber").value.trim();

    if (!name || !number || isNaN(number)) {
        alert("Enter valid contact details!");
        return;
    }

    // Prevent duplicate numbers
    if (contacts.some(contact => contact.number === number)) {
        alert("This contact is already saved!");
        return;
    }

    // Save contact
    let newContact = { name, number };
    contacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Update UI
    displayContacts();
    
    // Clear input fields
    document.getElementById("contactName").value = "";
    document.getElementById("contactNumber").value = "";
}

function displayContacts() {
    let contactList = document.getElementById("contactList");
    contactList.innerHTML = "";

    contacts.forEach((contact, index) => {
        let li = document.createElement("li");
        li.textContent = `${contact.name} - ${contact.number}`;
        
        // Remove button for contacts
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => removeContact(index);

        li.appendChild(removeBtn);
        contactList.appendChild(li);
    });
}

function removeContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
}

function sendLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    if (contacts.length === 0) {
        alert("No contacts saved. Please add an emergency contact first.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let message = `🚨 Emergency! My location: https://www.google.com/maps?q=${latitude},${longitude}`;

        // Send location to all saved contacts
        contacts.forEach(contact => {
            let whatsappLink = `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, "_blank");
        });

    }, () => {
        alert("Unable to retrieve location.");
    });
}
