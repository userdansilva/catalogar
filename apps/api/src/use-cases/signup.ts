import { hash } from "bcryptjs";

type SignupUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

export class SignupUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: SignupUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const existsByEmail = await this.usersRepository.existsByEmail(email);

    if (existsByEmail) {
      throw new Error(`Usuário com email: ${email} já cadastrado.`);
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return user;
  }
}
