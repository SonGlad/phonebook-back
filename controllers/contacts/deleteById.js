const { Contact } = require("../../models/contact");
const {HttpError, ctrlWrapper} = require("../../helpers/index");


const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;


  const result = await Contact.findOneAndDelete({ _id: contactId, owner});
  
  if (!result) {
    throw HttpError(404, "Contact was not found");
  };

  res.status(200).send({_id: result._id, message: "Contact Deleted"});
};


module.exports = {
  deleteById: ctrlWrapper(deleteById)
};