import express from "express";

import controller from "../../controllers/basic.controller";

const router = express.Router();

/**
 * @swagger
 * /v1/basics:
 *   get:
 *     summary: Fetch BASICs
 *     tags: [BASIC]
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: Unsafe Driving
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/responses/Error"
 */
router.route("/").get(controller.fetchBasics);

export default router;
