export interface ForgetPasswordProps {
    handleBackToLogin: () => void; // Function that accepts a boolean
}

export interface RegisterProps{
    alreadyLogin: () => void;
}

export interface LoginProps {
    handleForgetPassword: () => void;
    handleRegistration: () => void;
  }
  