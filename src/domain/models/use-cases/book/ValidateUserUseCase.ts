import { UserFinder } from "../../services/UserFinder";

export class ValidateUserUseCase {
  constructor(private userFinder: UserFinder) {}

  async execute(email: string): Promise<{ 
    isValid: boolean; 
    user?: any; 
    message: string 
  }> {
    // Validar que el email sea proporcionado
    if (!email) {
      throw new Error('Email is required');
    }

    // Buscar usuario
    const user = await this.userFinder.run(email);
    if (!user) {
      throw new Error('Email not registered');
    }

    // Verificar si el usuario es válido
    const isValid = user.getIsValid();

    return {
      isValid,
      user: isValid ? user : undefined,
      message: isValid ? 'User is valid' : 'User is not valid'
    };
  }
}