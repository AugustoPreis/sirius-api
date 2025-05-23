const { mapaCalorService } = require('../services/mapaCalorService');

class MapaCalorController {

  async buscarPorUUID(req, res, next) {
    try {
      const { uuid } = req.params;

      const result = await mapaCalorService.buscarPorUUID(uuid);

      res
        .set('Content-type', 'image/jpg')
        .set('Content-Disposition', `inline; filename=${encodeURIComponent(uuid)}`)
        .write(result, 'binary')
        .end(null, 'binary');
    } catch (err) {
      next(err);
    }
  }
}

const mapaCalorController = new MapaCalorController();

module.exports = { mapaCalorController, MapaCalorController };