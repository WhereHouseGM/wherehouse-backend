const db = require("../models");
const appConfig = require("../config/app");

exports.postAttachments = async function (files) {
	const attachments = await Promise.all(
		files.map(async _ => {
			const newAttachment = await db.warehouseAttachments.create({
				url: `${appConfig.app.url}/${_.path}`
			});
			return newAttachment;
		}));

	return {
		attachments: attachments
	};
};