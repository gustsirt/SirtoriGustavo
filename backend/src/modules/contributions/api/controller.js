import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
  }

  create = async (req, res, next) => {
    try {
      const newElement = req.body
      await this.service.isValidUser({_id: newElement.contributedBy});
      const element = await this.service.create(newElement);
      res.sendSuccess(element)
    } catch (error) {
      next(error)
    }
  }
}