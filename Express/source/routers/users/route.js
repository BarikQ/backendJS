export const get = (req, res) => {
    try {
        const data = {
            data: [{name: 'user_1'}, {name: 'user_2'}],
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = (req, res) => {
    try {
        const data = {
            data: req.body,
        };

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
