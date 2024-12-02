export interface ForgetPasswordProps {
    handleBackToLogin: () => void;
    reset: (value: boolean) => void; // Function that accepts a boolean
    forgetPassword: (value: boolean) => void;
}

export interface RegisterProps{
    alreadyLogin: () => void;
}

export interface LoginProps {
    handleForgetPassword: () => void;
    handleRegistration: () => void;
  }
  