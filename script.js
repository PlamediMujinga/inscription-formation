// Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBwrRtptkrVfl8JCx4hUiPPZTvLvFPLMU8",
    authDomain: "inscription-5d440.firebaseapp.com",
    projectId: "inscription-5d440",
    storageBucket: "inscription-5d440.appspot.com",
    messagingSenderId: "341734806064",
    appId: "1:341734806064:web:92ed959462883db68253f5",
    measurementId: "G-06Y1TGSNKH"
  };

  // Initialize Firebase
  const app=initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const myCollectionRef = collection(db, 'inscriptions')

  // Initialiser EmailJS
    (function(){
        emailjs.init("service_nie66p2"); // Remplacez par votre User ID
    })();
        // Gérer la soumission du formulaire
        document.getElementById('registrationForm').addEventListener('submit', async(event)  => {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    
    // Ajouter les données à Firestore
    
    try {
    const docRef = await addDoc(myCollectionRef, {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email

        // Envoyer l'email
        emailjs.send("service_nie66p2", "template_valtfrl", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: `Bienvenue ${firstName} ${lastName}, merci de vous être inscrit !`
        })
    });
    console.log("Document ajouté avec ID :", docRef.id);
    // Afficher le message de succès
    document.getElementById('message').innerText = 'Enregistrement réussi ! Un mail de confirmation a été envoyé.';
    document.getElementById('registrationForm').reset(); // Réinitialiser le formulaire
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement : ', error);
    document.getElementById('message').innerText = 'Erreur lors de l\'enregistrement. Veuillez réessayer.';
    document.getElementById('message').style.color = 'red'; // Changer la couleur du message d'erreur
  }
});
