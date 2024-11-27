export interface ForgetPasswordProps {
    handleBackToLogin: () => void;
}

export interface RegisterProps{
    alreadyLogin: () => void;
}

export interface LoginProps {
    handleForgetPassword: () => void;
    handleRegistration: () => void;
  }
  