const express = require('express');
const c = require('../controllers/productController');
const { validateObjectId, requireBody, validateStockChange } = require('../middleware/validators');

const router = express.Router();

// Static routes MUST come before "/:id"
router.get('/low-stock', c.getLowStock);
router.get('/summary', c.getCategorySummary);

router.route('/').get(c.getProducts).post(requireBody, c.createProduct);

router
  .route('/:id')
  .get(validateObjectId, c.getProductById)
  .put(validateObjectId, requireBody, c.updateProduct)
  .delete(validateObjectId, c.deleteProduct);

router.patch('/:id/stock', validateObjectId, validateStockChange, c.adjustStock);

module.exports = router;
