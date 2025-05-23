const { StatusCodes } = require('http-status-codes');
const { dashboardService } = require('../services/dashboardService');

class DashboardController {

  async dashboard(req, res, next) {
    try {
      const result = await dashboardService.dashboard(req.query);

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const dashboardController = new DashboardController();

module.exports = { dashboardController, DashboardController };