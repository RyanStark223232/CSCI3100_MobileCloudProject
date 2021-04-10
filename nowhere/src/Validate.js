const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
      return `${fieldName} is required`;
    }
    if (/[^a-zA-Z -]/.test(fieldValue)) {
      return 'Invalid characters';
    }
    if (fieldValue.trim().length < 2) {
      return `${fieldName} needs to be at least two characters`;
    }
    return null;
  };

const userNameValidation = username => {
    if (username.trim() === '') {
        return `Username is required`;
    }
    if (/[^a-zA-Z0-9 -]/.test(username)) {
        return 'Invalid characters';
    }
    return null;
};
  
const emailValidation = email => {
if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email,
    )
) {
    return null;
}
if (email.trim() === '') {
    return 'Email is required';
}
return 'Please enter a valid email';
};

const ageValidation = age => {
if (!age) {
    return 'Age is required';
}
if (/[\D+]/.test(age)){
    return 'Please enter a number';
}
if (age < 18) {
    return 'Age must be at least 18';
}
if (age > 99) {
    return 'Age must be under 99';
}
return null;
};

const sexValidation = sex =>{
    if(/[^MFO -]/.test(sex)){
        return 'Please select your sex';
    }
    return null;
}

const bioValidation = bio =>{
    if (bio.trim() === '') {
        return 'Your description cannot be empty';
    }

    if(bio.match(/(\w+)/g).length < 20){
        return 'Your description must at least have 20 words';
    }
    return null;
}

const nationalityValidation = nationality =>{
    if(nationality === null){
        return 'Nationality is required';
    }
    return null;
}

const phoneNumValidation = phone =>{
    if(/^[2-9][0-9]{7}$/.test(phone)){
        return null;
    }
    return 'Please enter a valid phone number. i.e: xxxx-xxxx';
}

export const validate = {
firstName: name => nameValidation('First Name', name),
lastName: name => nameValidation('Last Name', name),
userName: userNameValidation,
email: emailValidation,
age: ageValidation,
sex: sexValidation,
nationality: nationalityValidation,
bio: bioValidation,
phoneNum: phoneNumValidation,
};