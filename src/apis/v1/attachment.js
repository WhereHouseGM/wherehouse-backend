const multer = require("multer");
const { authorize } = require("../../middlewares/auth");
const { postAttachments } = require("../../services/attachment");
const HTTPError = require("node-http-error");

const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 }});

module.exports = (router) => {
	router.post("/attachments", authorize(), upload.array("attachments", 10), async function (req, res, next) {
		try {
			if(req.files === undefined) throw new HTTPError(400, "No Image Given");

			const attachments = await postAttachments(req.files);
			res.status(201).json(attachments);
		} catch (err) {
			next(err);
		}
	});
};