const data = require('../data/data.json');

const { getById, getByDate, getRegionById } = require('../util/function');
const { success, error, introduction } = require('../util/default');

const HomeController = (req, res) => {
	return res.status(200).json({
		...success,
		...introduction,
	});
};

const ErrorController = (req, res) => {
	return res.status(404).json({
		...error,
	});
};

const DataController = (req, res) => {
	return res.status(200).json({
		...success,
		data: (function () {
			return data.map(res => {
				const { kecamatan, ...result } = res;
				return result;
			});
		})(),
	});
};

const DataKecamatanController = (req, res) => {
	const { identifier } = req.params;

	if (typeof identifier === 'undefined') {
		return res.status(200).json({
			...success,
			data: data,
		});
	}

	if (typeof identifier !== 'undefined') {
		const final = getRegionById(identifier);
		if (final[0].hasOwnProperty('data') && typeof final[0]['data'] !== 'undefined') {
			return res.status(200).json({
				...success,
				data: final,
			});
		}
	}

	return res.status(404).json({
		...error,
	});
};

const ListKecamatanController = (req, res) => {
	const final = data[0]['kecamatan'].map(result => {
		const { data, ...destruct } = result;
		return destruct;
	});

	return res.status(200).json({
		...success,
		data: final,
	});
};

const CustomIdData = (req, res) => {
	const { identifier, kecamatan } = req.params;
	if (!isNaN(identifier)) {
		const dataId = getById(identifier, kecamatan);
		if (typeof dataId?.kecamatan !== 'undefined') return typeof dataId === 'undefined' ? res.status(404).json({ ...error, message: 'Data not found!' }) : res.status(200).json({ ...success, data: dataId });
	}

	if (new Date(identifier) instanceof Date && !isNaN(new Date(identifier))) {
		const dataDate = getByDate(identifier, kecamatan);
		if (typeof dataDate?.kecamatan !== 'undefined') return typeof dataDate === 'undefined' ? res.status(404).json({ ...error, message: 'Data not found!' }) : res.status(200).json({ ...success, data: dataDate });
	}

	return res.status(404).json({
		...error,
	});
};

module.exports = { HomeController, ErrorController, DataController, DataKecamatanController, CustomIdData, ListKecamatanController };
