import express from "express";

import controller from "../../controllers/inspection.controller";
import { upload } from "../../middlewares/file.middleware";
import { changeStatus, getInspection } from "../../validations/inspection.validation";
import { validate } from "../../utils/validation";

const router = express.Router();

/**
 * @swagger
 * /v1/inspections/import:
 *   post:
 *     summary: Import inspections
 *     tags: [Inspection]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *              file:
 *                description: file should be always at the end of FormData
 *                type: string
 *                format: binary
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: true
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/responses/Error"
 */
router.route("/import").post(upload.single("file"), controller.importInspections);

/**
 * @swagger
 * /v1/inspections/{id}/{status}:
 *   get:
 *     summary: Resolve a inspection
 *     tags: [Inspection]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *            example: 97
 *         required: true
 *       - in: path
 *         name: status
 *         schema:
 *            type: string
 *            enum: [resolved, unresolved]
 *         required: true
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/responses/Inspection"
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/responses/Error"
 */
router.route("/:id/:status").get(validate(changeStatus), controller.changeStatus);

/**
 * @swagger
 * /v1/inspections/{reportNumber}:
 *   get:
 *     summary: Get detail inspections
 *     tags: [Inspection]
 *     parameters:
 *       - reportNumber: path
 *         name: reportNumber
 *         schema:
 *            type: string
 *            example: MIHERLK01156
 *         required: true
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *                $ref: "#components/responses/Inspection"
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/responses/Error"
 */
router.route("/:reportNumber").get(validate(getInspection), controller.getInspection);

/**
 * @swagger
 * /v1/inspections:
 *   get:
 *     summary: Fetch inspections
 *     tags: [Inspection]
 *     responses:
 *       "200":
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#components/responses/Inspection"
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/responses/Error"
 */
router.route("/").get(controller.fetchInspections);
export default router;
