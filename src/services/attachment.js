const db = require("../models");
const appConfig = require("../config/app");
const AttachmentDto = require("../dtos/attachment");

exports.postAttachments = async function (files) {
	const attachmentDtos = await Promise.all(
		files.map(async _ => {
			const newAttachment = await db.warehouseAttachments.create({
				url: `${appConfig.app.url}/${_.path}`
			});
			return AttachmentDto(newAttachment);
		}));

	return {
		attachments: attachmentDtos
	};
};