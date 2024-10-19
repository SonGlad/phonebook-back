const { Contact } = require("../../models/contact");
const { ctrlWrapper, HttpError } = require("../../helpers/index");


const getAll = async (req, res) => {
    const {_id: owner} = req.user;


    const result = await Contact.find({ owner: owner })

    if (!result) {
        throw HttpError(404, "Contacts not found");
    }

    res.status(200).send(result);
};

module.exports = { 
    getAll: ctrlWrapper(getAll)
};
