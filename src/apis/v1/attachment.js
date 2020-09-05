const multer = require("multer");
const { authorize } = require("../../middlewares/auth");
const { postAttachments } = require("../../services/attachment");
const HTTPError = require("node-http-error");
const AttachmentDto = require("../../dtos/attachment");
const sftpStorage = require("multer-sftp");
const appConfig = require("../../config/app");
const md5 = require("md5");

const storage = sftpStorage({
	sftp: {
		host: appConfig.app.imageUrl,
		port: 22,
		username: "wherehouse",
		password: "karkar55@"
	},
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		cb(null, md5(file.fieldname + "-" + Date.now()));
	}
});
const upload = multer({ storage, limits: { fileSize: 1024*1024*5 } });

module.exports = (router) => {
	router.post("/attachments", authorize(), upload.array("attachments", 10), async function (req, res, next) {
		try {
			if(req.files === undefined) throw new HTTPError(400, "No Image Given");

			const attachments = await postAttachments(req.files);
			res.status(201).json({
				attachments: attachments.map(attachment => AttachmentDto(attachment))
			});
		} catch(err) {
			next(err);
		}
	});
};