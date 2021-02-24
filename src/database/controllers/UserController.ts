import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        error: true,
        message: "This user already exists!"
      });
    }

    const newUser = userRepository.create({
      name, email
    });
    await userRepository.save(newUser);

    return res.json(newUser);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const userRepository = getRepository(User);

    try {
      await userRepository.delete({ id });
    } catch (error) {
      return res.json({
        error: true,
        message: error
      });
    }

    return res.json({
      error: false,
      message: "User successfully deleted!"
    })
  }
}

export { UserController };