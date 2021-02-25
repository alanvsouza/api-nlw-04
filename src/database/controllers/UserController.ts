import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        error: true,
        message: "This user already exists!"
      });
    }

    const newUser = usersRepository.create({
      name, email
    });
    await usersRepository.save(newUser);

    return res.status(201).json(newUser);
  }

  async delete(req: Request, res: Response) {
    const email = req.params.email;

    const usersRepository = getCustomRepository(UsersRepository);

    try {
      await usersRepository.delete({ email });
    } catch (error) {
      return res.status(400).json({
        message: error
      });
    }

    return res.status(200).json({
      message: "User successfully deleted!"
    })
  }
}

export { UserController };
