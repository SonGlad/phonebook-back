const { Contact } = require("../../models/contact");
const {HttpError, ctrlWrapper} = require("../../helpers/index");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contactData = req.body;
  

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner}, 
    { ...contactData }, 
    { new: true }
  );
  
  if (!result) {
    throw HttpError(404, "Contact was not found");
  };

  res.status(200).send(result);
};


module.exports = {
  updateById: ctrlWrapper(updateById)
};