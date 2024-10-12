export const checkPasswordStrength = (password) => {
	const minLength = 8;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumbers = /\d/.test(password);
	const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	if (password.length < minLength) {
		return 'Password must be at least 8 characters long';
	}
	if (!hasUpperCase) {
		return 'Password must contain at least one uppercase letter';
	}
	if (!hasLowerCase) {
		return 'Password must contain at least one lowercase letter';
	}
	if (!hasNumbers) {
		return 'Password must contain at least one number';
	}
	if (!hasSpecialChars) {
		return 'Password must contain at least one special character';
	}

	return '';
};
