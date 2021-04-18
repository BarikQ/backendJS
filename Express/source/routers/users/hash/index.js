export const getByHash = (req, res) => {
    try {
        const data = {
            data: { 'hash':req.params.userHash },
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const putByHash = (req, res) => {
    try {
        const data = {
            data: {'hash':req.params.userHash},
            body: req.body,
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteByHash = (req, res) => {
    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};