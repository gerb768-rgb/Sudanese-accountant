import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// عناصر DOM
const loginScreen = document.getElementById('loginScreen');
const appScreen = document.getElementById('appScreen');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginButton');
const registerBtn = document.getElementById('registerButton');
const logoutBtn = document.getElementById('logoutBtn');

// وظيفة تسجيل الدخول
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const role = userDoc.data().role;
            alert(`مرحباً ${email} - صلاحية: ${role === 'manager' ? 'مدير' : 'كاشير'}`);
        } else {
            alert('تم تسجيل الدخول');
        }
        loginScreen.style.display = 'none';
        appScreen.style.display = 'flex';
    } catch (error) {
        alert('فشل تسجيل الدخول: ' + error.message);
    }
}

// إنشاء حساب جديد (مدير تلقائياً)
async function register(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        await setDoc(doc(db, 'users', uid), {
            email: email,
            role: 'manager',
            createdAt: new Date().toISOString()
        });
        alert('تم إنشاء الحساب بنجاح. يمكنك تسجيل الدخول الآن.');
    } catch (error) {
        alert('خطأ في التسجيل: ' + error.message);
    }
}

// تسجيل خروج
async function logout() {
    await signOut(auth);
    loginScreen.style.display = 'flex';
    appScreen.style.display = 'none';
}

// أحداث الأزرار
loginBtn.onclick = () => login(loginEmail.value, loginPassword.value);
registerBtn.onclick = () => register(loginEmail.value, loginPassword.value);
logoutBtn.onclick = () => logout();

// مراقبة حالة تسجيل الدخول
auth.onAuthStateChanged((user) => {
    if (user) {
        loginScreen.style.display = 'none';
        appScreen.style.display = 'flex';
    } else {
        loginScreen.style.display = 'flex';
        appScreen.style.display = 'none';
    }
});

// التنقل بين الأقسام
const menuBtns = document.querySelectorAll('.menu-item:not(#logoutBtn)');
const views = document.querySelectorAll('.view');
menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const viewName = btn.getAttribute('data-view');
        views.forEach(v => v.classList.remove('active'));
        document.getElementById(`${viewName}View`).classList.add('active');
        menuBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
