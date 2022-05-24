const Document = require("../models/Document")

const createDocument = (req, res) => {
    const newDocument = new Document({
        room_key: req.body.roomKey,
        document_text: req.body.documentText
    })

    newDocument.save()
        .then((newDocument) => res.json(newDocument))
}

const fetchDocument = (req, res) => {
    Document.find({ room_key: req.params.roomKey})
}