// Basic client side interactions: forms submission to backend endpoints
document.getElementById('year').textContent = new Date().getFullYear();


// Helper: post JSON and handle response
async function postJSON(url, data){
const resp = await fetch(url, {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify(data)
});
return resp.json();
}


// Volunteer form
const volunteerForm = document.getElementById('volunteerForm');
volunteerForm?.addEventListener('submit', async (e)=>{
e.preventDefault();
const data = Object.fromEntries(new FormData(volunteerForm).entries());
document.getElementById('volunteerMsg').textContent = 'Sending...';
try{
const res = await postJSON('/api/volunteer', data);
document.getElementById('volunteerMsg').textContent = res.message || 'Thanks! We will contact you.';
volunteerForm.reset();
}catch(err){
document.getElementById('volunteerMsg').textContent = 'Failed to send. Try again later.';
}
});


// Donate form (mock)
const donateForm = document.getElementById('donateForm');
donateForm?.addEventListener('submit', async (e)=>{
e.preventDefault();
const data = Object.fromEntries(new FormData(donateForm).entries());
document.getElementById('donateMsg').textContent = 'Processing...';
try{
const res = await postJSON('/api/donate', data);
document.getElementById('donateMsg').textContent = res.message || 'Thank you for your donation (mock).';
donateForm.reset();
}catch(err){
document.getElementById('donateMsg').textContent = 'Payment failed. Try again later.';
}
});


// Contact form
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async (e)=>{
e.preventDefault();
const data = Object.fromEntries(new FormData(contactForm).entries());
document.getElementById('contactMsg').textContent = 'Sending...';
try{
const res = await postJSON('/api/contact', data);
document.getElementById('contactMsg').textContent = res.message || 'Message sent. Thank you!';
contactForm.reset();
}catch(err){
document.getElementById('contactMsg').textContent = 'Failed to send. Try again later.';
}
});
});