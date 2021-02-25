import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {
  async create({ body: { title, description } }: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const newSurvey = surveysRepository.create({ title, description });
    await surveysRepository.save(newSurvey);

    return res.status(201).json(newSurvey);
  }

  async show(req: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRepository.find();

    return res.status(200).json(allSurveys);
  }
}

export { SurveyController };
