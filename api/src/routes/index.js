import { Router } from "express";

const routes = Router();

routes.get('/', async (req, res) => {
    res.status(200).send('This is a mockup of a mint server..')
})

routes.post('/mint', async (req, res) => {
    const { recipient, metadata } = req.body;
    const { authtoken } = req.headers;
    console.log(authtoken)
    if (!authtoken) {
        return res.status(403).send({ minted: false, message: 'Not authorized' })
    } else {
        if (authtoken !== '1234') {
            return res.status(403).send({minted: false, message: 'Not authorized' })
        }
    }
    console.log(recipient, metadata);

    if (!recipient || !metadata) {
        return res.status(400).send({ minted: false, message: 'No data received' })
    }
    if (!metadata.properties) {
        return res.status(400).send({ minted: false, message: 'Incomplete data received.'})
    }
    if (!metadata.properties.files) {
        return res.status(400).send({ minted: false, message: 'No files received to mint.'})
    } else {
        if (!Array.isArray(metadata.properties.files)) {
            return res.status(400).send({ minted: false, message: 'No files received to mint.'})
        } else if (metadata.properties.files.length = 0) {
            return res.status(400).send({ minted: false, message: 'No files received to mint.'})
        }
    }

    res.status(200).send({ minted: true, 'message': 'Succesfully created your NFT:', metadata });
});


export default routes;