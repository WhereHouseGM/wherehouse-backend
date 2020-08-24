const multer = require("multer");
const { authorize } = require("../../middlewares/auth");
const { postAttachments } = require("../../services/attachment");
const HTTPError = require("node-http-error");
const AttachmentDto = require("../../dtos/attachment");
const sftpStorage = require("multer-sftp");

const storage = sftpStorage({
	sftp: {
		host: "127.0.0.1",
		port: 22,
		username: "sftpuser",
		password: "karkar55@"
	},
	destination: function (req, file, cb) {
		cb(null, "/");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now());
	}
});
const upload = multer({ storage });

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