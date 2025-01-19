document.addEventListener('DOMContentLoaded', function() {
    const form = {
        fullName: document.getElementById('fullName'),
        phone: document.getElementById('phone'),
        email: document.getElementById('email'),
        age: document.getElementById('age'),
        submitBtn: document.getElementById('submitBtn')
    };

    // בדיקת תקינות שם מלא
    function validateName(name) {
        const hebrewAndEnglishRegex = /^[\u0590-\u05FF\sa-zA-Z]+$/;
        return hebrewAndEnglishRegex.test(name) && name.length >= 2;
    }

    // בדיקת תקינות טלפון
    function validatePhone(phone) {
        const phoneRegex = /^0[0-9]{8,9}$/;
        return phoneRegex.test(phone);
    }

    // בדיקת תקינות אימייל
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // בדיקת תקינות גיל
    function validateAge(age) {
        const ageNum = parseInt(age);
        return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 120;
    }

    // הצגת הודעת שגיאה
    function showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.textContent = message;
        
        // הסרת הודעת שגיאה קודמת אם קיימת
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        element.parentElement.appendChild(errorDiv);
    }

    // הסרת הודעת שגיאה
    function removeError(element) {
        const errorDiv = element.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // בדיקת הטופס בעת שליחה
    form.submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let isValid = true;

        // בדיקת שם
        if (!validateName(form.fullName.value.trim())) {
            showError(form.fullName, 'נא להזין שם תקין באנגלית או בעברית');
            isValid = false;
        } else {
            removeError(form.fullName);
        }

        // בדיקת טלפון
        if (!validatePhone(form.phone.value.trim())) {
            showError(form.phone, 'נא להזין מספר טלפון תקין (לדוגמה: 0501234567)');
            isValid = false;
        } else {
            removeError(form.phone);
        }

        // בדיקת אימייל
        if (!validateEmail(form.email.value.trim())) {
            showError(form.email, 'נא להזין כתובת אימייל תקינה');
            isValid = false;
        } else {
            removeError(form.email);
        }

        // בדיקת גיל
        if (!validateAge(form.age.value.trim())) {
            showError(form.age, 'נא להזין גיל תקין (18-120)');
            isValid = false;
        } else {
            removeError(form.age);
        }

        // אם הכל תקין
        if (isValid) {
            alert('הטופס נשלח בהצלחה!');
            clearForm();
        }
    });
    function clearForm() {
        fullName.value = '';
        phone.value = '';
        email.value = '';
        age.value = '';
    }
});